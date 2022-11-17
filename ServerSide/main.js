const mysql = require('mysql2');
const execute_query = require("./sql_handler").execute_query;
const express = require("express");
const app = express();
app.use(express.json())
const fs = require('fs');
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const PORT = process.env.PORT || 1234; // Please initiailze

// Get from env or hard coded if not initialized.
// Please initiailze DB_HOST, DB_USER, DB_PASSWORD, DB_NAME.

const con_options = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "7324545",
    database: process.env.DB_NAME || "cms_schema",
    multipleStatements: true,
}

// Connect to sql
let con = mysql.createConnection(con_options);
console.log("Connected to SQL!");

// Add header and footer method
function add_header_footer(path_to_html){

    const header_path = "../ClientSide/header.html";
    const footer_path = "../ClientSide/footer.html";

    const content = fs.readFileSync(path_to_html).toString();
    const header = fs.readFileSync(header_path).toString();
    const footer = fs.readFileSync(footer_path).toString();

    return header + content + footer;
} 

// Listen to reqs
app.get("/", (req, res) => {
    res.send(add_header_footer("../ClientSide/index.html"));
})
app.get("/countries", (req, res) => {
    res.send(add_header_footer("../ClientSide/countries.html"));
})
app.get("/worldmap", (req, res) => {
    res.send(add_header_footer("../ClientSide/world_map.html"));
})

app.post('/countries', urlencodedParser, (req, res) => {
    con.connect(function(err) {
        if (err) throw err;

        // if req.body["filter"] is true, order by name, else, order by code

        // set params
        params = [req.body["offset"]];
        if (req.body["search"]) params.unshift(req.body["search"]);

        // Parameterized query to prevent sql injection
        con.query(`select * from Countries
        ${req.body["search"]? "where name like ?" : ""}
        order by ${req.body["filter"]? "name" : "numcode"} asc
        limit 10 offset ?`,
        params,
        (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });    
});

app.put('/countries', urlencodedParser, (req, res) => {

    // Update sql
    for (const col in req.body){
        if (col != "Iso" && req.body[col] != '' && req.body[col] != null){
            execute_query(con, `
            UPDATE Countries
            SET ${col} = ?
            WHERE Iso = ?`, [req.body[col], req.body["Iso"]]);
        }        
    }

    // Send all the info about the country
    con.connect(function(err) {
        if (err) throw err;
        con.query(`select * from Countries where Iso = ?`, [req.body["Iso"]],
        (err, result) => {
            if (err) throw err;
            result = result[0];
            res.send(result);      
        });
    });    
});

app.delete("/countries", (req, res) => {
    execute_query(con, "delete from Countries where Iso = ?", [req.body["Iso"]]);
    res.send();
})

app.post('/worldmap', urlencodedParser, (req, res) => {
    con.connect(function(err) {
        if (err) throw err;
        con.query(`select * from Countries`,
        (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });    
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));