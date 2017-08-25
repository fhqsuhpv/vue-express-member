<template>
  <div class="gift">
    <mt-header fixed title="礼品详情">
      <router-link to="/GiftList" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="gift-main">
      <div class="gift-cost">
        <img class="page-lazyload-image" :src="main_image_url" />
        <a>换购 {{ giftname }}</a>
        <h3>需花费积分:{{ cost }} </h3>
        <a>还有:{{current_count}}件</a>
        <!-- <mt-button type="danger" size="large" v-on:click="goToAddress()">立即换购</mt-button> -->
      </div>

      <ul>
        <li class="page-lazyload-listitem" v-for="item in listImg">
          <img class="page-lazyload-image" :src="item.image_url" />
        </li>
      </ul>
      <mt-tabbar>
        <mt-tab-item>
          <mt-button type="danger" size="large" v-on:click="goToAddress()">立即换购</mt-button>
        </mt-tab-item>
      </mt-tabbar>
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
        giftname: '',
        main_image_url: ''
      }
    },
    created() {
      getGift(this.giftId).then(res => {
        var data = res.data.data;
        this.main_image = data.main_image;
        this.cost = data.cost;
        this.giftname = data.name;
        this.current_count = data.current_count;
        this.main_image_url = data.main_image_url;
      }).catch(err => {
        console.log(err);
        this.$router.push({ path: '/giftlist' });
      });
      getGiftDetail(this.giftId).then(res => {
        this.listImg = res.data.data;
      }).catch(err => {
        console.log(err);
        this.$router.push({ path: '/giftlist' });
      });
    },
    methods: {
      goToAddress() {
        getSufficient(this.giftId).then(res => {
          if (res.data.code == 200)
            this.$router.push({ path: '/address', query: { gift_id: this.giftId } });
          else
            Toast('积分不足！快去购物吧！');
        }).catch(err => {
          console.log(err);
          this.$router.push({ path: '/login' });
        });
      }
    }
  };
</script>

<style>
  .gift-main {
    width: 100%;
    margin-top: 50px;
    text-align: center;
  }

  .gift-cost {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .page-lazyload-listitem {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 10px;
    background-color: #ddd;
  }

  .page-lazyload-image {
    display: block;
    width: 100%;
  }
</style>
