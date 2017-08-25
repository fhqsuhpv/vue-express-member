var $sql = require('../db/sqlMap');
var conn = require('../db/mysqlconn');
var alioss = require('../utils/alioss');


var getAll = () => {
    return conn().queryAsync($sql.gift.getAll).then(data => {
        if (data == undefined) return {};
        data.forEach(function(element) {
            try {
                element.main_image_url = alioss.clientOss.signatureUrl(element.main_image);
            } catch (err) {
                console.log(err);
            };
        }, this);
        return data;
    }).catch(err => {
        console.log(err);
    });
};

/**
 * 通过id 获取礼品信息
 *
 * @param {礼品id} giftId
 * @returns
 */
var getGift = giftId => {
    var giftData;
    return conn().queryAsync($sql.gift.getById, [giftId]).then(data => {
        giftData = data[0];
        return alioss.clientOss.signatureUrl(data[0].main_image);
    }).then((url, data) => {
        giftData.main_image_url = url;
        return giftData;
    }).catch(err => {
        console.log(err);
        return giftData;
    });
}

/**
 * 通过id 获取礼品详情图片组
 *
 * @param {礼品id} giftId
 * @returns
 */
var getGiftDetail = giftId => {
    return conn().queryAsync($sql.gift.getDetail, [giftId]).then(data => {
        if (data == undefined) return '';
        data.forEach(function(element) {
            try {
                console.log(element);
                element.image_url = alioss.clientOss.signatureUrl(element.image_path);
            } catch (err) {
                console.log(err);
            };
        }, this);
        return data;
    }).catch(err => {
        console.log(err);
    });
};

var _giftinfo = req => {
    return [
        req.body.name,
        req.body.main_image,
        req.body.cost,
        req.body.total_count,
        req.body.current_count,
        req.body.is_visible,
        req.body.giftId
    ]
};


/**
 * 保存礼品基本信息
 * 
 * @param {清求信息} req 
 * @returns 
 */
var setGift = req => {
    console.log("setGift:", req.body.main_image);
    return alioss.savefile(req.body.main_image).then(data => {
        return conn().queryAsync($sql.gift.setGift, _giftinfo(req));
    }).then(data => {
        return data;
    }).catch(err => {
        console.log(err);
        return null;
    });
};

var _creategiftinfo = req => {
    return [
        req.body.name,
        req.body.main_image,
        req.body.cost,
        req.body.total_count,
        req.body.current_count
    ];
}

/**
 * 创建一个礼品
 * 
 * @param {清求信息} req 
 * @returns 
 */
var createGift = req => {
    return alioss.savefile(req.body.main_image).then(data => {
        return conn().queryAsync($sql.gift.createGift, _creategiftinfo(req));
    }).then(data => {
        return data;
    }).catch(err => {
        console.log(err);
        return null;
    });
};

var _addGiftDetail = req => {
    return [
        req.body.gift_id,
        req.body.image_path,
        req.body.priority,
    ];
};

/**
 * 添加一个新的详情图
 * 
 * @param {清求信息} req 
 * @returns 
 */
var addGiftDetail = req => {
    return alioss.savefile(req.body.image_path).then(data => {
        return conn().queryAsync($sql.gift.createDetail, _addGiftDetail(req));
    }).then(data => {
        return data;
    }).catch(err => {
        console.log(err);
        return null;
    });
};

var _setGiftDetail = req => {
    return [
        req.body.image_path,
        req.body.priority,
        req.body.is_visible,
        req.body.id
    ];
};

/**
 * 更新一个详情图
 * 
 * @param {清求信息} req 
 * @returns 
 */
var setGiftDetail = req => {
    return alioss.savefile(req.body.image_path).then(data => {
        return conn().queryAsync($sql.gift.setDetail, _setGiftDetail(req));
    }).then(data => {
        return data;
    }).catch(err => {
        console.log(err);
        return null;
    });
};

module.exports = {
    getAll,
    getGift,
    getGiftDetail,
    setGift,
    setGiftDetail,
    addGiftDetail,
    createGift
};