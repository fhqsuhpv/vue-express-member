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
const getToken = (username, password) => apiObj.post('/users/admin/auth', {
    'username': username,
    'password': password
});

//获取用户信息
const getUser = () => apiObj.get('/users/manager');

const getUsers = (begin, count) => apiObj.get('/users/list');

const setUserState = (isdel, id) => apiObj.put('/users/userState', { 'isdel': isdel, 'id': id });

const setUserInfo = (phone, name, recipient, recipient_phone, address, total_cost, id) => apiObj.put('/users', {
    'phone': phone,
    'name': name,
    'recipient': recipient,
    'recipient_phone': recipient_phone,
    'address': address,
    'total_cost': total_cost,
    'id': id
});

const createUser = (phone, name, password, recipient, recipient_phone, address, total_cost) => apiObj.post('/users', {
    'phone': phone,
    'name': name,
    'password': password,
    'recipient': recipient,
    'recipient_phone': recipient_phone,
    'address': address,
    'total_cost': total_cost
});

export {
    // users 
    getToken,
    getUser,
    getUsers,
    setUserState,
    setUserInfo,
    createUser
}