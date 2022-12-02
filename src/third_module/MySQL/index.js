/**
 * @Date: 2022-12-01 00:23:29
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2022-12-01 13:59:47
 * @FilePath: /learn-node-20221114/src/system_module/MySQL/index.js
 * @name: filename
 * @description: description
 */
const mysql = require('mysql');

const db = mysql.createPool({
    host:'127.0.0.1', //数据库ip
    user:'root',//数据库账号
    password:'admin123',//数据库密码
    database:'my_db_01'//哪个数据库
})

// select 1 是检查语句
// query 参数1，SQL语句； 参数2，回调
// db.query('select 1',(err,res)=>{
//     if(err){
//         console.log(err,'err!!')
//     }
//     console.log(res,'结果')
// })
const allUsers = 'select * from users'
db.query(allUsers,(err,res)=>{
    if(err){
        console.log(err,'err!!')
    }
    console.log(res,'结果')
})

