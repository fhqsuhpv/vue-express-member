<template>
  <div class="gift">
    <mt-header fixed title="标题过长会隐藏后面的内容啊哈哈哈哈">
      <router-link to="/GiftList" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="gift-main">
      <div class="gift-cost">
        <img class="page-lazyload-image" :src="main_image" />
        <h3>换购 {{ giftname }} 需花费积分:{{ cost }} 还有:{{current_count}}件</h3>
        <mt-button type="danger" size="large" v-on:click="goToAddress()">立即换购</mt-button>
      </div>
      <ul>
        <li class="page-lazyload-listitem" v-for="item in listImg">
          <img class="page-lazyload-image" :src="item.image_path" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/babel">
  import { Toast } from 'mint-ui';
  import { getGift, getGiftDetail, getSufficient } from '@/api/postman';
  export default {
    data() {
      return {
        main_image: '',
        loading: false,
        giftId: this.$route.query.gift_id,
        listImg: [],
        cost: 100,
        current_count: 0,
        giftname: ''
      }
    },
    created() {
      getGift(this.giftId).then(res => {
        var data = JSON.parse(res.data.data);
        this.main_image = data.main_image;
        this.cost = data.cost;
        this.giftname = data.name;
        this.current_count = data.current_count;
      }).catch(err => {
        this.$router.push({ path: '/giftlist' });
      });
      getGiftDetail(this.giftId).then(res => {
        this.listImg = JSON.parse(res.data.data);
      }).catch(err => {
        this.$router.push({ path: '/giftlist' });
      });
    },
    methods: {
      goToAddress() {
        console.log(this.giftId);
        getSufficient(this.giftId).then(res => {
          if (res.data.code == 200)
            this.$router.push({ path: '/address', query: { gift_id: this.giftId } });
          else
            Toast('积分不足！快去购物吧！');
        });
      }
    }
  };
</script>

<style>
  .gift-main {
    width: 100%;
    margin-top: 40px;
  }

  .gift-cost {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .page-lazyload-listitem {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 10px;
    background-color: #ddd;
  }

  .page-lazyload-image {
    display: block;
    width: 100%;
  }
</style>
