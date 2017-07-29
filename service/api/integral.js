var coc = require('../utils/coc');
var integral = require('../controller/integral');
var $codes = require('../utils/customcode');
var auth = require('../controller/user');
var jsonWrite = require('../utils/jsonwrite');

var express = require('express'),
    cors = require('cors');

var router = express.Router();

// 该文件中的所有接口允许跨域访问
router.all('*', cors(coc));


router.get('/list', (req, res) => {
    var userdata = auth.getIdentity(req);
    if (userdata == null) return jsonWrite(res, { code: $codes.VERIFYFAILS });
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