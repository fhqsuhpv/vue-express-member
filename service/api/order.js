var coc = require('../controller/coc');
var order = require('../controller/order');
var $codes = require('../controller/customcode');
var auth = require('../controller/user');
var jsonWrite = require('./jsonwrite');

var express = require('express'),
    cors = require('cors');

var router = express.Router();

// 该文件中的所有接口允许跨域访问
router.all('*', cors(coc));

router.post('', (req, res) => {
    var userdata = auth.getIdentity(req);
    order.createOrder(req, userdata).then(data => {
        jsonWrite(res, {
            code: $codes.VERIFYSUCCE,
            data: data
        })
    });
});

module.exports = router;