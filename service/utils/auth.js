var $sql = require('../db/sqlMap');
var conn = require('../db/mysqlconn');
var jwt = require('jsonwebtoken');
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
    console.log('verifyIdentity:',
        formData.username, formData.password);
    if (!isManager) {
        return conn().queryAsync(sql, [formData.username, formData.password])
            .then(data => {
                if (data[0] == undefined)
                    return false;
                return data[0];
            });
    }
    return conn().queryAsync($sql.manager.getByUserPass, [formData.username, formData.password]).then(data => {
        console.log(data);
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
        console.log('verify token failure');
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
    if (payload == null) return null;
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

module.exports = {
    getIdentity,
    generateToken
}