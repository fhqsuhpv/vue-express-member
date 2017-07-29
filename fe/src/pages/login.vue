<template>
  <div class="login">
    <div class="CardImgBck">
      <!-- <a class="membertext">莉莉家会员卡 </a> -->
    </div>
    <mt-field label="用户名" placeholder="请输入手机号" v-model="username"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <mt-switch class="mt-button" @change="changeEvent" v-model="isSave">是否保存用户名密码</mt-switch>
    <mt-button type="primary" class="mt-button" size="large" v-on:click.native="login()">
      <label class="mint-button-text">{{ t_login }}</label>
    </mt-button>
    <mt-button type="danger" class="mt-button" size="large" v-on:click.native="singUp()">
      <label class="mint-button-text">注 册</label>
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
        isSave: false
      }
    },
    mounted() {
      var isSave = window.localStorage.getItem('isSave');
      if (isSave == 'true') {
        this.isSave = true;
      }
      if (this.isSave) {
        this.username = window.localStorage.getItem('username');
        this.password = window.localStorage.getItem('password');
      }
    },
    methods: {
      //保存-是否保存用户名密码开关状态
      changeEvent(isSave) {
        window.localStorage.setItem('isSave', !isSave);
      },
      login() {
        getToken(this.username, this.password).then(res => {
          if (res.data.code == 200) {
            Toast('登录成功');
            if (this.isSave) {
              window.localStorage.setItem('username', this.username);
              window.localStorage.setItem('password', this.password);
            }
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
      singUp() {
        Toast('自助注册暂未开通，请联系客服!');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .CardImgBck {
    background-image: url(../assets/card.png);
    height: 180px;
    margin: 0px 0px 10px 0px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    text-align: center;
  }

  .membertext {
    color: white;
    font-size: 30px;
    margin: 0 auto;
    text-align: center;
    line-height: 200px;
  }

  .login {
    margin: 0 auto;
    width: 90%;
    margin-top: 10px;
  }

  .mt-button {
    margin: 0px 0px 10px 0px;
  }
</style>
