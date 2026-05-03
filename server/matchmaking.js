const { size, uniq } = require("lodash");
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const mysql = require('mysql2');



// Source - https://stackoverflow.com/a/21984136
// Posted by André Snede, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-02, License - CC BY-SA 4.0

function _calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}


module.exports = function startMatchmaking(app, con) {
    app.post('/getQueue', async (req, res) => {
        const { userID } = req.body;
        console.log(req.body);
        //checks if they submitted user
        if (!userID) {
            return res.json({ message: 'Requires UserID' });
        }
        //checks if user exists
        con.query('SELECT * FROM users WHERE user_id = ?', [userID], (err, rows) => {
            if (err)
                return res.json({ message: 'Database error' });
            if (rows.length === 0)
                return res.json({ message: 'UserId does not exist' });

            //stores user profile
            con.query('CALL get_user_profile(?)',
                [userID],
                (err, results) => {
                    if (err)
                        return res.json({ message: 'Database error', error: err.message });
                    let user = results[0][0];
                    //console.log(user);

                    //gets hobbies for user
                    con.query('CALL get_profile_hobbies(?)',
                        [user.profile_id],
                        (err, results) => {
                            if (err)
                                return res.json({ message: 'Database error', error: err.message });
                            user.hobbies = results[0].map(r => r.hobby);

                            //gets cannidates for matchmaking
                            //query includes hard filters
                            con.query('CALL get_discover_candidates(?)',
                                [userID],
                                (err, results) => {
                                    if (err)
                                        return res.json({ message: 'Database error', error: err.message });
                                    let canidates = results[0];
                                    console.log(canidates);

                                    //gets hobbies for canidates
                                    const hobbyPromises = canidates.map((mat) => {
                                        return new Promise((resolve, reject) => {
                                            con.query('CALL get_profile_hobbies(?)', [mat.profile_id], (err, results) => {
                                                if (err) reject(err);
                                                mat.hobbies = results[0].map(r => r.hobby);
                                                resolve();
                                            });
                                        });
                                    });

                                    Promise.all(hobbyPromises).then(() => {
                                        let matchQueue = [];
                                        canidates.forEach((mat) => {
                                            //rank matches, rank with 3 categories
                                            let majorWeight = 0, hobbyWeight = 0, ageWeight = 0;

                                            //major
                                            if (user.major == mat.major)
                                                majorWeight = 1;

                                            //hobby
                                            let hobCount = 0;
                                            let uniqueHobbies = 0;
                                            hobCount = user.hobbies.filter(hob => mat.hobbies.includes(hob)).length;
                                            uniqueHobbies = new Set(user.hobbies.concat(mat.hobbies)).size;
                                            if (hobCount == 0)
                                                hobbyWeight = 0;
                                            else
                                                hobbyWeight = hobCount / uniqueHobbies;

                                            //age
                                            let mainAge = _calculateAge(new Date(user.birthdate));
                                            let matAge = _calculateAge(new Date(mat.birthdate));
                                            let ageDiff = Math.abs(mainAge - matAge);
                                            ageWeight = 1 - ageDiff / 10;
                                            if (ageWeight < 0)
                                                ageWeight = 0;

                                            //final answer
                                            let answer = (majorWeight + hobbyWeight + ageWeight) / 3;
                                            console.log(answer);
                                            matchQueue.push({
                                                id: mat.user_id,
                                                score: answer,
                                                profile_id: mat.profile_id,
                                                first_name: mat.first_name,
                                                last_name: mat.last_name,
                                                birthdate: mat.birthdate,
                                                age: _calculateAge(new Date(mat.birthdate)),
                                                major: mat.major,
                                                bio: mat.bio,
                                                gender: mat.gender,
                                                profile_picture: mat.profile_picture,
                                                hobbies: mat.hobbies
                                            });
                                        });

                                        matchQueue.sort((a, b) => b.score - a.score);
                                        return res.json({ queue: matchQueue });

                                    }).catch((err) => res.json({ message: 'Database error', error: err.message }));
                                }
                            );
                        }
                    );
                }
            );
        });
    });

    //API endpoint to swipe yes or no
    //decision is string, 'yes' or 'no'
    app.post('/swipe', async (req, res) => {
        console.log(req.body);
        const { userID, targetPID, decision } = req.body;
        if (!userID || !targetPID || !decision) {
            return res.status(400).json({ message: "Send userID, targetPID, and decision as 'yes' or 'no' string" });
        }
        if (decision !== 'yes' && decision !== 'no') {
            return res.status(400).json({ message: "Decision must be 'yes' or 'no' string" });
        }

        //converts userId to PID
        con.query('CALL get_user_profile(?)', [userID], (err, result) => {
            if (err) return res.json({ message: 'Database error', error: err.message });
            let userPID = result[0][0].profile_id;
            con.query('CALL record_swipe(?,?,?)', [userPID, targetPID, decision], (err) => {
                if (err) return res.json({ message: 'Database error', error: err.message });
                return res.json({ message: 'Added swipe as ', swipe: decision });
            });
        });
    });
}