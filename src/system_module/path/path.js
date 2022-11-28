/**
 * @Date: 2022-11-28 13:25:59
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2022-11-28 20:51:26
 * @FilePath: /learn-node-20221114/src/system_module/path/path.js
 * @name: path模块
 * @description: nodejs官方提供的模块，提供了一系列的方法和熟悉，满足用户对路径处理的需求
 * @method： path.join() 多个路径片段拼接成一个完整的路径字符串
 * @method： path.basename(path,'要去掉的后缀名') 用来从路径字符串中，将文件名解析出来
 * @method：path.extname() 获取文件扩展名
 */

const path = require('path')
const fs = require('fs')
//path.join
// path.join('/a','../','/b')   // 输出 /b

// console.log(path.join(__dirname,'../../../','./readne.md'),'path.join') // 输出 /a/c path.join
// console.log(path.basename('/a/b/c/d.html','.html'),'path.basename')
console.log(path.extname('/a/b/c/d.html'),'path.extname')
fs.readFile(path.join(__dirname,'../../../','./readme.md'),'utf8',(err,data)=>{
    console.log(err,'err')
    console.log(data,'data')
})

path.basename('/a/b/c/d.html')

