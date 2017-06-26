<template>
  <div class="gift">
    <mt-header fixed title="标题过长会隐藏后面的内容啊哈哈哈哈">
      <router-link to="/GiftList" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="gift-main">
      <div class="gift-cost">
        <img class="page-lazyload-image" src="http://fuss10.elemecdn.com/b/df/b630636b444346e38cef6c59f6457jpeg.jpeg" />
        <h3>换购{{ giftname }} 需花费积分:{{ cost }}</h3>
        <mt-button type="danger" size="large" v-on:click="goToAddress()">立即换购</mt-button>
      </div>
      <ul>
        <li class="page-lazyload-listitem" v-for="item in listImg">
          <img class="page-lazyload-image" :src="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    data() {
      return {
        loading: false,
        listImg: ["http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg",
          "http://fuss10.elemecdn.com/3/1e/42634e29812e6594c98a89e922c60jpeg.jpeg",
          "http://fuss10.elemecdn.com/1/c5/95c37272d3e554317dcec1e17a9f5jpeg.jpeg",
          "http://fuss10.elemecdn.com/7/85/e478e4b26af74f4539c79f31fde80jpeg.jpeg",
          "http://fuss10.elemecdn.com/b/df/b630636b444346e38cef6c59f6457jpeg.jpeg",
          "http://fuss10.elemecdn.com/7/a5/596ab03934612236f807b92906fd8jpeg.jpeg"],
        cost: 100,
        giftname: "虎牌保温杯"
      }
    },
    methods: {
      goToAddress() {
        this.$router.push({ path: '/address' });
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
