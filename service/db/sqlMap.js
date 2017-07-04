// sql语句
var sqlMap = {
    // 用户
    user: {
        getByUserPass: 'select * from user_info where phone = ? and password = ?'
    },
    integral: {
        getByUserId: 'select cost,record,create_date from integral where user_id = ?'
    },
    gift: {
        getall: 'select id,name,main_image,cost,current_count from gift',
        getdetail: 'select image_path,priority from gift_detail where gift_id = ?'
    }
}
module.exports = sqlMap;