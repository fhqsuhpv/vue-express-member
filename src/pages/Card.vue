<template>
  <div class="card">
    <img class="cardimg" src="../assets/card.png">
    <mt-button type="default" size="large" v-on:click="goToList()">积分对换缤纷好礼</mt-button>
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li class="li-integral" v-for="item in list">{{ item }}</li>
    </ul>
  </div>
</template>



<script type="text/babel">
  export default {
    data() {
      return {
        loading: false,
        list: [1, 2, 3, 4, 5, 7, 8, 9, 10]
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
      goToList() {
        this.$router.push({ path: '/giftlist' });
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
    position: relative;
  }

  .cardimg {
    height: 215px;
    padding: 12px 6px;
  }
</style>

