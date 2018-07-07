#  Sea.JS学习总结
	官网链接：https://seajs.github.io/seajs/docs/#intro
### 在页面中加载模块
	在html中通过script引入sea.js后,有一段配置代码:
	seajs的简单配置
	seajs.config({
		base:'../sea-modules/',
		alias:{  										//别名，类似于定义变量
			"jquery":"jquery/jquery/1.10.1/jquery.js",
			"angularjs":"angular/angularjs/1.1.5/angular.js"
		},
		paths:{											//路径配置
			'gallery':"https://a.alipayobjects.com/gallery"
		},
		vars:{
			locale:'zh-cn'
		}
	})
	seajs.use('../static/hello/src/main')    //单一模式写法,文件入口

### 原理
*	引入类似命名空间的方法来解决变量冲突的问题	

### 实现方式
*	通过exports暴露接口
*	通过require引入依赖

### 前端模块化开发的价值
*	模块的版本管理
	```
	通过别名等配置,配合构建工具，可以实现模块的版本管理
	```
* 	提高可维护性
	```
	每个文件职责单一,便于维护
	```
* 	前端性能优化
	```
	通过异步加载模块,对页面性能非常有益,也便于性能调优
	```
* 	跨环境共享模块
	```
	CMD模块定义规范与Node.js的模块规范非常接近,通过Sea.js的Node.js版本,可以很方便的实现模块的跨服务器和浏览器共享
	```

### seajs.use()用法
*	单一模式
	```
	seajs.use('./main');
	```
*	回调模式
	```
	seajs.use('./a',function(a){
		a.run();	
	})
	```
* 	多模块模式
	```
	seajs.use(['./a','./b'],function(a,b){
		a.run();
		b.run();
	})	
	```
*	saejs.use()只用在页面载入入口模块,实现加载启动,SeaJS会顺着入口模块解析所有依赖模块并将他们加载,不应该出现在define中的模块代码里。
*	与 DOM ready 的关系
	```
	注意：seajs.use 与 DOM ready 事件没有任何关系。如果某些操作要确保在 DOM ready 后执行，需要使用 jquery 等类库来保证，比如：
	seajs.use(['jquery', './main'], function($, main) {
	  $(document).ready(function() {
	    main.init();
	  });
	});
	```

### seajs.config()文件配置
*	base
	```
	设置项目的基础路径,在顶级标识中会以该基础路径开始进行匹配搜索
	如果不配置base,它默认值是sea.js所在路径,其他的所有模块的解析都相对于这个默认值。
	use和require方法中用到的路径,只要用了"./"或"../",base的配置就不起作用了,解析直接就是基于调用方法的文件所在的路径。
	```
*	alias对象
	```
	当模块标识很长时，可以使用 alias 来简化
	使用 alias，可以让文件的真实路径与调用标识分开，有利于统一维护。 
	seajs.config({ 
		alias: { 
			'jquery':'jquery/jquery/1.10.1/jquery', 
			'app/biz':'http://path/to/app/biz.js', 
		} 
	});
	define(function(require, exports, module) {
		var $ = require('jquery'); 
		//=> 加载的是 http://path/to/base/jquery/jquery/1.10.1/jquery.js
		var biz = require('app/biz');
		//=> 加载的是 http://path/to/app/biz.js
	});
	```
*	path对象
	```
	当目录比较深，或需要跨目录调用模块时,可以使用 paths 来简化书写。	
	seajs.config({
		paths: {
			'gallery': 'https://a.alipayobjects.com/gallery',
			'app':'path/to/app',
		}
	});
	define(function(require, exports, module) {
		var underscore = require('gallery/underscore'); 
		//=> 加载的是 https://a.alipayobjects.com/gallery/underscore.js
		var biz = require('app/biz');
		//=> 加载的是 path/to/app/biz.js
	});
	paths配置可以结合 alias 配置一起使用,让模块引用非常方便。
	```
	
*	vars对象
	```
	有些场景下，模块路径在运行时才能确定，这时可以使用 vars 变量来配置。
	seajs.config({ 
		vars: { 
			'locale': 'zh-cn'
		} 
	});
	define(function(require, exports, module) {
		var lang = require('./i18n/{locale}.js'); 
		//=> 加载的是 path/to/i18n/zh-cn.js
	});
	vars 配置的是模块标识中的变量值，在模块标识中用 {key} 来表示变量。 
	```

* 	preload Array 预加载
*	使用preload配置项,在普通模块加载前,提前加载并初始化好指定模块
	```
	seajs.config({
		preload:[
			Function.prototype.bind?'':'es5-safe',
			this.JSON?"":'json'
		]
	});
	seajs.config({
	  preload: ['a','b']   		//seajs默认为js文件,因此可以省略.js后缀名
	});
	// 在加载 c 之前，会确保模块 a,b 已经加载并执行好
	seajs.use('./c');
	```	
*	preload 配置不能放在模块文件里面：
	```
	seajs.config({
	  preload: 'a'
	});
	define(function(require, exports) {
	  // 此处执行时，不能保证模块 a 已经加载并执行好
	});
	```
*	映射配置
	```
	map:[
		['http://example.com/js/app/','http://localhost/js/app']
	]
	```	
*	配置文件
	```
	配置可以直接写在 html 页面上，也可以独立出来成为一个文件。
	config.js
	seajs.config({
		...
	});
	当配置文件比较复杂时，可以独立成一个文件,通过script标签在页面中同步引入	
	```

### 模块标识
*	顶级标识
	```
	顶级标识不以点（.）或斜线（/）开始,会相对模块系统的基础路径（即 Sea.js 的 base 路径）来解析：
	// 假设 base 路径是：http://example.com/assets/
	// 在模块代码里：
	require.resolve('gallery/jquery/1.9.1/jquery');
	//=> http://example.com/assets/gallery/jquery/1.9.1/jquery.js
	```

*	相对标识
	```
	相对标识以(.)或(..)开头，只出现在模块环境中（define 的 factory 方法里面）。相对标识永远相对当前模块的 URI 来解析：
	在seajs.use中的./是普通路径,是根据当前页面的路径来解析的
	// 在 http://example.com/js/a.js 的 factory 中：
	require.resolve('./b');
  	// => http://example.com/js/b.js
	// 在 http://example.com/js/a.js 的 factory 中：
	require.resolve('../c');
  	// => http://example.com/c.js	
  	```

*	普通路径
	```
	假设当前页面是 http://example.com/path/to/page/index.html
	// 绝对路径是普通路径：
	require.resolve('http://cdn.com/js/a');         // => http://cdn.com/js/a.js
	// 根路径是普通路径：
	require.resolve('/js/b');      					// => http://example.com/js/b.js
	// use 中的相对路径始终是普通路径：
	seajs.use('./c');								// => 加载的是 http://example.com/path/to/page/c.js
	seajs.use('../d');							  	// => 加载的是 http://example.com/path/to/d.js
  	```

###	模块标识内容总结：
*	顶级标识始终相对 base 基础路径解析。
*	绝对路径和根路径始终相对当前页面解析。
*	require 和 require.async 中的相对路径相对当前模块路径来解析。
*	seajs.use 中的相对路径始终相对当前页面来解析。


###	文件名后缀的自动添加规则
	Sea.js在解析模块标识时,除非在路径中有问号（?）或最后一个字符是井号（#），否则都会自动添加 JS 扩展名（.js）。如果不想自动添加扩展名，可以在路径末尾加上井号（#）。
	// ".js" 后缀可以省略：
	require.resolve('http://example.com/js/a');
	require.resolve('http://example.com/js/a.js');
	// => http://example.com/js/a.js
	// ".css" 后缀不可省略：
	require.resolve('http://example.com/css/a.css');
	// => http://example.com/css/a.css
	// 当路径中有问号（"?"）时，不会自动添加后缀：
	require.resolve('http://example.com/js/a.json?callback=define');
	// => http://example.com/js/a.json?callback=define
	// 当路径以井号（"#"）结尾时，不会自动添加后缀，且在解析时，会自动去掉井号：
	require.resolve('http://example.com/js/a.json#');
	// => http://example.com/js/a.json

***

# 	CMD模块定义规范
### define
	define是一个全局函数,用来定义模块
1.	define(id?.deps?,factory)
	```
	可以接受两个以上参数。字符串id表示模块标识,数组deps是模块依赖。
	define('hello',['jquery'],function(require,exports,module){
		//模块代码
	})
	```
2.	define(factory)
	```
	factory可以是一个函数,也可以是一个对象或字符串
	factory为对象、字符串时,表示模块的接口就是该对象、字符串
	```
*	factory为对象时
	```
	定义一个JSON对象：
	define({
		"foo":"bar"
	});
	```
* 	factory为字符串时：
	```		
	define('I am a template,my name is {{name}}');
	```
*	factory为函数时：
	```
	表示是模块的改造方法,执行该构造方法，可以得到模块向外提供的接口,factory方法在执行时,默认会传入三个参数:require,exports和module
	define(function(require,exports,module){
		//模块代码
	})
	```
3.	define.cmd  Object
	```
	一个空对象,用来判定当前页面是否有CMD模块加载器：
	if(typeof define === "function" && define.cmd){
		//有 Sea.js 等CMD模块加载器存在
	}
	```

### 关于动态依赖 require.async(id,callback?)
	有时会希望可以使用 require 来进行条件加载：
	if (todayIsWeekend){
	  require("play");
	}
	else{
	  require("work");
	}
	但请牢记，从静态分析的角度来看，这个模块同时依赖 play 和 work 两个模块，加载器会把这两个模块文件都下载下来。 这种情况下，推荐使用 require.async 来进行条件加载。

### exports Object
	exports是一个对象,用来向外提供模块接口
	define(function(require, exports) {
	  // 对外提供 foo 属性
	  exports.foo = 'bar';
	  // 对外提供 doSomething 方法
	  exports.doSomething = function() {};
	});
	除了给 exports 对象增加成员，还可以使用 return 直接向外提供接口。	
	define(function(require) {
	  // 通过 return 直接提供接口
	  return {
	    foo: 'bar',
	    doSomething: function() {}
	  };
	});
	如果 return 语句是模块中的唯一代码,还可简化为：
	define({
	  foo: 'bar',
	  doSomething: function() {}
	});

### module.exports对象与exports的区别
*	exports参数是module.exports对象的一个引用
	```
	define(function(require, exports, module){
	  // exports 是 module.exports 的一个引用
	  console.log(module.exports === exports); 				// true
	  // 重新给 module.exports 赋值
	  module.exports = new SomeClass();
	  // exports 不再等于 module.exports
	  console.log(module.exports === exports); 				// false
	});
	```

*	对module.exports的赋值需要同步执行,不能放在回调函数里。
	```	
	define(function(require, exports, module) {
	  // 错误用法
	  setTimeout(function() {
	    module.exports = { a: "hello" };
	  }, 0);
	});
	```

### exports用法
*	正确用法
	```
	方法一：
	exports.foo="bar";
	exports.toSomething=function(){
		...
	}
	方法二：用return语句暴露接口
	define(function(require){
		return {
			foo:"bar",
			doSomething:function(){
				...				
			}
		}
	})
	```
*	错误用法
	```
	exports = {        //exports不能这样使用，这是module.exports和return的用法
	    foo: 'bar',
		doSomething: function() {}
	};	
	```

### module.exports用法	
	exports.exports={
		foo:bar,
		doSomething:function(){
			...
		}
	}
	有时候用exports参数来提供接口,无法满足开发者的所有需求。比如当模块的接口是某个类的实例时,需要通过module.exports来实现：
	// 重新给 module.exports 赋值
	module.exports = new SomeClass();	

### require.async()
	在模块内部异步加载模块,并在加载完成后执行指定回调，callback参数可选
	define(function(require,exports,module){
		// 异步加载多个模块,在加载完成时,执行回调
		require.async(['./c', './d'], function(c, d) {
			c.doSomething();
		    d.doSomething();
		});
	})
	注意：require是同步往下执行,require.async 则是异步回调执行; require.async一般用来加载可延迟异步加载的模块。

### require.resolve(id)	
	返回模块的路径，该函数不会加载模块,只会返回解析后的绝对路径,供将来使用
	假设当前页面是http://example.com/path/index.html,根据当前页面解析文件路径，返回结果
	console.log(require.resolve('./b'));   //http://example.com/path/b.js

### Seajs中引入jquery
1. 	第一步：
	```	
	seajs.config({
		base:'http://www.example.com/',
		alias: {	
			'jquery':'path/asset/js/jquery-3.3.1'		//给jquery设置一个别名,简化模块标识
		}
	});
	```
2. 	第二步：
	```	
	在a.js的模块中引入jquery
	define(function(require,exports,module){
		var jquery=require('jquery');	//github的example中为var $=require("jquery");因为那是老版本的jquery,
		exports.doSomething=function(){
			$(".btn").click(function(){		//然后就可以在模块的方法使用"$"符
				//toSomethingI();
			})
		}
	})
	```

# 	引入第三方类库或模块
### 正常情况下只要引入的是3.3.1版本以后的jquery.js,就不会出现"$ is not a function"问题
	var jquery=require('jquery'); 		//正常引入jquery即可,不需要修改jquery源码

### Sea.js如果需要使用老版本的jquery,需要修改jquery源码;
	if ( typeof define === "function" && define.amd ) {
		define( "jquery", [], function() {
			return jQuery;
		} );
	}
	var	_jQuery = window.jQuery,_$ = window.$;
	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}
		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}
		return jQuery;
	};	
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}
	return jQuery;


# Seajs与Node.js的兼容

###	让Sea.js的模块跑在node上
1.	npm install seajs -g
2.  在入口文件里调用Sea.js模块: require('seajs')
	```
	在a.js文件中
	define(function(require,exports,module){
		exports.name="yfx";
	})
	在main.js入口文件中
	require('seajs');
	var a=require('./a');
	console.log(a.name);	
	```
3.	这样就可以在Node环境中运行Sea.js模块了
	```
	node main.js      //执行主文件
	输出结果: yfx
	```

###	让node的模块跑着浏览器端里
1.  将 Node 的模块封装成 CMD 模块即可:
	```
	a.js文件
	exports.name = 'A';
	封装成如下:
	define(function(require,exports) {
	  exports.name = 'A';
	});
	```
2.  这样在浏览器端就可以通过 Sea.js 来加载使用了:
	```
	seajs.use('./a', function(a) {
	  console.log(a.name);
	});
	```

### Node.js 与 Sea.js 在模块接口上的主要差异:
*	Node.js 里，模块文件里的 this === module.exports；Sea.js 里，this === window。
*	Node.js 里，模块文件里的 return xx 会被忽略；Sea.js 里，return xx 等价 module.exports = xx。
*	Node.js 里，require 是懒加载 + 懒执行的。在 Sea.js 里是提前加载好 + 懒执行。
*	Sea.js 里，require(id) 中的 id 必须是字符串直接量。Node.js 里没这个限制。	

### shim插件教程
	功能 :使用shim插件,可以将这些普通js文件转换成CMD模块,从而能在Sea.js中正常使用。
	seajs.config({		
		plugins: ['shim'],						// 激活shim插件		
		alias: {								// shim 配置项    		
    		'jquery': {							// jQuery 的 shim 配置
      			src: 'lib/jquery-3.3.1.min.js',
      			exports: 'jQuery'
    		}
    	}
    });
### shim Object(shim是一个对象)
*	使用目的:通过shim插件,将普通JS文件转换成CMD模块;这样就实现了在seajs中可以加载任何非CMD模块。
	```
	说明：一般在seajs.config中使用,先激活plugins: ['shim'],然后在alias中配置要引用的插件,例如jquery等。
	```
*	使用方法:
	```
	'key':{
		src: String,
	    deps: Array,
	    exports: String | Function
	}
	```
*	src 是字符串,表示文件路径。
*	deps 是数组,指定模块依赖。
*	exports 表示require(key)时应该返回哪个全局变量,比如jquery的是返回'jQuery'全局变量;exports也可以是一个函数:
	```
	'jquery': {
	   	src: 'lib/jquery-3.3.1.min.js',
	   	exports: function() {
			return jQuery.noConflict();
	  	}
	}
	```