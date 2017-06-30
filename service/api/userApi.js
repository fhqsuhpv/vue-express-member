var models = require('../db/db');
var coc = require('../cors/coc');
var $sql = require('../db/sqlMap');
var $codes = require('./customcode');

var express = require('express'),
    jwt = require('jsonwebtoken'),
    promise = require('bluebird'),
    cors = require('cors');
mysql = require('mysql');

var router = express.Router();



promise.promisifyAll(require("mysql/lib/Connection").prototype);
promise.promisifyAll(require("mysql/lib/Pool").prototype);

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

//var queryAsync = promise.promisify(conn.query, conn);

// 该文件中的所有接口允许跨域访问
router.all('*', cors(coc));


var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: $codes.RESNULL_ERR,
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

var getCredentials = (req) => {
    return {
        username: req.body.username || req.query.username,
        password: req.body.password || req.query.password
    }
}

var verifyIdentity = (formData) => {

    var sql = $sql.user.getByUserPass;
    console.log(formData.username, formData.password);
    //return true;
    return conn.queryAsync(sql, [formData.username, formData.password])
        .then((res) => {
            console.log('verifyIdentity.res:', res);
            if (res[0] == undefined)
                return false;
            return res[0];
        });
}

var create = function(data) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: 'foobar'
    }, 'secret');
}

var generateToken = (req) => {
    return verifyIdentity(getCredentials(req)).then((data) => {
        if (!data) return '';
        return create(data);
    });
}


//获取token
router.post('/auth', (req, res) => {
    console.log($codes.VERIFYFAILS);
    generateToken(req).then(newToken => jsonWrite(res, {
        code: newToken == '' ? $codes.VERIFYFAILS : $codes.VERIFYSUCCE,
        token: newToken
    }));
});


// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.post;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.name, params.price], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
// 增加用户接口
router.get('/user', (req, res) => {
    var sql = $sql.user.getall;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    });
    //res.send(coc);
});

module.exports = router;