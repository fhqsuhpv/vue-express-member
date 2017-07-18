<template>
    <el-table :data="userData" border fit highlight-current-row style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="phone" label="用户名" width="200"></el-table-column>
        <el-table-column prop="name" label="用户姓名" width="200"></el-table-column>
        <el-table-column prop="total_cost" label="积分" width="200"></el-table-column>
        <el-table-column label="操作" width="200"></el-table-column>
    </el-table>
</template>
<script>
    import { getUsers } from 'api/member';
    export default {
        data() {
            return {
                userData: []
            }
        },
        created() {
            getUsers(0, 100).then(res => {
                this.userData = res.data.data;
            }).catch(err => {
                console.log(err);
            });
        },
        methods: {

        }
    }
</script>
<style>
    
</style>