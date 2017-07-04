var models = require('../db/db');
var $sql = require('../db/sqlMap');
var promise = require('bluebird');
var mysql = require('mysql');

promise.promisifyAll(require("mysql/lib/Connection").prototype);
promise.promisifyAll(require("mysql/lib/Pool").prototype);

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var getall = userId => {
    return conn.queryAsync($sql.gift.getall).then(data => {
        if (data == undefined) return {};
        return data;
    });
};

module.exports = {
    getall
};