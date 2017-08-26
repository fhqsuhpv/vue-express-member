import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);

/* layout */
import Layout from '../views/layout/Layout';

/* login */
const Login = _import('login/index');

/* error page */
const Err404 = _import('error/404');
const Err401 = _import('error/401');

const UserManager = _import('user/usermanager');
const OrderManager = _import('order/ordermanager');
const GiftManager = _import('gift/giftmanager');
const Gift = _import('gift/gift');
const GiftDetail = _import('gift/giftdetail');

Vue.use(Router);

export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true },
    { path: '/404', component: Err404, hidden: true },
    { path: '/401', component: Err401, hidden: true },
    {
        path: '/',
        component: Layout,
        redirect: '/user',
        name: '首页',
        hidden: true,
        children: [{ path: '', component: UserManager }]
    },
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});

export const asyncRouterMap = [{
        path: '/user',
        component: Layout,
        redirect: 'noredirect',
        name: 'et',
        icon: 'theme',
        noDropdown: true,
        children: [{ path: '', component: UserManager, name: '用户管理' }]
    }, {
        path: '/gift',
        component: Layout,
        redirect: 'noredirect',
        name: 'et',
        icon: 'zujian',
        noDropdown: true,
        children: [
            { path: '', component: GiftManager, name: '礼品管理' },
            { path: ':id', component: Gift, name: '礼品' },
            { path: 'detail/:id', component: GiftDetail, name: '礼品详情' }
        ]
    },
    {
        path: '/order',
        component: Layout,
        redirect: 'noredirect',
        name: 'et',
        icon: 'tubiaoleixingzhengchang',
        noDropdown: true,
        children: [{ path: '', component: OrderManager, name: '订单管理' }]
    }
];