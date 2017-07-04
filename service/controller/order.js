var models = require('../db/db');
var $sql = require('../db/sqlMap');
var promise = require('bluebird');
var mysql = require('mysql');

promise.promisifyAll(require("mysql/lib/Connection").prototype);
promise.promisifyAll(require("mysql/lib/Pool").prototype);

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var _getData = (res, userdata) => {
    req.body.user_id;
    req.body.gift_id;
    req.body.recipient;
    req.body.recipient_phone;
    req.body.address;
    return []
}

var createOrder = (res, userdata) => {

    console.log(userdata.id);
    // return conn.queryAsync($sql.order.createOrder, [userId]).then(data => {
    //     if (data == undefined) return {};
    //     return data;
    // });
};

module.exports = {
    createOrder
};