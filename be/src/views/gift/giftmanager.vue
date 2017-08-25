<template>
    <div>
        <el-button type="primary" icon="edit" style="margin: 10px 10px 10px 10px;float:right " @click="createGift">创建新礼品</el-button>
        <el-table :data="giftData" border fit highlight-current-row>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="name" label="礼品名"></el-table-column>
            <el-table-column prop="cost" label="所需积分"></el-table-column>
            <el-table-column prop="total_count" label="总数量"></el-table-column>
            <el-table-column prop="current_count" label="剩余数量"></el-table-column>

            <el-table-column label="状态">
                <template scope="scope">
                    <el-tag :type="scope.row.is_visible == 1 ? 'success':'danger'">{{scope.row.is_visible == 1 ? '正常展示':'已下架'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template scope="scope">
                    <el-button size="small" v-on:click="editClick(scope.row.id)">基本编辑</el-button>
                    <el-button size="small" v-on:click="editdetClick(scope.row.id)">详情编辑</el-button>
                    <el-button size="small" :type="scope.row.is_visible == 1 ? 'danger':'success'" v-on:click="disSwitch(scope.row)">{{ scope.row.is_visible == 1 ?'下架':'上架'}}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { getGifts, setGift } from 'api/member';
    export default {
        data() {
            return {
                giftData: []
            }
        },
        created() {
            getGifts().then(res => {
                if (res.status != 200) {
                    this.$notify.error({
                        title: '错误',
                        message: '服务器异常! ErrorCode:' + res.status
                    });
                    return;
                };
                if (res.data.code != 200) {
                    this.$notify.error({
                        title: '系统内部错误',
                        message: 'ErrorCode:' + res.data.code
                    });
                    return;
                };
                this.giftData = res.data.data;
            }).catch(err => {
                console.log(err);
                this.$notify.error({
                    title: '错误',
                    message: '服务器异常!'
                });
            });
        },
        methods: {
            editClick(id) {
                //console.log(id);
                this.$router.push({ path: '/gift/' + id });
                //this.$router.push({ name: 'gift', params: { id: 1 } });
            },
            editdetClick(id) {
                //console.log(id);
                this.$router.push({ path: '/gift/detail/' + id });
                //this.$router.push({ name: 'gift', params: { id: 1 } });
            },
            createGift() {
                this.$router.push({ path: '/gift/0' });
            },
            disSwitch(data) {
                data.is_visible = (data.is_visible == 0 ? 1 : 0);
                setGift(data).then(data => {
                    this.$notify({
                        title: '成功',
                        message: '修改成功!',
                        type: 'success'
                    });
                }).catch(err => {
                    data.is_visible = (data.is_visible == 0 ? 1 : 0);
                    this.$notify.error({
                        title: '错误',
                        message: '服务器异常!'
                    });
                });
            }
        }
    }
</script>

<style>

</style>
