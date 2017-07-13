var coc = require('../controller/coc');
var integral = require('../controller/integral');
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
    integral.getListById(userdata.id).then(data => {
        return jsonWrite(res, {
            code: $codes.VERIFYSUCCE,
            data: JSON.stringify(data)
        })
    });

});

// router.post('', (req, res) => {
//     var userdata = auth.getIdentity(req);
//     integral.createIntegral(userdata.id, req).then(data => {
//         return jsonWrite(res, {
//             code: data ? $codes.CREATESUCCE : $codes.CREATEFAILS,
//         });
//     });
// });

module.exports = router;