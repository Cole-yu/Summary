# Express 框架学习笔记

### 原生 Node.js 实现后台 HTTP 服务
```
	var http = require("http");
	var app = http.createServer(function(req,res){
		
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
	});
	app.listen(3000);
	console.log("server is listening at port 3000!");
```

### 使用 express-generator 快速生成的 Express 应用的骨架
```
	npm install -g express-generator
	express --view=pug myapp  					// jade had been rename as pug
	npm install
	set DEBUG=myapp:* & npm start
```

###	express.static 中间件函数
```
	app.use(express.static('public'));
	app.use(express.static('files'));

	为了提供诸如图像、CSS 文件和 JavaScript 文件之类的静态文件,
	使用 Express 中的 express.static 内置中间件函数
	可以将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了
```
### 处理请求
```	
	app.get('/', function (req, res) {
		res.send('Hello World!')
	});

	app.post('/', function (req, res) {
	  	res.send('Got a POST request')
	});

	app.put('/user', function (req, res) {
	  	res.send('Got a PUT request at /user')
	});

	app.delete('/user', function (req, res) {
	  	res.send('Got a DELETE request at /user')
	});
```

### 如何处理 404 响应？
```
	app.use(function (req, res, next) {
		res.status(404).send("Sorry can't find that!")
	});
```

### 如何设置一个错误处理器？
	app.use(function (err, req, res, next) {
	  	console.error(err.stack)
	  	res.status(500).send('Something broke!')
	});

### 服务端渲染 Server Side Render (SSR)
```
	如何渲染纯 HTML 文件？
	无需通过 res.render() 渲染 HTML。 
	可以通过 res.sendFile() 直接对外输出 HTML 文件。 如果需要对外提供的资源文件很多，可以使用 express.static() 中间件。
```

### 路由匹配规则
```	
	app.get('/', (req, res) => res.send('Hello World!'));

	// 匹配 /acd /abcd 的路由
	app.get('/ab?cd', function (req, res) {
	  	res.send('ab?cd');
	});

	// 匹配 /abcd /abbcd /abbbcd 的路由
	app.get('/ab+cd', function (req, res) {
	  	res.send('ab+cd');
	});

	// 匹配 /abcd /abfcd /abffcd /ac123cd 等等以ab开始，cd结尾的路由
	app.get('/ab*cd', function (req, res) {
	  	res.send('ab*cd');
	});

	// 匹配 /abe 和 /abcde 
	app.get('/ab(cd)?e', function (req, res) {
	  	res.send('ab(cd)?e');
	});

	// 匹配任何包含 a 的路由 ，注意没有 '单引号' 和 "双引号"
	app.get(/a/, function (req, res) {
		res.send('/a/');
	});

	能匹配路由为 /butterfly 和 /dragonfly，但不会 /butterflyman，/dragonflyman 等
	app.get(/.*fly$/, function (req, res) {
	  res.send('/.*fly$/'); 
	})

	// 带参数的路由
	app.post('/users/:userId/books/:bookId',function(req,res){
		res.send(req.params);
	});
```	