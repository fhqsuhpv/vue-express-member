<template>
  <div class="gitfcomplete">
    <mt-header fixed title="标题过长会隐藏后面的内容啊哈哈哈哈">
      <router-link to="/card" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="page-header-main">
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div>
          <li class="li-giftlist" v-for="item in list">
            <div class="box-left">
              <img class="p-pic" :src="item.main_image" />
            </div>
            <div class="box-right"> 物品名称：{{ item.name }}</div>
            <div class="box-right"> 需花费:{{ item.cost }}</div>
            <div class="box-right"> 换购日期:{{ item.order_date }}</div>
            <div class="box-right"> 快递单号:{{ item.express_no }}</div>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import { getOrder } from '@/api/postman';
  export default {
    data() {
      return {
        loading: false,
        list: []
      }
    },
    created() {
      getOrder().then(res => {
        if (res.data.code == 200) {
          this.list = res.data.data;
        } else {
          console.log(res);
          Toast('系统疯了!不记得你换了什么!');
        }
      });
    },
    methods: {
      loadMore() { }
    }
  }
</script>

<<style>
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
    text-decoration: none;
    -webkit-box-flex: 1;
  }
</style>
