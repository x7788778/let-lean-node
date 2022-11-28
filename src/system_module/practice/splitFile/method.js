/**
 * @Date: 2022-11-28 16:38:32
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2022-11-28 20:56:36
 * @FilePath: /learn-node-20221114/src/system_module/practice/splitFile/method.js
 * @name: 拆分html
 * @description: 借用node提供的方法，将html中的script，style单独抽离输出到dist文件夹下，再输出一份html以外链的形式引用、
 */



// 引入要用的模块
const fs = require('fs')
const path = require('path')

// 创建正则 : \s 匹配空白字符 ； \S非空白字符 ； * 匹配任意次数
const regexStyle = /<style>[\s\S]*<\/style>/
const regexScript = /<script>[\s\S]*<\/script>/

fs.readFile(__dirname+'/index.html','utf8',(err,data)=>{
    // console.log(err,'err')
    // console.log(data,'data')

    // data.match(regexStyle)
    // console.log(data.match(regexStyle))
    // resolveCss(data)
    // resolveScript(data)
    resolveHTML(data)
})
function resolveCss(str){
    //exec返回一个数组，0 是匹配到的结果，1是index， 2是str
    const res= regexStyle.exec(str)

    let resstr = res[0].replace('<style>','').replace('</style>','')
    console.log(res,'rescss')
    // fs.writeFile(path.join(__dirname,'./dist/index.css'),resstr,(err)=>{
    //     console.log(err,'resolveCss err')
    // })
}
function resolveScript(str){
    const res= regexScript.exec(str)

    let resstr = res[0].replace('<script>','').replace('</script>','')
    console.log(resstr,'resjs')
    fs.writeFile(path.join(__dirname,'./dist/index.js'),resstr,(err)=>{
        console.log(err,'resolveScript err')
    })
}
function resolveHTML(str){
    // 对html字符串中的style，script区域替换为link，script这种外联的形式
    const newHTML = str.replace(regexStyle,'<link rel="stylesheet" href="./index.css"/>').replace(regexScript,'<script src="./index.js"></script>')
    fs.writeFile(path.join(__dirname,'./dist/index.html'),newHTML,(err)=>{
        console.log(err,'resolveHTML err')
    })
}