var models = require('../db/db');
var $sql = require('../db/sqlMap');
var jwt = require('jsonwebtoken');
var promise = require('bluebird');
var mysql = require('mysql');

promise.promisifyAll(require("mysql/lib/Connection").prototype);
promise.promisifyAll(require("mysql/lib/Pool").prototype);

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

var SCRKEY = 'memberkey';
/**
 * 从请求中取得用户名和密码
 *
 * @param {接求信息} req
 * @returns
 */
var _getCredentials = req => {
    return {
        username: req.body.username || req.query.username,
        password: req.body.password || req.query.password
    }
};
/**
 * 通过数据库验证身份
 *
 * @param {被_getCredentials格式化好的数据信息} formData
 * @returns
 */
var _verifyIdentity = (formData, isManager) => {

    var sql = $sql.user.getByUserPass;
    console.log(formData.username, formData.password);
    console.log(isManager);
    if (!isManager) {
        return conn.queryAsync(sql, [formData.username, formData.password])
            .then(data => {
                if (data[0] == undefined)
                    return false;
                return data[0];
            });
    }
    return conn.queryAsync($sql.manager.getByUserPass, [formData.username, formData.password]).then(data => {
        if (data[0] == undefined)
            return false;
        return data[0];
    });
};


/**
 * 创建 token字符串
 *
 * @param {用户信息} data
 * @returns
 */
var _create = data => {
    var payload = {};
    payload['data'] = data;
    return jwt.sign(payload, SCRKEY, {
        expiresIn: '2h'
    });
};



/**
 * 从请求参数中取得token字符串
 *
 * @param {接求信息} req
 * @returns
 */
var _getReqToken = req => {
    var token = '';
    //获取token      authorization
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query[opts.query_name]) {
        token = req.query[opts.query_name];
    }

    return token;
};

/**
 * 验证Token
 *
 * @param {接求信息} req
 * @returns
 */
var _verifyToken = req => {
    var token = _getReqToken(req);
    if (!token) return false;

    var payload = null;

    try {
        //验证token是否有效
        payload = jwt.verify(token, SCRKEY);
    } catch (err) {
        console.log(err);
    }

    return payload;

};


/**
 * 验证身份
 *
 * @param {接求信息} req
 * @returns
 */
var getIdentity = req => {
    var payload = _verifyToken(req);
    return payload && payload['data'];
};


/**
 * 生成一个token 前端用户
 *
 * @param {接求信息} req
 * @returns
 */
var generateToken = (req, isManager) => {
    return _verifyIdentity(_getCredentials(req), isManager).then((data) => {
        if (!data) return '';
        return _create(data);
    });
};


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
    return conn.queryAsync($sql.user.setRecipient, _getRecipient(req, id)).then(data => {
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
    var userinfo = getIdentity(req);
    if (userinfo == null) return '';
    if (!isManager)
        return conn.queryAsync($sql.user.getById, [userinfo.id]).then(data => {
            if (data == undefined) return '';
            return data[0];
        });
    return conn.queryAsync($sql.manager.getByID, [userinfo.id]).then(data => {
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
    var id = getIdentity(req).id;
    var giftid = req.body.giftid;
    console.log(giftid);
    return conn.queryAsync($sql.user.getById, [id]).then(data => {
        if (data == undefined) throw ('get user err');
        return data[0].total_cost;
    }).then(usercost => {
        return conn.queryAsync($sql.gift.getById, [giftid]).then((data) => {
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
            return conn.queryAsync($sql.user.setCost, [data.userCost - data.giftCost, id]).then((err, result) => {
                // if (err) {
                //     conn.rollback((err) => { throw err });
                // }
                return conn.queryAsync($sql.integral.createIntegral, [id, -data.giftCost, data.giftName]).then((err, data) => {
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
    return conn.queryAsync($sql.user.getlimit, [begin, count]).then(data => {
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
    return conn.queryAsync($sql.user.setDelete, [isdel, id]).then(data => {
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
var _getUserinfo = req => {
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
    return conn.queryAsync($sql.user.setUserInfoById, _getUserinfo(req)).then(data => {
        return true;
    }).catch(err => {
        return false;
    });
}

module.exports = {
    getIdentity,
    generateToken,
    deductionCost,
    contrastCost,
    getUserById,
    setRecipient,
    getUsers,
    setIsDel,
    setUserInfo
}