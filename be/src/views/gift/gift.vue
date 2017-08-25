<template>
    <el-form class="small-space el-form-top" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="礼品名称">
            <el-input v-model="giftData.name"></el-input>
        </el-form-item>
        <el-form-item lable="主图">
            <img class="main-image" :src="giftData.main_image_url"></img>
            <el-upload name="giftimage" :on-success="imageuploaded" :show-file-list="false" :action="uploadurl">
                <i class="el-icon-upload"></i>
                <em>点击上传</em>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="花费积分">
            <el-input v-model="giftData.cost"></el-input>
        </el-form-item>
        <el-form-item label="总库存">
            <el-input v-model="giftData.total_count"></el-input>
        </el-form-item>
        <el-form-item label="当前库存">
            <el-input v-model="giftData.current_count"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button size="large" v-on:click="savegift" type="info">保 存</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
    import { getGift, setGift, createGift, upload } from 'api/member';

    export default {
        data() {
            return {
                giftid: this.$route.params.id,
                data: '',
                giftData: {
                    'main_image_url': ''
                },
                uploadurl: ''
            }
        },
        created() {
            if (this.giftid != 0)
                getGift(this.giftid).then(res => {
                    console.log(res);
                    this.giftData = res.data.data;
                });
            this.uploadurl = upload();
        },
        methods: {
            imageuploaded(res) {
                console.log(res);
                this.giftData.main_image_url = res.data.url;
                console.log(this.giftData.main_image_url);
                this.giftData.main_image = res.data.objectname;
            },
            savegift() {
                if (this.giftid == 0)
                    createGift(this.giftData).then(res => {
                        this.$notify({
                            title: '成功',
                            message: '保存成功!',
                            type: 'success'
                        });
                    }).catch(err => {
                        console.log(err);
                        this.$notify.error({
                            title: '错误',
                            message: '创建失败，服务器异常!'
                        });
                    });
                else
                    setGift(this.giftData).then(res => {
                        this.$notify({
                            title: '成功',
                            message: '保存成功!',
                            type: 'success'
                        });
                    }).catch(err => {
                        console.log(err);
                        this.$notify.error({
                            title: '错误',
                            message: '创建失败，服务器异常!'
                        });
                    });
            }
        }
    }
</script>

<style>
    .el-form-top {
        margin-top: 20px;
    }

    .main-image {
        width: 330px;
    }
</style>
