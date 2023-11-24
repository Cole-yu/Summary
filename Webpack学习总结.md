# Webpack学习总结

### 官网
```
	https://www.webpackjs.com/
```

### 概念
```
	webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。
	根据模块之间的依赖关系，进行分析打包在整个依赖图中的模块资源，生成最终的浏览器能高效运行的静态资源。

	入口(entry)
	输出(output)
	loader
	插件(plugin)
	模式(mode)
	浏览器兼容性(browser compatibility)
	环境(environment)
		可以使用 --node-env 选项来设置 process.env.NODE_ENV
		webpack --node-env development
		process.env.NODE_ENV === 'development' // true	
```

### 命令行接口
```
	【Webpack 命令行接口文档】：https://www.webpackjs.com/api/cli/#flags
	npx webpack serve --progress=profile --node-env development --config build/webpack.dev.js
```

### 代码分离，预获取/预加载
```
	prefetch（预获取）：将来某些导航下可能需要的资源
	preload（预加载）：当前导航下可能需要资源

	预加载和预获取的使用是通过魔法注释，其中prefetch的作用是该文件要等浏览器空闲时下载，而preload是正常跟父包一起下载，但两者都不会阻塞渲染，其中prefetch使用率更高。
	import(/* webpackPrefetch: true */ './path/to/LoginModal.js');
```

### Hash ChunkHash ContentHash 的区别
```
	hash本身是通过MD4的散列函数处理后 生成一个128位的hash值（32个十六进制）
	hash值的生成和整个项目有关系
	比如我们现在有两个入口index.js和main.js
	他们分别会输出到不同的bundle文件中 并且在文件名称中我们有使用hash
	这个时候 如果修改了index.js文件中的内容 那么hash会发生变化
	就意味着两个文件的名称都会发生变化

	chunkhash可以有效的解决上面的问题 他会根据不同的入口进行解析来生成hash值
	比如我们修改了index.js 那么main.js的chunkhash是不会发生改变的

	contenthash表示生成的文件hash名称 只和内容有关系
	比如我们的index.js，引入了一个style.css，style.css又被抽取到一个独立的css文件中
	这个css文件在命名时 如果我们使用的是chunkhash
	那么当index.js文件的内容发生变化时 css文件的命名也会发生变化
	这个时候我们可以使用contenthash

	Hash 基于 compilation，在项目编译时改变一次，用于静态资源 第三方库，图片

	ChunkHash 基于模块，一次改动就计算一次，用于一堆动态载入的模块的区分计算，输出出口的计算
	 	config.output.filename='[name].[chunkHash:8].js';

	Contenthash 基于文件内容发生变化
```

### babel-loader 处理 ES6 语法
```
	TypeScript/ES6 编译三要素模型：
		js源码
		js编译器：babel + 相关preset、plugin
		js编译配置：.babelrc

	npm install --save-dev babel-loader @babel/core

	webpack.config.js 配置
		{
		  module: {
		    rules: [
		      {
		        test: /\.m?js$/,
		        exclude: /node_modules/,
		        use: {
		          loader: "babel-loader",
		          options: {
		            presets: ['@babel/preset-env']
		          }
		        }
		      }
		    ]
		  }
		}

	npm install @babel/preset-env --save-dev

	babel.config.json 配置
		{
		  "presets": ["@babel/preset-env"]
		}

	配置文件，Babel 会查找和自动读取它们，所以以下配置文件只需要存在一个即可
	1. babel.config.*：新建文件,位于项目根目录
	（1）babel.config.js
	（2）babel.config.json
	2 .babelrc.*：新建文件，位于项目根目录
	（1）.babelrc
	（2）.babelrc.js
	（3）.babelrc.json
	3. package.json 中 babel：不需要创建文件，在原有文件基础上写

	presets 预设：就是一组 Babel 语法插件, 扩展 Babel 功能
		@babel/preset-env: 一个智能预设，允许您使用最新的 JavaScript
		@babel/preset-react：一个用来编译 React jsx 语法的预设
		@babel/preset-typescript：一个用来编译 TypeScript 语法的预设

	PS：官方收编的插件包通常以 "@babel/plugin-" 开头的，而预置集包通常以 "@babel/preset-" 开头。
```

### ts-loader 处理 Typescript
```
	TypeScript编译三要素模型：
		ts源代码
		ts编译器： tsc
		ts编译配置： tsconfig.json

	ts-loader 通过TypeScript编译器(tsc)来处理TypeScript文件，并转换为JavaScript文件


	npm install ts-loader --save-dev

	webpack.config.js 配置
		module: {
		    rules: [		
				{ test: /\.tsx?$/, loader: "ts-loader" },
			]
		}

	tsconfig.json 配置
		{
		    "compilerOptions": {
		        "module": "CommonJS",
		        "noImplicitAny": true,
		        "removeComments": true,
		        "preserveConstEnums": true,
		        "sourceMap": true
		    },
		    "include": [
		        "src/**/*"
		    ],
		    "exclude": [
		        "node_modules",
		        "**/*.spec.ts"
		    ]
		}
```

### ts-loader 处理 React+TSX 组合（推荐）
```
	使用 tsc 编译 .tsx 文件

	npm install react react-dom react-router-dom -S
	npm install @types/react @types/react-dom -D
	npm install @babel/preset-react -D

	babel.config.json 配置
		{
		 	"presets": [
		    	"@babel/preset-react"
		  	]
		}

	tsconfig.json 配置
		{
		    "compilerOptions": {
		        "module": "CommonJS",
		        "noImplicitAny": false,
		        "removeComments": true,
		        "preserveConstEnums": true,
		        "sourceMap": true,
		        "jsx": "react", // react模式会生成React.createElement，在使用前不需要再进行转换操作了，输出文件的扩展名为.js
		    },
		    "include": [
		        "src/ts/**/*.ts",
		        "src/ts/**/*.tsx"
		    ],
		    "exclude": [
		        "node_modules",
		        "**/*.spec.ts"
		    ]
		}

	webpack.config.js 配置
		{ 
	        test: /\.tsx?$/,
	        loader: "ts-loader"
	    },

    package.json 配置
	    "devDependencies": {
		    "@babel/core": "^7.23.2",
		    "@babel/preset-react": "^7.22.15",
		    "@types/react": "^18.2.36",
		    "@types/react-dom": "^18.2.14",
		    "babel-loader": "^9.1.3",
		    "ts-loader": "^9.5.0",	    
		    "webpack": "^5.89.0",
		    "webpack-cli": "^5.1.4"
		},
		"dependencies": {
		    "react": "^18.2.0",
		    "react-dom": "^18.2.0",
		    "react-router-dom": "^6.18.0",
		    "typescript": "^5.2.2",
		}
```

### babel-loader 处理 React+TSX 组合
```
	使用 babel 编译 .tsx 文件

	npm install react react-dom react-router-dom -S
	npm install @types/react @types/react-dom -D	
	npm install babel-loader @babel/core -D
	npm install babel-preset-react-app -D

	babel.config.json 配置
		{
		 	"presets": [
		    	"react-app" // npm i babel-preset-react-app -D
		  	]
		}	

	webpack.config.js 配置
		{ 
	        test: /\.tsx?$/,
	        loader: "babel-loader"
	    },

    package.json 配置
	    "devDependencies": {
		    "@babel/core": "^7.23.2",
		    "@babel/preset-react": "^7.22.15",
		    "@types/react": "^18.2.36",
		    "@types/react-dom": "^18.2.14",
		    "babel-loader": "^9.1.3",
		    "babel-preset-react-app": "^10.0.1",
		    "webpack": "^5.89.0",
		    "webpack-cli": "^5.1.4"
		},
		"dependencies": {
		    "react": "^18.2.0",
		    "react-dom": "^18.2.0",
		    "react-router-dom": "^6.18.0",
		    "typescript": "^5.2.2",
		}
```

### ts-loader 处理 Vue3+TSX 组合（推荐）
```
	使用 tsc 编译 .tsx 文件

	npm install ts-loader -S
	npm install vue-loader @vue/compiler-sfc -D
	npm install @vue/cli-plugin-babel -D

	babel.config.json 配置
		{
		 	"presets": [
		 		// "@babel/preset-env"
		    	"@vue/cli-plugin-babel/preset" 		// @vue/cli-plugin-babel 在"@babel/preset-env"的基础上扩展；其中jsx语法解析的底层依赖 “@vue/babel-plugin-jsx” 插件
		  	],
		  	"plugins": [
		    	// "@vue/babel-plugin-jsx" // "@vue/babel-plugin-jsx" 【JSX语法细节:】 https://github.com/vuejs/babel-plugin-jsx/tree/main
		  	]
		}

	tsconfig.json 配置
		{
		    "compilerOptions": {
		        "module": "CommonJS",
		        "noImplicitAny": false,
		        "removeComments": true,
		        "preserveConstEnums": true,
		        "sourceMap": true,
		        "jsx": "preserve", // tsc 编译将 tsx 输出文件的扩展名为.jsx
		    },
		    "include": [
		        "src/**/*.ts",
		        "src/**/*.d.ts",
		        "src/**/*.tsx",
		        "src/**/*.vue",
		    ],
		    "exclude": [
		        "node_modules",
		        "**/*.spec.ts"
		    ]
		}

	webpack.config.js 配置
		{ 
	        test: /\.tsx?$/,
	        exclude: /node_modules/,
	        use: [
	          	"babel-loader",
	          	{
	            	loader: "ts-loader", // tsc 编译
	            	options: {
	              		appendTsSuffixTo: [/\.vue$/], // 对应文件添加.ts或.tsx后缀 app.vue.ts
	              		// transpileOnly: true, // 关闭ts-loader的类型检查，即只进行转译；npm i fork-ts-checker-webpack-plugin -D, new ForkTsCheckerWebpackPlugin()
	            	}
	          	}
	        ]
	    },
	    {
	        test: /\.m?js$/,
	        exclude: /node_modules/,
	        use: 'babel-loader'
	    },
	    {
	        test: /\.vue$/,
	        loader: 'vue-loader',
	    }

    package.json 配置
	    "devDependencies": {
		    "@babel/core": "^7.23.2",
		    "@vue/cli-plugin-babel": "^5.0.8",
    		"@vue/compiler-sfc": "^3.3.8",
		    "babel-loader": "^9.1.3",
		    "ts-loader": "^9.5.0",
		    "vue-loader": "^17.3.1",    
		    "webpack": "^5.89.0",
		    "webpack-cli": "^5.1.4"
		},
		"dependencies": {
		    "typescript": "^5.2.2",
		    "vue": "^3.3.8"
		}
```

### browserslist 设置要适配的各市场浏览器版本，指定目标环境
```
	Browserslist 帮助我们在浏览器兼容性和包大小之间保持适当的平衡。使用 Browserslist，可以做到覆盖更广泛的受众（浏览器），同时包的体积也会保持最小化
	browserslist 值会被 @babel/preset-env 和 Autoprefixer 用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀

	1. 在 package.json 中声明
		"browserslist": [
		 	"> 0.2%",
		 	"last 2 versions",
		 	"not dead"
		]
	2. 通过 .browserslistrc 配置
		> 0.2%
		last 2 versions
		not dead

	[数据支撑查询](https://caniuse.com/ciu/browserset)
	[browserlist](https://browsersl.ist/)

	"not dead" 谨慎使用（移动端可以使用，PC端不建议使用），会过滤掉不再支持的浏览器，如 IE 11

	.browserslistrc
		[production]	// env 环境
		> 0.2%
		last 2 versions
		not dead


	查询当前 .browserslistrc 配置支持的浏览器版本
	npx browserslist
	npx browserslist -h  	// 帮助
	npx browserslist -v 	// 版本
```

### 安装 polyfill
1. 使用 core-js/stable，新方案
```
	pnpm add @babel/core
	pnpm add core-js

	babel.config.json .babelrc
	{
	  "presets": [
	    [
	      "@babel/preset-env",
	      {
	        "useBuiltIns": "usage",  // 自动引入
	        "corejs": "3.33.2"
	      }
	    ]
	  ]
	}

	从Babel 7.4.0开始，babel/polyfill 已经被弃用，取而代之的是直接包含 core-js/stable (含polyfill ECMAScript特性)
		import "core-js/stable";

	Babel 包含一个 polyfill，它包含自定义的 regenerator runtime 和 core-js 。这将模拟一个完整的 ES2015+环境，旨在用于应用程序，而不是库/工具。(这个polyfill在使用babel-node时会自动加载)。
	这意味着你可以使用新的内置方法，如 Promise 或 WeakMap，也可以使用静态方法，如 Array.from 或 Object。
```
2. 使用 @babel/polyfill，老方案
```	
	在webpack中，有多种方式来包含polyfills，当与@babel/preset-env一起使用时：
		1. 如果 "useBuiltIns":"usage" 在 .babelrc 中指定，那么在 webpack.config.js 的 entry 字段和源文件中都不要包含 @babel/polyfill。注意，@babel/polyfill仍然需要安装；
		2. 如果 "useBuiltIns":"entry" 在 .babelrc 中指定，通过 require或import 在应用程序入口点的顶部包含 @babel/polyfill；
			require("@babel/polyfill");
			import "@babel/polyfill";
		3. 如果没有指定 useBuiltIns 键，或者在 .babelrc 中明确使用 useBuiltIns:false 设置 useBuiltIns 键，则直接将 @babel/polyfill 添加到 webpack.config.js 的 entry 数组中。
			webpack.config.js
				module.exports = {
				  entry: ["@babel/polyfill", "./app/js"],
				};
```

### 关于 devtool
```
	eval-cheap-module-source-map 
	build: slow
	rebuild: fast （开发时重新编译比较频繁，因此必须要选择rebuild快的）
	original lines (原文本内容)

	eval-cheap-source-map
	build: ok
	rebuild: fast
	transformed（转换改造过，内容被拆分到各个模块，原件丢失）

	官网文档地址： https://www.webpackjs.com/configuration/devtool/#devtool
```

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

### extract-text-webpack-plugin 不建议使用
```
	原因：extract-text-webpack-plugin 最新版本为 3.0.2，这个版本还没有适应 webpack 4 的版本
	解决办法：使用 4.0 beta 版，npm install --save-dev extract-text-webpack-plugin@next	
	webpack 4 以后建议使用 mini-css-extract-plugin
	同时 style-loader 用 MiniCssExtractPlugin.loader代替

	const MiniCssExtractPlugin = require("mini-css-extract-plugin");                // 处理css文件
	const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");  // 压缩css文件

	rules:[
		{
	        test:/\.(c|sc|sa)ss$/,
	        use:[
	            MiniCssExtractPlugin.loader,		// 处理CSS语言
	            'css-loader',
	            {
	                loader:'postcss-loader',
	                options:{
	                    sourceMap:true                            
	                }
	            },
	            "sass-loader"                
	        ]
	    }
    ],
    plugins:[       
        new MiniCssExtractPlugin({
            filename: "styles.[hash:8].css",   // 分离生成的css文件
            chunkFilename: "[id].css"
        })
    ],
    optimization={
        minimizer: [            
            new OptimizeCSSAssetsPlugin({}), 	// 压缩 CSS
        ]     
    };
```

### CommonsChunkPlugin 已经不建议使用
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

### Webpack 打包出来的页面空白
```	
	原因：文件加载路径错误。发布到线上以后 html 引用的路径是 /static/img/xxx.png 。
	这时它会直接去请求服务器根目录下的文件，我们需要做的就是将 '/'' 改为 './'' ，它指的是当前目录，
	修改完成后会去请求当前打包文件下的路径。

	1. 在自己搭建的webpack项目中
	module.exports = {
		output: {
			publicPath: './'   		// 默认为'/'，把绝对路径改为相对路径	
		}
	}

	2. 在vue-cli2 中，将config/index.js中的 assetsPublicPath 修改为'./'（默认为'/'）
	   例: assetsPublicPath: './public/'
		   assetsPublicPath: 代表生成的index.html文件里面引入资源时，路径前面要加上 ./public/

	3. 在 vue/cli3中，在 package.json 文件的同级目录下添加 vue.config.js文件，把publicPath 改为'./'（默认为'/'）
	module.exports = {
		publicPath : './', 				// 使用相对路径而不是绝对路径（相对于outputDir）
		assetsDir : './asset' 			// 设置打包后的静态资源 (js、css、img、fonts) 的存放地址 (相对于 outputDir 的) 
		indexPath : './home/home.html'	// 指定生成的 index.html 的输出路径 (相对于 outputDir)
	}
```
```