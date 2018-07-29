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
		    	restrict:'AECM",
		    	scope:{		//绑定策略
		    		//@,=,&
		    	}
		        template:"<h1>自定义指令!</h1>",
		        replace:true,
		        transclude:true,  		//transclude(嵌入)
		       	controller:function(){	
		       		var scopes=[];
					this.addScope=function(scope){ //可以把子组件的作用域push进当前指令中,进行其他业务逻辑操作
						scopes.push(scope);
					}
		       	}
		        compile:function(element,attrs,transclude){
						//...
		        },
		        link:function(scope,element,attrs,controller){
						//...
		        }
		    };
		});
	</script>

#### 使用方式
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
*	过滤器:
	```
    对item的每个属性进行模糊匹配
    <li ng-repeat="item in items |filter: 25"></li>            //把包含25的项都显示保留下来
	```
*	绑定属性过滤:
	```
	对item的某个属性进行模糊匹配
	<li ng-repeat="item in items |filter: 25 track by item.age"></li>
	```
*	保存匹配结果:
	```
    把匹配到的结果另存到results数组变量,可供外部使用
    <li ng-repeat="item in items |filter: 25 as results"></li>
    保存针对某个属性的过滤结果：
    <li ng-repeat="item in items |filter: 25 as results track by item.age "></li>
	```

### 神奇的$scope
	$scope充当MVC中的Data-Model角色
	$scope是一个POLO(Plan Old JavaScript Object)
	$scope提供了一些工具方法$watch()/$apply()
	$scope是一个树型结构，于DOM标签平行
	子$scope对象会继承父$scope上的属性
	每一个Angular应用只有一个根$scope对象(一般位于ng-app上,叫做$rootScope)
	$scope可以传播事件,类似DOM事件,可以向上也可以向下传播事件
	可以用angular.element($0).scope()进行调试
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

### injector对象
1.	创建一个injector对象
	var injector=angular.injector(['myModule','ng']);

2.  $injector常用的方法
* get:$injector.get('serviceName')根据名字获得服务的实例
	```
	injector.get('$injector');
	```
* has
	```
	injector.has("$rootscope");	//ture
	```
* invoke(调用)：向目标注入其他服务或函数
	```
	angular.injector(['myModule','ng']).invoke(function(myService){
		alert(myService.my);
	});
	$("#"+elementId).injector().invoke(function($compile, $rootScope) {   //向指定的dom元素中注入$scmpile,$rootScope服务
        $compile($("#"+elementId))($rootScope);
    }
	```

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
    angular1.6 版本以后,路由导航的格式改变,需要将href="#/"改成href="#!/";
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
	karma  			单元测试工具(Jasmine框架,coverage测试用例覆盖率检测)
		describe 分组
		it(string,function) 测试用例
		expect(expression)  断言,期望
		matcher					匹配
	Node.js
	Chrome
	Protractor

### MVC
	代码规模越来越大，切分职责是大势所趋
	为了复用，很多逻辑是一模一样的
	为了后期维护方便：修改一块功能不影响其他功能
	MVC只是手段,最终的目标是模块化和复用

### Controller使用注意事项
	不要试图去复用Controller，一个控制器负责一个视图
	不要在controller中操作DOM
	不要在controller里面做数据格式化，ng有很好用的表单控件
	不要在controller里面做数据过滤操作，ng有$filter服务
	不要让controller之间相互调用，控制器之间的交互应该通过事件进行

# 	angularJS实战
### angularJS四大核心特性
1.  MVC
2.  模块化和依赖注入
3.  指令
4.  双向数据绑定

### grunt自动化构建工具
	uglify 	混淆代码
	watch	监听文件
	concat 	合并文件

### bower
	自动安装依赖的组件
	组件之间的依赖检测
	版本兼容性自动检测
	npm install bower -g
	bower install jquery
	bower uninstall bootstrap

### http-server(Web容器)--基于NodeJS的HTTP接口,用于测试http请求
	安装http-server
	npm install -g http-server
	打开任务管理器,进入项目文件夹所在目录,在命令行工具中输入http-server
	http-server

### 单元测试(runner)
*	Karma
	```
	执行测试用例的容器,自身不提供编写测试用例代码的语法
	```
*	Karma-chrome-launcher
	```
	启动chrome浏览器
	```
*   karma-coverage
	```
	检查测试用例覆盖率
	```	
*	jasmine(茉莉花)
	```
	提供了一套编写测试用例的语法,测试框架
	```

### ng-animate
	ng-enter
	ng-leave	

### angular-ui-router
	通过.语法来进行父子路由嵌套
	通过@语法来进行子路由多视图设置
	app.config(function($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise('/index');
		$stateProvider
			.state('index',{
				url:'/index',
				views:{
					'':{
						templateUrl:'tpls/index.html'
					},
					'topbar@index':{
						templateUrl:'tpls/topbar.html'
					},
					'main@index':{
						templateUrl:'tpls/html.html'
					}
				}				
			})
			.state('usermng',{
				url:'/usermng',
				views:{
					'main@index':{
						templateUrl:'tpls/usermng.html',
						controller:usermngCtrl
					}
				}
			})
	});
	tpls/index.html模板代码：
	<div>
		<div ui-view="topbar"></div>
		<div ui-view="main"></div>
	</div>

### templateCache服务
	引入$templateCache.js文件
	$templateCache缓存模板,使其可以在多个指令中使用
	缓存模板
	app.ru
	n(function($templateCache){
		$templateCache.put('hello.html',"<div>Hello kitty</div>")  //用put存储模板
	})；
	调用模板
	app.directive('hello',function($templateCache){
		return {
			restrict:'AECM',
			template:$templateCache.get('hello.html'),     //用get获取模板
			replace:true
		}
	});

### 指令中的ng-transclude属性：使指令之间可以互相嵌套着使用
	指令代码：
	app.directive('hello',function(){
		return {
			restrict:'AE',
			transclude:true,
			template:'<div>Hello everyone!<div ng-transclude></div></div>'
		}
	})；
	html代码：
	<hello><div>这里是指令中希望保存下来的内容</div></hello>
	显示结果：
	Hello everyone!
	这里是指令中希望保存下来的内容

### compile与link(指令的三个阶段)
	加载阶段,编译阶段,链接阶段
	加载阶段:加载angular.js,找到ng-app
	编译阶段:找到所有指令,对模板自身进行转换(在compile函数中操作scope会报错,因为在链接阶段scope才会绑定到元素上)
	链接阶段:在模型与视图之间进行关联,操作Dom,绑定事件监听器并监听

### 指令的compile方法
	指令代码：
	app.directive('alotofhello',function(){
		restrict:'AE',
		compile:function(element,attrs,transclude){        	//编译阶段无法使用scope;因为只有到link阶段,scope才会被创建出来
			//这里开始对标签元素自身进行一些变换
			console.log('指令编译...');
			var tpl=element.children.clone();
			for(var i=0;i<attrs.alotofhello-1;i++){
				element.append(tpl.clone());
			}
			return function(scope,element,attrs,controller){  //链接函数link()
				console.log('指令链接...');
			}
		},
		link:function(scope,element,attrs,controller){		//当compile函数下的link方法与指令下的link函数同时存在时,指令下的link函数无效
			console.log('指令的link函数不会被调用');   		//无效,因为compile下也有link函数
		}
	});
	html代码：
	<div alotofhello="5">
		<p>慕课网-指令的compile学习</p>
	</div>

### 指令如何与控制器交互
	//实现指令与多个控制器中交互,实现指令的复用
	app.directive("loader",function(){
		return {
			restrict:'AE',
			template:'<div>content</div>'
			link:function(scope,element,attrs,controller){
				element.bind('mouseenter',function(event){
					//scope.loadData();
					//scope.$apply('loadData()');  //调用html模板所在父scope的loadData方法
					//html是不区分大小写的,因此html中的howToLoad会被转化为小写的howtoload
					scope.$apply(attrs.howtoload); //获取指令的howtoload属性值作为方法执行					
				});
			}
		}
	});
	//页面代码
	<div ng-controller="ctrl-1">
		<loader howToLoad="loadData1"></loader>
	</div>
	<div ng-controller="ctrl-2">
		<loader howToLoad="loadData2"></loader>
	</div>
	//控制器代码
	app.controller('ctrl-1',function($scope){
		$scope.loadData1=function(){
			//toDoSomething();
		}
	});
	app.controller('ctrl-2',function($scope){
		$scope.loadData2=function(){
			//toDoSomething();
		}
	});

### 指令如何与指令交互
	指令代码：
	app.directive('superman',function(){
		return {
			scope:{},   //创建独立作用域
			restrict:'AE',
			controller:function($scope){    //controller把指令中的方法暴露出去，供外部使用
				$scope.abilities:[];
				this.addStrength=function(){
					$scope.abilities.push('strength');
				};
				this.addSpeed=function(){
					$scope.abilities.push('addSpeed');
				};
				this.addLight=function(){
					$scope.abilities.push('addLight');
				};
			},
			link:function(scope,element,attrs){   //处理指令中内部的事务,绑定事件和属性
				element.addClass('btn btn-primary');
				element.bind('mouseenter',function(){
					console.log(scope.abilities);
				});
			}
		}
	});
	app.directive('strength',function(){
		return {
			require:"^superman",      //依赖superman指令
			link:function(scope,element,attrs,supermanCtrl){
				supermanCtrl.addStrength();     //调用父指令的控制器中暴露出来的方法addSpeed
			}
		}
	});
	app.directive('speed',function(){
		return {
			require:"^superman",
			link:function(scope,element,attrs,supermanCtrl){
				supermanCtrl.addSpeed();    
			}
		}
	});
	app.directive('light',function(){
		return {
			require:"^superman",
			link:function(scope,element,attrs,supermanCtrl){
				supermanCtrl.addLight();
			}
		}
	});
	html代码：
	<superman strength>动感超人</superman>       		//鼠标移入时控制台打印strength
	<superman strength speed>动感超人</superman>			//鼠标移入时控制台打印strength,speed
	<superman strength speed light>动感超人</superman>	//鼠标移入时控制台打印strength,speed,light

### 指令的scope属性(独立scope,相同指令间的属性不共用)
注意事项：因为html不区分大小写,因此在html中的指令,用属性进行绑定时,必须全部转化为小写形式,否则指令不会执行,没有值显示出来
1.	scope的绑定策略
	* @ 把当前属性作为字符串进行传递(不是对象),可以绑定外层scope的值,在属性中插入{{}}即可
	* = 与父scope的属性进行双向绑定	
	* & 传递一个来自父scope的函数，然后可以调用该函数
2.  @示例用法
	```	
	原理：控制器中的selectedProductName值,通过指令的属性绑定机制selectedProductName="{{selectedProductName}}"传递进指令内部
		指令内部通过独立作用域scope:{productName:"@selectedproductname"}在内部又绑定到productName变量(selectedProductName因为html不区分大小而变转化为selectedproductname)
	html代码：
	<div ng-controller="myCtrl">
		<drink selectedProductName="{{selectedProductName}}"></drink>
	</div>
	指令代码
	app.directive('drink',function(){
		return {
			restrict:'AECM',
			scope:{
				productName:"@selectedproductname"
			},
			template:"<div>{{productName}}</div>"
		}
	});
	```
3.	&示例用法：如果函数有参数,可以通过键值的形式传递，如果greet(name)方法=>greet({name:username})传递函数参数值
	```
	控制器代码:
	app.controller('myCtrl',['$scope',function($scope){
		$scope.sayHello=function(name){
			alert('hello'+name);
		}
	}]);
	指令代码:
	app.directive('greeting',function(){
		return {
			restrict:'AE',
			scope:{
				greet:'&'
			},
			template:`<input type="text" ng-model="username" /><br/>
				<button class="btn btn-defalut" ng-click="greet({name:username})">Greeting</button><br/>`
				//通过greet(name:username)将username的值作为参数传递给greet(name),等价于sayHello(name);
				//而username来自于模板的双向数据绑定;
		}
	});
	html代码:
	<div ng-controller="myCtrl">
		<greeting greet="sayHello(name)"></greeting>
	</div>
	```

### $scope对象的$watch方法，及$timeout服务防频繁操作(防页面抖动)
	app.controller('ctrl',['$scope','$timeout','userlistService',
		function($scope,$timeout,userListService){
			var timeout;
			$scope.$watch('username',function(newUserName){
				if(newUserName){
					if(timeout){
						$timeout.cancel(timeout);
					}
					timeout=$timeout(function(){
						userListService.userList(newUserName)
							.success(function(data,status){
								$scope.users=data;
							});
					});
				}
			});
		}]
	);

### AngularJS原理解析
	angular.module()
	angular.injector()
	.get().has().invoke()
	angularJS的实现方式

### provider模式
	策略模式和工厂模式
	所有provider都可以用来进行注入
	provider/factory/service/constant/value    //从左向右,灵活性越来越差
	以下类型的函数可以接受注入：
	controller/directive/filter/service/factory等
	//provider
	app.provider('helloAngular',function(){   //provider是基础，其余都是调用provider函数来实现的
		return {
			$get:function(){
				var name="慕课网";
				function getName(){
					return name;
				}
				return {
					getName:getName
				};
			}
		};
	});
	//factory
	app.factory('helloAngular',function(){
		var name="慕课网";
		function getName(){
			return name;
		}
		return {
			getName:getName
		};
	});
	//service
	app.service('helloAngular',function(){
		this.name="慕课网";
		this.getName=function(){
			return this.name
		};
	});

### 没有模板的指令,监听页面滚动到底部的事件,执行控制器中的方法
	html模板代码：
	<body ng-controller = "myCtrl">
		<div id="wrapper" when-scrolled="loadMore()">
		</div>
	</body>
	指令代码:
	app.directive('whenScrolled', function() {  
	    return {
	    	restrict:"AECM",
	    	link：function(scope, element, attr) {
		        // 内层DIV的滚动加载
		        var raw = elm[0];
		        element.bind('scroll', function(){ 
		            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
		                scope.$apply(attr.whenScrolled);
		            };
		        });
		    };
	    }  
	});
	控制器代码：
	app.controller('myCtrl',['#scope',function(scope){
		scope.loadMore=function(){
			console.log('到底了');
		}
	}]);

###	页面防抖动代码,防止频繁触发事件,300毫秒延迟
	var timer=null;
	if(timer){
		$timeout.cancel(timer);
	}
	timer=$timeout(function(){
		addHeight();
	},300);


### AngularJS核心原理解析	
	angular.js源码解析
	publishExternalAPI(angular);
	setupModuleLoader(window)函数建立模块机制(模块加载器);
	注册内核provider(两个最重要的provider:$parse与$rootScope);
	angularInit:防止多次初始化ng-app;
	bootstrap:创建injector、拉起内核和启动模块、调用compile服务;

### angularJS的启动过程
	自执行函数执行完后构建一个angular全局对象
	检查是否多次启动angular,如果没有则启动
	尝试绑定jQuery,bindJQuery(),如果导入了jquery,则使用window.jquery,否则绑定自定义的jqLite
	publishExternalAPI扩展angular的API:
		调用setupModuleLoader方法创建模块(module)定义
		加载工具setupModuleLoader(挂在全局对象window.angular上)
		注册内置的指令和provider
	调用angularInit(),执行bootstrap方法,createInjector方法创建一个注册器,调用compile方法编译指令

### Provider与Injector
	注入的三种方式:推断式注入,标注式注入,内联式注入
	Provider模式及$injector对象
	内置的provider分析($ControllerProvider)
	injector源码分析(创建、注册、调用)