# 	AngularJS学习总结

ng-app指令初始化一个AngularJS应用程序
ng-controller
模块(module)定义了一个AngularJS应用

var app=angular.module("myApp",[]);
app.controller('myCtrl',function($scope){
	$scope.firstName="Jone";
	$scope.lastName="Doe";
});

ng-init初始化变量的值
ng-repeat等价于angular2中的\*ngFor

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

	使用方式
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

### 限制使用
	可以限制你的指令只能通过特定的方式来调用。
	restrict 值可以是以下几种:
	E 作为元素名使用
	A 作为属性使用
	C 作为类名使用
	M 作为注释使用
	var app = angular.module("myApp", []);
	app.directive("runoobDirective", function() {
	    return {
	        restrict : "A",
	        template : "<h1>自定义指令!</h1>"
	    };
	});

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

### scope作用域
*  	作用范围
*	根作用域
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

### 控制器
	控制器的$scope(相当于作用域、控制范围)

### 过滤器(angualr2中的管道)	
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
	app.service('hexafy', function() {
	    this.myFunc = function (x) {
	        return x.toString(16);
	    }
	});	
*	在组件中依赖注入服务
	```
	app.controller('myCtrl', function($scope, hexafy) {
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
*	value 
	传递值
*	factory
	返回函数的函数
*	service
*	provider
	```
	// 使用 provider 创建 service 定义一个方法用于计算两数乘积
	App.config(function($provide) {
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

### 路由
	AngularJS路由就是通过 # + 标记 帮助我们区分不同的逻辑页面并将不同的页面绑定到对应的控制器上。
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
*    控制器：
	```
    <script>
        var App=angular.module('routingDemoApp',['ngRoute'])
        App.config(['$routeProvider', function($routeProvider){
            $routeProvider
            .when('/',{template:'这是首页页面'})
            .when('/computers',{template:'这是电脑分类页面'})
            .when('/printers',{template:'这是打印机页面'})
            .otherwise({redirectTo:'/'});
        }]);
    </script>
    ```
    AngularJS 模块的 config 函数用于配置路由规则。
    通过使用configAPI，我们请求把$routeProvider注入到我们的配置函数并且使用$routeProvider.whenAPI来定义我们的路由规则。
	$routeProvider 为我们提供了 when(path,object) & otherwise(object) 函数按顺序定义所有路由，函数包含两个参数:
		第一个参数是 URL 或者 URL 正则规则。
		第二个参数是路由配置对象。

### 路由设置对象
	$routeProvider.when(url,{
	    template:string,        			//在ng-view中插入简单的html内容
	    templateUrl:string, 				//在ng-view中插入html模版文件
	    controller:string,function/array,   //在当前模版上执行的controller函数
	    controllerAs:string, 				//为controller指定别名
	    redirectTo:string,function, 		//重定向的地址
	    resolve:object<key,function> 		//指定当前controller所依赖的其他模块
	});