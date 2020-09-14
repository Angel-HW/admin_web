# 英雄联盟信息管理端   
### 2020.8.24   
* 问题1：在浏览器输入`localhost:3000`不能访问数据接口，输入`ip+端口`可以
* 解决：baseUrl设置时`http`写成`https`,改过来即可

* 问题2：跨域问题
```js
Access to XMLHttpRequest at 'http://localhost:3000/about' from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```
* 解决：利用CORS解决
***
### 2020.9.3
* 问题：子组件向父组件传值？
* 方法：父组件写法：`@子组件设置的名字="在父组件接受的方法名"`   
