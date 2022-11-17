/*
Create the 'cms_schema' data base.
*/

// Some consts
const mysql = require('mysql2');
const execute_query = require("../sql_handler").execute_query;

// Get from env or hard coded if not initialized.
// Please initiailze DB_HOST, DB_USER, DB_PASSWORD.

const con_options = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
}

const schema_name = process.env.DB_NAME || "cms_schema";

// Cnnect to SQL
let con = mysql.createConnection(con_options);
console.log("Connected to SQL!");

// Create 'cms_schema' schema if not exists.
execute_query(con, `create schema if not exists ${schema_name}`)

console.log("Done.\nYou can close the process.");
