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