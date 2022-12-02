/**
 * @Date: 2022-11-29 21:46:23
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2022-11-30 14:16:57
 * @FilePath: /learn-node-20221114/src/system_module/express/index.js
 * @name: filename
 * @description: description
 */
const express = require('express')

const app = express()
const midle = function(req,res,next){
    console.log(req,res,'中间件1')
    next()
}
app.use(midle)

// app.on('request',(req,res)=>{
//     console.log(req,'req')
//     console.log(res,'res')
// })
app.get('/user/:id/:name',(req,res,next)=>{
    // query 存储 ? 后面的参数
    // params存储 : 后的 动态参数
    console.log(req.query,'get req query')
    console.log(req.params,'get req params')
    // console.log(res,'get res')

    console.log('触发get事件')
    // send方法支持对象或字符串
    res.send({a:1,b:2})
    console.log('中间件2')
    next()
})
app.post('/user',(req,res)=>{
    // console.log(req,'get req')
    // console.log(res,'get res')

    console.log('post 触发')
    res.send('post 成功')
})

// 托管静态资源 static 接收一个路径参数
app.use(express.static('public'))

app.listen(80,(e)=>{
    console.log(e,'server is listening on 80')
})
