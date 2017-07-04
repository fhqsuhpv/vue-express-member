var models = require('../db/db');
var $sql = require('../db/sqlMap');
var promise = require('bluebird');
var mysql = require('mysql');

promise.promisifyAll(require("mysql/lib/Connection").prototype);
promise.promisifyAll(require("mysql/lib/Pool").prototype);

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var getAll = () => {
    return conn.queryAsync($sql.gift.getAll).then(data => {
        if (data == undefined) return {};
        return data;
    });
};

var getGift = giftId => {
    return conn.queryAsync($sql.gift.getById, [giftId]).then(data => {
        if (data == undefined) return '';
        return data;
    });
}

var getGiftDetail = giftId => {
    return conn.queryAsync($sql.gift.getDetail, [giftId]).then(data => {
        if (data == undefined) return '';
        return data;
    });
};

module.exports = {
    getAll,
    getGift,
    getGiftDetail
};