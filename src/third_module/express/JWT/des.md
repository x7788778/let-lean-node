<!--
 * @Date: 2022-12-01 13:56:29
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2022-12-01 23:57:54
 * @FilePath: /learn-node-20221114/src/system_module/express/JWT/des.md
 * @name: filename
 * @description: description
-->
## cookie&token
cookie是http规范，而token是自定义传递
cookie会默认被浏览器存储，而token需要自己存储
token默认没有跨域限制

例子： 通过请求头中的authorization字段来定义token
jwt（JSON Web Token）是常见的实现方式
## jwt过程：
1、前端发起登陆，后端验证之后，生成并返回一个加密的token
2、前端自动存储这个token（包含了用户信息，加密了，只能服务端解密的,一般存储到localStroage或sessionStroage）
3、以后访问服务端接口，都带这个token，作为用户信息(请求头Authorization)
4、 服务端拿到token，认证成功后响应特定内容

## jwt组成
header.payload.signature
头.荷载.签名

## jwt(json web token) 项目中使用
1. 原材料：

    npm i jsonwebtoken express-jwt

jsonwebtoken: 生成JWT字符串
express-jwt:将JWT解析还原成json对象

2. 使用
    
    1. 导入两个包 见./index.js

    2. 定义secret密钥：用于jwt字符串加密解密
    生成JWT字符串前，需要加密。还原JWT字符串前，解密
        
        ```
        //引入工具
        const jwt = require ('jsonwebtoken') // 生成JWT
        const express_jwt = require ('express-jwt') //还原JWT为json字符

        //业务代码
        //密钥
        const secreatkey = '随便输入，越复  杂越好'

        //解密，
        app.use(express_jwt ({secret:secretKey}).unless  ({path:[/^\/api\//]}))

        //etc..解析req.body等操作..

        app.post('/api/login',(req,res) =>{
            // 生成加密JWT字符串, 包含用户信息,挂载到req.user
            
            const tokenstr = jwt.sign({usernname:userInfo.  username},secretKey,{expiresIn: '30s'})

            res.send({
                ...infos,
                token:tokenstr
            })
        })

        app.get('/admin/info',(req,res) =>{

            //
            console.log(res.user)
        })


        -----------
        //web第一次请求/api/login 会在data中得到加密token，可以存储在web缓存中比seesionStorage
        // 后续的请求都要在header中配置 Authorization: bearer token 来请求，token供服务端解析认证，成功后会返回数据，否则请求失败UnauthorizedError（这里是  express-jwt在解析过程中发现token过期或者不合法会报错）。

        //对此可以在最后注册一个捕获错误的中间件
        app.use(function(err,req,res,   next){
            if(err.name ===     'UnauthorizedError'){
                return res.send({
                    status:401,
                    message:'无效token'
                })

            }
            res.send({
                status:500,
                message:'未知错误'
            })
        })
        ```
吧啦吧啦
