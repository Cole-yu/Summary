# 	AngularJS学习总结
	angular.module();一切都从定义模块开始
	通用的对象和功能使用Service
	与Dom操作相关的内容放在Directive里面
	Controller负责把所有东西粘合起来，比较复杂的业务逻辑也放在Controller里面

### Angular内核结构
	依此从里到外
	第一层：Compiler
	第二层：Directive,DI,Scope,Digest
	第三层：DataBinding
	第四层：factory,MVC,Module,Service

###	Module:
*	配置Config,配置里包括路由(Routes)
*	过滤器Filter
*	指令Directive
*	Factory图纸,Service图纸,Provider图纸,Value图纸
*	Controller

### 初始化一个angular项目
	ng-app指令初始化一个AngularJS应用程序	
	模块(module)定义了一个AngularJS应用
	var app=angular.module("myApp",[]);				//一切都从定义模块开始
	app.controller('myCtrl',function($scope){
		$scope.firstName="Jone";
		$scope.lastName="Doe";
	});
	ng-controller在html模板中定义块控制区域
	ng-init初始化变量的值
	ng-repeat指令等价于angular2中的*ngFor指令

### 创建模块 VS 获取模块
	注意，使用 angular.module('myModule', []) 将创建名为 myModule 的模块并重写已有的同名模块。
	而使用 angular.module('myModule') 则只会获取已有的模块实例。
	<div ng-app="myModule"></div>
	var myModule = angular.module('myModule', []);
	// 添加一些指令和服务
	myModule.service('myService', ...);
	myModule.directive('myDirective', ...);
	// 创建一个新模块将覆盖掉这些指令和服务
	var myModule = angular.module('myModule', []);
	var myModule=angular.module('myOtherModule'); 			//由于myOtherModule模块还没有定义,所以会抛出一个异常

###	创建自定义指令
	<div ng-app="myApp">
		<runboob-directive></runboob-directive>
	</div>
	<script type="text/javascript">
		var app = angular.module("myApp", []);
		app.directive("runoobDirective", function() {
		    return {
		        template : "<h1>自定义指令!</h1>"
		    };
		});
	</script>
####使用方式
*	当html标签来使用
* 	属性来使用
	```
	<div runboob-directive></div>	
	```
* 	类名来使用
	```
	<div class="runboob-directive"></div>
	```
* 	通过注释来调用(了解一下就行,知道就好)
*	限制指令的调用方式
	```
	可以限制你的指令只能通过特定的方式来调用。
	restrict 值可以是以下几种:
	E 作为元素名使用--Element
	A 作为属性使用--Attribute
	C 作为类名使用--Class
	M 作为注释使用--Comment
	var app = angular.module("myApp", []);
	app.directive("runoobDirective", function() {
	    return {
	        restrict : "A",
	        template : "<h1>自定义指令!</h1>"
	    };
	});
	```

### ng-model指令
	ng-model指令根据表单域的状态添加/移除以下类：
	ng-empty
	ng-not-empty
	ng-touched
	ng-untouched
	ng-valid
	ng-invalid
	ng-dirty
	ng-pending
	ng-pristine

### ng-repeat指令
*	遍历数组：
	```
	  	<li ng-repeat="item in items">{{item}}</li>
	```
*	遍历对象：
	```
	key：对象的key
    value：对象的value
    <li ng-repeat="(key,value) in obj">{{key}} | {{value}}</li>
	```
* 	绑定$$haskKey:
	```
    给每个item绑定唯一ID,当数组发生变化时,ID不变！
    <li ng-repeat="item in items track by $id(item)"></li>	
	<li ng-repeat="item in items track by $index">
    	<a href="" ng-click="removeExp($index)">X</a>
    </li>
	```
*	过滤器：
	```
    对item的每个属性进行模糊匹配
    <li ng-repeat="item in items |filter: 25"></li>            //把包含25的项都显示保留下来
	```
*	绑定属性过滤：
	```
	对item的某个属性进行模糊匹配
	<li ng-repeat="item in items |filter: 25 track by item.age"></li>
	```
*	保存匹配结果：
	```
    把匹配到的结果另存到results数组变量,可供外部使用
    <li ng-repeat="item in items |filter: 25 as results"></li>
    保存针对某个属性的过滤结果：
    <li ng-repeat="item in items |filter: 25 as results track by item.age "></li>
	```

### scope
	$scope充当MVC中的Data-Model角色
	$scope是一个POLO(Plan Old JavaScript Object)
	$scope提供了一些工具方法$watch()/$apply()
	$scope是一个树型结构，于DOM标签平行
	子$scope对象会继承父$scope上的属性
	每一个Angular应用只有一个根$scope对象(一般位于ng-app上,叫做$rootScope)
	$scope可以传播事件,类似DOM事件,可以向上也可以向下传播事件
*  	作用范围
*	根作用域
	```
	所有的应用都有一个 $rootScope，它可以作用在 ng-app 指令包含的所有 HTML 元素中。$rootScope 可作用于整个应用中。是各个 controller 中 scope 的桥梁。用 rootscope 定义的值，可以在各个 controller 中使用。
	<div ng-app="myApp" ng-controller="myCtrl">
		<h1>{{lastname}} 家族成员:</h1>
		<ul>
		    <li ng-repeat="x in names">{{x}} {{lastname}}</li>
		</ul>
	</div>
	<script>
		var app = angular.module('myApp', [])
		app.controller('myCtrl', function($scope, $rootScope) {
		    $scope.names = ["Emil", "Tobias", "Linus"];
		    $rootScope.lastname = "Refsnes";
		});
	</script>
	```

### scope对象的生命周期
	Creation				//创建
	Watcher registration 	//注册事件,动态监控$scope数据模型,需要事件机制
	Model mutaion			//监控模型是否变脏,刷新视图
	Mutation observation	//观察者模式
	Scope destruction		//销毁

### 控制器
	控制器的$scope(相当于作用域、控制范围)
	<div ng-controller=""DemoController as demo></div>          //给DemoController取个别名demo,简化名称和使用
	<ul>
		<li ng-repeat="item in demo.items">{{item.name}}</li>
	</ul>

### 过滤器(类似于angualr2中的管道)
	自定义过滤器
	app.filter('reverse', function() { //可以注入依赖
	    return function(text) {
	        return text.split("").reverse().join("");
	    }
	});

### 服务
* 	内置的服务
	```
	$location  window.location
	$http(核心服务)      $http.get('www.baidu.com');
	$timeout   window.setTimeout
	$interval	window.setInterval
	```
* 	自定义服务
	```
	app.service('hexafy', function() {
	    this.myFunc = function (x) {
	        return x.toString(16);
	    }
	});
	```	
*	在组件中依赖注入服务
	```
	app.controller('myCtrl', function($scope, hexafy) {   // Angular会使用$injector自动注入$scope对象和hexafy对象
	    $scope.hex = hexafy.myFunc(255);
	});
	```
* 	在过滤器中使用服务
	```
	app.filter('myFormat',['hexafy', function(hexafy) {
	    return function(x) {
	        return hexafy.myFunc(x);
	    };
	}]);
	```

### $http服务
	app.controller('siteCtrl', function($scope, $http) {
	    $http({  									//Promise对象
	        method: 'GET',
	        url: 'https://www.runoob.com/try/angularjs/data/sites.php'
	    }).then(function successCallback(response) {
	            $scope.names = response.data.sites;
	        }, function errorCallback(response) {
	            // 请求失败执行代码
	    });
	  
	});

### ng-options
	使用 ng-options 指令，选择的值是一个对象：
	<div ng-app="myApp" ng-controller="myCtrl">
		<p>选择网站:</p>
		<select ng-model="selectedSite" ng-options="x.site for x in sites">
		</select>
		<h1>你选择的是: {{selectedSite.site}}</h1>
		<p>网址为: {{selectedSite.url}}</p>
	</div>
	<script>
		var app = angular.module('myApp', []);
		app.controller('myCtrl', function($scope) {
		   $scope.sites = [
			    {site : "Google", url : "http://www.google.com"},
			    {site : "Runoob", url : "http://www.runoob.com"},
			    {site : "Taobao", url : "http://www.taobao.com"}
			];
		});
	</script>

### HTML DOM属性绑定
	ng-disabled 指令直接绑定应用程序数据到 HTML 的 disabled 属性。	

### 事件绑定
	<button ng-click="toggle()">隐藏/显示</button>
	app.controller('personCtrl', function($scope) {	    
	    $scope.myVar = false;
	    $scope.toggle = function() {
	        $scope.myVar = !$scope.myVar;
	    };
	});	

### 事件传播
	html模板代码：
	<button ng-click="$emit('MyEvent')">
		$emit('MyEvent')  				//向上传播事件
	</button>
	<button ng-click="$broadcast('MyEvent')">
		$broadcast('MyEvent')			//向下传播事件
	</button>
	控制器代码:
	app.controller('EventController',['$scope',function($scope){
		$scope.count=0;
		$scope.$on('MyEvent',function(){       //监听MyEvent事件
			$scope.count++;
		});
	}]);

### 表单
	ng-switch指令:
	ng-switch 指令根据下拉菜单的选择结果显示或隐藏 HTML 区域。
	<form novalidate>  //取消默认的浏览器验证
		<select ng-model="myVar">
		    <option value="">
		    <option value="dogs">Dogs
		    <option value="tuts">Tutorials
		    <option value="cars">Cars
		</select>	
	</form>
	<div ng-switch="myVar">
	  <div ng-switch-when="dogs">
	     <h1>Dogs</h1>
	     <p>Welcome to a world of dogs.</p>
	  </div>
	  <div ng-switch-when="tuts">
	     <h1>Tutorials</h1>
	     <p>Learn from examples.</p>
	  </div>
	  <div ng-switch-when="cars">
	     <h1>Cars</h1>
	     <p>Read about cars.</p>
	  </div>
	</div>

### 输入验证(validator)
	<p>邮箱:<br>
		<input type="email" name="email" ng-model="email" required>
		<span style="color:red" ng-show="myForm.email.$dirty && myForm.email.$invalid">
			<span ng-show="myForm.email.$error.required">邮箱是必须的。</span>
			<span ng-show="myForm.email.$error.email">非法的邮箱地址。</span>
		</span>
	</p>
*	编写自定义校验器

### AngularJS API
	angular.lowercase()  //转化成小写
	angular.uppercase()  //转化成大写
	angular.isString()   //判断是否为字符串
	angular.isNumber()   //判断是否为数字

### $scope.watch()
	监听属性
	app.controller('myCtrol',function(){
		$scope.password = '';
		$scope.test=function(){
			//toSomething()
		};
		$scope.$watch('password',function() {$scope.test();});
	});

### 动画
	var app = angular.module('myApp', ['ngAnimate']);	//在应用中依赖注入ngAnimate
	ng-show 和 ng-hide 指令用于添加或移除 ng-hide class 的值。
	其他指令会在进入 DOM 会添加 ng-enter 类，移除 DOM 会添加 ng-leave 属性。
	当 HTML 元素位置改变时，ng-repeat 指令同样可以添加 ng-move 类 。
	此外， 在动画完成后，HTML 元素的类集合将被移除。例如： ng-hide 指令会添加以下类：
		ng-animate
		ng-hide-animate
		ng-hide-add (如果元素将被隐藏)
		ng-hide-remove (如果元素将显示)
		ng-hide-add-active (如果元素将隐藏)
		ng-hide-remove-active (如果元素将显示)

### 依赖注入(IOC容器)控制反转
*	value  		传递值
*	factory 	返回函数的函数
*	service
*	provider
	```
	// 使用 provider 创建 service 定义一个方法用于计算两数乘积
	app.config(function($provide) {
	   $provide.provider('MathService', function() {
	      this.$get = function() {
	         var factory = {}; 
	         factory.multiply = function(a, b) {
	            return a * b; 
	         }
	         return factory;
	      };
	   });
	});
	```
*	constant：传递一个常量

### Injection(注入器)
	每一个Angular应用都有一个injector
	inject负责自动处理依赖关系、实例化对象
	对用户代码来说,injector是透明的
	injector会自动分析函数签名,注入所需要的对象
	声明依赖关系的三种方式：http://www.angularjs.net.cn/tutorial/17.html 的依赖注入
	DI可以用在各种不太的地方，主要用在controller和factory中

### 路由(ngRoute模块)
	AngularJS路由就是通过 # + 标记 帮助我们区分不同的逻辑页面并将不同的页面绑定到对应的控制器上。
1. 	引入angular-route.js文件,该文件定义Angular的ngRoute模块,ngRoute模块向我们提供了路由。
	```
	<script src="http://apps.bdimg.com/libs/angular-route/1.3.13/angular-route.js"></script>
	```
2.  使用ng-view指令(类似于angular2中的模板占位符router-outlet)
	```
	ngView指令的角色是在布局模板中包含用于当前路由的视图模板
	```
3. 	使用说明
*	视图层：
	```
	<ul>
        <li><a href="#/">首页</a></li>
        <li><a href="#/computers">电脑</a></li>
        <li><a href="#/printers">打印机</a></li>
        <li><a href="#/blabla">其他</a></li>
    </ul>
    <div ng-view></div>
    ```
*   控制器：
	```
    <script>
        var app=angular.module('App',['ngRoute']);
        app.config(['$routeProvider', function($routeProvider){
            $routeProvider
	            .when('/',{							//使用内联html模板
	            	template:'这是首页页面'
	            })
	            .when('/computers',{				//使用外部html模块文件
	            	templateUrl:'asset/computer-detail.html',
	            	controller:'Computer'			//在当前模板上执行的controller函数
	            })
	            .when('/printers:printerId',{		// 从$routeParams对象中可以获取路由传递的参数printerId的值
	            	templateUrl:'asset/printer-detail.html',
	            	controller:'Printer'
	            })
	            .otherwise({						//重定向路由
	            	redirectTo:'/'
	            });
        }]);
    </script>
    AngularJS 模块的 config 函数用于配置路由规则。
    通过使用configAPI，我们请求把$routeProvider注入到我们的配置函数并且使用$routeProvider.whenAPI来定义我们的路由规则。
	$routeProvider 为我们提供了 when(path,object) & otherwise(object) 函数按顺序定义所有路由，函数包含两个参数:
		第一个参数是 URL 或者 URL 正则规则。
		第二个参数是路由配置对象。
	```

### 从路由中获取参数
	app.controller('Printer', ['$scope', '$routeParams',
	  	function($scope, $routeParams) {
	    	$scope.PrinterId = $routeParams.printerId;
		}
	]);	

### 路由设置对象
	$routeProvider.when(url,{
	    template:string,        			//在ng-view中插入简单的html内容
	    templateUrl:string, 				//在ng-view中插入html模版文件
	    controller:string,function/array,   //在当前模版上执行的controller函数
	    controllerAs:string, 				//为controller指定别名
	    redirectTo:string,function, 		//重定向的地址
	    resolve:object<key,function> 		//指定当前controller所依赖的其他模块
	});

# Provider(供应者)
### 类型
1.	分为两类：服务和专用对象
	* 服务(Value图纸、Factory图纸、Service图纸、Provider图纸、Constant图纸)
	* 专用对象(包括控制器、指令、过滤器或动画)
2.	每个图纸都属于一个Angular模块,当基于Angular的应用从一个指定的应用模块启动时，Angular会创建一个注入器的实例，紧接着该注入器实例就会创建一张包含"图纸"的注册表，这张注册表就是由Angular核心模块、应用模块以及应用模块的依赖里面定义的所有图纸的集合。当注入器需要为你的应用创建一个对象时，注入器就会查询这张注册表。

## 	服务
	包括Value图纸、Factory图纸、Service图纸、Provider图纸和Constant图纸

### Value图纸
*	创建一个Value图纸
	```
	var myApp = angular.module('myApp', []);
	myApp.value('clientId', 'a12345654321x');
	```
*	使用图纸
	```	
	控制器：
	myApp.controller('DemoController', ['clientId', function DemoController(clientId) {
	  this.clientId = clientId;
	}]);
	html模板：
	<html ng-app="myApp">
	  <body ng-controller="DemoController as demo">
	    Client ID: {{demo.clientId}}
	  </body>
	</html>
	```

###	Factory图纸
	factory(工厂方法)：将一个函数作为返回值的方法
1.	Factory图纸增加了以下能力：
	* 使用其他服务的能力(即可以有依赖)
	* 服务初始化
	* 延迟/惰性初始化
2.	Factory图纸通过一个拥有0～n个参数(参数表示该服务对其他服务的依赖)的函数来创建服务,而函数返回值就是Factory图纸创建的服务实例
3. 	代码示例：
	```
	myApp.factory('apiToken', ['clientId', function apiTokenFactory(clientId) {  		//依赖 cientId 服务(Value图纸)
	  	var encrypt = function(data1, data2) {
	    	// NSA-proof加密算法：
	    	return (data1 + ':' + data2).toUpperCase();
	  	};
	  	var secret = window.localStorage.getItem('myApp.secret');
	  	var apiToken = encrypt(clientId, secret);
	  	return apiToken;
	}]);
	```
4. 	注意事项：
	* Angular框架里所有的服务都是单例对象。这意味着注入器只会使用一次图纸来创建服务实例,然后注入器就会缓存这些服务实例的引用,以备将来使用
	* 将工厂方法命名为"Factory"是最佳实践(比如,apiTokenFactory)

### Service图纸
*	Service图纸实例化服务时,和Value和Factory图纸类似,只是它通过使用 new 操作符调用构造函数来实现。
*	```
	//定义一个UnicornLauncher类型的构造函数
	function UnicornLauncher(apiToken) {
	  	this.launchedCount = 0;
	  	this.launch() {
	    	// 带上apiToken来发起远程调用
	    	...
	    	this.launchedCount++;
	  	}
	}
	//使用factory图纸实例化服务
	myApp.factory('unicornLauncher', ["apiToken", function(apiToken){
	  	return new UnicornLauncher(apiToken);
	}]);
	等价于
	使用Service图纸实例化服务
	myApp.Service('unicornLauncher', ["apiToken", UnicornLauncher]);	
	```
*	注意：是的，我们将一种Service图纸命名为'Service'型，我们对此感到后悔，并且知道我们将来会以某种形式受到惩罚。就像为我们的儿女之一取名叫“孩子”一样，“孩子”，这会惹恼老师的。
* 	结构如： 服务 - service图纸

### Provider图纸
	Provider图纸是核心的图纸类型,而其他的图纸类型只是基于它的语法糖。

### Constant图纸	
	myApp.constant('myName', 'yufeixiang');

## 	专用对象
	包含控制器、指令、过滤器和动画
	创建这些专用对象（控制器对象除外）的注入器指令幕后其实使用的也是Factory图纸

### 创建指令、过滤器和动画等专用对象
1. 	创建一个指令专用对象
	```
	myApp.directive('myPlanet', ['planetName', function myPlanetDirectiveFactory(planetName) {
	  	// “指令定义”对象
	  	return {
		    restrict: 'E',
		    scope: {},
	    	link: function($scope, $element) { $element.text('Planet: ' + planetName); }
	  	}
	}]);
	```
2.  使用指令
	```
	<html ng-app="myApp">
	  <body>
	   <my-planet></my-planet>
	  </body>
	</html>
	```
3. 	同样地你可以使用Factory图纸来定义指令和动画	

###	创建控制器专用对象
	但是控制器要稍微特殊一点。你创建一个控制器作为一个自定义类型，而该自定义类型将它声明的依赖作为构造函数的参数，然后该构造函数在一个模块中注册。让我们看看在先前例子中创建的DemoController：

	myApp.controller('DemoController', ['clientId', function DemoController(clientId) {
	  	this.clientId = clientId;
	}]);

	每当应用需要一个DemoController的实例时，DemoController就通过它的构造函数实例化一次（在我们这个简单的应用例子里只被初始化了一次）。因此与各种服务不同，控制器并不是单实例对象。构造函数在被调用时，所有需要的服务实例仍然需要被当作参数传入，在我们例子里是clientId服务实例。

##  总结
*	注入器使用图纸创建两类对象：服务和专用对象。
*	Factory和Service是最常用的图纸。它们之间的唯一区别就是Service图纸在创建自定义对象时更适用，而Factory还可以创建Javascript原始类型以及函数。
*	Provider图纸是最核心的图纸类型，而其它所有图纸都只是基于它的语法糖。
*	Provider也是最复杂的图纸类型，除非你正在构建需要全局配置的可复用代码，否则不要使用它。
*	除了控制器，其他所有专用对象都是通过Factory图纸来定义的。	

### 单元测试
	jasmine

### 慕课网AngularJS实战总结
	MVC
	模块化
	指令
	双向数据绑定
	依赖注入

### 工具
	TortoiseGit  	版本控制工具
	Grunt   		自动化构建工具
	bower   		模块依赖管理工具
	karma  			单元测试工具(jasmine框架,coverage测试用例覆盖率检测)
		describe 分组
		it(string,function) 测试用例
		expect(expression)  断言,期望
		matcher					匹配

