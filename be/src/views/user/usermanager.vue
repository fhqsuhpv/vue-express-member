<template>
    <div>
        <el-button type="primary" icon="edit" style="margin: 10px 10px 10px 10px;float:right " @click="createUser">创建新用户</el-button>
        <el-table :data="userData" class="userTable" border fit highlight-current-row>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="用户名">
                <template scope="scope">
                    <span class="link-type" @click="editUser(scope.row)">{{scope.row.phone}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="用户姓名"></el-table-column>
            <el-table-column prop="total_cost" label="积分"></el-table-column>
            <el-table-column label="状态">
                <template scope="scope">
                    <el-tag :type="scope.row.isdel == '0' ? 'success':'danger'">{{scope.row.isdel == 0 ? '正常':'禁用'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template scope="scope">
                    <el-button size="small" @click="editUser(scope.row)">编辑用户</el-button>
                    <el-button size="small" :type="scope.row.isdel == 0 ? 'danger':'success'" v-on:click="disSwitch(scope.row)">{{ scope.row.isdel == 0 ?'禁用帐号':'启用帐号'}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="用户修改" :visible.sync="userVisible" size="small">
            <el-form class="small-space" v-model="userTempData" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
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
            <div slot="footer" class="dialog-footer">
                <el-button @click="userVisible=false">取 消</el-button>
                <el-button type="primary" @click="saveInfo()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { getUsers, setUserState, setUserInfo, createUser } from 'api/member';
    export default {
        data() {
            return {
                userData: [],
                userVisible: false,
                tagCreate: true,
                userTempData: {}
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
            editUser(row) {
                this.userVisible = true;
                this.tagCreate = false;
                this.userTempData = row;
            },
            createUser() {
                this.userTempData = {};
                this.tagCreate = true;
                this.userVisible = true;
            },
            disSwitch(row) {
                var isdel = (row.isdel == 0 ? 1 : 0);
                setUserState(isdel, row.id).then(data => {
                    row.isdel = isdel;
                })
            },
            create() {
                createUser(this.userTempData.phone, this.userTempData.name, this.userTempData.password, this.userTempData.recipient, this.userTempData.recipient_phone, this.userTempData.address, this.userTempData.total_cost).then(data => {
                    this.userVisible = false;
                    this.$notify({
                        title: '成功',
                        message: '创建成功!',
                        type: 'success'
                    });
                    getUsers(0, 100).then(res => {
                        this.userData = res.data.data;
                    }).catch(err => {
                        this.$notify({
                            title: '警告',
                            message: '自动刷新失败，请手动F5刷新',
                            type: 'warning'
                        });
                    });
                }).catch(err => {
                    this.$notify.error({
                        title: '错误',
                        message: '创建失败，服务器异常!'
                    });
                });
            },
            update() {
                setUserInfo(this.userTempData.phone, this.userTempData.name, this.userTempData.recipient, this.userTempData.recipient_phone, this.userTempData.address, this.userTempData.total_cost, this.userTempData.id).then(data => {
                    this.userVisible = false;
                    this.$notify({
                        title: '成功',
                        message: '保存成功!',
                        type: 'success'
                    });
                }).catch(err => {
                    this.$notify.error({
                        title: '错误',
                        message: '保存失败，服务器异常!'
                    });
                });
            },
            saveInfo() {
                this.tagCreate ? this.create() : this.update();

            }
        }
    }

</script>
<style>
    .userTable {
        width: 100%
    }
</style>