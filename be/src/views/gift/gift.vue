<template>
    <el-form class="small-space" v-model="giftData" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
    
    </el-form>
</template>

<script>
    import { getGift } from 'api/member';
    export default {
        data() {
            return {
                giftid: this.$route.params.id,
                giftData: []
            }
        },
        created() {
            getGift(this.giftid).then(res => {
                console.log(res);
                this.giftData = res.data.data;
            });
        },
        methods: {

        }
    }
</script>

<style>
    
</style>
