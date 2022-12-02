//模拟实现一个parse中间件解析请求

// 倒入express模块
const express = require('express')
//创建服务器应用
const app = express()

const port = 80

// 自定义中间件
const bodyParsevm = function(req,res,next){
    let str = ''

    // 数据量比较大的时候，需要拼接
    req.on('data',(chunk)=>{
        console.log(chunk,'chunk')
        str+=chunk
    })
    req.on('end' ,()=>{
        console.log(str,'str')
        req.body = str
        next()
    })
}

app.use(bodyParsevm)

app.get('/',(req,res)=>{

    res.send('ok')
})

app.post('/user',(req,res)=>{
    console.log(req.body,'req.body')
    res.send(req.body)
})

//监听端口并启动web服务器
app.listen(port,()=>{
    console.log(`server is listening on port at port`)
})