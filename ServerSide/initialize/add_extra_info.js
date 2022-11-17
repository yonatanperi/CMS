const mysql = require('mysql2');
const execute_query = require("../sql_handler").execute_query;
const countries_info_api_key = "1690b563e94702e57cf1bd7ec33d5b0e";
const countries_info_api_add = "http://api.positionstack.com/v1/forward?access_key=1690b563e94702e57cf1bd7ec33d5b0e&query=israel& output = json";

// Get from env or hard coded if not initialized.
// Please initiailze SQL_HOST, SQL_USER, SQL_PASSWORD.

const con_options = {
    host: process.env.SQL_HOST || "localhost",
    user: process.env.SQL_USER || "root",
    password: process.env.SQL_PASSWORD || "7324545",
    database: process.env.DB_NAME || "cms_schema",
    multipleStatements: true,
}

// Cnnect to SQL
let con = mysql.createConnection(con_options);
console.log("Connected to SQL!");

// Add extra information to table
con.connect(function(err) {
    if (err) throw err;
    con.query(`select Name, Iso, Iso3, Latitude, Longitude from Countries`,
    (err, result) => {
        if (err) throw err;
        result.forEach(async (arg) => {
            let extra = await fetch(`http://api.positionstack.com/v1/forward?access_key=1690b563e94702e57cf1bd7ec33d5b0e&query=${arg["Name"]}&output=json`);
            extra = await extra.json(); //extract JSON from the http response
            extra = extra["data"][0];
            lat = extra["latitude"];
            long = extra["longitude"];
            iso3 = extra["country_code"];
            if (iso3){
                execute_query(con, `UPDATE Countries
                SET Latitude = ${lat}, Longitude = ${long}
                WHERE Iso3 = '${iso3}';`);
            }            
        })
    });
});

console.log("Done.\nYou can close the process.");
