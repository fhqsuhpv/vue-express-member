var models = require('./db');
var $sql = require('./sqlMap');
var promise = require('bluebird');
var mysql = require('mysql');

promise.promisifyAll(require("mysql/lib/Connection").prototype);
promise.promisifyAll(require("mysql/lib/Pool").prototype);

// 连接数据库
var conn = mysql.createConnection(models.mysql);

function handleError(err) {
    if (err) {
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conn.connect(handleError);
            conn.on('error', handleError);
        } else {
            console.error(err.stack || err);
        }
    }
}

conn.connect(handleError);
conn.on('error', handleError);

module.exports = conn;