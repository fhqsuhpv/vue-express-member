var $sql = require('../db/sqlMap');
var user = require('./user');
var conn = require('../db/mysqlconn');
/**
 * 组装创建订单的数据
 *
 * @param {接求信息} req
 * @param {格式化后的用户信息} userdata
 * @returns
 */
var _getData = (req, userdata) => {
    return [
        userdata.id,
        req.body.giftid,
        userdata.recipient,
        userdata.recipient_phone,
        userdata.address
    ]
}


/**
 * 创建订单
 *
 * @param {接求信息} req
 * @param {格式化后的用户信息} userdata
 * @returns
 */
var createOrder = (req, userdata) => {
    return user.deductionCost(userdata.id, req).then(data => {
        if (data) {
            return conn().queryAsync($sql.order.createOrder, _getData(req, userdata)).then(data => {
                console.log(data);
                if (data == undefined) return false;
                return true;
            });
        } else {
            return false;
        }
    });
};

/**
 * 通过用户id 获取订单信息
 *
 * @param {用户id} userid
 * @returns
 */
var getOrderByUserId = userid => {
    return conn().queryAsync($sql.order.getByUserId, [userid]).then(data => {
        if (!data) return '';
        return data;
    });
};

module.exports = {
    createOrder,
    getOrderByUserId
};