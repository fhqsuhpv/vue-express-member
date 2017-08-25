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
        baseURL: 'http://api.bjfinelycup.cn/api/v1',
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



//礼品现关API

const getGifts = () => apiObj.get('/gift/list');
const getGift = id => apiObj.get('/gift/' + id);

const createGift = (giftData) => apiObj.post('/gift', {
    'name': giftData.name,
    'main_image': giftData.main_image,
    'cost': giftData.cost,
    'total_count': giftData.total_count,
    'current_count': giftData.current_count,
});

const getGiftDetail = id => apiObj.get('/gift/detail/' + id);

const setGift = (giftData) => apiObj.put('/gift', {
    'name': giftData.name,
    'main_image': giftData.main_image,
    'cost': giftData.cost,
    'total_count': giftData.total_count,
    'current_count': giftData.current_count,
    'is_visible': giftData.is_visible,
    'giftId': giftData.id
});

const setGiftDetail = (giftDataDetail) => apiObj.put('/gift/detail', {
    'image_path': giftDataDetail.image_path,
    'priority': giftDataDetail.priority,
    'is_visible': giftDataDetail.is_visible,
    'id': giftDataDetail.id
});
const addGiftDetail = giftDataDetail => apiObj.post('/gift/detail', {
    'gift_id': giftDataDetail.gift_id,
    'image_path': giftDataDetail.image_path,
    'priority': giftDataDetail.priority
});

const upload = () => config.baseURL + '/gift/upload';

export {
    // users 
    getToken,
    getUser,
    getUsers,
    setUserState,
    setUserInfo,
    createUser,
    // gifts
    getGifts,
    getGift,
    createGift,
    getGiftDetail,
    setGift,
    setGiftDetail,
    addGiftDetail,
    //file
    upload
}