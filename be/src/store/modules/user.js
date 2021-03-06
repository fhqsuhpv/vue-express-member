import { loginByEmail, logout, getInfo } from 'api/login';
import { getToken, getUser } from 'api/member';
import Cookies from 'js-cookie';

const user = {
    state: {
        user: '',
        status: '',
        code: '',
        token: Cookies.get('Admin-Token'),
        name: '',
        avatar: '',
        introduction: '',
        roles: [],
        setting: {
            articlePlatform: []
        }
    },

    mutations: {
        SET_CODE: (state, code) => {
            state.code = code;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction;
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting;
        },
        SET_STATUS: (state, status) => {
            state.status = status;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        LOGIN_SUCCESS: () => {
            console.log('login success')
        },
        LOGOUT_USER: state => {
            state.user = '';
        }
    },

    actions: {

        // 邮箱登录
        LoginAdminByEmail({ commit }, userInfo) {
            const email = userInfo.email.trim();
            return new Promise((resolve, reject) => {
                getToken(email, userInfo.password).then(response => {
                    const data = response.data;
                    Cookies.set('Admin-Token', data.token);
                    commit('SET_TOKEN', data.token);
                    resolve();
                }).catch(err => {
                    reject(error);
                });
            });
        },

        // 邮箱登录
        LoginByEmail({ commit }, userInfo) {
            const email = userInfo.email.trim();
            return new Promise((resolve, reject) => {
                loginByEmail(email, userInfo.password).then(response => {
                    const data = response.data;
                    Cookies.set('Admin-Token', response.data.token);
                    commit('SET_TOKEN', data.token);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },


        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getUser().then(response => {
                    console.log(response);
                    const data = response.data.data;
                    if (response.data.code != 200) {
                        commit('SET_TOKEN', '');
                        commit('SET_ROLES', []);
                        Cookies.remove('Admin-Token');
                    } else {
                        commit('SET_ROLES', data.role);
                        commit('SET_NAME', data.name);
                        commit('SET_AVATAR', data.avatar);
                        commit('SET_INTRODUCTION', '');
                    }
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 第三方验证登录
        LoginByThirdparty({ commit, state }, code) {
            return new Promise((resolve, reject) => {
                commit('SET_CODE', code);
                loginByThirdparty(state.status, state.email, state.code).then(response => {
                    commit('SET_TOKEN', response.data.token);
                    Cookies.set('Admin-Token', response.data.token);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                commit('SET_TOKEN', '');
                commit('SET_ROLES', []);
                Cookies.remove('Admin-Token');
                resolve();
            });
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                Cookies.remove('Admin-Token');
                resolve();
            });
        },

        // 动态修改权限
        ChangeRole({ commit }, role) {
            return new Promise(resolve => {
                commit('SET_ROLES', [role]);
                commit('SET_TOKEN', role);
                Cookies.set('Admin-Token', role);
                resolve();
            })
        }
    }
};

export default user;