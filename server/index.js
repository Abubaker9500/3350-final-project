const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const mysql = require('mysql');

//get data from env
let con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
})

//connect to your local database
//runs functions
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to DB.");
    initDB();
});

//creates DB if none exist
//runs fille tables
function initDB() {
    con.query("CREATE DATABASE IF NOT EXISTS datingapp", function (err) {
        if (err) throw err;
        //specifies DB name, datingAPP
        con.query("Use datingapp", function (err) {
            if (err) throw (err);
            fillTables();
        });
    });
}

//if tables don't exist, fill them
//uses tables.sql written by angel
function fillTables() {
    con.query("SHOW TABLES LIKE 'users'", (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
            console.log("Tables already exist");
        } else {
            const data = fs.readFileSync('tables.sql', 'utf8');
            const queries = data.split(";").filter(q => q.trim());
            queries.forEach(query => {
                query += ";"
                con.query(query, function (err) {
                    if (err) throw err;
                })
            });
            console.log("Created tables");
        }
    });

}
