var $sql = require('../db/sqlMap');
var conn = require('../db/mysqlconn');

var getAll = () => {
    return conn.queryAsync($sql.gift.getAll).then(data => {
        if (data == undefined) return {};
        return data;
    });
};

/**
 * 通过id 获取礼品信息
 *
 * @param {礼品id} giftId
 * @returns
 */
var getGift = giftId => {
    return conn.queryAsync($sql.gift.getById, [giftId]).then(data => {
        if (data == undefined) return '';
        return data;
    });
}

/**
 * 通过id 获取礼品详情图片组
 *
 * @param {礼品id} giftId
 * @returns
 */
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