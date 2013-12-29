/**
 * Created by quyangcode_air on 13-12-15.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ASDsdfsdfFDFSxvc**$$asd',
    database: 'test',
    port: 3306,
    charset: 'utf-8'
});

module.exports = pool;