<template>
  <div class="giftlist">
  <mt-header fixed title="标题过长会隐藏后面的内容啊哈哈哈哈">
    <router-link to="/card" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
  </mt-header>
  <div class="page-header-main">
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <div>
          <router-link to="Gift" >
              <li class="li-giftlist" v-for="item in list"  >
                    <div class="box-left"><img class="p-pic" /></div>
                    <div class="box-right"> {{ item }}</div>
              </li>
          </router-link>
      </div>
    </ul>
  </div>
  </div>
</template>

<script type="text/babel">
  import Vue from 'vue';
  import { InfiniteScroll } from 'mint-ui';
  import { Button } from 'mint-ui';
  import { Header } from 'mint-ui';

  Vue.component(Header.name, Header);
  Vue.component(Button.name, Button);
  Vue.use(InfiniteScroll);
  export default {
    data() {
      return{
        loading:false,
        list:[1,2,3,4,5,7,8,9,10]
      }
    },
    methods: {
      loadMore() {
        console.log('aaa');
        this.loading = true;
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
          }
          this.loading = false;
        }, 2500);
      },
    }
  };
</script>

<style>
.p-pic {
    width: 100px;
    height: 100px;
}
.page-header-main {
    margin-top: 50px;
    min-height: 120vh;
}
.li-giftlist {
    min-height: 100px;
    padding: 12px 6px;
    border-bottom: 1px solid #dbdbdb;
    position: relative;
}
.box-left {
    float: left;
    width: 100px;
    height: 100px;
    margin-right: 10px;
    margin-left: 10px;
    text-align: right;

    
}
.box-right {
     margin: 4px 15px 6px 0;
    -webkit-box-flex: 1;
}
</style>
