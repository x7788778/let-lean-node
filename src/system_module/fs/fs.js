/**
 * @Date: 2022-11-27 23:03:47
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2022-11-28 13:07:13
 * @FilePath: /learn-node-20221114/src/system_module/fs/fs.js
 * @name: fs模块
 * @description: node官方提供的、用来操作文件的模块。
 * @method: fs.readFile(),读取指定内容
 * @method: fs.writeFile(), 指定文件中写入的内容
 */

const fs = require('fs')
const path = require('path')
/**
 * @param {string} : path 指定路径
 * // 需要注意的是在shell中使用node执行此文件的时候，node会拿当前所在目录拼上path，所以容易动态路径出错，
 * 所以保险起见需要绝对路径
 * @param {string} : 编码格式
 * @param {function name(err,data) {}} : 回调函数
 */

//Users/mac/Desktop/someObject/learn-node-20221114/readme.md
// 找到绝对路径
// const apath = path.resolve(__dirname,'../../..','./readme.md')
const apath = path.resolve(__dirname,'./1.txt')

// path.resolve()
console.log(apath,'__dirname')
const content = fs.readFile(apath,'utf8', function(err,data){
// const content = fs.readFile('Users\\mac\\Desktop\\someObject\\learn-node-20221114\\readme.md','utf8', function(err,data){
    // err: 成功err 为null ，是被err为一个错误对象
    // data： 成功为文件内容，失败为undifided
    console.log(err,'readFile err')
    console.log('------')
    console.log(data,'readFile data')
})

/**
 * @param {string} : 路径
 * @param {string} : 写入内容
 * @param {string} : 回调
 */
fs.writeFile('./1.txt','testwrite',function(err){
    // err与readFile格式一致
    console.log(err,'writeFile')
})