var $sql = require('../db/sqlMap');
var conn = require('../db/mysqlconn');
var auth = require('../utils/auth');


/**
 * 从req中构建参数
 *
 * @param {接求信息} req
 * @param {any} id
 * @returns
 */
var _getRecipient = (req, id) => {
    return [
        req.body.recipient,
        req.body.phone,
        req.body.address,
        id
    ];
};

/**
 * 更新收件人地址
 *
 * @param {any} id
 * @param {接求信息} req
 * @returns
 */
var setRecipient = (id, req) => {
    //console.log(req);
    return conn().queryAsync($sql.user.setRecipient, _getRecipient(req, id)).then(data => {
        console.log(data);
        return true;
    });
};

/**
 * 获取用户信息通过用户id
 *
 * @param {接求信息} req
 * @returns
 */
var getUserById = (req, isManager) => {
    var userinfo = auth.getIdentity(req);
    if (userinfo == null) return '';
    if (!isManager)
        return conn().queryAsync($sql.user.getById, [userinfo.id]).then(data => {
            if (data == undefined) return '';
            return data[0];
        });
    return conn().queryAsync($sql.manager.getByID, [userinfo.id]).then(data => {
        if (data == undefined) return '';
        return data[0];
    });
};

/**
 * 对比礼品积分和当前用户积分是否可以换取礼品
 *
 * @param {接求信息} req
 * @returns
 */
var contrastCost = req => {
    var userdata = auth.getIdentity(req);
    if (userdata == null) return jsonWrite(res, { code: $codes.VERIFYFAILS });
    var giftid = req.body.giftid;
    return conn().queryAsync($sql.user.getById, [userdata.id]).then(data => {
        if (data == undefined) throw ('get user err');
        return data[0].total_cost;
    }).then(usercost => {
        return conn().queryAsync($sql.gift.getById, [giftid]).then((data) => {
            if (usercost >= data[0].cost) {
                return {
                    state: true,
                    userCost: usercost,
                    giftName: data[0].name,
                    giftCost: data[0].cost
                };
            } else {
                return { state: false }
            }
        });
    });
};

/**
 * 当前用户扣减礼品所需积分数
 *
 * @param {用户ID int} id
 * @param {接求信息} req
 * @returns
 */
var deductionCost = (id, req) => {
    return contrastCost(req).then(data => {
        if (data.state) {
            return conn().queryAsync($sql.user.setCost, [data.userCost - data.giftCost, id]).then((err, result) => {
                // if (err) {
                //     conn.rollback((err) => { throw err });
                // }
                return conn().queryAsync($sql.integral.createIntegral, [id, -data.giftCost, data.giftName]).then((err, data) => {
                    //console.log(data); //进行解析
                    // if (err) {
                    //     conn.rollback((err) => { throw err });
                    // }
                    return true;
                }).catch(err => {
                    //记录日志
                });
            }).catch(err => {
                //记录日志
            });
        } else return false;
    });
};


/**
 * 获取用户信息清单，从begin开始取count条
 * 
 * @param {int} begin 
 * @param {int} count 
 * @returns array
 */
var getUsers = (begin, count) => {
    return conn().queryAsync($sql.user.getlimit, [begin, count]).then(data => {
        return data;
    }).catch(err => {
        return [];
    });
};

/**
 * 更新是否禁用装态
 * 
 * @param {int 0/1} isdel 
 * @param {int} id 
 * @returns bool
 */
var setIsDel = (req) => {
    var isdel = req.body.isdel;
    var id = req.body.id;
    return conn().queryAsync($sql.user.setDelete, [isdel, id]).then(data => {
        return true;
    }).catch(err => {
        return false;
    });
};

/**
 * 私有组装用户数据更新
 * 
 * @param {请求数据} req 
 * @returns 
 */
var _getUserArray = req => {
    return [
        req.body.phone,
        req.body.name,
        req.body.recipient,
        req.body.recipient_phone,
        req.body.address,
        req.body.total_cost,
        req.body.id
    ];
};
/**
 * 更新用户信息
 * 
 * @param {请求数据} req 
 * @param {int} id 
 * @returns bool
 */
var setUserInfo = (req) => {
    return conn().queryAsync($sql.user.setUserInfoById, _getUserArray(req)).then(data => {
        return true;
    }).catch(err => {
        return false;
    });
}

var _createUserArray = req => {
    return [
        req.body.phone,
        req.body.name,
        req.body.password,
        req.body.recipient,
        req.body.recipient_phone,
        req.body.address,
        req.body.total_cost
    ];
};
/**
 * 创建用户
 * 
 * @param {请数据} req 
 * @returns 
 */
var createUser = (req) => {
    return conn().queryAsync($sql.user.createUser, _createUserArray(req)).then(data => {
        return true;
    }).catch(err => {
        return false;
    });
}


module.exports = {
    deductionCost,
    contrastCost,
    getUserById,
    setRecipient,
    getUsers,
    setIsDel,
    setUserInfo,
    createUser
}