# TypeScript学习笔记

### 随笔
```
TypeScript是一种在编译期进行静态类型分析的强类型的程序语言。
Angular2框架是用TypeScript编写完成的
可以在TypeScript官网的"练习"中直接进行在线编译，学习
https://www.tslang.cn/play/index.html
```
### 本地编译环境搭建
```
1. 安装本地编译器 npm install -g typescript
	Node 12.18.4 版本不支持 Typescript 5.x以上；
	例： npm install typescript@4.8.4 -g
2. 查看TypeScript版本 tsc -v // 4.8.4
3. 编译a.ts文件成a.js文件
    tsc a.ts // 将生成一个a.ts文件
```

### 数据类型
```
1. 数字 number
2. 布尔值 boolean
3. 字符串 string
4. 数组 // Array<number> number[]
5. 元组Tuple // 元组类型允许表示一个已知元素数量和类型的数组 let x: [string, number];
6. 枚举 // enum Color {Red, Green, Blue} let c: Color = Color.Green;
7. Any // let notSure: any = 4;
8. Void // void 
9. Null // null
10. Undefined // undefined
11. Never // never
12. Object
	object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
```

### symbol
```
当使用 const 声明 Symbol 变量时，TypeScript 会自动推断其为 unique symbol 类型。
const x = Symbol(); // 类型自动推断为 unique symbol

unique symbol: 用于表示‌单个具体的 Symbol 值‌，这个类型的变量是不能修改值的，只能用const命令声明，不能用let声明。
	const y: unique symbol = Symbol();

symbol类型包含所有的 Symbol 值，但是无法表示某一个具体的 Symbol 值。
比如，5是一个具体的数值，就用5这个字面量来表示，这也是它的值类型。但是，Symbol 值不存在字面量，必须通过变量来引用，
所以写不出只包含单个 Symbol 值的那种值类型。为了解决这个问题，TypeScript 设计了symbol的一个子类型unique symbol，
它表示单个的、某个具体的 Symbol 值。
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

### 接口(interface)

```
1. 接口可以描述带有属性的普通对象。
	interface Person {
		name: string;
		age: number;
	}

	class Student {
		construct (config: Person) {
			...
		}
	}

	let student = new Student({
		name: "yfx";
		age: 18
	}};

2. 接口可以描述函数类型。
	interface SearchFunc {
		(source: string, subString: string): boolean;
	}

	let mySearch: SearchFunc;
	mySearch = function(source: string, subString: string) {
		let result = source.search(subString);
		return result > -1;
	}

3. 可索引的类型：描述那些能够“通过索引得到”的类型
	interface StringArray {
		[index: number]: string; // 索引签名，表示了当用number去索引StringArray时会得到string类型的返回值
	}

	let myArray: StringArray;
	myArray = ["Bob", "Fred"];

	let myStr: string = myArray[0];

	上例中已经定义了 StringArray接口，它具有索引签名。 这个索引签名表示了当用number去索引StringArray时，
	会得到 string 类型的返回值。

4. 类类型：接口可以描述一个类的基本实现要求，明确的强制一个类去符合某种契约
	interface ClockInterface {
		currentTime: Date;
		setTime(d: Date);
	}

	class Clock implements ClockInterface {
		currentTime: Date;
		setTime(d: Date) {
			this.currentTime = d;
		}
		constructor(h: number, m: number) { }
	}

5. 接口可以继承接口
	interface Shape {
		color: string;
	}

	interface Square extends Shape {
		sideLength: number;
	}

6. 接口可以继承类
	class Control {
		private state: any;
	}

	interface SelectableControl extends Control {
		select(): void;
	}

	class Button extends Control implements SelectableControl {
		select() { }
	}

7。 【注】：类不可以用继承(extends)接口，类只能实现(implements)接口；但接口是可以继承类
	interface Parent {
		// ...
	}
	class Child extends Parent { // 错误的写法: 类不能继承接口，只能实现(implements)
		// error!!!
	}

	class Child implements Parent { // 类实现接口
		// right
	}

	interface Parent extends OtherClass { // 接口继承类
		// right
	}
```

### 类型断言
```
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");

typeof 类型保护
instanceof 类型保护

类型断言有两种形式。
	其一是“尖括号”语法：
	let someValue: any = "this is a string";
	let strLength: number = (<string>someValue).length;

	另一个为as语法：
	let someValue: any = "this is a string";
	let strLength: number = (someValue as string).length;
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

4. 类的继承(extends)，获得父类的属性和方法

5. super关键字
	调用父类的构造方法super()
	调用父类的其他方法super.eat()
```

### 函数
```
函数类型可以为函数定义类型。包含两部分：参数类型和返回值类型。
书写完整函数类型：
	let myAdd: (x: number, y: number) => number =
		function(x: number, y: number): number { return x + y; };

为函数本身添加返回值类型: (x: number, y: number) => number
TypeScript能够根据返回语句自动推断出返回值类型，因此通常省略它。
	let myAdd = function(x: number, y: number): number { return x + y; };
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

### 泛型
```
1. 泛型函数
	function identity<T>(arg: T): T {
		return arg;
	}

	T 被称为类型变量，用于捕获用户传入的类型（比如: number），同时 T 也可以作为返回值类型。使用方法：
		let output = identity<string>("myString");  // type of output will be 'string'
		let output = identity("myString");  		// type of output will be 'string'

2. 泛型类型（泛型函数的类型）
	泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样
	let myIdentity: <T>(arg: T) => T = identity; // let myIdentity = identity;

	也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以
	let myIdentity: <U>(arg: U) => U = identity;

	T，U 被称为泛型参数名

	可以使用带有调用签名的对象字面量来定义泛型函数
	let myIdentity: {<T>(arg: T): T} = identity;

3. 泛型接口
	interface GenericIdentityFn {
    	<T>(arg: T): T;
	}
	let myIdentity: GenericIdentityFn = identity;

	可以把泛型参数（类型变量）当作整个接口的一个参数，就能知道具体使用的是哪个泛型类型（比如： 
	Dictionary<string> 而不只是Dictionary）。使用方法：
	interface GenericIdentityFn<T> {
    	(arg: T): T;
	}
	let myIdentity: GenericIdentityFn<number> = identity;

4. 泛型类
		class GenericNumber<T> {
		    zeroValue: T;
		    add: (x: T, y: T) => T;
		}
		let myGenericNumber = new GenericNumber<number>();

5. 泛型约束
	interface Lengthwise {
		length: number;
	}

	function loggingIdentity<T extends Lengthwise>(arg: T): T {
		console.log(arg.length);  // Now we know it has a .length property
		return arg;
	}

	loggingIdentity({length: 10, value: 3});

6. 在泛型里使用类类型
	在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型：

	function create<T>(c: {new(): T; }): T {
	    return new c();
	}

	使用原型属性推断并约束构造函数与类实例的关系：

	class BeeKeeper {
	    hasMask: boolean;
	}

	class ZooKeeper {
	    nametag: string;
	}

	class Animal {
	    numLegs: number;
	}

	class Bee extends Animal {
	    keeper: BeeKeeper;
	}

	class Lion extends Animal {
	    keeper: ZooKeeper;
	}

	function createInstance<A extends Animal>(c: new () => A): A {
	    return new c(); // 涉及设计模式中的工厂模式
	}

	createInstance(Lion).keeper.nametag;  // typechecks!
	createInstance(Bee).keeper.hasMask;   // typechecks!

	这行代码示例中： function createInstance<A extends Animal>(c: new () => A): A {  return new c(); }
		new () = A 表示一个构造函数，返回一个类型为 A 的实例；
		c 是这个构造函数的变量名；
		A extends Animal 表示泛型参数 A 是 Animal 类型或其子类；
```

### 枚举
```
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

定义了一个数字枚举，Up使用初始化为 1，其余的成员会从 1开始自动增长。 换句话说，Direction.Up的值为 1，
Down为 2， Left为 3， Right为 4。

enum Direction {
    Up,
    Down,
    Left,
    Right,
}
这个例子定义则 Up的值为 0，Down的值为 1等等。
```

### 高级类型
```
1. 交叉类型 &
	交叉类型是将多个类型合并为一个类型。用符号（&）连接每个类型 可以把现有的多种类型叠加到一起成为一种类型，
	它包含了所需的所有类型的特性。 例如， Person & Serializable & Loggable 同时是 Person 和 Serializable 
	和 Loggable。 就是说这个类型的对象同时拥有了这三种类型的成员。

2. 	联合类型 |
	联合类型表示一个值可以是几种类型之一；用竖线（|）分隔每个类型。
	number | string | boolean 表示一个值可以是 number，string 或 boolean。

	function padLeft(padding: string | number) {
		el.style.padding = padding;
	}


	如果一个值是联合类型，只能访问此联合类型的所有类型里共有的成员（属性或方法）。
		type UnionType = string | number;

		正确：访问所有类型共有的成员
			let value: UnionType = "hello";
			console.log(value.toString());	// ✅ 正确，所有类型都有 toString 方法

		错误：访问特定类型独有的成员
			// value.length; 		// ❌ 错误，number 类型没有 length 属性
			// value.toFixed(); 	// ❌ 错误，string 类型没有 toFixed 方法

	对象联合类型
		interface Bird {
		    fly();
		    layEggs();
		}

		interface Fish {
		    swim();
		    layEggs();
		}

		type Animal = Bird | Fish;

		function layEggs(animal: Animal) {
		    animal.layEggs(); 	// 正确，两个类型中都存在
		    animal.fly();		// 错误，不能确定 animal 是否有 fly 方法
		    animal.swim(); 		// 错误，不能确定 animal 是否有 swim 方法
		}

3. 类型别名
	给一个类型起个新名字，可以作用于原始值，联合类型，元组以及其它任何需要手写的类型。
	type MyString = string;

4. 字符串字面量类型
	字符串字面量类型可以指定字符串必须的固定值，实现类似枚举类型的字符串。
	type Easing = "ease-in" | "ease-out" | "ease-in-out";
	只能从三种允许的字符中选择其一来做为参数传递，传入其它值则会产生错误。

5. 索引类型（Index types）
	function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
	  return names.map(n => o[n]);
	}
	interface Person {
	    name: string;
	    age: number;
	}
	let person: Person = {
	    name: 'Jarid',
	    age: 35,
	};
	let strings: string[] = pluck(person, ['name']); // ok, string[]

keyof T，索引类型查询操作符
	对于任何类型 T， keyof T的结果为 T上已知的公共属性名的联合
	let personProps: keyof Person; // 'name' | 'age'

T[K]，索引访问操作符，只要确保类型变量 K extends keyof T，即 K 代表 T 的某个键名/属性； T[K] 代表某个键值/属性值。
	function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
	    return o[name]; // o[name] is of type T[K]
	}
	本例中，类型语法反映了表达式语法。 这意味着 person['name'] 具有类型 Person['name'] — 在该例子里则为 string类型。

索引类型和字符串索引签名，keyof 和 T[K] 与字符串索引签名进行交互：
	interface Map<T> {
		[key: string]: T; // [key: string] 即是字符串索引签名
	}
	let keys: keyof Map<number>; 	// string 键名类型
	let value: Map<number>['foo']; 	// number 键值类型

6. 映射类型
	将一个已知的类型映射处理成一个需要的类型
	interface PersonPartial {
	    name: string;
	    age: number;
	}

	将一个已知的类型每个属性都变成只读的
		type Readonly<T> = {
		    readonly [P in keyof T]: T[P];
		}

	将一个已知的类型每个属性都变为可选的
		type Partial<T> = {
		    [P in keyof T]?: T[P];
		}

	type PersonReadonly = Readonly<Person>;
	type PersonPartial = Partial<Person>;

	【注】: Readonly<T>、 Partial<T>、 Pick 和 Record 一同被包含进了TypeScript的标准库里。

Pick 类型：
	type Pick<T, K extends keyof T> = {
		[P in K]: T[P];
	}

	示例：
		interface User {
			id: number;
			name: string;
			age: number;
			email: string;
			password: string; // 敏感字段
		}

		type UserNameAge = Pick<User, 'name' | 'age'>;

		UserNameAge 类型就等价于：
			{
			  name: string;
			  age: number;
			}

Record 类型：
	type Record<K extends string, T> = {
	    [P in K]: T;
	}

	示例：
		type MyRecord = Record<'a' | 'b' | 'c', number>;
		MyRecord 等价于：
			{
				a: number;
				b: number;
				c: number;
			}

7. TypeScript的标准库里的其他类型：
	Pick<T, K> -- 只包含 T 中由 K 指定的属性；
	Exclude<T, U> -- 从T中剔除可以赋值给U的类型；
	Extract<T, U> -- 提取T中可以赋值给U的类型；
	NonNullable<T> -- 从T中剔除null和undefined。
	ReturnType<T> -- 获取函数返回值类型。
	InstanceType<T> -- 获取构造函数类型的实例类型。

	Exclude<keyof T, K> 在T中所有的属性中剔除K的属性。
	Omit<T, K>类型可以用 Pick<T, Exclude<keyof T, K>> 来表示
```

### 类型别名(type)
```
类型别名: 给一个类型起个新名字，可以作用于原始值，联合类型，元组以及其它任何需要手写的类型。
	type Point = {
		x: number;
		y: number;
	};

	type ID = string | number;
	type NameResolver = () => string;
	type NameOrResolver = ID | NameResolver;

类型别名也可以是泛型
	type Point<T> = {
		x: T;
		y: T;
	};

类型别名与接口的区别？
	interface 几乎都能实现使用 type 的所有功能，主要区别在于类型别名无法重新打开类型以添加​​新属性，不能被 extends和 implements；
	而接口始终可扩展，应该尽量使用接口去代替类型别名。

使用类型别名的情形：
	无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。
```

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
类型检查机制，类型推断机制，Java的参数类型在参数前面，TypeScript的参数类型在后面，用':'分开

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

let yfx:Student = new Student("yufeixiang",18);
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
var ar r= [1,2,3,4];
arr.filter(value => value%2 == 0);

this关键字
```

### 循环遍历
```	
<1> for
	for(var i=0; i<values.length; i++){
		console.log(values[i])
	}

<2> forEach
	values.forEach((value) => console.log(value));

<3> for...of...  // 键值,可以用来字符串,数组,对象...
	for(value of values){
		console.log(value);
	}

<4> for...in...  // 键名
	for(inx in values){
		console.log(values[inx]);
	}
```


### 类型谓词 is
```
语法： parameterName is Type， parameterName必须是来自于当前函数签名里的一个参数名。

function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}
```

### 模块
```
1. “内部模块”现在称做“命名空间”，“外部模块”现在则简称为“模块”，也就是说 module X {} 相当于现在推荐的写法 namespace X {}；

// ZipCodeValidator.js
export const numberRegexp = /^[0-9]+$/;
class ZipCodeValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
export { ZipCodeValidator };
// export { ZipCodeValidator as MainValidator }; // 重命名

// main.js
import { ZipCodeValidator as MainValidator } from "./ZipCodeValidator";
let mainValidator = new MainValidator();

将整个模块导入到一个变量，并通过它来访问模块的导出部分
	import * as validator from "./ZipCodeValidator";
	let myValidator = new validator.ZipCodeValidator();

2. 默认导出
（1）每个模块都可以有一个default导出，默认导出使用 default关键字标记；
（2）并且一个模块只能够有一个default导出，需要使用一种特殊的导入形式来导入 default导出；
（3）类和函数声明可以直接被标记为默认导出；
（4）标记为默认导出的类和函数的名字是可以省略的；
（5）default导出也可以是一个值；
	export default function (s: string) {
	    return s.length === 5;
	}
	export default "123";

export * from "./utils";

3. 创建模块结构指导
（1）如果仅导出单个 class 或 function，使用 export default；
	export default class SomeType {
		constructor() {
			...
		}
	}

（2）如果要导出多个对象，把它们放在顶层里导出；
	export class SomeType { /* ... */ }
	export function someFunc() { /* ... */ }
	import { SomeType, someFunc } from "./MyThings";

（3）使用命名空间导入模式当要导出大量内容的时候；
	// MyLargeModule.ts
	export class Dog { ... }
	export class Cat { ... }
	export class Tree { ... }
	export class Flower { ... }

	// Consumer.ts
	import * as myLargeModule from "./MyLargeModule.ts";
	let x = new myLargeModule.Dog();

（4）使用重新导出进行扩展；
	// ProgrammerCalculator.js
	import { Calculator } from "./Calculator";
	class ProgrammerCalculator extends Calculator {
		...
	}
	export { ProgrammerCalculator as Calculator };

	// TestProgrammerCalculator.js
	import { Calculator } from "./ProgrammerCalculator";
	let c = new Calculator(2);

（5）模块里不要使用命名空间；
	命名空间在使用模块时几乎没什么价值，重新检查以确保没有对模块使用命名空间：
	❌ 文件的顶层声明是 export namespace Foo { ... } （删除Foo并把所有内容向上层移动一层 ✅）；
	❌ 文件只有一个export class 或 export function （考虑使用 export default ✅）；
	❌ 多个文件的顶层具有同样的 export namespace Foo {} （不要以为这些会合并到一个Foo中）；
```

### 模块解析


### tsconfig.json
```
文档：https://www.tslang.cn/docs/handbook/tsconfig-json.html
```

### 三斜线指令
```
一个三斜线引用路径是相对于包含它的文件的，如果不是根文件。
/// <reference path="..." />
/// <reference types="..." />

/// <reference types="node" />
表明这个文件使用了 @types/node/index.d.ts里面声明的名字； 并且，这个包需要在编译阶段与声明文件一起被包含进来。

使用 noResolve 编译选项
如果指定了 noResolve 编译选项，三斜线引用会被忽略；它们不会增加新文件，也不会改变给定文件的顺序。
```