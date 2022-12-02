/**
 * @Date: 2022-12-01 17:12:42
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2022-12-01 17:18:15
 * @FilePath: /learn-node-20221114/src/system_module/express/JWT/utils.js
 * @name: filename
 * @description: description
 */
const qs = require('querystring')
// 自定义中间件
const bodyParsevm = function(req,res,next){
    let str = ''

    // 数据量比较大的时候，需要拼接
    req.on('data',(chunk)=>{
        // console.log(chunk,'chunk')
        str+=chunk
    })
    req.on('end' ,()=>{
        // console.log(str,'str')
        req.body = qs.parse(str)
        next()
    })
}

module.exports =  {bodyParsevm}