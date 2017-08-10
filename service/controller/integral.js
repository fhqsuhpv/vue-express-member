var $sql = require('../db/sqlMap');
var conn = require('../db/mysqlconn');
/**
 * 通过用户id 获取积分记录
 *
 * @param {用户id int} userId
 * @returns
 */
var getListById = userId => {
    return conn.queryAsync($sql.integral.getByUserId, [userId]).then(data => {
        if (data == undefined) return {};
        return data;
    });
};


module.exports = { getListById };