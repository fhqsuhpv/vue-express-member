var models = require('./db');
var $sql = require('./sqlMap');
var promise = require('bluebird');
var mysql = require('mysql');

promise.promisifyAll(require("mysql/lib/Connection").prototype);
promise.promisifyAll(require("mysql/lib/Pool").prototype);

var myconn;

var handleDisconnect = (err) => {
    myconn = mysql.createConnection(models.mysql);
    myconn.connect(function(err) {
        // The server is either down
        // or restarting
        if (err) {
            // We introduce a delay before attempting to reconnect,
            // to avoid a hot loop, and to allow our node script to
            // process asynchronous requests in the meantime.
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
        myconn.queryAsync($sql.gift.getAll).then(data => {
            console.log(data);
        });
    });
    myconn.on('error', function(err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

var conn = () => {
    return myconn;
}

handleDisconnect();

module.exports = conn;