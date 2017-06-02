<template>
  <div class="Address">
      <mt-header fixed title="标题过长会隐藏后面的内容啊哈哈哈哈">
        <router-link to="/GiftList" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="from-min">
      <ul>
          <li class="li-giftlist">
              <div class="box-left"><img class="p-pic" /></div>
              <div class="box-right">ajsdf</div>
          </li>
          
          <li>
              <mt-field label="收件人姓名" placeholder="请输姓名" ></mt-field>
              <mt-field label="收件人电话" placeholder="请输入手机号" ></mt-field>
              <mt-field label="收件详细地址" placeholder="按照**省**市**区**路**楼**层**门牌添写" type="textarea" rows="4"></mt-field>
              <mt-button type="default" size="large" >确认</mt-button>
          </li>
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
        listImg:['1.jpg','2.jpg'],
        cost:100
      }
    },
    methods: {
      
    }
  };
</script>

<style>

.from-min{
    margin-top: 50px;
    width: 375px; 
    height: 375px; 
}

.p-pic {
    width: 100px;
    height: 100px;
}


</style>
