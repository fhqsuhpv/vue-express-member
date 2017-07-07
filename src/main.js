// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Field, InfiniteScroll, Header, Actionsheet } from 'mint-ui';

Vue.component(Header.name, Header);
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component(Actionsheet.name, Actionsheet);
Vue.use(InfiniteScroll);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})