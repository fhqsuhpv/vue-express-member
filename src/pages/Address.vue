<template>
  <div class="Address">
    <mt-header fixed title="标题过长会隐藏后面的内容啊哈哈哈哈">
      <router-link :to="{ path: '/gift', query: { gift_id: this.giftId } }" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="from-min">
      <ul>
        <li class="li-giftlist">
          <div class="box-left">
            <img class="p-pic" :src="main_image" />
          </div>
          <div class="box-right">换购{{ giftname }}花费{{ cost }}积分</div>
        </li>

        <li>
          <mt-field label="收件人姓名" placeholder="请输姓名" v-model="recipient"></mt-field>
          <mt-field label="收件人电话" placeholder="请输入手机号" v-model="recipient_phone"></mt-field>
          <mt-field label="收件详细地址" placeholder="按照**省**市**区**路**楼**层**门牌添写" type="textarea" rows="4" v-model="address"></mt-field>
          <mt-button type="default" size="large">确认</mt-button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script type="text/babel">
  import { getGift, getUser } from '@/api/postman';
  export default {
    data() {
      return {
        loading: false,
        giftId: this.$route.query.gift_id,
        main_image: '',
        cost: '',
        giftname: '',

        recipient: '',
        recipient_phone: '',
        address: ''
      }
    },
    created() {
      getGift(this.giftId).then(res => {
        var data = JSON.parse(res.data.data);
        this.main_image = data.main_image;
        this.cost = data.cost;
        this.giftname = data.name;
      }).catch(err => {
        // this.$router.push({ path: '/giftlist' });

      });

      getUser().then(res => {
        var data = res.data.data;
        this.recipient = data.recipient;
        this.recipient_phone = data.recipient_phone;
        this.address = data.address;
      }).catch(err => {
        console.log(err);
        // this.$router.push({ path: '/login' });
        // Toast('用户信息获取失败');
      });

    },
    methods: {

    }
  };
</script>

<style>
  .from-min {
    margin-top: 50px;
    width: 375px;
    height: 375px;
  }

  .p-pic {
    width: 100px;
    height: 100px;
  }
</style>
