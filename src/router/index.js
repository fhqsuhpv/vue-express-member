import Vue from 'vue'
import Router from 'vue-router'

const login = resolve => require(['@/pages/login'], resolve);
const card = resolve => require(['@/pages/Card'], resolve);
const gift = resolve => require(['@/pages/Gift'], resolve);
const giftlist = resolve => require(['@/pages/GiftList'], resolve);
const address = resolve => require(['@/pages/Address'], resolve);


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: '',
            component: login
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/card',
            name: 'card',
            component: card
        },
        {
            path: '/giftlist',
            name: 'giftlist',
            component: giftlist
        },
        {
            path: '/gift',
            name: 'gift',
            component: gift
        },
        {
            path: '/address',
            name: 'address',
            component: address
        }
    ]
})