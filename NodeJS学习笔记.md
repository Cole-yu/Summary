# Node.js 学习笔记

### 原生 Node.js 实现后台 HTTP 服务
```
	var http = require("http");
	http.createServer(function(req, res){
		var result = '';
		// 接收前台传递的数据
		req.on("data", function(data){
			result = result + data;
		});

		req.on("end",function(){
			res.statusCode = 1000;
			res.setHeader("Content-Type", "application/json");
			// 设置状态码和响应头
			res.writeHead(200, {
				"Access-Control-Allow-Origin": '*',
				"Access-Control-Allow-Headers": "Content-Type",
				"Content-Type": "text/html"			// 当响应头重复时，以writeHead为最终结果
			});			
			res.write("ok" + res.statusCode);		// 返回内容
			res.end();								// 关闭响应
		});
	}).listen(3000);
	console.log("server is listening at port 3000!");
```

### Node.js 实现 Websocket 后台服务
```
	var WebSocket = require('ws');
	WebSocketServer = websocket.server;
	
	// 快捷方式写法
	// var WebSocketServer = require('ws').Server;

	wss = new WebSocketServer({ port: 8081 });

	wss.on('connection', function (ws) {
	    console.log('client connected');
	    ws.on('message', function (message) {
	        console.log(message);
	    });

	    var id = setInterval(()=>{
	    	var date = new Date();
	    	var time = date.getTime();
	    	console.log("服务端定时推送了内容，内容是" + time);
	    	ws.send("现在服务器时间是" + time);
	    },2000);

	    ws.on('close', function() {
			console.log('stopping client interval');
		    clearInterval(id);
		});
		
	});
```

### 连接数据库
	http://www.runoob.com/nodejs/nodejs-mysql.html

### Node.js 连接 mysql 数据库并查询
```
	var mysql  = require('mysql');  

	var connection = mysql.createConnection({
	  host     : 'localhost',       
	  user     : 'root',
	  password : '',
	  port: '3306',                   
	  database: 'user_cmx' 
	}); 
	 
	connection.connect();
	 
	var  sql = "select name,age from user where name='yfx'";
	//查
	connection.query(sql,function (err, result) {
	        if(err){
	          console.log('[SELECT ERROR] - ',err.message);
	          return;
	        }
	 
	       console.log('--------------------------SELECT----------------------------');
	       console.log(result);
	       console.log('------------------------------------------------------------\n\n');  
	});
	 
	connection.end();
```	

### git bash 控制台命令语句
```	
	touch .gitignore 生成文件名为.gitignore文件
	ls 显示当前目录的文件列表 = window下的 dir
	mkdir 文件夹 生成文件夹
	rm -rf 文件夹 删除文件夹
	code 文件夹 使用vs-code 打开文件
```

### Node.js调试
```
	慕课网学习链接 https://www.imooc.com/video/18621

	Inspector的构成以及原理
	WebSockets服务（监听命令）
	Inspector协议
	HTTP服务(获取元数据)

	Debugger listening on ws://127.0.0.1:10215/8926bd56-1c06-4e19-98b3-63c177c279c2 For help, see:https://nodejs.org/en/docs/inspector

	浏览器打开的websocket地址		127.0.0.1:10215
	元数据【地址/json】				127.0.0.1:10215/json

	node --inspect app.js 使用inspect调试 app.js文件

	三种调试方式
	方式一	chrome://inspect 配置启动的端口（打印信息中有） 127.0.0.1:9229


	方式二 127.0.0.1:9229/json 
	"devtoolsFrontendUrl": "chrome-devtools://devtools/bundled/js_app.html?experiments=true&v8only=true&ws=127.0.0.1:9229/d96a593a-5720-4d17-b7a8-679ec770b1f7"
	
	在浏览器中粘贴devtoolsFrontendUrl字段的值（chrome-devtools://devtools/bundled/js_app.html?experiments=true&v8only=true&ws=127.0.0.1:9229/d96a593a-5720-4d17-b7a8-679ec770b1f7），回车即可


	方式三
	浏览器F12 点击Element标签前面的Node.js 图标即可 		// 在Node 版本10.0以后无效

	node --inspect-brk app.js 一直等待直到客户端附加上断点

```

### 监听js代码,自动重启服务(nodemon与supervisor)
```
	注意：每次我们更新代码后,都需要手动停止并重启应用,用supervisor模块可以解决这个问题,每当我们保存修改的文件时,supervisor都会自动帮我们重启应用
	1.  安装supervisor   
		$ npm install -g supervisor
	2.  使用supervisor命令启动app.js
		$ supervisor app.js
```

### node.js 常见工具包
```
	http-proxy-middleware 项目内代理proxy地址
	const { createProxyMiddleware } = require("http-proxy-middleware");
	https://github.com/chimurai/http-proxy-middleware;

	react-dev-utils react 中打开浏览器页面;
	const openBrowser = require('react-dev-utils/openBrowser');
	openBrowser('http://www.baidu.com');
```

### glob 模块
```
	glob模块是一个用来匹配文件路径的模块，可以使用通配符来匹配多个文件路径。在Node.js中可以使用glob模块来读取文件、检查文件是否存在、筛选需要处理的文件等。

	import { glob, globSync, globStream, globStreamSync, Glob } from 'glob';
	let arr = glob.sync('./src/*');
	console.log('arr', arr);
	let moduleList = [];
	for (var x in arr) {
	    let a = arr[x].split('\\')[1];
	    moduleList.push(arr[x].split('\\')[1]);
	}
	console.log('加载模块:', moduleList);

	await glob() globSync glob.sync() // 同步执行
	Class Glob 类
		const g = new Glob(pattern: string | string[], options: GlobOptions)
```


### fs 模块
```
	let fs = require('fs');
	fs.readFile(); // 异步读取文件
	fs.writeFile(); // 异步写入文件

```