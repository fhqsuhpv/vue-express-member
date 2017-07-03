<template>
  <div class="login">
    <mt-field label="用户名" placeholder="请输入手机号" v-model="username"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <mt-button class="default" size="large" v-on:click.native="login()">
      <label class="mint-button-text">{{ t_login }}</label>
    </mt-button>
  </div>
</template>

<script>

  import { Toast } from 'mint-ui';
  import { test, getToken } from '@/api/postman';
  export default {
    name: 'login',
    data() {
      return {
        username: '',
        password: '',
        t_login: '登 录',
      }
    },
    methods: {
      login: function () {
        getToken(this.username, this.password).then(res => {
          if (res.data.code == 200) {
            Toast('登录成功');
            window.localStorage.setItem('token', res.data.token);
            this.$router.push({ path: '/card' });
          } else {
            Toast('登录失败:用户名密码不正确');
          }
        }).catch(err => {
          console.log(err);
          Toast('登录失败');
        });

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
