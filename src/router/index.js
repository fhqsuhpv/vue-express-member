import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Card from '@/components/Card'
import GiftList from '@/components/GiftList'
import Gift from '@/components/Gift'
import Address from '@/components/Address'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/card',
            name: 'card',
            component: Card
        },
        {
            path: '/giftlist',
            name: 'giftlist',
            component: GiftList
        },
        {
            path: '/gift',
            name: 'gift',
            component: Gift
        },
        {
            path: '/address',
            name: 'address',
            component: Address
        }
    ]
})