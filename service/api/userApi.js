var coc = require('../controller/coc');
var $codes = require('../controller/customcode');
var auth = require('../controller/auth');
var jsonWrite = require('./jsonwrite');

var express = require('express'),
    jwt = require('jsonwebtoken'),
    promise = require('bluebird'),
    cors = require('cors');

var router = express.Router();

// 该文件中的所有接口允许跨域访问
router.all('*', cors(coc));




//【接口】获取token
router.post('/auth', (req, res) => {
    console.log($codes.VERIFYFAILS);
    auth.generateToken(req).then(newToken => jsonWrite(res, {
        code: newToken == '' ? $codes.VERIFYFAILS : $codes.VERIFYSUCCE,
        token: newToken
    }));
});

//【接口】获取用户信息
router.get('/user', (req, res) => {
    var data = auth.getIdentity(req);
    jsonWrite(res, {
        code: $codes.VERIFYSUCCE,
        data: data,
        token: ''
    });

});

module.exports = router;