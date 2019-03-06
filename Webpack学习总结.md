# Webpack学习总结
	react中大量使用了webpack
	把资源打包在一个文件中，减少http请求，提高性能

### 安装好webpack后，通过控制台手动输入命令行指令进行打包操作
	node_modules/.bin/webpack app/main.js public/bundle.js 改为 npx webpack app/main.js --output public/bundle.js
	node_modules/.bin/webpack 改为 npx webpack

### 输出文件添加 hash 值
	output: {
        path: __dirname + "/build",			// _dirname 为项目根目录
        filename: "bundle-[hash].js"		// 输出文件添加 [hash] 值，解决缓存问题
    }

### 把打包指令写在配置文件中（封装，重复使用，webpack.config.js)中，避免每次都输一大推操作指令
	设置好配置文件后，直接输入 webpack 即可

### 开发中使用source map
```
	广泛推荐 devtool:"#cheap-module-eval-source-map" 效率高
	module.exports = {
		...一系列省略的配置,
		devtool: 'inline-source-map'	// 开启文件映射
	}		
 	source map 功能，将编译后的代码映射回原始源代码。如果一个错误来自于 b.js，source map 就会明确的告诉你。	
```
### webpack-dev-server
```
	devserver的配置选项	功能描述
	contentBase	默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录）
	port	设置默认监听端口，如果省略，默认为”8080“
	inline	设置为true，当源文件改变时会自动刷新页面
	historyApiFallback	在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
	hot     设置为true，开启组件模块局部刷新功能
```

### css-loader与style-loader的区别
```
	css-loader  	文件层面
	style-loader 	内容层面
	css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,
	style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。
```

### 插件（Plugins）与 loaders 的区别
```
	插件（Plugins）是用来拓展Webpack功能的，它们会在整个构建过程中生效，执行相关的任务。
	loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用。
```
### html-webpack-plugin
	这个插件的作用是依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html。
	这在每次生成的js文件名称不同时非常有用（比如添加了hash值）。

### 模块热替换(Hot Module Replacement,缩写 HMR)
```
 	webpack-dev-server
	HMR 不适用于生产环境，这意味着它应当只在开发环境使用；
	开发过程中文件保存后更新效果，只更新相应的组件模块，而不是整体页面刷新，因而不会丢失其他模块中已填写的表单数据。
	const webpack = require('webpack');
	devServer: {
      contentBase: './dist',
      hot: true
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),      
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()   // HMR
    ],
```

### 生产环境构建	

### 代码分离

### 懒加载或者按需加载

### shimming(填隙,细粒度)
```	
	shim 是一个库(library)，它将一个新的 API 引入到一个旧的环境中，而且仅靠旧的环境中已有的手段实现。polyfill 就是一个用在浏览器 API 上的 shim。我们通常的做法是先检查当前浏览器是否支持某个 API，如果不支持的话就加载对应的 polyfill。然后新旧浏览器就都可以使用这个 API 了。
```

### 渐进式网络应用程序
	渐进式网络应用程序(Progressive Web Application - PWA)，是一种可以提供类似于原生应用程序(native app)体验的网络应用程序(web app)
	原理是 通过使用 Service Workers 的网络技术来实现的

###	Service Worker
	https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API
	Service workers 本质上充当Web应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理。它们旨在（除其他之外）使得能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作。他们还允许访问推送通知和后台同步API。

### webpack与gulp,grunt的区别
```
	1. webpack 是一个模块打包器(module bundler)（例如，Browserify 或 Brunch）；

	2. 它不是一个任务执行器(task runner)（例如，Make, Grunt 或者 Gulp ）。任务执行器就是用来自动化处理常见的开发任务，
	例如项目的检查(lint)、构建(build)、测试(test)。相对于打包器(bundler)，任务执行器则聚焦在偏重上层的问题上面；

	3. 可以得益于，使用上层的工具，而将打包部分的问题留给 webpack。

	4. 打包器(bundler)帮助你取得准备用于部署的 JavaScript 和样式表，将它们转换为适合浏览器的可用格式。例如，JavaScript 可以压缩、拆分 chunk 和懒加载，以提高性能。打包是 web 开发中最重要的挑战之一，解决此问题可以消除开发过程中的大部分痛点。
```

# 使用Webpack中搭建Vue开发环境 的学习笔记
	https://www.imooc.com/video/16402

	npm install -D vue-loader vue-template-compiler

### 环境搭建中的坑
```
	vue-loader在15.*之后的版本
	vue-loader的使用都需要伴随 VueLoaderPlugin的使用： https://vue-loader.vuejs.org/guide/#vue-cli
	
	const path = require("path");
	const VueLoaderPlugin = require('vue-loader/lib/plugin'); 
	module.exports={
	    entry:path.join(__dirname,'src/index.js'),
	    output:{
	        filename:"bundle.js",
	        path:path.join(__dirname,'dist')
	    },
	    module:{
	        rules:[
	            {
	                test:/.vue$/,
	                loader:'vue-loader'
	            },
	            {
	                test: /.css$/,                
	                loader: "css-loader"                
	            }                             
	        ],        
	    },
	    plugins: [                
	       new VueLoaderPlugin()
	    ],
	    mode:"development"
	}
```	

### vue中 render 拼错成了 reder 模板编译错误
	vue.runtime.esm.js?2b0e:619 [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.(found in <Root>)

### extract-text-webpack-plugin
	原因：extract-text-webpack-plugin 最新版本为 3.0.2，这个版本还没有适应 webpack 4 的版本
	解决办法：使用 4.0 beta 版，npm install --save-dev extract-text-webpack-plugin@next	

### CommonsChunkPlugin
	Error: webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.	


### webpack-dev-server 的 proxy 用法
```
	参考API文档 https://github.com/nodejitsu/node-http-proxy#options

	用法一 单个API
		mmodule.exports = {
		    //...
		    devServer: {
		        proxy: {
		            '/api': 'http://localhost:3000'
		        }
		    }
		};

	用法二 多个API
		module.exports = {
		    //...
		    devServer: {
		        proxy: [{
		            context: ['/auth', '/api'],
		            target: 'http://localhost:3000',
		        }]
		    }
		};
	
	用法三 如果不想始终传递 /api ，则需要重写路径：
		module.exports = {
		    //...
		    devServer: {
		        proxy: {
		            '/api': {
		                target: 'http://localhost:3000',
		                pathRewrite: {'^/api' : ''}
		            }
		        }
		    }
		};
	
	用法四 默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果你想要接受，只要设置 secure: false 就行。
		修改配置如下：
		module.exports = {
		    //...
		    devServer: {
		        proxy: {
		            '/api': {
		                target: 'https://other-server.example.com',
		                secure: false
		            }
		        }
		    }
		};
	
	用法五 有时你不想代理所有的请求。可以基于一个函数的返回值绕过代理。在函数中你可以访问请求体、响应体和代理选项。必须返回 false 或路径，来跳过代理请求。		
		例如：对于浏览器请求，需要提供一个 HTML 页面，但是对于 API 请求则保持代理。可以这样做：
		module.exports = {
		  	//...
		    devServer: {
		        proxy: {
		            '/api': {
		                target: 'http://localhost:3000',
		                bypass: function(req, res, proxyOptions) {
		                    if (req.headers.accept.indexOf('html') !== -1) {
		                        console.log('Skipping proxy for browser request.');
		                        return '/index.html';
		                    }
		                }
		            }
		        }
		    }   
		};

	用法六 解决跨域原理
		参数列表中有一个changeOrigin参数, 是一个布尔值, 设置为true, 本地就会虚拟一个服务器接收你的请求并代你发送该请求
		module.exports = {
		    //...
		    devServer: {
		        proxy: {
		            '/api': {
		                target: 'http://localhost:3000',
		                changeOrigin: true,
		            }
		        }
		    }
		};
```

### Webpack 中安装 polyfill
```
	npm install --save babel-polyfill   // 注意是babel-polyfill 不是babel/polyfill,也不是 @babel/polyfill
	方法一：在webpack项目的js入口顶部引入
		import "babel-polyfill";
	方法二：在webpack.conf.js中添加入口
		entry: ["babel-polyfill",'./src/app.js']
	方法三：(浏览器环境)在html的<head>标签中引入babel-polyfill.js(CDN或本地文件均可)
```	


# webpack搭建项目环境时需要的依赖包
```
	npm install -g webapck   			// 全局安装

	npm install webpack --save-dev   	// 安装开发依赖
	npm install webpack-cli --save-dev

	cross-env 	// 注意：在配置环境变量时需要
		"script":{
			"build": "cross-env NODE_ENV=production webpack --config webpack.conf.js",
	    	"dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.conf.js"
	    }

	css-loader
	vue
	vue-template-compiler
	vue-loader  (依赖css-loader)

	style-loader

	url-loader	(注：可以处理font-awesome 的字体文件，但是file-load 处理不了)
		{
            test:/\.(gif|jpg|jpeg|png|svg|ttf|eot|woff|woff2)$/,        // url-loader可以处理 font-awesome 的字体文件
            use:[
                {
                    loader:"url-loader",
                    options:{
                        limit:1024,
                        name:"[name].[hash:8].[ext]"
                    }
                }
            ]
        }
	file-loader

	clean-webpack-plugin			
	html-webpack-plugin				// 创建index.html
	
	extract-text-webpack-plugin  	// 分离css  npm install --save-dev extract-text-webpack-plugin@next	
		原因：extract-text-webpack-plugin 最新版本为 3.0.2，这个版本还没有适应 webpack 4 的版本
		解决方法: npm install --save-dev extract-text-webpack-plugin@next
			"extract-text-webpack-plugin": "^4.0.0-beta.0"
	建议替代为
	mini-css-extract-plugin   // webpack 4 以后用于替换 extract-text-webpack-plugin
	用optimize-css-assets-webpack-plugin 为生产环境压缩css文件

	uglifyjs-webpack-plugin   // 压缩js,设置环境变量为production后 webapck会自动进行压缩文件，可以不需要

	babel-core						// ES6的代码
	babel-loader

	webpack-dev-server				// 开发页面

	要在vue项目中使用jsx语法
	需要在.babelrc中添加 transform-vue-jsx 插件，同时安装 npm install babel-plugin-transform-vue-jsx
	
```

### .babelrc的配置语法用于在vue项目中写 JSX
```
	{
	    "presets": [
	        "env"					// npm install babel-preset-env
	    ],
	    "plugins":[					
	        "transform-vue-jsx"
			// 需要安装 babel-plugin-syntax-jsx  babel-helper-vue-jsx-merge-props  babel-plugin-transform-vue-jsx
	    ]
	}
```

### postcss.config.js
```
	自动补全浏览器私有属性前缀
	   	-webkit-transform : rotate(0deg);
		   -moz-transform : rotate(0deg);
		     -o-transform : rotate(0deg);
		        transform : rotate(0deg);

	// npm install autoprefixer postcss-loader

	const autoprefixer = require("autoprefixer");   
	module.exports={
	    plugins:[
	        autoprefixer()
	    ]
	}	
```

### 使用scss 
	npm install sass-loader node-sass    	// sass-loader 也能解析scss语法


### chunkHash 与 hash 的区别	
```
	chunkHash 基于模块，一次改动就计算一次，用于一堆动态载入的模块的区分计算，输出出口的计算
	 	config.output.filename='[name].[chunkHash:8].js';

	hash 基于compilation，在项目编译时改变一次，用于静态资源 第三方库，图片
```

### webapck 添加网页标题
```
	使用 html-webpack-plugin 
	new HTMLPlugin({
	        title: '个人简历',               // 不会替换指定模板文件中的title元素的内容
	        favicon: './src/assets/images/title.png',       // 设置网页标题的favicon.icon路径
	        template:"./src/index.html",
	        minify:{                        // 压缩HTML文件
	            removeComments:true,        // 移除HTML中的注释
	            collapseWhitespace:true     // 删除空白符与换行符
	        }
	    }       
	)
```

### uglify.js 未成功压缩代码；原因：虽然加了babel-loader,但忘了添加处理 js的规则，
```
	错误提示  ERROR in static/js/app.d906119eedb53628d1bf.js from UglifyJs
	         Unexpected token: punc (() [static/js/app.d906119eedb53628d1bf.js:121,6]

	原因:  webpack 不能识别处理 ES6 的语法 或者  未成功将 es6 语法转化未 es5
	根本原因 uglifyjs-webpack-plugin 的核心处理器 UglifyJs 一般是无法解析ES6的问题 ，只能处理es5


	解决方法：我当初是成功安装了 .babelrc 的语法转化功能，但未在webpack.conf.js 写入js的处理
	添加对js的处理规则，用 babel 进行语法转化即可
		{
	        test: /\.js$/,
	        exclude: /(node_modules)/, // 排除文件
	        loader: 'babel-loader'
	    }
	
	https://www.cnblogs.com/wonyun/p/9108502.html

	https://www.cnblogs.com/tugenhua0707/p/9452471.html
```	