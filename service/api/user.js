var coc = require('../controller/coc');
var $codes = require('../controller/customcode');
var user = require('../controller/user');
var jsonWrite = require('./jsonwrite');

var express = require('express'),
    cors = require('cors');

var router = express.Router();

// 该文件中的所有接口允许跨域访问
router.all('*', cors(coc));

//【接口】获取token
router.post('/auth', (req, res) => {
    user.generateToken(req, false).then(newToken => jsonWrite(res, {
        code: newToken == '' ? $codes.VERIFYFAILS : $codes.VERIFYSUCCE,
        token: newToken,
    }));
});

//【接口】获取管理员token
router.post('/admin/auth', (req, res) => {
    user.generateToken(req, true).then(newToken => jsonWrite(res, {
        code: newToken == '' ? $codes.VERIFYFAILS : $codes.VERIFYSUCCE,
        token: newToken,
    }));
});

//【接口】获取用户信息
router.get('', (req, res) => {
    user.getUserById(req, false).then(data => {
        jsonWrite(res, {
            code: data == '' ? $codes.VERIFYFAILS : $codes.VERIFYSUCCE,
            data: data
        });
    });
});
//【接口】 获取管理员用户信息
router.get('/manager', (req, res) => {
    user.getUserById(req, true).then(data => {
        jsonWrite(res, {
            code: data == '' ? $codes.VERIFYFAILS : $codes.VERIFYSUCCE,
            data: data
        });
    });
});


router.post('/sufficient', (req, res) => {
    user.contrastCost(req).then(data => {
        jsonWrite(res, {
            code: data.state ? $codes.VERIFYSUCCE : $codes.LACKOFBALANCE
        });
    });
});

//根据所换购的礼品进行扣费
router.put('/cost', (req, res) => {
    var id = user.getIdentity(req).id;
    user.deductionCost(id, req).then(state => {
        jsonWrite(res, {
            code: state ? $codes.VERIFYSUCCE : $codes.LACKOFBALANCE
        });
    });
});

router.put('/recipient', (req, res) => {
    var id = user.getIdentity(req).id;
    user.setRecipient(id, req).then(state => {
        jsonWrite(res, {
            code: state ? $codes.VERIFYSUCCE : $codes.VERIFYSUCCE
        });
    });
})

module.exports = router;