import axios from 'axios';


// 编译环境使用真实数据
let config = {};
if (process.env.NODE_ENV === 'development') {
    config = {
        baseURL: 'http://127.0.0.1:3000/api/v1',
        timeout: 5000
    };
} else {};

const apiObj = axios.create(config);

//http request(请求) 拦截器
apiObj.interceptors.request.use(
    config => {
        var token = window.localStorage.getItem('token');
        if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

const test = () => apiObj.get('/users/user');

//登录获取token
const getToken = (username, password) => apiObj.post('/users/auth', {
    'username': username,
    'password': password
});
//获取用户信息
const getUser = () => apiObj.get('/users/user');

const getIntegral = () => apiObj.get('/integral/list');

const getGift = () => apiObj.get('/gift/list');


export {
    test,
    getToken,
    getUser,
    getIntegral,
    getGift
}