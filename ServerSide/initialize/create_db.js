const mysql = require('mysql2');
const execute_query = require("../sql_handler").execute_query;

// Get from env or hard coded if not initialized.
// Please initiailze SQL_HOST, SQL_USER, SQL_PASSWORD.

const con_options = {
    host: process.env.SQL_HOST || "localhost",
    user: process.env.SQL_USER || "root",
    password: process.env.SQL_PASSWORD || "7324545",
    multipleStatements: true,
}

const schema_name = process.env.DB_NAME || "cms_schema";

// Cnnect to SQL
let con = mysql.createConnection(con_options);
console.log("Connected to SQL!");

// Create 'cms_schema' schema if not exists.
execute_query(con, `create schema if not exists ${schema_name}`)

console.log("Done.\nYou can close the process.");
