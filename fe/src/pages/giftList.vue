<template>
  <div class="giftlist">
    <mt-header fixed title="可换购的礼品">
      <router-link to="/card" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="page-header-main">
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div>
          <li class="li-giftlist" v-for="item in list">
            <div v-on:click="gotodetial(item.id)">
              <div class="box-left">
                <img class="p-pic" :src="item.main_image_url" />
              </div>
              <div class="box-right"> {{ item.name }}</div>
              <div class="box-right"> 需花费:{{ item.cost }}</div>
            </div>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script type="text/babel">

  import { getGiftList } from '@/api/postman';
  export default {
    data() {
      return {
        loading: false,
        list: []
      }
    },
    created() {
      getGiftList().then(res => {
        this.list = res.data.data;
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      gotodetial(id) {
        this.$router.push({ path: '/gift', query: { gift_id: id } });
      },
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
    text-decoration: none;
    -webkit-box-flex: 1;
  }
</style>
