<template>
  <div class="card">
    <img class="cardimg" src="../assets/card.png">
    <span class="mint-cell-text">
      用户名:{{ userName }} 总积分:{{ totalIntegral }}
    </span>
    <mt-button type="default" size="large" class="mt-button" v-on:click="goToList()">积分对换缤纷好礼</mt-button>
    <mt-button type="default" size="large" class="mt-button" v-on:click="goToMyGiftList()">我兑换到的礼品</mt-button>
    <mt-button type="danger" size="large" class="mt-button" v-on:click="quitUser()">安全退出用户</mt-button>
    <a class="line">向下滑动获得更多积分记录:</a>
    <hr align=center class="line">
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li class="li-integral" v-for="item in list">{{item.create_date}}购买{{ item.record}}获得{{ item.cost }}积分</li>
    </ul>
  </div>
</template>



<script type="text/babel">

  import { Toast } from 'mint-ui';
  import { getUser, getIntegral } from '@/api/postman';

  export default {
    data() {
      return {
        userName: '',
        totalIntegral: 0,
        loading: false,
        list: []
      }
    },
    created() {

      getUser().then(res => {
        this.userName = res.data.data.phone;
      }).catch(err => {
        console.log(err);
        this.$router.push({ path: '/login' });
        Toast('用户信息获取失败');
      });

      getIntegral().then(res => {
        var il = JSON.parse(res.data.data);
        il.forEach(function (element) {
          this.totalIntegral += element.cost;
        }, this);
        this.list = JSON.parse(res.data.data);
      }).catch(err => {
        this.$router.push({ path: '/login' });
        console.log(err);
      });

    },
    methods: {
      loadMore() {
        // console.log('aaa');
        // this.loading = true;
        // setTimeout(() => {
        //   let last = this.list[this.list.length - 1];
        //   for (let i = 1; i <= 10; i++) {
        //     this.list.push(last + i);
        //   }
        //   this.loading = false;
        // }, 2500);
      },
      goToList() {
        this.$router.push({ path: '/giftlist' });
      },
      goToMyGiftList() {
        this.$router.push({ path: '/giftcomplete' });
      },
      quitUser() {
        window.localStorage.removeItem('token');
        this.$router.push({ path: '/login' });
      }
    }

  };
</script>
<style>
  .li-integral {
    min-height: 20px;
    max-height: 20px;
    padding: 12px 6px;
    border-bottom: 1px solid #dbdbdb;
  }

  .cardimg {
    height: 215px;
    padding: 12px 6px;
  }

  .mt-button {
    margin: 0px 0px 10px 0px;
  }

  .line {
    width: 300;
    color: black;
    SIZE: 1;
  }
</style>

