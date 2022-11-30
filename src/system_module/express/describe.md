<!--
 * @Date: 2022-11-29 21:43:34
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2022-11-30 20:12:07
 * @FilePath: /learn-node-20221114/src/system_module/express/describe.md
 * @name: filename
 * @description: description
-->

对于前端程序员来说，常见两种服务器
web server 对外提供web 网页资源的服务器
api server 对外提供api接口的服务器
## 托管静态资源
express.static() 
使用时 app.use(express.static('d'))

## 路由
app.METHOD(PATH,HANDLER)
express中的路由，请求类型，请求url地址，请求的处理函数 3部分组成
匹配时按照路由存在的先后顺序依次尝试匹配，成功后触发callback
    
    app.get

    app.post
## 模块化路由管理
express官方不建议直接挂app上注册路由，推荐抽离成模块

步骤：
新建.js文件，使用express.Router(), moudule.exports导出, 主文件再引用使用，app.use注册这个路由模块
    
    //router.js
    express.Router().get(path,callback)
    express.Router().post(path,callback)
    module.exports = express.Router()

    //index.js

    app.use(require(./router.js))

express.Router()和app都挂载有注册路由的方法,比如.get .post

## [中间件](https://www.expressjs.com.cn/4x/api.html#middleware-callback-function-examples)

作用：多个中间件共享同一份req,res。基于这个特点，可以在上游中间件，统一为req，res对象添加自定义方法属性，供下游中间件或路由使用。
在处理服务请求时，我们要进行很多细节的处理，比如解析请求体，报文报头，设置 cookie 等等很多操作

客户端->中间件1->中间件2->中间件n->路由响应->客户端

全局中间件
app.use方法本地挂载一个中间件，全局生效
客户端任何请求到服务器，都会触发中间件，叫做全局中间件

    app.use(function (req, res, next) {
        // 流转关系交给下一个中间件或者路由
        next()
    })

局部中间件
不实用app.use定义的中间件为局部中间件
方法：路由方法参数的中间，为局部中间件

    const mw = function (req, res, next) {
        // 流转关系交给下一个中间件或者路由
        next()
    })

    // 仅当客户端匹配到‘/’的路由时，触发中间件
    // 可以添加一个或多个中间件
    app.get('/',mw1,mw2 ,mwn,(req,res)=>{

    })


路由也可以做中间件

    var router = express.Router()
    router.get('/', function (req, res, next) {
        next()
    })
    app.use(router)


express中间件注意事项：
1. 路由之前注册中间件
2. 客户发过来的请求，可以连续调用多个中间件进行处理
3. 执行完中间件业务代码，最后调用next()
4. next()后不要写业务代码，避免逻辑混乱
5. 连续调用多个中间件，它们之间会共享req,res对象

express把常见中间件用法分为5大类，方便记忆

1. 应用级 中间间
绑定到app.use, app.get app.post 这种绑定到app实例
2. 路由级 中间件
绑定到express.Router() 实例上

3. 错误级 中间件
专门捕获项目发生的错误，防止异常崩溃
格式 function(err,req,res,next) 。注意必须要4个形参
注意： 错误中间件要放在所有路由之后
    
    // 如果发生错误，会被错误中间件补货
    app.use(function(err,req,res,next){
        console.log(err,'发生故障！')
    })
4. express 内置中间件
express内置3个常用中间件

express.static 托管静态资源
express.json 解析JSON格式请求数据 (^4.16.0)
express.urlencoded 解析URL-encoded 格式请求数据(^4.16.0)

    //配置解析application/json格式数据的内置中间件
    app.use(express.json())
    // 配置解析application/x-www-from-urlencoded 格式数据的内置中间件
    app.use(express.urlencoded({extended:false}))
5. 三方 中间件
4.16.0版本之前经常使用body-parse三方中间件来解析数据

##### 自定义中间件
模拟一个express.urlencoded 解析post提交到服务器的表单数据




