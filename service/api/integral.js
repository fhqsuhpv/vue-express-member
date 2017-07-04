var coc = require('../controller/coc');
var getListById = require('../controller/integral');
var $codes = require('../controller/customcode');
var auth = require('../controller/user');
var jsonWrite = require('./jsonwrite');

var express = require('express'),
    cors = require('cors');

var router = express.Router();

// 该文件中的所有接口允许跨域访问
router.all('*', cors(coc));


router.get('/list', (req, res) => {
    var userdata = auth.getIdentity(req);
    getListById(userdata.id).then(data => {
        return jsonWrite(res, {
            code: $codes.VERIFYSUCCE,
            data: JSON.stringify(data)
        })
    });

});

module.exports = router;