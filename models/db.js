var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ASDsdfsdfFDFSxvc**$$asd',
    database: 'test',
    port: 3306
});

module.exports = pool;