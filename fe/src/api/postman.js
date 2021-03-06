import axios from 'axios';


// 编译环境使用真实数据
let config = {};
if (process.env.NODE_ENV === 'development') {
    config = {
        baseURL: 'http://127.0.0.1:3000/api/v1',
        timeout: 5000
    };
} else {
    config = {
        baseURL: 'http://api.bjfinelycup.cn/api/v1',
        timeout: 5000
    };
};

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

//登录获取token
const getToken = (username, password) => apiObj.post('/users/auth', {
    'username': username,
    'password': password
});
//获取用户信息
const getUser = () => apiObj.get('/users');
//对比积分是否够
const getSufficient = giftid => apiObj.post('/users/sufficient', { 'giftid': giftid });
//更新收货地址
const setRecipient = (recipient, phone, address) => apiObj.put('/users/recipient', {
    'recipient': recipient,
    'phone': phone,
    'address': address
});


//获取用户积分情况
const getIntegral = () => apiObj.get('/integral/list');

//获取礼品
const getGift = id => apiObj.get('/gift/' + id);
//获取礼品清单
const getGiftList = () => apiObj.get('/gift/list');
//获取礼品详情
const getGiftDetail = id => apiObj.get('/gift/detail/' + id);

//创建一个订单
const createOrder = giftid => apiObj.post('/order', { 'giftid': giftid });
//获取订单清单
const getOrder = () => apiObj.get('/order');



export {
    test,
    getToken,
    getUser,
    getSufficient,
    getIntegral,
    getGift,
    getGiftList,
    getGiftDetail,
    createOrder,
    getOrder,
    setRecipient
}