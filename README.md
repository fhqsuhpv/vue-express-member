# meber-view

* fe is  A Vue.js project
* be is  A Vue.js project 
* service A nodej.js express 

## Build 前端

``` bash
cd fe
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
## Build 运维端

``` bash
cd be
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
## Build 后端

``` bash
cd server
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run
node app.js
```

# 布署生产环境的守护自启动
我是使用systemd够确保的，如果你也用它那么可以使用以下方法
./member.service  是systemd 的service文件
### 复制文件到Systemd的系统文件夹
```
cp ./member.service /etc/systemd/system/
```
### 确保你的node如文件所配，如果不是请修改该件文与你的环境一致
```
ExecStart=/usr/local/bin/node /opt/vue-express-member/service/app.js
```
### 常用的有以下命令

#### 让systemd知道我们的服务
```
systemctl enable member.service
```
#### 启动服务
```
systemctl start member.service
```
#### 服务的状态
```
systemctl status member.service
```
#### 查看日志
```
journalctl -u member.service
```

#### 查看时实日志
```
journalctl -f -u member.service
```



For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
