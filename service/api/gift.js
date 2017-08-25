var coc = require('../utils/coc');
var gift = require('../controller/gift');
var $codes = require('../utils/customcode');
var auth = require('../controller/user');
var jsonWrite = require('../utils/jsonwrite');
var alioss = require('../utils/alioss');


var express = require('express'),
    cors = require('cors');

var router = express.Router();

// 该文件中的所有接口允许跨域访问
router.all('*', cors(coc));


router.get('/list', (req, res) => {
    gift.getAll().then(data => {
        return jsonWrite(res, {
            code: $codes.VERIFYSUCCE,
            data: data
        })
    }).catch(err => {
        return jsonWrite(res, {
            code: $codes.CREATEFAILS,
            data: err
        });
    });
});

router.get('/:id', (req, res) => {
    var giftDetailId = req.param('id');

    gift.getGift(giftDetailId).then(data => {
        return jsonWrite(res, {
            code: $codes.VERIFYSUCCE,
            data: data
        });
    }).catch(err => {
        return jsonWrite(res, {
            code: $codes.VERIFYFAILS,
        });
    });
});

router.post('', (req, res) => {
    gift.createGift(req).then(data => {
        jsonWrite(res, {
            code: $codes.CREATESUCCE
        });
    }).catch(err => {
        jsonWrite(res, {
            code: $codes.CREATEFAILS
        });
    });
})

router.put('', (req, res) => {
    gift.setGift(req).then(data => {
        jsonWrite(res, {
            code: data == null ? $codes.UPDAREFAILS : $codes.UPDARESUCCE
        })
    });
});

router.get('/detail/:id', (req, res) => {
    var giftDetailId = req.param('id');

    gift.getGiftDetail(giftDetailId).then(data => {
        return jsonWrite(res, {
            code: $codes.VERIFYSUCCE,
            data: data
        });
    }).catch(err => {
        return jsonWrite(res, {
            code: $codes.VERIFYFAILS,
        });
    });
});

router.put('/detail', (req, res) => {
    gift.setGiftDetail(req).then(data => {
        if (data != null) {
            jsonWrite(res, {
                code: $codes.CREATESUCCE,
                data: data
            });
        } else {
            jsonWrite(res, {
                code: $codes.CREATEFAILS
            });
        }
    });
});

router.post('/detail', (req, res) => {
    gift.addGiftDetail(req).then(data => {
        if (data != null) {
            jsonWrite(res, {
                code: $codes.CREATESUCCE,
                data: data
            });
        } else {
            jsonWrite(res, {
                code: $codes.CREATEFAILS
            });
        }
    });
});

router.post('/upload', (req, res) => {
    alioss.uploadfile(req).then(data => {
        if (data != null) {
            jsonWrite(res, {
                code: $codes.CREATESUCCE,
                data: data
            });
        } else {
            jsonWrite(res, {
                code: $codes.CREATEFAILS
            });
        }
    });
});

module.exports = router;