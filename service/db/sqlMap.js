// sql语句
var sqlMap = {
    // 用户
    user: {
        post: 'insert into goods(id, name, price) values (0, ?, ?)',
        getall: 'select * from user_info',
        getByUserPass: 'select * from user_info where phone = ? and password = ?'
    },
    integral: {
        getByUserId: 'select * from integral where user_id = ?'
    }
}
module.exports = sqlMap;