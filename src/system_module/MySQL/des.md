<!--
 * @Date: 2022-11-30 22:19:41
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2022-12-01 00:13:22
 * @FilePath: /learn-node-20221114/src/system_module/MySQL/des.md
 * @name: filename
 * @description: description
-->
## 数据库
市面上的数据库
1. MySQL 有免费版的
2. Oracle 收费
3. SQL server 收费
4. Mongodb 有免费版的

其中mongodb是非关系数据库，其他为关系型数据库（属于传统数据库，设计理念相同用法类似）

SQL是一门数据库编程语言，使用SQL语言变写出来的代码叫做SQL语句，SQL语言只能在关系型数据库使用。
### MySQL
 
 首先了解下excel的数据组织结构
 1. 工作簿：整个excel
 2. 工作表：底部tab切换不同表
 3. 数据行： 行
 4. 列

 传统数据库组织结构
 1. 数据库： 类似excel工作簿
 2. 数据表： 类似excel工作表
 3. 数据行： 类似excel工作行
 4. 字段：   可以理解为excel的列

 - 实际开发中
 1. 每个项目对应一个数据库
 2. 不同数据，存储到数据库不同的表中，例如：用户信息 存储为一张表
 3. 字段决定每个表中具体的信息，例如：用户信息中的 余额 ，年龄， vip到期日期
 4. 表中每行，代表每条具体数据



 ## 安装
 对于开发人员安装以下两个
 官网下载
 [下载页面]( https://dev.mysql.com/downloads/file/?id=514404)
 [下载页面]( https://dev.mysql.com/downloads/workbench/)
 1. MySQL server:提供数据存储和服务
    或者进入官网，去下载MySQL community server
 2. MySQL Workbench : 可视化管理工具，方便操作存储在MySQL server中的数据

 ## SQL语句
    
    -- 通过*把users所有数据查询出来
    -- select * from users
    -- 从users表中吧username和age对于的数据查询出来
    -- select username, age from users
    -- 插入数据
    -- insert into users (id,username,age) values (3,'王五',22)
    -- 更新,where指定主键id为哪一行的数据
    -- update users set username='张三1' where id=1
    -- update users set username='张三12', age=44  where id=1
    -- 删除， 注意使用where，避免把表全部删除
    delete from users where id=1
    -- order by xxx (desc). 使用此子句对数据排序。默认asc生序，降序使用desc
    select * from users order by xxx 
    select * from users order by xxx desc
    -- 先升序，再降序
    select * from users order by xxx ,yyy desc
    -- 统计。 统计users表中xxx=某值的数量
    select count(*) from users where xxx=某值
    -- 别名。 使用 as 关键字起别名
    select count(*) as xxxtotal from users where xxx=某值