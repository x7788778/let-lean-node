/**
 * @Date: 2022-11-29 14:07:30
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2022-11-29 14:10:12
 * @FilePath: /learn-node-20221114/src/system_module/tomodule/a.js
 * @name: filename
 * @description: description
 */
const val = require('./b')

console.log(val,'引入b的内容')
console.log(exports,'exports对象')