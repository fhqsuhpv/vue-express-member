<<template>
    <el-row :gutter="20">
    <el-col >
        <div class="main-images">
                <div class="color-list">
                    <div class="el-upload__tip">拖动图片进行排序</div>
                    <div class="color-item" v-for="photo in giftDetail" v-dragging="{ item: photo, list: giftDetail, group: 'photo' }" :key="photo.id">
                        <div v-if="photo.is_visible > 0">
                            <el-row :gutter="20">
                                <el-col :span="16">
                                    <img class="des-image" :src="photo.image_url"></img>
                                </el-col>
                                <el-col :span="8">
                                    <el-row :gutter="20">
                                        <el-button type="info">更新</el-button>
                                    </el-row>
                                    <el-row :gutter="20">
                                        <el-button @click="deleteimg(photo.id)" type="danger">删除</el-button>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
                <el-upload class="el-row" name="giftimage" :on-success="imageuploaded" :show-file-list="false" :action="uploadurl">
                    <i class="el-icon-upload"></i>
                    <em>点击上传</em>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>
                </el-upload>
                <el-button class="el-row" type="danger" @click="saveGiftDetail">保存当前排序</el-button>
        </div>
    </el-col>
    <el-col></el-col>
    </el-row>
</template>


<script>
    import { getGiftDetail, addGiftDetail, setGiftDetail, upload } from 'api/member';

    export default {
        data() {
            return {
                giftid: this.$route.params.id,
                giftDetail: [],
                uploadurl: ''
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                getGiftDetail(this.giftid).then(res => {
                    this.giftDetail = res.data.data;
                });
                this.uploadurl = upload();
            },
            imageuploaded(res) {
                this.giftDetail.push({
                    id: 0, //为了标记此Item是新加的，做后续处理
                    image_path: res.data.objectname,
                    image_url: res.data.url,
                    priority: 0,
                    is_visible: 1
                });
            },
            saveGiftDetail() {
                for (var i = 0; i < this.giftDetail.length; i++) {
                    this.giftDetail[i].priority = this.giftDetail.length - i;
                    if (this.giftDetail[i].id == 0)// id 为 0 的后续处理在此进行
                    {
                        this.giftDetail[i].gift_id = this.giftid;
                        this.giftDetail[i].id = -1;
                        addGiftDetail(this.giftDetail[i]).then(data => {
                            this.$notify({
                                title: '成功',
                                message: '新建成功!',
                                type: 'success'
                            });
                        }).catch(err => {
                            this.$notify.error({
                                title: '错误',
                                message: '创建失败，服务器异常!'
                            });
                            console.log(err);
                        });
                    }
                    else
                        setGiftDetail(this.giftDetail[i]).then(data => {
                            this.$notify({
                                title: '成功',
                                message: '修改成功!',
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
            },
            deleteimg(id) {
                for (var i = 0; i < this.giftDetail.length; i++) {
                    if (this.giftDetail[i].id > 0) {
                        if (this.giftDetail[i].id == id) {
                            this.giftDetail[i].is_visible = 0;
                            return;
                        }
                    } else {
                        this.giftDetail.splice(i, 1);
                    }
                }
            }
        }
    }
</script>

<style>
    .main-images {
        width: 300px;
        margin-left: 20px;
        margin-top: 20px;
    }

    .des-image {
        width: 200px;
    }

    .el-row {
        margin-bottom: 20px;
    }
</style>
