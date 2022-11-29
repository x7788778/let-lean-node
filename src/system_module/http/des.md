
# http模块
[node官网](https://nodejs.org/zh-cn/docs/guides/anatomy-of-an-http-transaction/)

官方提供的、用来创建web服务器的模块。
通过http.createServer(),可以创建web服务器，对外提供web资源

服务器和普通电脑的区别，服务器安装了web服务器软件，如：IIS,Apache等。通过安装这些服务器软件，把普通电脑变成一台web 服务器

## 前置相关知识

1. IP地址
开发中使用127.0.0.1 这个IP
生产中使用域名绑定自己网络的真实IP
2. 域名 ， DNS ， 端口号
一个端口对应一个web服务