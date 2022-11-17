/*
Create the 'Countries' table.
Get the countries data from initialize.sql file.
*/

// Some consts
const fs = require('fs');
const mysql = require('mysql2');
const execute_query = require("../sql_handler").execute_query;

// Get from env or hard coded if not initialized.
// Please initiailze DB_HOST, DB_USER, DB_PASSWORD.

const con_options = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "cms_schema",
    multipleStatements: true,
}

// Cnnect to SQL
let con = mysql.createConnection(con_options);
console.log("Connected to SQL!");

// Create and initialize table if not exists
con.connect(function(err) {
    if (err) throw err;
    con.query("show tables", (err, result) => {
        if (err) throw err;
        if (result[0] == null){
            // No Countries table
            // Create Countries table
            const queries = fs.readFileSync('./initialize_db.sql').toString();  // The queries to create the table
            execute_query(con, queries);
        }
    });
});

console.log("Done.\nYou can close the process.");
