# Node.js 学习笔记

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