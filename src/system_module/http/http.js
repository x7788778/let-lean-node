/**
 * @Date: 2022-11-28 20:52:49
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2022-11-28 23:35:24
 * @FilePath: /learn-node-20221114/src/system_module/http/http.js
 * @name: filename
 * @description: description
 */
const http = require('http')

//创建服务对象
const server = http.createServer()

// 监听request ,有人请求服务器触发。
// req 请求对象， res 响应对象
server.on('request',(req,res)=>{
    // console.log(req,'request on,req')
    // console.log(res,'request on,res')
    const str = `
    路径为${req.url}
    方法为${req.method}
    请求头为${req.headers}
    `
    res.setHeader('Content-Type','text/html; charset=utf-8')
    
    // res.write res.end 都可以响应内容
    res.end(str)
})

// 通过data，end事件获取请求体。由于事件抓获的请求体是一个Buffer，所以需要放到数组中
let body = [];
server.on('data', (chunk) => {
  body.push(chunk);
}).on('end', () => {
  body = Buffer.concat(body).toString();
  console.log(body,'body')
  // at this point, `body` has the entire request body stored in it as a string
});

//参数：  端口， 回调
server.listen(80,()=>{
    console.log('server is listen on 80')
})