// sql语句
var sqlMap = {
    // 用户
    user: {
        getByUserPass: 'select * from user_info where phone = ? and password = ?',
        getById: 'select * from user_info where id = ?',
        setCost: 'update user_info set total_cost = ?,update_date = now() where id = ?',
        setRecipient: 'update user_info set recipient_phone = ?,recipient_phone=?,address=? ,update_date = now() where id = ?',

        getlimit: 'select id,phone,name,total_cost,isdel,recipient,recipient_phone,address from user_info limit ?,?',
        getCount: 'select count(*) from user_info',
        setUserInfoById: 'update user_info set phone = ?,name = ?,recipient = ? ,recipient_phone = ?,address = ? ,total_cost = ?,update_date = now() where id = ?',
        createUser: 'insert into user_info (phone,name,password,recipient,recipient_phone,address,create_date,update_date,total_cost)values(?,?,?,?,?,?,now(),now(),?)',
        setDelete: 'update user_info set isdel = ? where id = ?'
    },
    integral: {
        getByUserId: 'select cost,record,create_date from integral where user_id = ? order by id desc',
        createIntegral: 'insert into integral(user_id,cost,record,create_date) values(?,?,?,now())'
    },
    gift: {
        getById: 'select id,name,main_image,total_count,cost,current_count from gift where id = ?',
        getAll: 'select id,name,main_image,total_count,cost,current_count from gift',
        getDetail: 'select image_path,priority from gift_detail where gift_id = ? order by priority desc'
    },
    order: {
        createOrder: 'insert into orders (user_id,gift_id,recipient,recipient_phone,address,order_date,state,is_del) values(?,?,?,?,?,now(),\'0\',0)',
        getByUserId: 'select orders.gift_id,orders.state,orders.order_date,orders.express_no,gift.main_image,gift.name,gift.cost from orders,gift where orders.gift_id = gift.id and orders.is_del = 0 and orders.user_id =? '
    },
    manager: {
        getByUserPass: 'select * from manager where name = ? and password = ?',
        getByID: 'select * from manager where id = ?'
    }

}
module.exports = sqlMap;