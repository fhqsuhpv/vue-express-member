<template>
  <div class="Address">
    <mt-header fixed title="请确认发货地址">
      <router-link :to="{ path: '/gift', query: { gift_id: this.giftId } }" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-actionsheet cancelText='再想想' :actions="actions" v-model="sheetVisible">
    </mt-actionsheet>
    <div class="from-min">
      <ul>
        <li class="li-giftlist">
          <div class="box-left">
            <img class="p-pic" :src="main_image_url" />
          </div>
          <div class="box-right">换购{{ giftname }}花费{{ cost }}积分</div>
        </li>

        <li>
          <mt-field label="收件人姓名" placeholder="请输姓名" v-model="recipient"></mt-field>
          <mt-field label="收件人电话" placeholder="请输入手机号" v-model="recipient_phone"></mt-field>
          <mt-field label="收件详细地址" placeholder="按照**省**市**区**路**楼**层**门牌添写" type="textarea" rows="4" v-model="address"></mt-field>
          <mt-button type="default" size="large" v-on:click="commintOrder()">确认</mt-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/babel">
  import { Toast } from 'mint-ui';
  import { getGift, getUser, createOrder, setRecipient } from '@/api/postman';
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
        address: '',
        actions: [],
        sheetVisible: false,
        main_image_url: ''
      }
    },
    created() {
      getGift(this.giftId).then(res => {
        var data = res.data.data;
        this.main_image = data.main_image;
        this.cost = data.cost;
        this.giftname = data.name;
        this.main_image_url = data.main_image_url;
      }).catch(err => {
        this.$router.push({ path: '/giftlist' });
        Toast('找不到礼品了!联系卖家试试!');
      });

      getUser().then(res => {
        var data = res.data.data;
        this.recipient = data.recipient;
        this.recipient_phone = data.recipient_phone;
        this.address = data.address;
      }).catch(err => {
        console.log(err);
        this.$router.push({ path: '/login' });
        Toast('用户信息获取失败,请重新登录!');
      });

    },
    mounted() {
      this.actions = [
        {
          name: '确认并下单',
          method: this.createSheet
        },
        {
          name: '确认下单并保存为常用地址',
          method: this.createAndSaveSheet
        }
      ];
    },
    methods: {
      createSheet() {
        createOrder(this.giftId).then(res => {
          if (res.data.code == 200) {
            this.$router.push({ path: '/giftcomplete' });
            Toast('对换成功！等着快递小哥上门吧!');
          } else {
            Toast('对换失败，积分不足!');
          }
        });
      },
      createAndSaveSheet() {
        this.createSheet();
        setRecipient(this.recipient, this.recipient_phone, this.address).then(res => {
          if (res.data.code == 200) {
            console.log('地址保存成功!');
          } else {
            console.log('地址保存失败!');
          }
        })
      },
      commintOrder() {
        this.sheetVisible = !this.sheetVisible;
      }
    },

  }
</script>

<style>
  .from-min {
    margin: 0 auto;
    margin-top: 50px;
    width: 90%;
    height: 375px;
  }

  .p-pic {
    width: 100px;
    height: 100px;
  }
</style>
