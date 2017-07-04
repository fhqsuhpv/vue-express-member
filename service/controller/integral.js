var models = require('../db/db');
var $sql = require('../db/sqlMap');
var promise = require('bluebird');
var mysql = require('mysql');

promise.promisifyAll(require("mysql/lib/Connection").prototype);
promise.promisifyAll(require("mysql/lib/Pool").prototype);

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var getListById = userId => {
    return conn.queryAsync($sql.integral.getByUserId, [userId]).then(data => {
        if (data == undefined) return {};
        return data;
    });
};

module.exports = getListById;