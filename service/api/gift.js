var coc = require('../utils/coc');
var gift = require('../controller/gift');
var $codes = require('../utils/customcode');
var auth = require('../controller/user');
var jsonWrite = require('../utils/jsonwrite');


var express = require('express'),
    fs = require('fs'),
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
    }).catch(err => {
        return jsonWrite(res, {
            code: $codes.CREATEFAILS,
        });
    });
});

router.get('/:id', (req, res) => {
    var giftDetailId = req.param('id');

    gift.getGift(giftDetailId).then(data => {
        return jsonWrite(res, {
            code: $codes.VERIFYSUCCE,
            data: JSON.stringify(data[0])
        });
    }).catch(err => {
        return jsonWrite(res, {
            code: $codes.VERIFYFAILS,
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
    }).catch(err => {
        return jsonWrite(res, {
            code: $codes.VERIFYFAILS,
        });
    });
});

router.post('/upload', (req, res) => {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let sampleFile = req.files.giftimage;
    sampleFile.mv('./storage/images/filename.jpg', function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        res.send('File uploaded!');
    });
});

module.exports = router;