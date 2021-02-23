var sql = require("mssql");

const connection = sql.connect({
    "server": process.env.SQL_SERVER,
    "port": parseInt(process.env.SQL_PORT),
    "user": process.env.SQL_USER,
    "password": process.env.SQL_PASSWORD,
    "database": process.env.SQL_DATABASE,
    multipleStatements: true,
    "options": {
        "encrypt": false,
        "enableArithAbort":false,
    }

}, function(err){
    if (err) throw err;

});
module.exports = connection;