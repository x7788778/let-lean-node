<!--
 * @Date: 2022-11-29 21:43:34
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2022-11-30 22:19:28
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


## express 使用 cors 解决跨域问题
1. npm i cors
2. const sors = require('cors')
3. 路由之前注册 app.use(cors())

cors由一系列http响应头组成，这些响应头觉得浏览器是否阻止前端js跨域获取资源
浏览器 同源安全策略默认阻止跨域。但服务器配置cors响应头，就可以解除

cors有兼容性，只有支持XMLHttpRequest level2的浏览器（如ie10+， chrome4+ fireFox3.5+)，才能正常开启

看下都有哪些响应头

    Access-Control-Allow-Origin: originn | *
    // origin指定语序访问该资源的外域URL ，只支持单一一个或所有。不能配置白名单啥的
    
    Access-Control-Allow-Headers
    // 默认情况下cors仅支持客户端向服务器发送如下9个请求头
    // Accept、Aceept-Language、Content-Language、DPR、DownLink、Save-Data、ViewPort-Width、Content-Type(三选一：text/plain、 multipart/form-data、application/x-www-form-urlencoded)
    //如果客户端给服务器发送了额外的请求头，需要在服务的通过此cors响应头对额外的一些响应头进行声明，否则这次请求会失败
    // 比如res.setHeader('Access-Control-Allow-Headers','Centent-Type, X-Custom-Header ')

    Access-Control-Allow-Methods
    // 默认情况下，CORS仅支持GET,POST,HEAD。如需服务端支持PUT、DELETE，再此响应头声明
    //res.setHeader('Access-Control-Allow-Methods','*') *代表通配符，或者'POST,GET,DELETE,PUT'

CORS简单请求：

    支持GET,POST,HEAD
    仅限上文中9个请求头

预检请求：
    客户端向服务端发送请求时会先发送OPTION进行请求预检，询问服务器是否允许该实际请求。服务器成功响应预检请求（响应204），进行真正的请求。
    
    什么情况下触发预检请求

    向服务器发送application/json 格式数据
    包含自定义头部字段
    请求方式不为GET,POST,HEAD

