import axios from 'axios';
import store from '../store';

// 编译环境使用真实数据
let config = {};
if (process.env.NODE_ENV === 'development') {
    config = {
        baseURL: 'http://127.0.0.1:3000/api/v1',
        timeout: 5000
    };
} else {
    config = {
        baseURL: 'http://127.0.0.1:3000/api/v1',
        timeout: 5000
    };
};

const apiObj = axios.create(config);

apiObj.interceptors.request.use(
    config => {
        if (store.getters.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `Bearer ${store.getters.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

//登录获取token
const getToken = (username, password) => {
    console.log(username)
    return apiObj.post('/users/admin/auth', {
        'username': username,
        'password': password
    });
};
//获取用户信息
const getUser = () => apiObj.get('/users/manager');

const getUsers = (begin, count) => apiObj.get('/users/list');

export {
    getToken,
    getUser,
    getUsers
}