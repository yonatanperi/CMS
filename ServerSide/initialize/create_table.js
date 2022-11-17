const fs = require('fs');
const mysql = require('mysql2');
const execute_query = require("../sql_handler").execute_query;

const con_options = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "7324545",
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

console.log("Done.");