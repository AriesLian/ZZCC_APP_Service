/**
 * MySQL数据库操作工具
 * @author Aries
 */


var mysql = require('mysql');
var { MYSQL } = require("../CONFIG.JS");

var pool = mysql.createPool({
    connectionLimit: MYSQL.CONNECTION_LIMIT,
    host: MYSQL.HOST,
    port: MYSQL.PORT,
    database: MYSQL.DATABASE,
    user: MYSQL.USER,
    password: MYSQL.PASSWORD
});


var sqlGo = function (sql) {
    console.log(sql);
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, function (err, vals) {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(vals);
                    }
                });
            }
        });
    });
};


module.exports = { sqlGo }