# TypeScript学习笔记

### 随笔
```
	TypeScript是一种在编译期进行静态类型分析的强类型的程序语言。
	Angular2框架是用TypeScript编写完成的
	可以在TypeScript官网的"练习"中直接进行在线编译，学习
	https://www.tslang.cn/play/index.html
```
### 本地编译环境搭建
	1. 安装本地编译器 npm install -g typescript
	2. 查看TypeScript版本 tsc -

### 数据类型
```
1. 数字
2. 布尔值
3. 字符串
4. 数组
5. 元组Tuple
6. 枚举
7. Any
8. Void
9. Null
10. Undefined
11. Never
12. Object
	object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
```

### 变量声明
```
1. let
2. const
3. var

解构赋值
默认值
展开运算符
```

### 接口
```
1. 接口作为类的参数声明
	interface Person{
		name:string;
		age:number
	}

	class Student{
		construct(public config:Person){

		}
	}

	var std = new Student({
		name:"yfx";
		age:18
	}};

2. 	接口中声明一个方法，在所有实现类中实现方法
	interface Animal{
		eat();
	}

	class Tiger{
		eat(){
			console.log("i eat meat");
		}
	}
```	

### 类
```
	面向对象

	1. 构造函数 construct

	2. 静态属性 static

	3. 访问控制符
		public(默认)		类的内部和外部
		private			类的内部
		protected  		类的内部和子类

	4. 类的继承(extends),获得父类的属性和方法

	5. super关键字
		调用父类的构造方法super()
		调用父类的其他方法super.eat()
```

### 模块
```	
	export ,import 关键字

	在a.ts文件中
		export var prop;

		export function func(){

		};

		export class Student{

		}
	在b.ts中
		import {prop,func,Student} from "./a";
		console.log(prop);
		func();
		var std = new Student();
```

### 注解(annotation)
```
	可为类，方法，变量加上更直观的说明，与业务逻辑无关，是供指定的工具或框架使用的。
	@component
```

### 类型定义文件
```
 	*.d.ts
	用来帮助开发者在TypeScript中使用已有JavaScript的工具包，如JQuery
	jquery.d.ts
	declare module "jquery"{
		export = $;
	}

	使用typing工具来安装类型定义文件
	npm install typings -g
	typings search jquery    		//模糊查询
	typings search --name jquery   	//通过名字准确查询	
	npm install @types/jquery --save-dev   //安装指令 npm install @types/name --save-dev
```	

### 函数
	function identity<T>(arg: T): T {
	    return arg;
	}
	我们给identity添加了类型变量T。 T帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。 之后我们再次使用了 T当做返回值类型。现在我们可以知道参数类型与返回值类型是相同的了

### 枚举
	enum Direction {
	    Up = 1,
	    Down = 2,
	    Left = 3,
	    Right = 4
	}

### 字符串新特性
```
	1. 多行字符串
		`<div>
			<div>
				<span></span>
			</div>
		`</div>
	2. 字符串模板
		var name="yfx";
		console.log(`<div><span>姓名</span>${name}</div>`);
	3. 自动拆分字符串
		function test(template, name, age) { 
			console.log( "template:" template);
			console.log( "name:" + name);
			console.log( "age:" + age);
		}

		var name = "yfx";

		var getAge = function () { 
			return 18;
		}

		test`hello my name is ${name},i'm ${getAge()}`;  // 调用test()方法

		控制台输出
			template: Array(3)   // ["hello my name is ", ",i'm ", ""]
			name:yfx
			age:18
```

### 参数类型
```
	类型检查机制，类型推断机制，Java的参数类型在参数前面，TypeScript的参数类型在后面,用':'分开

	var name:string = "yfx";

	function test():void{  //返回为空的函数

	}

	string,number,boolean,any

	void只能用在方法的返回结果上

	自定义类型
	class Student{
		name:string;
		age:number;
		construct(name:string,age:number){
			this.name=name;
			this.age=age;
		}
	}

	var yfx:Student = new Student("yufeixiang",18);
```

### 参数默认值
```
	function test(a:string, b:string, c:string="xiang"):void{
		console.log("name: "+ a + b + c);
	}

	test("yu","fei");  //name: yufeixiang

	注意：带默认值的参数必须放在最后面
```

### 可选参数(？)
```
	function test(a:string, b?:string, c:string="xiang"):void{
		console.log("name: "+ a + b + c);
	}

	test("yu","fei");  //name: yufeixiang

	注意：需要处理可选参数没有的情况，可选参数必须放在必选参数后面

	必选参数> 可选参数=默认参数

	可选参数与默认参数优先级一样；谁在前面，实参变会赋值给谁
```

### Rest and Spread操作符(...)
```
	展开剩余运算符...

	使用场景一
	var args:Array<string>=["yu","fei","xiang"];
	function test(a:string, b:string, c:string="xiang"):void{
		console.log("name: "+ a + b + c);
	}
	test(...args);  // name: yufeixang

	使用场景二
	// func方法可以传入任意数量的参数
	function func(...agrs){  
		agrs.forEach(function(arg){
			console.log(arg);
		});
	}
```

### generator函数
```
	控制函数的执行过程，手动暂停和恢复代码执行 yield,next

	function* doSomething(){
		console.log("start");
		// yield;					// yield后面可以为空
	  	yield "yfx";    			// yield后面如果有表达式，将程序暂停后，将表达式结果作为值返回
	  	console.log("end");
	}
	var func = doSomething();	

	console.log(func.next().value);                //  yfx通过next.value获取到yield的结果
	console.log(func.next().done);
	
	// 也可以将结果进行缓存
	// var temp=func.next();  
	// console.log(temp.value);
	// console.log(temp.done);
	// func.next();

	输出结果：
		start
		yfx
		end
		true

	function*doSomething(){
		console.log("start");
	  	yield "yufeixang";
	  	console.log("end");
	}
	var func = doSomething();
	console.log(func.next().done);				// false
	console.log(func.next().value);				// undefined
	console.log(func.next().done);				// true
	console.log(func.next().done);				//true
	console.log('abc');							// abc

	控制台输出结果:
		start
		false
		end
		undefined
		true
		true
		abc
```
### 析构表达式
```	
	function getStock(){
		return {
			code:"IBM",
			price:100
		}
	}
	var {code,price} = getStock();   // 属性名一致，将创建两个全局变量code,price

	对象析构场景
	function getStock(){
		return {
			code:"IBM",
			price:{
				oldPrice:100,
				newPrice:200
			}
		}
	}
	var { code:codeX, price:{oldPrice} } = getScock(); //属性名不一致，解构赋值
	console.log(codeX);  	// IBM
	console.log(oldPrice);  // 100

	数组析构
	var arrar1 = [1,2,3,4];
	var [num1, , , num4]=arr1;
	console.log(num1);  	// 1
	console.log(num4);		// 4	
```

### 箭头表达式
```	
	var arr=[1,2,3,4];
	arr.filter((value)=>value%2==0);	
	
	this关键字
```

### 循环遍历
```	
	<1> for
		for(var i=0;i<values.length;i++){
			console.log(values[i])
		}

	<2> forEach
		values.forEach((value)=>console.log(value));

	<3> for...of...  // 键值,可以用来字符串,数组,对象...
		for(value of values){
			console.log(value);
		}

	<4> for...in...  // 键名
		for(inx in values){
			console.log(values[inx]);
		}
```
