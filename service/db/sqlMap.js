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
        getById: 'select id,name,main_image,cost,current_count from gift where id = ?',
        getAll: 'select id,name,main_image,cost,current_count from gift',
        getDetail: 'select image_path,priority from gift_detail where gift_id = ? order by priority desc'
    },
    order: {
        createOrder: 'insert into order (user_id,gift_id,recipient,recipient_phone,address,order_data,state,is_del) vules(?,?,?,?,now(),0)'
    }

}
module.exports = sqlMap;