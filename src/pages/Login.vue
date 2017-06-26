<template>
  <div class="login">
    <mt-field label="用户名" placeholder="请输入手机号"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password"></mt-field>
    <mt-button class="default" size="large" v-on:click.native="apitest()">
      <label class="mint-button-text">{{ t_login }}</label>
    </mt-button>
  </div>
</template>

<script>

  import { Toast } from 'mint-ui';
  import { test } from '@/api/postman';
  export default {
    name: 'login',
    data() {
      return {
        t_login: '登 录',
      }
    },
    methods: {
      login: function () {
        Toast('提示信息');
        this.$router.push({ path: '/card' });
      },
      //demo call api
      apitest: function () {
        test().then(res => {
          console.log(res.data);
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  mt-button {
    padding: 6px;
  }
</style>
