<!--
 * @Date: 2022-11-29 14:02:48
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2022-11-29 14:28:03
 * @FilePath: /learn-node-20221114/src/system_module/tomodule/des.md
 * @name: filename
 * @description: description
-->
# commonjs

规范： require module.exports

require('a.js') === a模块中module.exports 的内容


## export 和 module.exports
规范：
1. 每个模块内部，有一个module变量的对象， 代表当前模块
2. module.exports 是对外接口， 外部加载此模块实际上是加载了module.exports这个属性

注意：
exports用法上是module.exports的简写形式
exports === module.exports // true

exports -> module.exports -> {}
所以使用时注意mudle.exports = *** 可以
exports = *** 不行

遵循一个原则：require()一个模块时，得到的永远是module.exports 指向的对象

总结： 为了避免引用错乱，保险起见始终使用module.exports导出
