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
// apiObj.interceptors.request.use(
//     config => {
//         if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
//             config.headers.Authorization = `Bearer ${store.state.token}`;
//         }
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     }
// );

const test = () => apiObj.get('/users/user');

const getToken = (username, password) => apiObj.post('/users/auth', {
    'username': username,
    'password': password
});

export {
    test,
    getToken
}