<template>
    <el-form class="small-space" v-model="giftData" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="手机号">
            <el-input v-model="userTempData.phone"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input v-model="userTempData.name"></el-input>
        </el-form-item>
        <el-form-item v-if="tagCreate" label="密码">
            <el-input v-model="userTempData.password"></el-input>
        </el-form-item>
        <el-form-item label="总积分">
            <el-input v-model="userTempData.total_cost"></el-input>
        </el-form-item>
        <el-form-item label="收件人姓名">
            <el-input v-model="userTempData.recipient"></el-input>
        </el-form-item>
        <el-form-item label="收件人电话">
            <el-input v-model="userTempData.recipient_phone"></el-input>
        </el-form-item>
        <el-form-item label="收件地址">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="userTempData.address"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
    import { getGifts } from 'api/member';
    export default {
        data() {
            return {
                giftData: []
            }
        },
        created() {

        },
        methods: {

        }
    }
</script>

<style>
    
</style>
