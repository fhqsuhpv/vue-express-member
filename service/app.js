// node 后端服务器入口
const userApi = require('./api/user');
const integralApi = require('./api/integral');
const giftApi = require('./api/gift');
const orderApi = require('./api/order');

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 捕获404并定向到错误处理
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// 生产环境下的错误处理
// 不会向用户显示堆栈信息
app.use(function(err, req, res, next) {
    // 设置响应状态
    res.status(err.status || 500);
    // 渲染错误处理页
    res.render('error', {
        message: err.message,
        error: {},
        layout: false
    });
});
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ', err);
});

const apirouterv1 = '/api/v1';

//注册user api 路由
app.use(apirouterv1 + '/users', userApi);
//注册intgral api 路由
app.use(apirouterv1 + '/integral', integralApi);
//注册gift api 路由
app.use(apirouterv1 + '/gift', giftApi);
//注册order api路由
app.use(apirouterv1 + '/order', orderApi);
// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');