function execute_query (sql_connection, query, params) {
    // Don't return the result
    sql_connection.connect(function(err) {
        if (err) throw err;
        sql_connection.query(query, params, (err, result) => {
            if (err) throw err;
        });
    });
}
module.exports.execute_query = execute_query;