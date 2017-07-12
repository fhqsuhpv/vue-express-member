import Vue from 'vue'
import Router from 'vue-router'

const login = resolve => require(['@/pages/login'], resolve);
const card = resolve => require(['@/pages/card'], resolve);
const gift = resolve => require(['@/pages/gift'], resolve);
const giftlist = resolve => require(['@/pages/giftList'], resolve);
const address = resolve => require(['@/pages/address'], resolve);
const giftcomplete = resolve => require(['@/pages/giftcomplete'], resolve);



Vue.use(Router)

var router = new Router({
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
            component: card,
            meta: {
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path: '/giftlist',
            name: 'giftlist',
            component: giftlist,
            meta: {
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path: '/gift',
            name: 'gift',
            component: gift,
            meta: {
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path: '/address',
            name: 'address',
            component: address,
            meta: {
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path: '/giftcomplete',
            name: 'giftcomplete',
            component: giftcomplete,
            meta: {
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            }
        }
    ]
})


// 在路由跳转前验证是否需要auth
router.beforeEach((to, from, next) => {
    // 回到页面顶部
    window.scrollTo(0, 0);
    if (to.matched.some(r => r.meta.requireAuth)) { // 判断该路由是否需要登录权限
        if (window.localStorage.getItem('token')) {
            next();
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath // 将跳转的路由path作为参数，登录成功后跳转到该路由
                }
            });
        }
    } else {
        next();
    }
});

export default router;