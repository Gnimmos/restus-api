var dotenv = require('dotenv');

dotenv.config();

const {

    SQL_SERVER,
    SQL_PORT,
    SQL_DATABASE,    
	SQL_USER,
	SQL_PASSWORD,
	

} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

module.exports = {

	sql: {
        server: SQL_SERVER,
        port:SQL_PORT,
		database: SQL_DATABASE,
		user: SQL_USER,
		password: SQL_PASSWORD,
		options: {
			encrypt: sqlEncrypt,
			enableArithAbort: true
		}
	}

};