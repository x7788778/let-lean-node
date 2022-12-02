/**
 * @Date: 2022-12-01 14:03:06
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2022-12-01 23:52:16
 * @FilePath: /learn-node-20221114/src/system_module/express/JWT/index.js
 * @name: filename
 * @description: description
 */
// 倒入express模块
const express = require('express')
const bodyParser = require('body-parser') //解析urlencode格式请求体
const cors = require('cors') // 解决跨域
const jwt = require('jsonwebtoken') // 生成JWT
const express_jwt = require('express-jwt') //还原JWT为json字符
console.log(express_jwt,'express_jwt---')
//创建服务器应用
const app = express()

const port = 80
const secretKey = '@ #$% ^&'
const urlencodedParser = bodyParser.urlencoded({extended:true})

// app.use(express.urlencoded({extended:false}))
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors())
// app.use(bodyParsevm)

console.log(bodyParser,'bodyParser')
//注册解析token中间件，.unless指定哪些接口不访问
//jwt字符串还原为JSON对象： 配置express_jwt，会把解析后的用户信息挂在到req.user身上
app.use(express_jwt({secret:secretKey}).unless({path:[/^\/api\//]})) 

app.post('/api/login',bodyParser.json(),function(req,res){
     const userInfo = req.body
    console.log(req.body,'req')
     if(userInfo.username !== 'admin' || userInfo.password !== '123'){
        return res.send({
            status:400,
            messages:'登陆失败！',
            // data:{req}
        })
     }
     //生产JWT字符串：登陆成功，调用jwt.sign()方法生产JWT字符串，并通过token属性发送给客户端
     //三个参数:用户信息对象，加密的密钥，配置对象（配置当前token有效期）
     // 注意敏感用户信息不要发
     const tokenstr = jwt.sign({usernname:userInfo.username},secretKey,{expiresIn: '30s'})

     return res.send({
        status:200,
        message:'登陆成功！',
        token:tokenstr//给客户端的token字符串
    })
})
app.get('/admin/getinfo',(req,res)=>{
    console.log(req.user,'/admin/getinfo ')
    
    res.send({
        status:200,
        message:'成功',
        data:req.user
    })
})
app.use(function(err,req,res,next){
    if(err.name === 'UnauthorizedError'){
        return res.send({
            status:401,
            message:'无效token'
        })
        
    }
    res.send({
        status:500,
        message:'未知错误'
    })
})
//监听端口并启动web服务器
app.listen(port,()=>{
    console.log(`server is listening on port at port`)
})