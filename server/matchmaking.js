//creates matchmaking que per user 

const { size, uniq } = require("lodash");

//not connected to back-end, just algorithm
//will connect to db later
//database call to match by correct gender


//swipe_check is whether they already swiped yes/no on them
//in future use queries to grab only genders that match user request



class user {
    constructor(id, major, gender, looking_for, hobbies, swipe, blocked, date, email) {
        this.id = id;
        this.major = major;
        this.gender = gender;
        this.looking_for = looking_for;
        this.hobbies = hobbies;
        this.swipe_check = swipe;
        this.emails_blocked = blocked;
        this.age = date;
        this.email = email;
    }
}

class match {
    constructor(id, major, hobbies, last_login, gender, swipe, age, looking_for, email, blocked) {
        this.id = id;
        this.major = major;
        this.hobbies = hobbies;
        this.last = last_login;
        this.gender = gender;
        this.swipe_check = swipe;
        this.age = age;
        this.looking_for = looking_for;
        this.email = email;
        this.emails_blocked = blocked;

    }
}

//matchmaking que for this user
let main = new user(
    1,
    "Computer Science",
    "Male",
    "Female",
    ["gaming", "travel", "baking", "reading"],
    false,
    ["blocked@email.com"],
    new Date("2004-03-25"),
    "user@email.com",
);

let matches = [
    new match(2, "Computer Science", ["gaming", "travel"], new Date("2026-04-10"), "Female", false, new Date("2003-06-12"), "Male", "match1@email.com", []),
    new match(3, "Math", ["reading", "chess"], new Date("2026-04-08"), "Female", true, new Date("2002-01-20"), "Male", "user@email.com", []),
    new match(4, "Computer Science", ["gaming", "coding"], new Date("2026-04-09"), "Female", true, new Date("2004-09-15"), "Female", "match3@email.com", []),
    new match(5, "Computer Science", ["gaming", "travel"], new Date("2026-04-11"), "Male", false, new Date("2003-03-03"), "Male", "match4@email.com", []),
    new match(6, "Computer Science", ["gym", "music"], new Date("2026-04-12"), "Female", false, new Date("2005-07-22"), "Male", "match5@email.com", []),
    new match(7, "Biology", ["gaming", "travel", "reading"], new Date("2026-04-13"), "Female", false, new Date("2003-11-30"), "Female", "match6@email.com", []),
    new match(8, "Computer Science", ["travel"], new Date("2026-04-07"), "Female", true, new Date("1999-05-14"), "Male", "match7@email.com", []),
    new match(9, "History", ["painting", "hiking"], new Date("2026-04-06"), "Female", false, new Date("2004-02-10"), "Male", "match8@email.com", []),
    new match(10, "Computer Science", ["gaming", "reading"], new Date("2026-04-05"), "Male", false, new Date("2002-08-18"), "Male", "match9@email.com", []),
    new match(11, "Engineering", ["travel"], new Date("2026-04-04"), "Female", false, new Date("2004-12-01"), "Male", "match10@email.com", ["match1@email.com"])
];


let matchQueue = [];
matches.forEach((mat) => {

    const current = new Date();
    let timeDifference = current - mat.last;
    let daysDifference = timeDifference / (1000 * 3600 * 24);
    //checks hard filters first
    if (main.looking_for != mat.gender || mat.looking_for != main.gender || main.emails_blocked.includes(mat.email) || mat.emails_blocked.includes(main.email)
        || main.swipe_check || mat.swipe_check || daysDifference > 60) {
        //no match
    } else {
        //rank matches, rank with 4 categories, most recent activity, age silmilarity, hobby overlap, major overlap
        let majorWeight = 0, hobbyWeight = 0, activityWeight = 0, ageWeight = 0;

        //major
        if (main.major == mat.major)
            majorWeight = 1;

        //hobby
        let hobCount = 0;
        let uniqueHobbies = 0;
        hobCount = main.hobbies.filter(hob => mat.hobbies.includes(hob)).length;
        uniqueHobbies = new Set(main.hobbies.concat(mat.hobbies)).size;
        if (hobCount == 0)
            hobbyWeight = 0;
        else
            hobbyWeight = hobCount / uniqueHobbies;

        //recent activity
        //log decay the longer it's been since you've logged on
        let weeksInactive = Math.floor(daysDifference / 7);
        if (weeksInactive == 0)
            activityWeight = 1;
        else
            activityWeight = Math.pow(0.85, weeksInactive);
        if (activityWeight < 0)
            activityWeight = 0

        //age
        let mainAge = current.getFullYear() - main.age.getFullYear();
        let matAge = current.getFullYear() - mat.age.getFullYear();
        let ageDiff = Math.abs(mainAge - matAge);
        ageWeight = 1 - ageDiff / 10
        if (ageWeight < 0)
            ageWeight = 0;

        //final answer
        let answer = (majorWeight + hobbyWeight + activityWeight + ageWeight) / 4;
        console.log(answer);
        matchQueue.push({ id: mat.id, score: answer });
    }

    

});
console.log(matchQueue);








