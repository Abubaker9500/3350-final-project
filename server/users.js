const express = require('express');
const app = express();
app.use(express.json());
const port = 3001;
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');

//get data from env
let con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// loads procedures from procedures.sql
function loadProcedures() {
    const sql = fs.readFileSync('procedures.sql', 'utf8');

    // Remove DELIMITER lines, split on END $$
    const procedures = sql
        .replace(/DELIMITER \$\$/g, '')
        .replace(/DELIMITER ;/g, '')
        .split('END $$')
        .map(p => p.trim())
        .filter(p => p.length > 0)
        .map(p => p + ' END');

    procedures.forEach(proc => {
        con.query(proc, err => {
            if (err && err.code !== 'ER_SP_ALREADY_EXISTS') throw err;
        });
    });

    console.log("Procedures loaded");
}

//connect to your local database
//runs functions
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB.");
    loadProcedures();
});





//api endpoint to create account
app.post('/createAccount', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    //checks to see if they submitted email and password
    if (!email || !password) {
        return res.json({ message: 'Send an email and password' });
    }

    con.query('SELECT * FROM users WHERE email = ?', [email], async (err, rows) => {
        if (rows.length > 0)
            return res.json({ message: 'Email is already in use' });


        //encrpyts password and runs db querry
        const hashed = await bcrypt.hash(password, 10);
        con.query('CALL create_user(?, ?)', [email, hashed], (err) => {
            if (err) {
                //if non csub email, error state 45000
                if (err.sqlState === '45000') {
                    return res.json({ message: err.message });
                }
                return res.json({ message: 'Database error' });
            }

            return res.status(201).json({ message: 'Account created successfully' });
        });
    });

});

//api endpoint to login
app.post('/login', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Send an email and password' });
    }

    con.query('SELECT * FROM users WHERE email = ?', [email], async (err, rows) => {
        if (err) {
            console.log(err);
            return res.json({ message: 'Database error' });
        }

        if (rows.length == 0) {
            return res.json({ message: 'Invalid email or password' });
        }

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password_hashed);

        if (!match) {
            return res.json({ message: 'Invalid email or password' });
        }

        return res.status(200).json({ message: 'Login successful', userId: user.user_id });
    });
});


app.listen(port, () => {
    console.log(`Port is ${port}`);
});

