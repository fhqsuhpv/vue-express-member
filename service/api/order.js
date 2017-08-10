var coc = require('../utils/coc');
var order = require('../controller/order');
var $codes = require('../utils/customcode');
var auth = require('../utils/auth');
var jsonWrite = require('../utils/jsonwrite');

var express = require('express'),
    cors = require('cors');

var router = express.Router();

// 该文件中的所有接口允许跨域访问
router.all('*', cors(coc));

router.post('', (req, res) => {
    var userdata = auth.getIdentity(req);
    if (userdata == null) return jsonWrite(res, { code: $codes.VERIFYFAILS });
    order.createOrder(req, userdata).then(data => {
        jsonWrite(res, {
            code: data ? $codes.VERIFYSUCCE : $codes.LACKOFBALANCE,
            data: data
        })
    });
});

router.get('', (req, res) => {
    var userdata = auth.getIdentity(req);
    if (userdata == null) return jsonWrite(res, { code: $codes.VERIFYFAILS });
    order.getOrderByUserId(userdata.id).then(data => {
        jsonWrite(res, {
            code: $codes.VERIFYSUCCE,
            data: data
        })
    });
});

module.exports = router;