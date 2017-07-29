var $codes = require('../utils/customcode');

var jsonWrite = (res, ret) => {
    if (typeof ret === 'undefined') {
        res.json({
            code: $codes.RESNULL_ERR,
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = jsonWrite;