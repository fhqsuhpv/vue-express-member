// node 后端服务器入口
const userApi = require('./api/user');
const integralApi = require('./api/integral');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//注册user api路由
app.use('/api/v1/users', userApi);
//注册intgral api 路由
app.use('/api/v1/integral', integralApi);


// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');