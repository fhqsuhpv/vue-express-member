var coc = require('../controller/coc');
var gift = require('../controller/gift');
var $codes = require('../controller/customcode');
var auth = require('../controller/user');
var jsonWrite = require('./jsonwrite');

var express = require('express'),
    cors = require('cors');

var router = express.Router();

// 该文件中的所有接口允许跨域访问
router.all('*', cors(coc));


router.get('/list', (req, res) => {
    gift.getAll().then(data => {
        return jsonWrite(res, {
            code: $codes.VERIFYSUCCE,
            data: JSON.stringify(data)
        })
    });
});

router.get('/:id', (req, res) => {
    var giftDetailId = req.param('id');
    gift.getGift(giftDetailId).then(data => {
        return jsonWrite(res, {
            code: $codes.VERIFYSUCCE,
            data: JSON.stringify(data[0])
        });
    });
});

router.get('/detail/:id', (req, res) => {
    var giftDetailId = req.param('id');
    gift.getGiftDetail(giftDetailId).then(data => {
        return jsonWrite(res, {
            code: $codes.VERIFYSUCCE,
            data: JSON.stringify(data)
        });
    });
});

module.exports = router;