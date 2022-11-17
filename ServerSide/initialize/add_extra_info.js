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
const userAction = async () => {
    const response = await fetch(countries_info_api_add);
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson);
}

con.connect(function(err) {
    if (err) throw err;
    con.query("select * from Countries", (err, result) => {
        if (err) throw err;
        let lat, long, iso;
        result.forEach(arg =>{
            res = userAction();
            console.log(res);
            lat = res[0]["latitude"];
            long = res[0]["longitude"];
            iso = res[0]["country_code"];
            execute_query(con, `UPDATE Countries
            SET Latitude = ${lat}, Longitude = ${long}
            WHERE Iso = ${iso};`);
        });
    });
});    

console.log("Done.");
