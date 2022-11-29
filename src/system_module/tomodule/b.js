/**
 * @Date: 2022-11-29 14:07:35
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2022-11-29 14:12:20
 * @FilePath: /learn-node-20221114/src/system_module/tomodule/b.js
 * @name: filename
 * @description: description
 */
const a = 1
const foo = function (){
    return 1
}

// module.exports = {
//     a,
//     foo
// }
exports = {
    a,
    foo
}
// exports.a = a
// exports.foo = foo