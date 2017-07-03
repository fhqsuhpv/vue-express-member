  var models = require('../db/db');
  var $sql = require('../db/sqlMap');
  var jwt = require('jsonwebtoken');
  var promise = require('bluebird');
  var mysql = require('mysql');

  promise.promisifyAll(require("mysql/lib/Connection").prototype);
  promise.promisifyAll(require("mysql/lib/Pool").prototype);

  // 连接数据库
  var conn = mysql.createConnection(models.mysql);
  conn.connect();

  var SCRKEY = 'memberkey';
  //从请求中取得用户名和密码
  var _getCredentials = req => {
      return {
          username: req.body.username || req.query.username,
          password: req.body.password || req.query.password
      }
  };
  //通过数据库验证身份
  var _verifyIdentity = formData => {

      var sql = $sql.user.getByUserPass;
      console.log(formData.username, formData.password);
      //return true;
      return conn.queryAsync(sql, [formData.username, formData.password])
          .then((res) => {
              console.log('verifyIdentity.res:', res);
              if (res[0] == undefined)
                  return false;
              return res[0];
          });
  };
  //创建 token字符串
  var _create = data => {
      var payload = {};
      payload['data'] = data;
      return jwt.sign(payload, SCRKEY, {
          expiresIn: '2h'
      });
  }


  //从请求参数中取得token字符串
  var _getReqToken = req => {
      var token = '';
      //获取token
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          token = req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query[opts.query_name]) {
          token = req.query[opts.query_name];
      }

      return token;
  }

  var _verifyToken = req => {
      var token = _getReqToken(req);
      if (!token) return false;

      var payload = null;

      try {
          //验证token是否有效
          payload = jwt.verify(token, SCRKEY);
      } catch (err) {
          console.log(err);
      }

      return payload;

  }

  //验证身份
  var getIdentity = req => {
      var payload = _verifyToken(req);
      return payload && payload['data'];
  }

  //生成一个token
  var generateToken = req => {
      return _verifyIdentity(_getCredentials(req)).then((data) => {
          if (!data) return '';
          return _create(data);
      });
  }

  module.exports = {
      getIdentity,
      generateToken
  }