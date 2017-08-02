<template>
    <div>
        <el-table :data="giftData" border fit highlight-current-row>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="name" label="礼品名"></el-table-column>
            <el-table-column prop="cost" label="所需积分"></el-table-column>
            <el-table-column prop="total_count" label="总数量"></el-table-column>
            <el-table-column prop="current_count" label="剩余数量"></el-table-column>
            <el-table-column label="操作" width="200">
                <template scope="scope">
                    <el-button size="small" v-on:click="editClick(scope.row.id)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
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
                this.giftData = JSON.parse(res.data.data)
            }).catch(err => {
                this.$notify.error({
                    title: '错误',
                    message: '服务器异常!'
                });
            });
        },
        methods: {
            editClick(giftid) {
                //console.log(id);
                this.$router.push({ path: '/gift/' + giftid });
            }
        }
    }
</script>

<style>
    
</style>
