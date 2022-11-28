/**
 * @Date: 2022-11-27 23:49:48
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2022-11-28 00:06:48
 * @FilePath: /learn-node-20221114/src/system_module/practice/inOrder.js
 * @name: 整理成绩
 * @description: 读取 ./成绩.txt 文件，整理并到处到 ./成绩-ok.txt
 */

const fs = require('fs')

const content = fs.readFile('./成绩.txt','utf8',function(err,data){
    console.log(err,'err')
    console.log(data,'data')
    if(err == null){
        let res = data.replace(/=/g,':',)
        console.log(res)
        fs.writeFile('./成绩-ok.js',res,function(err){
            console.log(err,'writeFile')
        })
    }
})

