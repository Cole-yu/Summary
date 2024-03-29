# Javascript 学习笔记

### Javascript基本数据类型
	```
	五种基本数据类型
	null,undefined,number,string,boolean
	一种复杂数据类型
	Object
	ECMAScript2015新增的数据类型
	Symbol
	BigInt
	```
*	值类型和引用类型
	```
	题目1： var a = 100;
	　　　　var b = a;		//值引用,创建了a变量的一个副本
	　　　  a = 200;
	　　　　console.log (b);	//100
	题目2： var a = {age : 20};
	　　　　var b = a;		//引用类型,复制了地址,指向相同的内存区域
	　　　　b.age = 21;
	　　　　console.log (a.age);  //21
	```

* 	indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
	```
	object可以为字符串,也可以为数组	
	indexOf()方法对大小写敏感！
	如果要检索的字符串值没有出现,则该方法返回-1。
	var arr=[1,2,3,4,5];
	arr.indexOf(3);				// 2	
	```
*   typeOf() 方法返回一个为字符串的结果,对象或原始值,返回值是一个字符串
	```
	undefined,boolean,number,string,function,object
	typeOf(undefined)  //undefined
	typeOf(Null)       //object
	typeOf(1)          //number
	typeOf("abc")      //string
	typeOf(Symbol)     //symbol   ECMAScript2015新增
	typeOf(任何函数对象)//function
	typeOf(任何对象)    //object
	```
*   split() 方法用于把一个字符串分割成字符串数组,结果为一个数组
	```	
	var str="How are you doing today?"
	str.split("")	// H,o,w, ,a,r,e, ,y,o,u, ,d,o,i,n,g, ,t,o,d,a,y,?		
	```
*	splice() 方法向/从数组中添加/删除项目,然后返回被删除的项目,会该变原数组的内容
	```
	<script type="text/javascript">
		var arr = new Array(6);
		arr[0] = "George";
		arr[1] = "John";
		arr[2] = "Thomas";
		arr[3] = "James";
		arr[4] = "Adrew";
		arr[5] = "Martin";
		document.write(arr + "<br />");  //George,John,Thomas,James,Adrew,Martin
		arr.splice(2,1,"William");
		document.write(arr);			 //George,John,William,James,Adrew,Martin	
	</script>
	```
*   slice()
	```
	方法可从已有的数组中返回选定的元素;该方法并不会修改数组,而是返回一个子数组;如果想删除数组中的一段元素,应该使用方法Array.splice()。
	语法：array.slice(start,end)
	<script type="text/javascript">
		var arr = new Array(6);
		arr[0] = "George";
		arr[1] = "John";
		arr[2] = "Thomas";
		arr[3] = "James";
		arr[4] = "Adrew";
		arr[5] = "Martin";
		document.write(arr + "<br />"); 			//George,John,Thomas,James,Adrew,Martin
		document.write(arr.slice(2,4) + "<br />");	//Thomas,James		
	</script>
	slice(start,end)
	start如果是负数，那么它规定从数组尾部开始算起的位置。也就是说,-1 指最后一个元素,-2 指倒数第二个元素,以此类推。
	end(可选),规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。
	如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。
	```

###	Javascript中内置的对象
1. 	Array
```
	属性有length,prototype,constructor
	方法：concat,join,pop,push,reverse,shift,slice,sort,splice,toString,unshift,find,findIndex,reduce,map,filter,forEach
```
2.  Boolean
```
	Boolean 对象是一个布尔值的对象包装器。
	【注】：不要将基本类型中的布尔值 true 和 false 与值为 true 和 false 的 Boolean 对象弄混了。

	new Boolean(false) 		// 值为 false 的 Boolean 对象： Boolean {false}

	const x = new Boolean(false);
	if (x) {
	  // 这里的代码会被执行
	}

	Boolean(0) 				// 布尔值 false

	不要用创建 Boolean 对象的方式将一个非布尔值转化成布尔值，直接将 Boolean 当做转换函数来使用即可，或者使用双重非（!!）运算符：
	推荐：
		const x = Boolean(expression);
		const x = !!(expression);

	Boolean.prototype.toString()
	根据对象的值返回字符串 true 或 false。覆盖了 Object.prototype.toString() 方法。

	Boolean.prototype.valueOf()
	返回 Boolean 对象的原始值。覆盖了 Object.prototype.valueOf() 方法。
```
3.  Date
	```
	var date=new Date();            //获取当前日期时间
	var date=new Date('2018-6-21'); //指定设置一个日期时间
	```
	```
	var date = new Date(year, month, day, hours, minutes, seconds, milliseconds);
	var date=new Date(2018,5,21,18,0,0,200);
	```
*	Date对象方法
	```
		getDay()   		//0-6星期
		getFullYear()  	//年份2018
		getMonth()     	//月份0-11
		getDate()  	   	//1-31几号
		getHours()     	//小时0-23
		getMinutes()   	//分钟0-59
		getSeconds()   	//秒0-59
		getMillseconds()//毫秒0-999
		getTime()       //返回1970年1月1日至今的毫秒数
	以上方法把get替换成set,均可用来设置Data对象相应的值,如var date=new Date; date.setFullYear(2020);
	```
4.  Math
	```
	该对象方法有abs,sqrt,pow
	min,max
	random
	ceil,round
	三角函数类sin,cos,tan
	```
5.  Number
	```
	toString,
	obj.toFixed(num)//保留指定位数的小数
	Number(12.3745).toFixed(2)  //12.37
	```
6.  string
	```
	concat()   //连接字符串
	indexOf()  //检索字符串,返回某个指定的字符串值在字符串中首次出现的位置
	slice()    //提取字符串的片断,并在新的字符串中返回被提取的部分。
	split()    //把字符串分割为字符串数组。
	fontsize() //使用指定的尺寸来显示字符串。
	fontcolor()//使用指定的颜色来显示字符串。
	sub()      //把字符串显示为下标。(sub:下标)
	charAt()   //返回字符串中指定索引位置处的字符
	```
* 	charAt()  //获取字符串对象中指定位置的字符
	```
	var str='abcdefg';
	str.charAt(0);	//'a'
	str.charAt(2);	//'c'
	```
*	substr()
	```
	stringObject.substr(start,length)//开始索引(从0开始计数)后面的指定长度,长度计算时包括开始和结果的字符
	<script type="text/javascript">
		var str="Hello world!";
		document.write(str.substr(3,7));//lo worl
	</script>
	```
*	substring()
	```
	stringObject.substring(start,stop)//开始索引(从0开始计数)到结束索引之前的片段(不包括stop索引的这个元素)
	<script type="text/javascript">
		var str="Hello world!";
		document.write(str.substring(3,7));      //lo w
	</script>	
	```
*	match()  找到一个或多个正则表达式的匹配
	```
	var str="The rain in SPAIN stays mainly in the plain"; 
	var n=str.match(/ain/g);			//不带g只执行一次匹配;带g表示全局搜索,返回一个数组,无任何匹配则返回null
	console.log(n); 					//["rain","mainly","plain"]
	```
*	replace()  替换与正则表达式匹配的子串
	```
	var str=" a bc 123 ";
	var n=str.replace(/ /g,'');		//去除字符串中出现的空格
	```
7.  RegExp
*	该对象的方法有:
1.	compile()  //用于在脚本执行过程中编译正则表达式,也可用于改变和重新编译正则表达式。
	```
	RegExpObject.compile(regexp,modifier)
	var reg=new RegExp()
	patt=/^(188|139|135)+(\d){8}/g;
	reg.compile(patt);
	strObject.replace(reg,replaceContent);//根据匹配规则,替换为replaceContent	
	```
2.	test       //返回true或者false
	* RegExpObject.test(strObject);	
	
###	Dom对象
1.	Document
2.  Element
3.  Attributes
4.  Events

###	Browser对象
1.  Window对象(首字母大写)
*	Window对象是全局对象,要引用当前窗口根本不需要特殊的语法,可以把那个窗口的属性作为全局变量来使用
	```
	可以只写document,而不必写Window.document。
	可以只写alert()，而不必写Window.alert()。
	```
	```
	window.devicePixelRatio
	此属性返回当前显示设备的物理像素分辨率与CSS像素分辨率的比值。该值也可以被解释为像素大小的比例：即一个CSS像素的大小相对于一个物理像素的大小的比值。
	```	

*	Window对象的window属性和self属性引用的都是它自己;当你想明确地引用当前窗口,而不仅仅是隐式地引用它时,可以使用这两个属性
	```
	self.parent	//self显式引用当前窗口,意思为当前窗口的父窗口
	self.frame[i]	//当前窗口的指定索引号i的框架
	```
*	top属性:	返回当前窗口的根窗口
	```
	要在任何一个子框架(frame)中调用顶层窗口,可以使用如下语法：
	self.top	//当前框架的顶层窗口(根窗口)
	f.top		//框架f的顶层窗口
	```

*	Window对象的方法
	```
	显示信息给用户
	Window.confirm()
	Window.alert()
	Window.print()
	Window.prompt(text,defaultText)    //提示用户输入的对话框
	*
	open()方法:新打开一个浏览器标签
	*
	setInterval():按照指定的周期（以毫秒计）来调用函数或计算表达式。 //var id=setInterval(fn,time);
	clearInterval()取消由setInterval()设置的timeout。			    //clearInterval(id);
	*
	setTimeout():在指定的毫秒数后调用函数或计算表达式。  			//var id=setTimeout(fn,time);
	clearTimeout()取消由setTimeout()方法设置的timeout。			//clearTimeout(id);
	*
	scrollBy()	按照指定的像素值来滚动内容。
	scrollTo()	把内容滚动到指定的坐标。
	*
	resizeBy()	按照指定的像素调整窗口的大小。
	resizeTo()	把窗口的大小调整到指定的宽度和高度。
	```	

2.  Navigator
*	userAgent:返回由客户机发送服务器的user-agent头部的值
*	platform:返回运行浏览器的操作系统平台。
*	browserLanguage:返回当前浏览器的语言。
*	cookieEnabled:返回指明浏览器中是否启用cookie的布尔值。
*	onLine:返回指明系统是否处于脱机模式的布尔值。

3.  Screen
	```
	该对象包含有关客户端显示屏幕的信息。
	属性height,width
	```
4.  History
	```
	该对象包含用户(在浏览器窗口中)访问过的URL。
	通过属性length,返回历史记录的网址数
	Location的方法：back(),forward(),go()
	```
5.  Location
	```
	对象包含有关当前URL的信息
	Location的属性(hash,host,hostname,href,pathname,port,protocol,search)
	Location的方法:assign(),reload(),replace()
	```

### sessionStorage(会话存储) 5MB
	window.sessionStorage用于临时保存同一窗口(或标签页)的数据,在关闭窗口或标签页之后将会删除这些数据。	
	保存数据语法:	sessionStorage.setItem("key", "value");
	读取数据语法:	var lastname = sessionStorage.getItem("key");
	删除指定键的数据语法:sessionStorage.removeItem("key");
	删除所有sessionStorage数据:sessionStorage.clear();

### LocalStorage(本地存储) 5MB
	localStorage用于长久保存整个网站的数据,在浏览器窗口关闭后还保留数据;
	保存的数据没有过期时间，直到手动去删除。
	方法和sessionStorage相同(setItem,getItem,removeItem,clear)

### 变量
* 概念
```
	变量与内存（堆和栈）的关系
	栈区：基本类型的标识符和值，引用类型的标识符和堆内存地址（指针）；
	堆内存： 引用类型的值；
```	
* 基本类型的值与引用类型的值的区别：
1. 动态属性
```
	引用类型的值可以动态的改变其属性，因为它是对象；而基本类型的值不可以；	

	// 动态属性
	var person = new Object();
    person.name = 'Matthew';
    console.log(person.name); // 'Matthew'
```
2. 复制变量值
```
	基本类型的赋值本质：把值复制到新变量分配的内存空间中，两个变量完全独立；

	// 基本类型的变量赋值
    var num1 = 5;
    var num2 = num1;

	// 引用类型的赋值本质：传递引用类型在栈区的标识符所对应的堆内存地址（指针）；
    var obj1 = new Object();
    var obj2 = obj1;
    obj1.name = 'Matthew';
    console.log(obj2.name);//'Matthew'
```
3. 传递参数
```
	参数是基本类型时：参数传递是按值传递，参数是真值，函数的形参指向的是参数把值复制到新变量分配的内存空间；

	function add(num) {
		num++;
        return num;
	}
    var count = 1;
    var result = add(count);
    console.log(count);		// 1 没有变化
    console.log(result);	// 2

	参数是引用类型时：参数传递的是一个引用地址，即引用类型在栈区的标识符所对应的堆内存地址（指针）；
					形参的值是堆内存地址的另一份拷贝，是这个指针的副本；
					函数的形参和实参指向的是同一个堆内存；

	示例1：					
	function setName(obj) {
		obj.name = 'Matthew';
        obj = new Object();			// 开辟了新的内存空间
        obj.name = 'Alex';
	}
	var person = new Object();
	setName(person);				// 此处传递的本质是 person 对象的引用地址，obj 与 person 指向的是同一个堆内存
    console.log(person.name); 		// 'Matthew'

	示例2：
    var foo = {n:1};
		(function(foo){
       	console.log(foo.n);
       	foo.n = 3;
       	var foo = {n:2}; 				// 开辟了新的内存空间
       	console.log(foo.n);
     })(foo);
     console.log(foo.n);

     输出： 1 2 3

     案例扩展：https://blog.csdn.net/a545415/article/details/77738033
```

### setInterval(fn,time)

### setTimeout(fn,time)

### pageX,clientX,screenX,offsetX
	```
	pageX:鼠标位置相对于整个文档的水平偏移量
	clientX:鼠标位置相对于浏览器客户端水平偏移量
	screenX:鼠标位置相对于显示设备屏幕水平偏移量
	offsetX:鼠标位置相对于当前元素内部的水平偏移量
	```

###	getBoundClientRect()
	返回一个Object ClientRect对象,包含6个属性(top,right,bottom,left,width,height)	
	left   dom左边界距离视窗左边距离
	top    dom上边界距离视窗上部距离
	right  dom右边界距离视窗左边距离
	bottom dom下边界距离视窗上部的距离
	height dom的高度
	width  dom的宽度
	判断滚动条是否已经滚动到底部
	if(document.body.scrollTop>=dom.getBoundClientRect().top+dom.getBoundClientRect().height){
		//doSomething
	}

###	XSS(跨站脚本攻击)与CSRF(跨站请求伪造)
	XSS：向网站中注入脚本,使浏览器执行用户输入的恶意脚本代码
	CSRF:用户访问恶意网站,恶意网站获取并劫持了缓存的cookie,冒充用户向其他网站发起请求

### 继承
* 	工厂模式
	```
	function createPerson(name,age){
		var obj=new  Object();
		obj.name=name;
		obj.age=age;
		obj.sayName=function(){
			console.log('My name is '+this.name);
		};
		return obj;
	}
	```
*	原型模式
	```
	所有实例对象都具有相同的属性,都可以使用原型中的方法
	function Person(){}
	Person.prototype.name='yfx';
	Person.prototype.age=25;
	Person.prototype.sayName=function(){
		console.log('My name is '+this.name);
	};
	var p1=new Person();		//name='yfx',age=25
	var p2=new Person();		//name='yfx',age=25
	var p3=new Person();		//name='yfx',age=25
	```
* 	构造函数模式
```
	function Person(name,age){			//在构造函数中进行属性的私有
		this.name=name;
		this.age=age;
		this.sayName=function(){
			console.log('My name is '+this.name);
		}
	}

	var person = new Person('mike', '19');

	new 关键字会进行如下操作：
		1. 创建一个空对象
			this = {};
		2. 链接原型链，将改对象的原型设置为构造函数的原型
			this.__proto__ = Person.prototype
		3. 将步骤1创建的对象作为this的上下文内容
		4. 如果该函数没有返回对象，则把this作为实例对象返回；

		function Person(name,age){			//在构造函数中进行属性的私有
			// this = {};
			// this.__proto__ = Person.protoType;
			// 将 {} 作为下面 this 的上下文内容
			this.name=name;
			this.age=age;
			this.sayName=function(){
				console.log('My name is '+this.name);
			}
			// return this;
		}

```
*	混合模式(构造函数+原型)
	```
	在构造函数中进行属性的私有,在原型中实现方法的共享(取各个继承方式的优点,推荐)
	function Person(name,age){			//在构造函数中进行属性的私有
		this.name=name;
		this.age=age;
	}
	Person.prototype={					//在原型中实现方法的共享
		sayName:function(){
			console.log('My name is '+this.name);
		},
		sayAge:function(){		
			console.log('My age is '+this.age);
		}
	}		
	var p1=new Person('yfx',25);		//每个实例对象都有自己的属性name、age,但都可以使用原型中的方法
	p1.sayName();		//My name is yfx
	p1.sayAge();		//My name is 25
	var p2=new Person('yyy',24);
	p2.sayName();		//My name is yyy
	p2.sayAge();		//My name is 24
	```

### 去除数组中重复的元素
*   使用indexOf方式
	```
	var arr=[1,2,3,4,1,2,3,3,4];
	var result=[];							//定义一个新数组去接收未重复的项
	arr.forEach(val=>{
		if(result.indexOf(val)==-1){		//如果在新数组中没有匹配到重复项
			result.push(val);				//把重复项添加进新数组中
		}
	});
	```
*	使用数组遍历循环的方式forEach进行相等比较
*	将数组排序后,在结果中判断相邻的元素是否相等
*	在es6中,使用set数据结构,set类似于数组,但是成员的值都是唯一的,没有重复的值

### 去除字符串中的空格
	var str=" a bc 123 ";
	var value=str.replace(/ /gi,'');  //用正则表达式匹配所有空格，然后把空格替换成''
	console.log(value);

	var str=" a bc 123";
	var arr=str.split(" ");     //按空格进行分割,返回一个数组
	var newStr=arr.join('');	//用join方法拼接成一个字符串

### 闭包
* 闭包最神奇的地方就是能在一个函数外访问该函数中的局部变量
* 涉及的概念:函数对象,活动对象,作用域链,执行上下文对象(执行环境),垃圾回收机制
* 闭包函数：
	```
  在全局函数作用域下声明一个闭包的外包函数		
	<script>
		function wrapper(){	  	
			var val=1;	  					// 外包函数的局部变量
			return function(){	  			// 返回一个内嵌的匿名函数对象
				return ++val;				// 匿名函数内部访问其外包函数的局部变量
			}
		}
		// 外包函数执行完毕后,返回一个匿名函数对象;该匿名函数被全局函数下的result变量引用,形成闭包
		var result=wrapper();     			// result:function(){ return ++val; }
		// 在全局函数作用域下,通过执行result(引用地址指向闭包函数)来访问外包函数下的局部变量
		console.log(result());
  	</script>
	```
*	过程解析:
  	1. 在外包函数wrapper()被调用时，匿名函数对象作为外包函数wrapper()的返回值，被外包函数wrapper()的父级函数作用域（对应script下的顶级函数作用域）的变量result所引用，这样一来，内嵌的匿名函数对象不会被回收，此时闭包生成（对应函数closureRef）。
  	2. 正因为这个闭包函数对象不被回收，所以其内部scope属性维护的作用域链也不会被回收，也意味着这条作用域链上的所有活动对象都得到了保留。
  	3. 而这条作用域链上的头节点，正是其外包函数wrapper()对应的活动对象（该活动对象包含了val变量及其值）。
  	4. 那么在闭包函数result被执行时，函数对象的作用域链会拷贝给其对应的执行上下文对象，也就是说闭包函数可以在执行上下文对象的作用域链上找到其外包函数对应的活动对象，并从该活动对象中找到val变量
* 闭包生成的原理解析:
	1. 	内嵌函数对象不被回收(被外包函数的父级或更高级作用域变量引用,闭包生成)
	2.	内嵌函数对象的作用域链不被回收
	3. 	作用域链上的活动对象结点不被回收
	4. 	内嵌函数对象的父级作用域及更高层作用域对应的上下文数据环境均得到保留。

###	函数解析过程
```
	当函数被解析时，会相应的创建一个函数对象，函数对象中有一个scope属性，初始值为父级作用域的执行上下文对象的scope属性值。这个scope属性维护着一条作用域链（scope chain），作用域链上的每个节点都是一个活动对象；
```	

### 函数执行过程
1.  创建活动对象
```
	当一个函数对象被执行时，会为该函数对象创建一个活动对象，该活动对象包含当前函数执行所需要的环境，内容包括：
	* 形式参数
	* 函数声明
	* 传入参数
	* 局部变量

	在浏览器中，全局活动对象为window对象，并且也是作用域链的终点，被称为全局对象(Global Object);
	特别地，在web浏览器，JS全局作用域的执行上下文对象，其作用域链上仅有一个活动对象结点，即window对象。
```

2.	创建执行上下文对象
```
	当函数对象被执行时，会创建一个执行上下文对象，执行上下文对象中也有一个scope属性，初始值为该函数对象中的scope属性值，在执行上下文对象的scope属性初始化完毕后，会把该函数对象执行时创建的活动对象，
	采用头插法，插入到执行上下文对象scope属性维护的作用域链；正因为维护着这条作用域链，这个执行上下文对象包含着当前函数作用域运行所需要的所有环境。
```

###  JS变量查找机制
```
	一个函数在执行时，当要读取某个变量，JS变量查找机制，会从当前函数对应的执行上下文对象的作用域链的头结点（即活动对象的局部变量）开始搜索，如果找到匹配的变量，则返回其值；
	如果未找到匹配的变量，则继续搜索scope chain中的下一个活动对象结点，直到找到为止；如果搜索完执行上下文对象的整条scope chain仍未找到匹配变量，则返回undefined。
```

### 遍历	
	forEach()  				// 不能用来遍历字符串
	for(let index in str)	// str[index]
	for(let val of arr)

###	sort()方法
	sort()方法 如果不带参数,则会对数组中的元素按照字母顺序(本质上是按照"字符编码"的顺序)进行升序排列
	sort(sortFunction),sort方法可以接收一个排序规则函数,实现自定义的排序规则
1.	如果希望数组内的元素以升序方式进行排列;	排序规则函数应该具有两个参数a和b,其返回值如下:
	* 若 a 小于 b,在排序后的数组中 a 应该出现在 b 之前,则返回一个小于 0 的值;
	* 若 a 等于 b,则返回 0;
	* 若 a 大于 b,在排序后的数组中 a 应该出现在 b 之前,则返回一个大于 0 的值;
	* 代码实现:
	```
	var arr=[1,25,40,255,10,100,];
	function sortNumber(a,b){
		return a-b;
	}
	var value=arr.sort(sortNumber);
	console.log(value);
	```
2.  把对象数组按某个关键字段进行排序
	```
	var employees=[];
	employees[0]={name:"George", age:32, retiredate:"March 12, 2014"}
	employees[1]={name:"Edward", age:17, retiredate:"June 2, 2023"}
	employees[2]={name:"Christine", age:58, retiredate:"December 20, 2036"}
	employees[3]={name:"Sarah", age:62, retiredate:"April 30, 2020"}
	//by函数接受一个成员名字符串(键值)做为参数
	//并返回一个可以用来对包含该成员的对象数组进行排序的比较函数
	var by = function(name){
		return function(o, p){
		   var a, b;
		   if (typeof o === "object" && typeof p === "object" && o && p) {
		     a = o[name];
		     b = p[name];
		     if (a === b) {
		       return 0;
		     }
		     if (typeof a === typeof b) {
		       return a < b ? -1 : 1;
		     }
		     return typeof a < typeof b ? -1 : 1;
		   }
		   else {
		     throw ("error");
		   }
		}
	}
	employees.sort(by("age"));
	```
3.  把对象数组按某个关键字段进行排序,关键字段相等时,利用辅助字段进行排序
	```
	var employees=[];
	employees[0]={name:"George", age:32, retiredate:"March 12, 2014"}
	employees[1]={name:"Edward", age:17, retiredate:"June 2, 2023"}
	employees[2]={name:"Christine", age:58, retiredate:"December 20, 2036"}
	employees[3]={name:"Sarah", age:62, retiredate:"April 30, 2020"}	
	//by函数接受一个成员名字符串和一个可选的次要比较函数做为参数
	//并返回一个可以用来包含该成员的对象数组进行排序的比较函数
	//当o[age] 和 p[age] 相等时，次要比较函数被用来决出高下
	var by = function(name,minor){
	 return function(o,p){
	   var a,b;
	   if(o && p && typeof o === 'object' && typeof p ==='object'){
	     a = o[name];
	     b = p[name];
	     if(a === b){
	       return typeof minor === 'function' ? minor(o,p):0;
	     }
	     if(typeof a === typeof b){
	       return a < b ? -1:1;
	     }
	     return typeof a < typeof b ? -1 : 1;
	   }else{
	     thro("error");
	   }
	 }
	}
	employees.sort(by('age',by('name')));
	```

### 数组反转排序
	```
	var str="abcdefg";
	var arr=[];
	for(let val of str){
		arr.push(val);
	}
	arr=arr.reverse();				//数组反转
	var newString = arr.join('');
	console.log(newString);
	```

### 字符串反转
1.	方法一:将字符串分割成单个字符的数组,利用数组的erverse方法,再拼接成字符串
	```
	var str='abcdefg';
	var result=str.split('').reverse().join('');
	console.log(result);
	```
2.  方法二:利用charAt获取指定字符拼接成新的字符串
	```
	var str='abcdefg';
	var len=str.length;
	var result='';
	for(var i=0;i<len;i++){
		result=str.charAt(i)+result;
	}
	console.log(result);
	```
3. 	方法三：利用遍历字符串的方式,获取拆分成单个字符的数组,利用数组的reverse方法在拼接成字符串
	```
	var str="abcdefg";
	var arr=[];
	for(let val of str){
		arr.push(val);
	}
	arr=arr.reverse();				//数组反转
	var newString = arr.join('');
	console.log(newString);
	```

### getPrototypeOf:返回指定对象的原型
	Object.getPrototypeOf()

### isPrototypeOf()允许你检查一个对象是否存在于另一个对象的原型链上
	右边实例对象的原型链上是否具有左边构造函数的原型
	prototypeObj.isPrototypeOf(obj);
	function Foo(){}
	function Bar(){}
	Bar.prototype=new Foo()
	var bar=new Bar();
	Foo.prototype.isPrototypeOf(bar);   //Foo构造函数的原型是否在bar这个对象的原型链上

### instanceof方法	
	左操作数的对象的原型链上是否具有右操作数的构造函数的prototype属性	
	arr=[];
	console.log(arr instanceof Array);

### isPrototypeOf与instanceof的区别
	细细品味会发现两者的区别主要是：
	A.isPrototypeOf(B)     //判断的是A对象是否存在于B对象的原型链之中
	A instanceof B         //判断的是B.prototype是否存在与A的原型链之中
	所以就有下面的结论
		如果 A.isPrototypeOf(B) 返回true, 则B instanceof A 一定返回true　　

### constructor属性
	constructor属性返回对创建此对象的数组函数的引用，就是返回对象相对应的构造函数。
	arr=[];
	console.log(arr.constructor == Array);	

### 原型链
```
	function Foo(){
		
	}
	function Fo(){
		
	}
	Fo 是 Foo 的子类
	instance 是 Fo 类的实例
	let instance = new Fo()

	Fo.prototype.constructor  = Fo

	instance的隐藏原型(__proto__) === Fo类的原型 === Foo构造函数的实例
	instance.__proto__ = Fo.prototype = new Foo() // 原型链
```

### Cookie
*	创建cookie
```
	document.cookie="username=John Doe";
	function setCookie(cname,cvalue,exdays){
		var d=new Date();
		d.setTime(d.getTime()+exdays*24*60*60*1000);	//30天有效期
		var expires="expires"+d.toGMTString();
		document.cookie="username=John Doe;"+expires;
	}	
```
*	读取cookie
```
	document.cookie   //以字符串的方式返回所有的cookie,类型格式:cookie1=value1,cookie2=value2,cookie3=value3;
	一个函数用户返回指定cookie特定的值:
	function getCookie(cname){
		var name = cname + "=" ;
	  	var ca = document.cookie.split(';');  
	  	for(var i=0; i<ca.length; i++) {
	    	var c = ca[i].trim();
	    	if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	  	}
	  	return "";
	}
```
*	修改cookie
```
	类似于创建cookie,旧的cookie将被覆盖
	document.cookie="username=John Smith;expires=Thu,18,Dec,2013 12:00:00 GMT;path=/";
```
*	检测cookie
```
	function checkCookie()
	{
	  var username=getCookie("username");
	  if (username!=""){
	    alert("Welcome again " + username);
	  }
	  else 
	  {
	    username = prompt("Please enter your name:","");
	    if (username!="" && username!=null)
	    {
	      setCookie("username",username,365);
	    }
	  }
	}
```

### 宏任务与微任务
```
	异步任务有更深一层的划分，它们是宏任务（macro task）和微任务（micro task），二者的执行顺序也有差别。
	异步任务的结果会进入任务队列中，对于不同的事件类型，宏任务会加入宏任务队列，微任务会加入微任务队列。

	在执行栈中的同步任务执行完成后，主线程会先查看任务队列中的微任务，如果没有，则去宏任务队列中取出最前面的一个事件加入执行栈中执行；
	如果有，则将所有在微任务队列中的事件依次加入执行栈中执行，直到所有事件执行完成后，再去宏任务中取出最前面的一个事件加入执行栈，如此循环往复。

	因此可以得出结论，主线程总是会先查看微任务队列，等到微任务队列中的事件都处理完成后，再去宏任务队列中添加一个事件到任务栈中执行。
	
	常见的宏任务有 script（整体代码），setTimeout，setInterval，setImmediate，I/O操作，UI渲染；
	常见的微任务有 new Promise，process.nextTick（node.js 环境）；
	Promise 构造函数是同步执行的，promise.then 中的函数是异步执行的（添加到微任务队列）。
```

### js 中的数值精度问题
```
	JavaScript使用 IEEE 754 规定的【双精度浮点数】, 8个字节 64位二进制
```
1. 双精度与单精度浮点数的区别
```
	单精度 4个字节 32位二进制 包括符号位1位，阶码8位，尾数23位
	双精度 8个字节 64位二进制 包括符号位1位，阶码11位，尾数52位

	所存的数值范围不同：
		单精度浮点数的数值范围为-3.4E38～3.4E38，而双精度浮点数可以表示的数字的绝对值范围大约是：-2.23E308 ~ 1.79E308。E表示10的多少次方，如3.4E38指的是3.4乘以10的38次方。

	十进制下的位数不同：
		单精度浮点数最多有7位十进制有效数字，如果某个数的有效数字位数超过7位，当把它定义为单精度变量时，超出的部分会自动四舍五入。
		双精度浮点数可以表示十进制的15或16位有效数字，超出的部分也会自动四舍五入。	
```
2. 8位二进制的的范围
```
	1111 1111 = 无符号 2^8-1 = 255
	0111 1111 = 有符号(0代表正数) 最大是127  2^7-1
	1000 0000   有符号(1代表负数) 最小是-128
```
3. 64位浮点数存储详解
```
	参考资料： https://blog.csdn.net/freeristantent/article/details/124066890

	双精度 8个字节 64位二进制 包括符号位1位，阶码11位，尾数52位：
		第1位：符号位，0表示正数，1表示负数
		第2位到第12位（共11位）： 有偏指数部分
		第13位到第64位（共52位）：小数部分（即有效数字）

	类型划分：11位的指数部分可存储00000000000 ~ 11111111111（十进制范围为0 ~ 2047），取值可分为3种情况：	
		（1）11位指数不为00000000000和11111111111，即在00000000001 ~ 11111111110（1 ~ 2046）范围，这被称为【规格化】。
		（2）指数值为00000000000（0），这被称为【非规格化】
		（3）指数值为11111111111（2047），这是特殊值，有两种情况：
				当52位小数部分f全为0时，若符号位是0，则表示+Infinity(正无穷)，若符号位是1，则表示-Infinity(负无穷)
				当52位小数部分f不全为0时，表示NaN(Not a Number)

	(-1)^符号位 * 1.xx…xx * 2^(e-1023)
	1023为移码，移码值为 2^(n−1)−1，这里的n表示指数位数，对于64bit的双精度存储，n是11
	2^(11-1) - 1 = 2^10 - 1 = 1023

		（1）在规格化中，当指数e最大（前10位为1，11位为0，即2046）且小数f最大（52位全为1）时，能表示出最大正值，为
			1.111...111 * 2^1023
				52个1
			转化成十进制为 1.7976931348623157 * 10^308，则能表示的最小负值为-1.7976931348623157e+308

		（2）在非规格化中，当指数e最小（前10位为0，11位为1，即1）且小数f最小（前51位全为0，52位为1）时，能表示出最小正值，为
			0.000...01 * 2^-1022 	0.000000⋯000001
			第52位为1					1073个0
			转为十进制值为5e-324，则最大负值为-5e-324

		（3）整数范围（精确整数，无精度丢失）
			当 e - 1023 = 52，即e = 1075，小数f最大（52位全为1）时，能表示出最大安全正整数，为
			1.111...111 * 2^52
				52个1
			转为十进制值为 2^53−1 = 9007199254740991，则能表示的最小安全负整数为-9007199254740991

		（4）总结
			[−1.7976931348623157 * 10^308, −5 * 10^−324] ∪ [5* 10^−324, 1.7976931348623157 * 10^308]
			超过1.7976931348623157E+308为Infinity，小于-1.7976931348623157E+308为-Infinity，在(-5E-324,5E-324)之间的数显示为0
```
4. JS 的数值扩展
```
	(1) 精度范围，精度最多只能到53个二进制位
		JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。
		国际标准IEEE 754规定，有效数字第一位默认总是1，不保存在64位浮点数之中。也就是说，有效数字总是1.xxxx的形式，其中xxxx的部分(称为尾数或者有效数字，负责数字的精度)保存在64位浮点数(共52位)，最长可能为52位。因此（算上第一位不显示的位），JavaScript提供的有效数字为53个二进制位。

		当 e - 1023 = 52，即e = 1075，小数f最大（52位全为1）时，能表示出最大安全正整数，为
			1.111...111 * 2^52
				52个1
		转为十进制值为 2^53−1 = 9007199254740991，则能表示的最小安全负整数为-9007199254740991

		整数区间： -(2^53-1) ~ (2^53-1)
		Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
		// true
		Number.MAX_SAFE_INTEGER === 9007199254740991 	// Math.pow(2, 53) // 9007199254740992
		// true

		Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
		// true
		Number.MIN_SAFE_INTEGER === -9007199254740991

	(2) 数值范围： [−1.7976931348623157 * 10^308, −5 * 10^−324] ∪ [5* 10^−324, 1.7976931348623157 * 10^308]			
			最小安全负整数： -(2^53-1) = -9007199254740991
			最大安全正整数： 2^53-1 = 9007199254740991
			最大数值 Number.MAX_VALUE 属性值接近于 1.79E+308。大于 MAX_VALUE 的值代表 "Infinity"；
			最小的正值 Number.MIN_VALUE 属性值约为 5e-324，是 JavaScript 里最接近 0 的正值，而不是最小的负值，小于 MIN_VALUE 的值将会转换为0；

		64位浮点数的指数部分的长度是11个二进制位，意味着64位浮点数的指数部分的值最大为2047（2的11次方减1），分出一半表示负数，则JavaScript能够表示的数值范围为2^-1023 到 2^1024，超出这个范围的整数无法表示。

		在规格化中，当指数e最大（前10位为1，11位为0，即2046）且小数f最大（52位全为1）时，能表示出最大正值，为
			1.111...111 * 2^1023
				52个1
		转化成十进制为 1.7976931348623157 * 10^308，则能表示的最小负值为-1.7976931348623157e+308
		
		Number.MAX_VALUE 属性表示在 JavaScript 里所能表示的最大数值。
		如果一个数大于等于2的1024，那么就会发生正同溢出，即JavaScript无法表示这么大的数，这时就会返回Infinity
		1.79E308		

		在非规格化中，当指数e最小（前10位为0，11位为1，即1）且小数f最小（前51位全为0，52位为1）时，能表示出最小正值，为
			0.000...01 * 2^-1022 	0.000000⋯000001
			第52位为1					1073个0
		转为十进制值为5e-324，则最大负值为-5e-324

		Number.MIN_VALUE 属性表示在 JavaScript 中所能表示的最小的正值
		绝对值最接近0的最小正值：如果一个数小于等于2的-1075次方（指数部分最小值-1023，再加上小数部分的52位），那么就会发生为“负向溢出”，即 JavaScript 无法表示这么小的数，这时会直接返回0。
		5E-324 === (5 * 10^-324)  Math.pow(2, -1075)

		IEEE754标准用以下形式来表示一个浮点数:
			V = (-1)^s * M * 2^E

			符号：（sign）s决定数是负数（s=1）还是正数（s=0）
			有效数：（significand）M是一个二进制小数
			指数：（exponent）E是2的幂（可能是负数），它的作用是对浮点数加权
 
			64位浮点数： s=1 E=2*11=2048-1=2047

		0.1 十进制表示
		0.0001100110011001100110011001100110011001100110011001101 二进制表示

	[−1.7976931348623157 * 10^308, −5 * 10^−324] ∪ [5* 10^−324, 1.7976931348623157 * 10^308]

	超过1.7976931348623157E+308为Infinity，小于-1.7976931348623157E+308为-Infinity，在(-5E-324,5E-324)之间的数显示为0

	参考资料：
			https://blog.csdn.net/freeristantent/article/details/124066890
			https://es6.ruanyifeng.com/#docs/number
			https://zhuanlan.zhihu.com/p/630537911			
```

###	Blob，ArrayBuffer，File，FileReader，Buffer，TypeArray 的作用和区别
```
	Blob（Binary Large object）二进制大型对象，是一个相对high-level的概念，一个Blob对象可以包含一个或多个连续内存，通常是由一个或多个ArrayBuffer对象组成的数组；ArrayBufer 与 Buffer 是多对一的关系。
	ArrayBuffer 表示通用的、固定长度的原始二进制数据缓冲区。是一块连续内存，所以是low-level的，你可以将这块内存映射为某种数组（TypedArray）或者是自定义的数据视图（DataView），并通过这些格式来读写缓冲区的内容。
	File 继承 Blob 类，File 对象是特殊类型的 Blob。继承 Blob 的功能并将其扩展使其支持用户系统上的文件。
	FileReader 对象用于读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
	Buffer 是 Node.js 中的概念，用于表示固定长度的字节序列。Buffer 继承 Uint8Array 类，是一种操作 ArrayBuffer 的类型数组。 class Buffer extends  Uint8Array{}
	TypeArray 对象是一种用来操作底层二进制数据缓冲区的类数组视图，TypeArray 类是一个“抽象类”。一共包括9种类型，常用的有 Uint8Array, Int8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Int64Array, Uint64Array, Uint8ClampedArray。
```

### ArrayBuffer Uint8Array Buffer 等不同对象之间的相互转化
1. ArrayBuffer 转 Blob
```
	ArrayBuffer => Uint8Array => Buffer
	let buffer =  new Buffer(16);
	new Blob([new Uint8Array(buffer, offset, length)]);
```
2. Blob 转 ArrayBuffer
```	
  	const reader = new FileReader();
  	reader.readAsArrayBuffer(blob);
  	reader.onload = () => {
    	return reader.result;
  	}
```
3. ArrayBuffer（二进制字节数组）转 Base64 字符串
```
	用途： 对二进制数据进行编码，以便将其纳入 data: URL 中，在网络中进行传输和存储
	const base64Str = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))); // btoa()：从二进制数据“字符串”创建一个 Base-64 编码的 ASCII 字符串（“btoa”应读作“binary to ASCII”）
	btoa('a') 	// a 转化为 97 转化为 01100001（8位二进制）输出 YQ==
```
4. String 转 Uint8Array、ArrayBuffer
```
	TextEncoder 对象接受码位流作为输入，并提供 UTF-8 字节流作为输出
	const encoder = new TextEncoder();
    const uint8Array = encoder.encode('hello world!'); 	// encoder.encode()接受一个字符串作为输入，返回一个包含 UTF-8 编码的文本的 Uint8Array
    let buf = uint8Array.buffer; 						// Uint8Array 对象的buffer属性返回 ArrayBuffer 对象
```
5. String 转 Buffer
```
	Buffer.from('hello world', 'utf8');
```
6. ArrayBuffer 转 Buffer
```
	const ab = new ArrayBuffer(8);
	const arr = new Uint8Array(ab);
	arr[0] = 66;
	arr[1] = 88;
	const buf = Buffer.from(arr.buffer);

	const ab = new ArrayBuffer(10);
	const buf = Buffer.from(ab, 0, 2);
```
7. Buffer 转 ArrayBuffer
```
	let buf = Buffer.from('helllo world!', 'utf8');
	let arrayBuffer = buf.buffer;	// 利用 buffer 属性
```