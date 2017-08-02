var whitelist = ['http://localhost:8080', 'http://127.0.0.1:8080', 'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop', 'http://bjfinelycup.cn', 'http://www.bjfinelycup.cn', 'http://localhost:9527']
var corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

module.exports = corsOptions;