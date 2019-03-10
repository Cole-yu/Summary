# Node.js 学习笔记

### 原生 Node.js 实现后台 HTTP 服务
```
	var http = require("http");
	http.createServer(function(req,res){
		
		// 接收前台传递的数据
		req.on("data",function(data){

		});

		req.on("end",function(){
			// 设置状态码和响应头
			res.writeHead(200,{

			});

			// 返回内容
			res.write("ok");

			res.end();
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