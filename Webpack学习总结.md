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
