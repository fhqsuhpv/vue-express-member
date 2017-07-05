var models = require('../db/db');
var $sql = require('../db/sqlMap');
var promise = require('bluebird');
var mysql = require('mysql');

promise.promisifyAll(require("mysql/lib/Connection").prototype);
promise.promisifyAll(require("mysql/lib/Pool").prototype);

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var _getData = (req, userdata) => {
    return [
        userdata.id,
        req.body.giftid,
        userdata.recipient,
        userdata.recipient_phone,
        userdata.address
    ]
}

var createOrder = (req, userdata) => {
    return conn.queryAsync($sql.order.createOrder, _getData(req, userdata)).then(data => {
        if (data == undefined) return {};
        return data;
    });
};

var getOrderByUserId = userid => {
    return conn.queryAsync($sql.order.getByUserId, [userid]).then(data => {
        if (!data) return '';
        return data;
    });
};

module.exports = {
    createOrder,
    getOrderByUserId
};