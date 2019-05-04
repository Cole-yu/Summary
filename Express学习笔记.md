# Express 框架学习笔记

### 创建项目
```
	npm install express -g   			// 安装全局express
	npm install express-generator -g   	// 安装命令行工具
	express --version  					// 查看express版本
	express 项目名称						// 初始化一个项目
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

	能匹配路由为 /butterfly 和 /dragonfly，但不会匹配 /butterflyman，/dragonflyman 等
	app.get(/.*fly$/, function (req, res) {
	  res.send('/.*fly$/');
	})

	// 带参数的路由
	app.post('/users/:userId/books/:bookId',function(req,res){
		res.send(req.params);
	});
```

### 中间件的定义和使用
```
	中间件加载的顺序很重要：首先加载的中间件函数也会先执行

	定义一个普通的中间件
	var myLogger = function(req, res, next) {
		console.log('LOGGED')
	  	next()
	}

	app.use(myLogger)    // 调用app.use()加载中间件功能，并且会执行中间件功能
```

### 可配置的中间件
```
	如果需要配置中间件，应该导出一个接受选项对象或其他参数的函数，然后根据输入参数返回中间件实现。
	
	定义一个中间件：my-middleware.js文件	
	module.exports = function(options) {
	  return function(req, res, next) {	    
	    // 基于options配置实现的自定义中间件
	    next()
	  }
	}

	使用中间件的方式：
	var mw = require('./my-middleware.js')
	app.use(mw({ option1: '1', option2: '2' }))		// mw函数返回一个中间件function(req, res, next){}
```

### 中间件分类
```
	应用程序级中间件
	var app = express()
	app.use(function (req, res, next) {
	  console.log('Time:', Date.now())
	  next()
	})

	路由器级中间件
	var app = express()
	// 路由器级中间件的工作方式与应用程序级中间件的工作方式相同，只不过它被绑定到一个实例express.Router()
	var router = express.Router()
	
	// 使用router.use()和router.METHOD()函数加载路由器级中间件。
	router.use('/user/:id', function (req, res, next) {
		console.log('Request URL:', req.originalUrl)
	  	next()
	}, function (req, res, next) {
	  	console.log('Request Type:', req.method)
	  	next()
	})
	app.use('/', router)		// 把路由安装到应用中


	要跳过该路由中的其他中间件，只需调用next('router') 将控制权交还给路由器实例
	router.get('/user/:id', function (req, res, next) {
		if (req.params.id === '0'){
	  		next('route')								// 跳到下一个路由，忽略下面的中间件	  
	  	}
	  	else{
 			next()
	  	}
	}, function (req, res, next) {					// 该路由下的下一个中间件	  
		res.render('regular')
	})
```

### 内置中间件
```
	express.static提供静态资产，如HTML文件，图像等。
	express.json使用JSON有效负载解析传入的请求（Express 4.16.0+）
	express.urlencoded使用URL编码的有效负载解析传入的请求（Express 4.16.0+）
```