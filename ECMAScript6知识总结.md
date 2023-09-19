# 	ECMA2015(ES6)语法
	参考链接:http://es6.ruanyifeng.com

###	Babel转码器,将ES6代码转为ES5代码
```
	Babel的配置文件是.babelrc,存放在项目的根目录下,该文件用来设置转码规则和插件，基本格式如下。
	{
		"presets": [						//presets字段设定转码规则
		  "es2015"							//ES6语法的代码
		  "latest",
		  "react",
		  "stage-2"
		],
		"plugins": []
	}
```	
*  	babel-cli工具,用于命令行转码
```
	可以将babel-cli安装在项目之中。
	npm install --save-dev babel-cli       //安装依赖包
```
*	babel-node命令
```
	babel-cli工具自带一个babel-node命令,可以在控制台中进入支持ES6语法的REPL环境,可以直接运行ES6代码
```
* 	babel-core
```	
	如果某些代码需要调用Babel的API进行转码,就要使用babel-core模块
	npm install babel-core --save
	.transform('babelify', {
        presets: ['es2015'],   //生成ES2015语法规则的代码
        extensions: ['.ts']
    })
```

### ESLint:用于静态检查代码的语法和风格

### Mocha:是一个测试框架,用于单元测试
	如果需要执行使用ES6语法的测试脚本,可以修改package.json的scripts.test
	"scripts": {
	  "test": "mocha --ui qunit --compilers js:babel-core/register"   //--compilers参数指定脚本的转码器,规定后缀名为js的文件,都需要使用babel-core/register先转码
	}

###	\_proto_ 属性
	一个实例对象的属性,指向创建这个实例的构造函数的原型;
	obj.constructor.prototype === obj._proto_ ;

### 数据类型
	ES6 引入了一种新的原始数据类型Symbol,表示独一无二的值;
	原有的六种数据类型基础：undefined、null、Boolean、String、Number、Object、Symbol、BigInt(大整数);
*	注意事项：
1.	Symbol
```
	注意，Symbol函数前不能使用new命令，否则会报错；
 	Symbol函数的参数只是表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的。

	// 没有参数的情况
	let s1 = Symbol();
	let s2 = Symbol();
	s1 === s2 												// false
	// 有参数的情况
	let s1 = Symbol('foo');
	let s2 = Symbol('foo');
	s1 === s2 												// false

	// 在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中
	let s = Symbol();
	let obj = {
	  [s]: function (arg) { ... }
	};
	obj[s](123);
```
3.  BigInt(大整数 ES2020) 第8种数据类型
```
	2n ** 1024n = 17976931348…6329624224137216n
```

### ES6 声明变量的六种方法
```
	var 命令和 function 命令。ES6 除了添加 let 和 const 命令，后面章节还会提到，另外两种声明变量的方法： import 命令和 class 命令。
```

### 字符
```
'\u0061' // 'a'
`\u{61}` // 'a
```

### 标签模板
```
tagFunc`Hello ${ a + b } world ${ a * b}`;
tagFunc(['Hello ', ' world ', ''], 15, 50);
等价于
function tagFunc(s, v1, v2) {
  console.log(s[0]);
  console.log(s[1]);
  console.log(s[2]);
  console.log(v1);
  console.log(v2);

  return "OK";
}
// "Hello "
// " world "
// ""
// 15
// 50
// "OK"

tagFunc 函数的第一个参数是一个数组，该数组的成员是模板字符串中那些没有变量替换的部分；
tagFunc 函数的其他参数，都是模板字符串各个变量被替换后的值；

用途： 
（1） 过滤 HTML 字符串，防止用户恶意内容
let message = SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}

（2） 多语言转换（国际化处理）
```

###	Object.defineProperty(obj, property, descriptor)
*	作用:该方法会直接在一个对象上定义一个新属性,或者修改一个对象的现有属性,并返回这个对象。
*	该方法接受三个参数,而且都是必填的:
```	
	第一个参数:目标对象;
	第二个参数:需要定义的属性或方法的名字;
	第三个参数:目标属性所拥有的特性(descriptor:configurable, enumerable, value, writable)
```
*   使用示例:
```  
	var a= {};
    Object.defineProperty(a,"b",{
      value:123
    });
    console.log(a.b); 				//123
```

### 属性描述符
学习链接: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

|| configurable | enumerable | value | writable | get | set |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|数据描述符|Yes|Yes|Yes|Yes|No|No|
|存取描述符|Yes|Yes|No|No|Yes|Yes|

*	如果一个描述符不具有value,writable,get和set任意一个关键字,那么它将被认为是一个数据描述符。如果一个描述符同时有【value或writable】和【get或set】键,将会产生一个异常。

* Object.defineProperty 添加的属性值： 默认为不可写、不可枚举和不可配置的。

1. 数据描述符
	configurable, enumerable, value, writable

2. 访问器描述符（存取）
	configurable, enumerable, getter, setter

#### 描述符详解
1. 数据描述符和访问器描述符都是对象。它们共享以下可选键：configurable 和 enumerable
```
configurable
表示可配置性，默认值 false
* 该属性的类型不能在数据属性和访问器属性之间更改；
* 该属性不可被删除；
* 其描述符的其他属性也不能被更改（writable 特性仍然更改；如果【writable:true】，则 value 可以被更改）；

enumerable
表示可枚举性，默认值 false
决定了属性是否可以会在 for-in, Object.keys() 中显示
```

2. 数据描述符
```
value
表示属性的数据值

writable
可写性，默认值 false
表示是否可以修改数据值
writable 特性设置为 false 时，该属性被称为“不可写的”。它不能被重新赋值。
```

3. 访问器描述符
```
get
返回值将被用作该属性的值，默认值为 undefined。
当访问该属性时，将不带参地调用此函数，并将 this 设置为通过该属性访问的对象,

set
当该属性被赋值时，将调用此函数，并带有一个参数（要赋给该属性的值），并将 this 设置为通过该属性分配的对象。默认值为 undefined。
```	

### 新增let和const,块级作用域
1.	var
```
	var命令会发生"变量提升"现象，即变量可以在声明之前使用，值为undefined
```
2.	let
	* 不存在变量提升
	* 不允许重复声明
	* 暂时性死区
```
	只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。	
	只要块级作用域内存在let命令，它所声明的变量就"绑定"(binding)这个区域，不再受外部的影响
	块级作用域的出现使得广泛应用的立即执行函数表达式(IIFE)不再必要了
```
3.  const
	* 原理:并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动	
```
	对于简单类型的数据(数值、字符串、布尔值)，值就保存在变量指向的那个内存地址。
	对于复合类型的数据(主要是对象和数组)，变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的(即总是指向另一个固定的地址)，至于它指向的数据结构是不是可变的，就完全不能控制了。
```

### globalThis 顶层对象(ES2020)
```
	浏览器里面，顶层对象是window
	Node 里面，顶层对象是global
	Node里面,顶层对象是global,但其他环境都不支持;
		
	判断当前环境运行时:
	方法一:
	(typeof window !== 'undefined'
	    ? window
	    : (typeof process === 'object' &&
	    	typeof require === 'function' &&
	        typeof global === 'object')
	        ? global
	        : this);
		
	方法二:	     
	var getGlobal = function () {
		if (typeof self !== 'undefined') { return self; }
	    if (typeof window !== 'undefined') { return window; }
	    if (typeof global !== 'undefined') { return global; }
	    throw new Error('unable to locate global object');
	};
```	

### 解构赋值
1. 数组的解构赋值
```
let [a, b, c] = [1, 2, 3];

默认值（数组成员严格等于undefined，默认值才会生效）
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
```
2. 对象的解构赋值
```
let { log, sin, cos } = Math;

const { log } = console;
log('hello')


let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

如果变量名与属性名不一致，必须写成下面这样
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

默认值：生效的条件是，对象的属性值严格等于undefined
var {x: y = 3} = {x: 5};
y // 5
```
3. 字符串的解构赋值
```
let {length : len} = 'hello';
len // 5

let {toString: s} = 123;
s === Number.prototype.toString // true
```
4. 数值和布尔值的解构赋值
5. 函数参数的解构赋值
```
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
```
6. 解构赋值的用途
```
(1) 交换变量的值
	let [a, b] = [b, a]; // a，b值互换

(2) 从函数返回多个值
(3) 函数参数的定义
(4) 提取 JSON 数据
(5) 函数参数的默认值
(6) 遍历 Map 结构
	Object.entries(obj).map(([key, value])=>{
		return ["_"+key, value];
	});

(7) 输入模块的指定方法
	const { SourceMapConsumer, SourceNode } = require("source-map");
```

### rest 参数
```
rest 参数（形式为...变量名）

function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```

###  扩展运算符
1. 数组的扩展运算符
*	将数组展开,分别获取数组的每个元素
```
	var a=[1,2];
	var b=[3,4];
	var c=[5,6];
	var d=[...a,...b,...c];
	console.log(d);   //[1,2,3,4,5,6]
```
*	将字符串展开
```
	var d=[...'hello'];
	console.log(d);    //['h','e','l','l','o']
```

2. 对象的扩展运算符
```
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

### 运算符的扩展
1. 指数运算符
```
	2 ** 2 // 4
	2 ** 3 // 8
		
	// 相当于 2 ** (3 ** 2)
	2 ** 3 ** 2 	// 512

	a **= 2;
	// 等同于 a = a * a;

	b **= 3;
	// 等同于 b = b * b * b;
```

2. 链判断运算符 ?. 
```
	const firstName = message && message.body && message.body.user && message.body.user.firstName || 'default';
	const firstName = message?.body?.user?.firstName || 'default';

	// 判断对象方法是否存在，如果存在就立即执行
	iterator.return?.()

	报错场合：
		// 构造函数
		new a?.()

		// 链判断运算符的右侧有模板字符串
		a?.`{b}`

		// 链判断运算符的左侧是 super
		super?.()

		// 链运算符用于赋值运算符左侧
		a?.b = c

	右侧不得为十进制数值
		规定如果 ?. 后面紧跟一个十进制数字，那么 ?. 不再被看成是一个完整的运算符，而会按照三元运算符进行处理
		foo?.3:0
		等价于
		foo ? .3 : 0
		foo ? 0.3 : 0
```

3. Null 判断运算符(ES2020)
```
	以前开发者的原意是，只要属性的值为null或undefined，默认值就会生效，但是属性的值如果为空字符串或false或0，默认值也会生效

	运算符左侧的值为 null 或 undefined 时，才会返回右侧的值
	【注】：跟链判断运算符?.配合使用，为null或undefined的值设置默认值
	const headerText = response?.settings?.headerText ?? "Hello world!";
```

4. 逻辑赋值运算符
```
	// 或赋值运算符
	x ||= y
	// 等同于
	x || (x = y)
	chartType.type ||= 'min'; // 为变量或属性设置默认值
	等价于
	chartType.type || chartType.type='min';


	// 与赋值运算符
	x &&= y
	// 等同于
	x && (x = y)


	// Null 赋值运算符
	x ??= y
	// 等同于
	x ?? (x = y)
	chartType.type ??= 'min';  // 为变量或属性设置默认值
	等价于
	chartType.type ?? (chartType.type='min');
```

# 数组的 at() 方法(ES2022)
```
数组实例接受一个整数作为参数，返回对应位置的成员，并支持负索引
let arr = ['a', 'b', 'c'];
arr.at(-1) === arr[arr.length-1] === 'c'
```

### find方法:找出第一个符合条件的数组成员
	arr.find(function(value,index,arr){			//vlaue为每个元素,idnex为当前索引,arr为整个数组
		//doSomething();						//找出第一个返回值为true的成员,如果没有符合条件的成员,则返回undefined
	});
	方法示例:
	[1,2,-5,10].find(function(value){
			return value<0; 					//-5
	});

### filter方法:过滤
	[1,2,3,4].filter(e=>e%2==0);	//2,4

### entries(),keys(),values()
	entries()	//返回键值对
	keys()		//返回主键名
	values()	//返回值

### includes()  返回一个布尔值,表示某个数组是否包含给定的值
	[1,2,3].includes(2)    //true

### 字符串的扩展
1. String.fromCodePoint(), String.prototype.codePointAt()
```
	JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript 会认为它们是两个字符。

	（1）两个字节的处理，fromCharCode, charCodeAt
	String.fromCharCode(num, num1, num2) 静态方法，将一个或多个 Unicode 码位转化为 UTF-16 码元序列创建的字符串
	num：一个介于 0 和 65535（0xFFFF）之间的数字，表示一个 UTF-16 码元。大于 0xFFFF 的数字会被截断为最后的 16 位。不进行有效性检查。
	String.fromCharCode(65, 66, 67); // 'ABC'

	String.prototype.charCodeAt(index)  // 返回一个整数，值介于 0 和 65535 之间。
	let s = 'abc';
	s.charCodeAt(0); // 97

	（2）四个字节的处理（推荐），fromCodePoint, codePointAt
	String.fromCodePoint(num, num1, num2)
	num： 一个介于 0 和 0x10FFFF（包括两者）之间的整数，表示一个 Unicode 码位值
	String.fromCodePoint(20320, 22909, 65281); 		// 你好! 10进制输入
	String.fromCodePoint(0x4f60, 0x597d, 0xff01); 	// 你好! 16进制输入

	String.prototype.codePointAt(index) 返回一个非负整数，该整数是从给定索引开始的字符的 Unicode 码位值
	let s = '你好！';
	s.codePointAt(1).toString(16); // “好”的 unicode 码位值 0x597d \u597d
```
2. includes, startsWith, endsWith, repeat, padStart，padEnd, trimStart，trimEnd, matchAll, replaceAll（兼容性问题）, at（兼容性问题）
```
	'x'.repeat(3) // xxx

	'x'.padStart(5, 'ab') 	// 'ababx'
	'x'.padEnd(4, 'ab') 	// 'xaba'

	'xxx'.padEnd(2, 'ab') // 'xxx'

	replaceAll()

	matchAll()

	const foo = '  abc';
	foo.trimStart(); // 清除头部空格

	const bar = 'abc  ';
	bar.trimEnd() // 清除尾部空格

	str.at()
```

### 正则的扩展
```
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;

组匹配：正则表达式使用圆括号进行组匹配
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj[1]; // 1999
const month = matchObj[2]; // 12
const day = matchObj[3]; // 31

d 修饰符：正则匹配索引 
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/d;
const matchObj = RE_DATE.exec('1999-12-31'); // 返回对象中添加indices属性
matchObj.indices // [[0, 10], [0, 4], [5, 7], [8, 10]];

具名组匹配 ?<自定义名称>  ?<Z>   名称为Z的具名组匹配
const RE_DATE = /(\d{4})-(?<Z>\d{2})-(\d{2})/d;
const matchObj = RE_DATE.exec('1999-12-31'); // 返回对象中添加indices属性
matchObj.indices.groups // {Z: [5, 7]};

matchAll()

exec()
exec() 是正则表达式的原始方法。许多其他的正则表达式方法会在内部调用 exec()
regex.exec() 执行后，上次成功匹配后的位置记录在 lastIndex 属性中。使用此特性，exec() 可用来对单个字符串中的多次匹配结果进行逐条的遍历
var regex = /t(e)(st(\d?))/g;
var string = 'test1test2test3';

var matches = [];
var match;
while (match = regex.exec(string)) {
  matches.push(match);
}
matches;
// [
//   ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"],
//   ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"],
//   ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
// ]
```

### 数值的扩展(ES2021)
1. 二进制和八进制表示法
```
	ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示
	0 是数字 零
	o 是字母 [opq OPQ]

	0b10 == 2 二进制
	0o10 == 8 8进制
	0x10 == 16 十六进制

	\u 代表是 unicode 编码
	let str = '\u597d';
	console.log(str); // '好'
```
2. 数值分隔符
```
	不能放在数值的最前面或最后面；						// _1464301
	不能两个或两个以上的分隔符连在一起；				// 123__456
	小数点的前后不能有分隔符； 						// 3_.141
	科学计数法里面，表示指数的e或E前后不能有分隔符；		// 1e_12

	1000_000 === 10000_00 // ture
	0.000_0001 === 0.0000_001 // true
	// 科学计数法
	1e10_000
```
3. Number 对象的方法和属性
```
	Number.isFinite() 	// 检查一个数值是否为有限的
	Number.isNaN()  	// 检查一个值是否为NaN
	Number.isInteger()	// 用来判断一个数值是否为整数
	Number.parseInt() 	// 转整数
	Number.parseFloat()	// 转浮点数
	Number.isInteger()  // 判断一个数值是否为整数
	属性
	Number.EPSILON      // 一个极小的常量，表示 1 与大于 1 的最小浮点数之间的差
	Number.EPSILON === Math.pow(2, -52)
```
4. Math 对象的扩展
```
	Math.trunc()
	Math.trunc 方法用于去除一个数的小数部分，返回整数部分
	Math.trunc(4.1) // 4
	Math.trunc(-4.9) // -4

	Math.sign()
	Math.sign 方法用来判断一个数到底是正数、负数、还是零
	参数为正数，返回+1；
	参数为负数，返回-1；
	参数为 0，返回0；
	参数为-0，返回-0;
	其他值，返回NaN

	Math.cbrt()方法用于计算一个数的立方根
```
5. BigInt(大整数 ES2020) 第8种数据类型
```
	2n ** 1024n = 17976931348…6329624224137216n

	Number(4n) === 4
	
	数学运算
	9n / 5n === 1n

	BigInt 不能与普通数值进行混合运算
	1n + 1.3 // 报错

	如果一个标准库函数的参数预期是 Number 类型，但是得到的是一个 BigInt，就会报错
	Math.sqrt(4n) 				// 报错
	Math.sqrt(Number(4n)) 		// 报错

	BigInt 与字符串混合运算时，会先转为字符串，再进行运算
	'abc' + 123n // "abc123"

	BigInt 函数
	BigInt(123) 123n
	new BigInt(123)  TypeError
```

### 函数的扩展
1. 默认值
```
	应用：利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误
	function throwIfMissing() {
	  throw new Error('Missing parameter');
	}

	function foo(mustBeProvided = throwIfMissing()) {
	  return mustBeProvided;
	}

	foo()
	// Error: Missing parameter
```
2. 函数的length属性，将返回没有指定默认值的参数个数
3. 箭头函数
```
var f = v => v;

// 等同于
var f = function (v) {
  return v;
};

箭头函数中的 this 指向：函数执行时，箭头函数所在作用域链中，离它最近的外层函数的 this
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}
var f = foo.call({id: 1});
var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1

所有的内层函数都是箭头函数，都没有自己的this，它们的this其实都是最外层foo函数的this
```

### 数组的扩展
```
	与解构赋值结合
	let [first, ...rest] = list;
	等价于
	let rest = list.slice(1);

	实现了 Iterator 接口的对象
```

### 对象的扩展
1. 对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为
```		
	Object.getOwnPropertyDescriptor
	reflect.getOwnPropertyDescriptor(obj, name);

	有四个操作会忽略enumerable为false的属性：
		for...in循环：只遍历对象自身的和继承的可枚举的属性。
		Object.keys()：返回对象自身的所有可枚举的属性的键名。
		JSON.stringify()：只串行化对象自身的可枚举的属性。
		Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
```
2. 解构赋值
```
	let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
	x // 1
	y // 2
	z // { a: 3, b: 4 }

* 由于解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象

* 解构赋值必须是最后一个参数，否则会报错
	let { ...x, y, z } = someObject; // 句法错误

* 注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值
	let obj = { a: { b: 1 } };
	let { ...x } = obj;
	obj.a.b = 2;
	x.a.b // 2

```
3. 扩展运算符
```
	let foo = { ...['a', 'b', 'c'] };
	foo
	// {0: "a", 1: "b", 2: "c"}

	{...'hello'}
	// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}
```

### 对象的新增方法
1. Object.is()
```
	NaN === NaN； 			// false
	Object.is(NaN, NaN);	// true

	+0 === -0; 				// true
	Object.is(+0, -0); 		// false
```
2. Object.assign()
3. Object.getOwnPropertyDescriptor()
4. Object.setPrototypeOf()，Object.getPrototypeOf()
5. Object.keys()，Object.values()，Object.entries() 
6. Object.fromEntries()
7. Object.hasOwn() 			// 判断是否为自身的属性

### Set 数据结构
```
	set类似于数组，但是成员的值都是唯一的，不能重复
	add方法可以向Set结构添加成员，且不会添加重复的值
	const s = new Set();   //实例化一个Set对象
	[2,3,5,4,5,2,2].forEach(x => s.add(x));
	for (let i of s) {
		console.log(i);		//2,3,5,4  		
	}

	const set = new Set([1,2,3,4,4]);
	[...set]   //1,2,3,4
	set.size;  //4
```
*	set对象的方法:
	```
	add(value) 		// 添加某个值,返回Set结构本身
	delete(value) 	// 删除某个值,返回一个布尔值,表示删除是否成功
	has(value)      // 返回一个布尔值,表示该值是否为Set的成员
	clear()         // 清除所有成员,没有返回值
	```
*	Set	结构与数组之间的相互转化
```
	// 数组转 Set
	let set = new Set(array);

	// Set 转数组
	let array = Array.from(set);
	let array = [...set];
```
*	遍历成员
```	
	set对象可以通过keys(),values(),entries(),forEach()方法遍历每个成员
	由于Set结构没有键名,只有键值(或者说键名和键值是同一个值),所以keys方法和values方法返回的结果完全一样。	
	let set = new Set(['red','green','blue']);
	for (let item of set.entries()) {
  		console.log(item);
	}
	// ["red", "red"]
	// ["green", "green"]
	// ["blue", "blue"]
```
*	使用set可以很容易实现并集(Union),交集(Intersect)和差集(Difference)
```
	let a = new Set([1, 2, 3]);
	let b = new Set([4, 3, 2]);
	// 并集
	let union = new Set([...a, ...b]);  //因为set成员不能重复
	// Set {1, 2, 3, 4}
	// 交集
	let intersect = new Set([...a].filter(x => b.has(x)));
	// set {2, 3}
	// 差集
	let difference = new Set([...a].filter(x => !b.has(x)));
	// Set {1}
```

###	WeakSet与Set类似,但是成员必须是对象
	WeakSet对象同样具有add(),delete(),has()方法
	试图获取WeakSet对象的size属性和forEach方法会报错

### Map数据结构，与JSON类似的键值对出现的数据结构，可以通过set,get修改或读取数据
	Object结构提供了"字符串—值"的对应，Map结构提供了"值—值"的对应，是一种更完善的Hash结构实现。
*	Map 可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组;
```
	同样具有get(key),set(key,value),has(key),delete(key),clear()
	const map = new Map([
	  ['name', '张三'],
	  ['title', 'Author']
	]);
	map.size 			// 2
	map.has('name') 	// true
	map.get('name') 	// "张三"
	map.has('title') 	// true
	map.get('title') 	// "Author"
```

*  map 实例对象的属性和方法
1. size属性:返回Map结构的成员总数
2. Map.prototype.set(key, value)
```
	set方法设置键名key对应的键值为value，然后返回整个Map结构。如果key已经有值,则键值会被更新，否则生成新键

	set方法返回的是当前的Map对象，因此可以采用链式写法：
	let map = new Map()
	  .set(1, 'a')
	  .set(2, 'b')
	  .set(3, 'c');
```
*	Map结构转为数组结构，比较快速的方法是使用扩展运算符(...)
```
	const map = new Map([
	  [1, 'one'],
	  [2, 'two'],
	  [3, 'three'],
	]);
	[...map.keys()] 							// [1, 2, 3]
	[...map.values()] 							// ['one', 'two', 'three']
	[...map.entries()] 							// [[1,'one'], [2, 'two'], [3, 'three']]
	[...map] 									// [[1,'one'], [2, 'two'], [3, 'three']]
```

* 	Map 与数组、对象、JSON之间的相互转化
1.  Map转数组
```
	const myMap = new Map([[name,'yfx'],['age':25]]);
	[...myMap];
```
2.  数组转Map
```
	new Map([[name,'yfx'],['age':25]]);
```
3.  Map转对象
```
	方法一： 通过遍历Map对象成员的键值对，obj[key] = value实现

	方法二： let obj = Object.fromEntries([...map.entries()]);
```
4.  对象转 Map
```
	方法一： new Map(Object.entries(obj));
	方法二： 通过遍历对象的 key，map.set(key, obj[k]) 实现
```
5.  Map转JSON
```
	strMapToObj(Map对象);  //把Map对象转化为JSON对象
	JSON.stringify()       //再把JSON对象转化为JSON字符串
```
6.  jSON转Map
```
	new Map(JSON对象);  通过JSON.parse将json字符串转化为JSON对象后在作为Map参数传入	
```

### WeakMap 与 Map 类似，但是键名必须为对象
```
1. WeakMap 的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内；
2. 只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存；
3. 一旦所引用的对象被回收，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
```
* 	应用场景： 需要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。
```
	【应用的典型场合就是 DOM 节点作为键名】
	示例：
		在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。
		const wm = new WeakMap();
		const element = document.getElementById('example');
		wm.set(element, 'some information');
		wm.get(element) // "some information"
```
* API 方法
```
1. 没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性。因为没有办法列出所有键名，某个键名是否存在完全不可预测，
跟垃圾回收机制是否运行相关。这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。
2. 无法清空，即不支持clear方法。
3. 只有四个方法可用 get()、set()、has()、delete()
```

### WeakRef 对象
作用： WeakRef 对象，用于直接创建对象的弱引用。
```
let target = {};
let wr = new WeakRef(target);

wr 就是一个 WeakRef 的实例，属于对target的弱引用，垃圾回收机制不会计入这个引用；
wr 的引用不会妨碍原始对象target被垃圾回收机制清除；

WeakRef 实例对象有一个deref()方法
如果原始对象存在，该方法返回原始对象；如果原始对象已经被垃圾回收机制清除，该方法返回undefined

示例：
function makeWeakCached(f) {
  const cache = new Map();
  return key => {
    const ref = cache.get(key);
    if (ref) {
      const cached = ref.deref();
      if (cached !== undefined) return cached;
    }

    const fresh = f(key);
    cache.set(key, new WeakRef(fresh));
    return fresh;
  };
}

const getImageCached = makeWeakCached(getImage); // getImage 方法
getImageCached('RMB');
```

### 强引用与弱引用
```
	强引用： 垃圾回收机制会计入这个引用，会影响到该对象被垃圾回收机制清除
	弱引用： 垃圾回收机制不会计入这个引用， 不会影响到该对象被垃圾回收机制清除；
```

# 元编程(meta programming)

### Proxy
1. 作用： 在目标对象之前架设一层"拦截"，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
```
	new Proxy(targer,handler)  				// target参数表示所要拦截的目标对象,handler参数也是一个对象，用来定制拦截行为

	代码示例:
	var target = {};
	var proxy = new Proxy(target, {			// 被代理的目标对象{},第二个参数为配置对象,提供一个对应的处理函数,该函数将拦截对应的操作
	  get: function(target, prop, receiver) {     // 配置对象有一个get方法,用来拦截对目标对象属性的访问请求
	    return 35;
	  },
	  set ...
	  delete ...
	});
	proxy.name     	// 35
	target.name 	// undefined
```
1. 常见的拦截行为
*	get(target, propKey, receiver)          	//拦截对象属性的读取,当被代理对象的属性被读取时,执行get后面的函数(以下同理)
*	set(target, propKey, value, receiver)		//拦截对象属性的设置
*	has(target, propKey)                    	//拦截propKey in proxy的遍历操作,返回一个布尔值
*   deleteProperty(target, propKey)         	//拦截delete proxy[propKey]的操作,返回一个布尔值
*	apply(target, object, args)             	//拦截Proxy实例作为函数调用的操作
*	defineProperty(target, propKey, propDesc)	//拦截属性描述符定义
* 	construct(target, args, newTarget)
* 	......

2.  Proxy 实例也可以作为其他对象的原型对象
```
	var proxy = new Proxy({}, {
	  get: function(target, propKey) {
	    return 35;
	  }
	});

	let obj = Object.create(proxy);
	obj.time // 35
```

### Reflect
```
	Object.defineProperty(obj, name, desc)
	Reflect.defineProperty(obj, name, desc)

	Reflect.has(target, prop);

	Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。
	这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础
	let proxy = Proxy(target, {
		set: function(target, prop, value, receiver){
			Reflect.set(target, prop, value, receiver);
		}
	});

	Reflect.construct(target, args);

	let dog = new Animal('dog');
	Reflect.construct(Animal, 'dog');

	语法：
	Reflect.defineProperty(target, propKey, attributes);

	Object.defineProperty(dog, 'name', {
		get: function(target, propKey){
			return target[propKey];
		}
	});
	等价于
	Reflect.defineProperty(dog, 'name', {
		get: function(target, propKey){
			return 
		}
	})


	实现一个观察者模式：
	const queuedObservers = new Set();

	// 实现 observable 和 observe 这两个函数
	const observe = fn => queuedObservers.add(fn);
	const observable = obj => new Proxy(obj, {
		set: function(target, key, value, receiver) {
			const result = Reflect.set(target, key, value, receiver);
		    queuedObservers.forEach(observer => observer());
		    return result;
		}
	});
	
	// 数据对象 person 是【被观察目标】
	const person = observable({
		name: '张三',
	  	age: 20
	});

	// 函数 print 是【观察者】
	function print() {
	  	console.log(`${person.name}, ${person.age}`);
	}
	observe(print);

	person.name = '李四'; // 触发事件源
```

### forEach，for...in与for...of遍历可迭代对象
	forEach(function(value, index, arr){   //arr:当前元素所属的数组对象
		//doSomething()
	})
	for...of... //遍历成员==获取键值
	for...in... //遍历索引==获取键名

### Iterator(遍历器，迭代器)
```
	ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有 [Symbol.iterator] 属性，就可以认为是可遍历对象（iterable）；
	标准的Iterator接口函数: 该函数必须返回一个对象，且对象中包含next方法，且执行next()能返回包含 value/done 两个属性的、代表当前成员的信息对象
	{value:'foo'，done:boolean} // false表示没有结束，true表示结束

	let obj = {
		data: [ 'hello', 'world' ],
		[Symbol.iterator]() { 		// 遍历器接口函数(iterable)，该函数返回结果为一个 指针对象(iterator)
			const self = this;
		    let index = 0;
		    return { 				//	指针对象(iterator)，具有next方法，该方法返回代表当前成员的信息对象(IterationResult)
		      	next() {
		        	if (index < self.data.length) {
		          		return {  	// 代表当前成员的信息对象
		          			value: self.data[index++],
		          			done: false
		          		};
		        	} else {
		          		return {
		           			value: undefined, 
		           			done: true
		            	};
		        	}
		      	}
		    };
		}
	}

	// Iterable 可遍历对象
	interface Iterable {
	  [Symbol.iterator]() : Iterator,
	}

	 // 遍历器对象
	interface Iterator {
	  next(value?: any) : IterationResult,
	}

	// 成员的信息对象
	interface IterationResult {
	  value: any,
	  done: boolean,
	}
```
*	Symbol.iterator属性
```
	返回遍历器对象iterator,调用该对象的next方法,在返回一个值的同时,自动将内部指针移到下一个实例
	let arr = ['a', 'b', 'c'];
	let iter = arr[Symbol.iterator]();
	iter.next() // { value: 'a', done: false }
	iter.next() // { value: 'b', done: false }
	iter.next() // { value: 'c', done: false }
	iter.next() // { value: undefined, done: true }
```

### Generator
```
	调用 Generator 函数后，该函数并不执行，返回一个指向内部状态的指针对象（Iterator Object）。

	Generator 函数是一个普通函数,但是有两个特征:
	一是:function关键字与函数名之间有一个星号;
	二是:函数体内部使用yield表达式,定义不同的内部状态;
	function* helloWorldGenerator() {
	  yield 'hello';
	  yield 'world';
	  return 'ending';
	}
	var hw = helloWorldGenerator(); // 含有 next 方法的指针对象(Iterator)
	输出结果：
	hw.next() 	// { value: 'hello', done: false }
	hw.next() 	// { value: 'world', done: false }
	hw.next() 	// { value: 'ending', done: true }
	hw.next() 	// { value: undefined, done: true }	
```
*	yield表达式
```
	Generator函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停标志。
	遍历器对象的next方法的运行逻辑如下:
	（1）遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
	（2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
	（3）如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
	（4）如果该函数没有return语句，则返回的对象的value属性值为undefined。
	
	注意事项：
		1. yield表达式如果用在另一个表达式之中，必须放在圆括号里面
			示例：
			function* demo() {
			  console.log('Hello' + yield); // SyntaxError
			  console.log('Hello' + yield 123); // SyntaxError

			  console.log('Hello' + (yield)); // OK
			  console.log('Hello' + (yield 123)); // OK
			}

		2. yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。
```
* 	与 Iterator 接口的关系
```
	var myIterable = {};
	myIterable[Symbol.iterator] = function* () {
	  yield 1;
	  yield 2;
	  yield 3;
	};

	[...myIterable] // [1, 2, 3]

	Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。

	function* gen(){
	  // some code
	}
	var g = gen();
	g[Symbol.iterator]() === g
	// true
```
* next 方法的参数
```
	yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
	示例：
		function* foo(x) {
		  var y = 2 * (yield (x + 1));
		  var z = yield (y / 3);
		  return (x + y + z);
		}

		var b = foo(5);
		b.next() // { value:6, done:false }
		b.next(12) // { value:8, done:false }
		b.next(13) // { value:42, done:true }  x=5, y=12*2=24, z=13, 5+24+13=42
```

* for...of 循环
```
	for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。
	示例：
		function* numbers() {
		  yield 1;
		  yield 2;
		}

		for (let v of numbers()) {
		  console.log(v);
		}
		// 1 2

	除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。
	// 扩展运算符
	[...numbers()] // [1, 2]

	// Array.from 方法
	Array.from(numbers()) // [1, 2]

	// 解构赋值
	let [x, y] = numbers();
	x // 1
	y // 2
```

* Generator.prototype.throw()
```
	Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获
	function* gen() {
		try {
	    	yield;
	  	} catch (e) {
	    	console.log(e);
	  	}
	};

	var g = gen(); // g 是遍历器对象
	g.next();
	g.throw(new Error('出错了！'));

 	// 注意，不要混淆遍历器对象的throw方法和全局的throw命令
	g.throw(new Error('error')); // 遍历器对象的throw方法
	throw new Error('error'); // 全局 throw 命令

	g.throw 方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法：
	这种行为其实很好理解，因为第一次执行next方法，等同于启动执行 Generator 函数的内部代码，否则 Generator 函数还没有开始执行，这时throw方法抛错只可能抛出在函数外部。
```
* Generator.prototype.return()
```
	1. 返回给定的值，并且终结遍历 Generator 函数
	2. 如果return()方法调用时，不提供参数，则返回值的value属性为undefined
		g.return('foo') // { value: "foo", done: true }
		g.return() 		// { value: "undefined", done: true }
	3. 如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return()方法会导致立刻进入finally代码块，执行完以后，整个函数才会结束。
		function* numbers () {
		  yield 1;
		  try {
		    yield 2;
		    yield 3;
		  } finally {
		    yield 4;
		    yield 5;
		  }
		  yield 6;
		}
		var g = numbers();
		g.next() // { value: 1, done: false }
		g.next() // { value: 2, done: false }
		g.return(7) // { value: 4, done: false }
		g.next() // { value: 5, done: false }
		g.next() // { value: 7, done: true }
```
* yield* 表达式
```
	如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后面加上星号，表明它返回的是一个遍历器对象。这被称为yield*表达式。

	yield*后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员。
	示例：
		function* gen(){
		  yield* ["a", "b", "c"];
		}
		gen().next() // { value:"a", done:false }

	示例：		
		function* foo() {
		  yield 2;
		  return "foo";
		}

		function* bar() {
		  yield 1;
		  var v = yield* foo();
		  console.log("v: " + v);
		  yield 3;
		}

		var it = bar();

		it.next()
		// {value: 1, done: false}
		it.next()
		// {value: 2, done: false}
		it.next();
		// "v: foo"
		// {value: 3, done: false}
		it.next()
		// {value: undefined, done: true}
	
	示例：使用yield*语句遍历完全二叉树。	
		// 下面是二叉树的构造函数，
		// 三个参数分别是左树、当前节点和右树
		function Tree(left, label, right) {
		  this.left = left;
		  this.label = label;
		  this.right = right;
		}

		// 下面是中序（inorder）遍历函数。
		// 由于返回的是一个遍历器，所以要用generator函数。
		// 函数体内采用递归算法，所以左树和右树要用yield*遍历
		function* inorder(t) {
		  if (t) {
		    yield* inorder(t.left);
		    yield t.label;
		    yield* inorder(t.right);
		  }
		}

		// 下面生成二叉树
		function make(array) {
		  // 判断是否为叶节点
		  if (array.length == 1) return new Tree(null, array[0], null);
		  return new Tree(make(array[0]), array[1], make(array[2]));
		}
		let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

		// 遍历二叉树
		var result = [];
		for (let node of inorder(tree)) {
		  result.push(node);
		}

		result
		// ['a', 'b', 'c', 'd', 'e', 'f', 'g']
```
* 作为对象属性的 Generator 函数
```
	let obj = {
	  * myGeneratorMethod() {
	    ···
	  }
	};
	等价于
	let obj = {
	  myGeneratorMethod: function* () {
	    // ···
	  }
	};
```
* Generator 函数的this
```

```

### Promise对象
	相当于一个容器,里面保存着某个未来才会结束的事件(通常是一个异步操作)的结果
	pending(进行中),fulfilled(已成功),rejected(已失败);
	有了Promise对象,就可以将异步操作以同步操作的流程表达出来,避免了层层嵌套的回调函数。
	let promise=new Pormise(function(resolve,reject){
		//doSomething()
		if(/*异步操作成功*/){     //在成功时将状态从"未完成"变成"成功"
			resolve(value);
		}
		else{					 //在失败时将状态从"未完成"变成"失败"
			reject(value);
		}
	});
	promise.then(function(value) { 				//cb
	    // success
	})
	.catch(function(err) {
	    // error
	})
	.finally(function(){
		//finally
	});
*	Promise实例生成以后,可以用then方法分别指定resolved状态和rejected状态的回调函数
```
	promise.then(function(value) {
	  // success
	}, function(error) {
	  // failure
	});
	then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用,第二个回调函数是Promise对象的状态变为rejected时调用。其中,第二个函数是可选的,不一定要提供。这两个函数都接受Promise对象传出的值作为参数。	
```
* 	立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。
```
	new Promise((resolve, reject) => {
	  resolve(1);
	  console.log(2);
	}).then(r => {
	  console.log(r);
	});
	// 2
	// 1
```
* 	宏任务 macrotask 与微任务 microtask
```
	宏任务： setTimeout, setImmediate, setInterval, script(整体代码)
	微任务： promise.then, process.nextTick,
```


### Promise对象的方法
1. Promise.all()方法
```
	Promise.all方法用于将多个Promise实例,包装成一个新的Promise实例
	Promise.all方法接受一个数组作为参数,p1、p2、p3都是Promise实例,如果不是,就会先调用下面讲到的Promise.resolve方法,将参数转为Promise实例,再进一步处理。
	const p = Promise.all([p1, p2, p3]);
	p的状态由p1、p2、p3决定,分成两种情况:
	（1）只有p1、p2、p3的状态都变成fulfilled,p的状态才会变成fulfilled,此时p1、p2、p3的返回值组成一个数组,传递给p的回调函数
	（2）只要p1、p2、p3之中有一个被rejected,p的状态就变成rejected,此时第一个被reject的实例的返回值,会传递给p的回调函数
```
2. Promise.race()方法
```
	Promise.race 方法同样是将多个Promise实例，包装成一个新的 Promise 实例
	const p = Promise.race([p1, p2, p3]); // 只要 p1、p2、p3 之中有一个实例率先改变状态，p的状态就跟着改变

	const promise = Promise.race([
	  fetch('/resource'),										//向服务器获取资源，只有5秒时间。否则后面函数结果会被race方法捕获
	  new Promise(function (resolve, reject) {					
	    setTimeout(() => reject(new Error('请求超时!')), 5000)   //5秒钟后状态改为reject
	  })
	]);
	promise.then(vlaue=>console.log(value))
		   .catch(err=>console.error(err));
	上面代码中,如果5秒之内fetch方法无法返回结果，promise对象的状态就会变为rejected，从而触发catch方法指定的回调函数。
```
3. Promise.resolve()方法
```
	将现有对象转为Promise对象
	Promise.resolve('foo');
	// 等价于
	new Promise(resolve => resolve('foo'));
```
4. Promise.reject()方法
```
	let promise = Promise.reject('出错了');
	// 等同于
	let promise = new Promise((resolve, reject) => reject('出错了'));
	promise.then(function(){
		//doSomething();
	})
	.catch(err=>console.log(err));											//出错了
```
5. Promise.try()方法
```
	作用：让同步函数同步执行,异步函数异步执行,并且让它们具有统一的API
	第一种方法:在立即执行函数中添加async函数
	const f = () => console.log('now');
	(async () => f())();  
	console.log('next');
	// now
	// next
	第二种方法:
	const f = () => console.log('now');
	Promise.try(f);
	console.log('next');
	// now
	// next
```
6. Promise.allSettled() 方法 ES2020
```
	只有等到参数数组的所有 Promise 对象都发生状态变更（不管是fulfilled还是rejected），返回的 Promise 对象才会发生状态变更。状态总是fulfilled。
```
7. Promise.any() 方法 ES2021
```
	只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。

	Promise.any() 和 Promise.race() 的区别：
		const p = Promise.race([p1, p2, p3]);
		只要 p1、p2、p3 之中有一个实例率先改变状态，p的状态就跟着改变；

		const p = Promise.any([p1, p2, p3]);
		Promise.any()不会因为某个 Promise 变成 rejected 状态而结束，必须等到有一个参数 Promise 变成 fulfilled 状态，或者所有参数 Promise 变成rejected状态才会结束，p的状态再跟着改变；
```
8. Promise.prototype.then
```
	Promise 实例的 then() 方法最多接受两个参数：用于 Promise 兑现和拒绝情况的回调函数。它立即返回一个等效的 Promise 对象，允许你链接到其他 Promise 方法，从而实现链式调用。

	返回值：
		立即返回一个新的 Promise 对象，该对象始终处于待定状态，无论当前 Promise 对象的状态如何。

		onFulfilled 和 onRejected 处理函数之一将被执行，以处理当前 Promise 对象的兑现或拒绝。即使当前 Promise 对象已经敲定，这个调用也总是异步发生的。返回的 Promise 对象（称之为 p）的行为取决于处理函数的执行结果，遵循一组特定的规则。如果处理函数：

			返回一个值：p 以该返回值作为其兑现值。
			没有返回任何值：p 以 undefined 作为其兑现值。
			抛出一个错误：p 抛出的错误作为其拒绝值。
			返回一个已兑现的 Promise 对象：p 以该 Promise 的值作为其兑现值。
			返回一个已拒绝的 Promise 对象：p 以该 Promise 的值作为其拒绝值。
			返回另一个待定的 Promise 对象：p 保持待定状态，并在该 Promise 对象被兑现/拒绝后立即以该 Promise 的值作为其兑现/拒绝值。

	传入非函数作为参数
		// .then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透
		Promise.resolve(1).then(2).then(console.log); // 1
		Promise.reject(1).then(2, 2).then(console.log, console.log); // 1

	then() 的异步性
		Promise.resolve(2).then(console.log); // 微任务
		console.log(1);

		输出结果：
		// 1
		// 2
```

### fetch API:获取资源的接口
	// 通过fetch获取百度的错误提示页面
	fetch('https://www.baidu.com/search/error.html', {
	    method: 'POST',
	    headers: new Headers({
	      'Content-Type': 'application/x-www-form-urlencoded', 				//指定提交方式为表单提交
		  'Accept': 'application/json'										// 通过头指定,获取的数据类型是JSON
	    }),
	    body: new URLSearchParams([["foo", 1],["bar", 2]]).toString()
	})
	.then((res)=>{
	    return res.text()       //获取的是JSON数据时:可以使用res.json()返回一个Promise对象,将对象解析成JSON对象
	})
	.then((res)=>{
	    console.log(res)
	})	

### async函数:用于解决Promise产生的回调地狱问题
	async函数就是Generator函数的语法糖,对Generator函数做了如下四点改进:
*	内置执行器
* 	更直白的语义
	```
	async替换星号(*),await替换yield
	async表示函数里有异步操作,await表示紧跟在后面的表达式需要等待结果
	```
*   适用性更广
	```
	yield只能是Thunk函数或Promise对象,而async函数后面可以是Promise对象和原始类型的值(数值、字符串和布尔值,但这时等同于同步操作)
	```
*   返回值是Promise对象
	```
	async函数的返回结果已经被new Promise.resolve()处理成为Promise对象可以用then方法指定下一步的操作;
	sync函数完全可以看作多个异步操作,包装成的一个Promise对象,而await命令就是内部then命令的语法糖。
	```

### async函数的实现原理,就是将Generator函数和自动执行器,包装在一个函数里
	异步遍历器的最大的语法特点,就是调用遍历器的next方法,返回的是一个Promise对象。	

### await
*	await命令后面是一个Promise对象。如果不是,会被转成一个立即resolve的Promise对象。
*	只要一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行。
	```
	async function f() {
		await Promise.reject('出错了');
		await Promise.resolve('hello world'); 				//不会执行		   		
	}
	```
*	如果await后面的异步操作出错,那么等同于async函数返回的Promise对象被reject
*	注意事项
	```
	第一点，前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。
	async function myFunction() {
	  try {
	    await somethingThatReturnsAPromise();
	  } catch (err) {							//处理await失败时候的情况
	    console.log(err);
	  }
	}
	// 另一种写法
	async function myFunction() {
	  await somethingThatReturnsAPromise()      
	  .catch(function (err) {					//使用then,catch捕获错误
	    console.log(err);
	  });
	}
	第二点，多个await命令后面的异步操作,如果不存在继发关系,最好让它们同时触发。
	let foo = await getFoo();
	let bar = await getBar();
	改写成：
	let [foo, bar] = await Promise.all([getFoo(), getBar()]);
	第三点(很重要),await命令只能用在async函数之中,如果用在普通函数,就会报错。
	```	

### Decorator(装饰器)
```
	修饰器是一个对类进行处理的函数,用来修改类的行为	
	@bar(true)    					//用bar装饰器装饰foo类,并传入一个参数
	class foo {
	  //doSomething();
	}
	function bar(bool) {    		//定义一个装饰器bar,foo类会被作为target的值传入进函数中
	   return function(){
	   	target.readOnly = bool;
	   }
	}
	console.log(foo.readOnly);               // true
```
*	修饰器不仅可以修饰类,还可以修饰类的属性和方法
```
	class Person {
	  @readonly
	  name() { return `${this.first} ${this.last}` }
	}
	function readonly(target, name, descriptor){
	  // descriptor对象原来的值如下:       数据属性描述符：value,enumerable,configurable,writable
	  // {
	  //   value: specifiedFunction,
	  //   enumerable: false,
	  //   configurable: true,
	  //   writable: true
	  // };
	  descriptor.writable = false;
	  return descriptor;
	}
	readonly(Person.prototype, 'name', descriptor);//意思是修改Person类的原型的name属性的属性描述符
```

### Class
	static		//只能被类所使用,不能被实例所继承
	public      //公开所有属性和方法	
	protected	//只能被类和子类使用
*	特别注意：javascript中不存在privarte私有属性修饰符,但是typescript中有
```
	private 	//只能被当前类所使用,子类和对象均不可使用
```
*	Class静态方法：
```
	如果在一个方法前,加上static关键字,就表示该方法不会被实例继承,而是直接通过类来调用。
```
*	constructor方法是类的默认方法,通过new命令生成对象实例时,自动调用该方法。一个类必须有constructor方法,如果没有显式定义,一个空的constructor方法会被默认添加。
* 	类中不存在变量提升
*	Class内部调用new.target,返回当前Class。需要注意的是,子类继承父类时,new.target会返回子类。
```
	利用这个特点,可以写出不能独立使用、必须继承后才能使用的类。
	class Shape {
	  constructor() {
	    if (new.target === Shape) {
	      throw new Error('本类不能实例化');
	    }
	  }
	}
```

### ECMAScript Modules
```
	ES6 模块加载方案，简称 ESM	
	ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。
		变量必须声明后再使用
		函数的参数不能有同名属性，否则报错
		不能使用with语句
		不能对只读属性赋值，否则报错
		不能使用前缀 0 表示八进制数，否则报错
		不能删除不可删除的属性，否则报错
		不能删除变量delete prop，会报错，只能删除属性delete global[prop]
		eval不会在它的外层作用域引入变量
		eval和arguments不能被重新赋值
		arguments不会自动反映函数参数的变化
		不能使用arguments.callee
		不能使用arguments.caller
		禁止this指向全局对象
		不能使用fn.caller和fn.arguments获取函数调用的堆栈
		增加了保留字（比如protected、static和interface）
```
* export 命令
```
	export 命令能够对外输出的就是三种接口：函数（Functions）， 类（Classes），var、let、const 声明的变量（Variables）。	

	// 写法一
	export var m = 1;

	// 写法二
	var m = 1;
	export {m};

	// 写法三
	var n = 1;
	export {n as m};

	// 正确
	export function f() {};

	// 正确
	function f() {};
	export {f};
```
import 命令
```
	import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。
	如果a是一个对象，改写a的属性是允许的。
		import {a} from './xxx.js'
		a.foo = 'hello'; // 合法操作

	import命令具有提升效果，会提升到整个模块的头部，首先执行。import命令是编译阶段执行的，在代码运行之前。
		foo();
		import { foo } from 'my_module';

	由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
		// 报错
		import { 'f' + 'oo' } from 'my_module';

		// 报错
		let module = 'my_module';
		import { foo } from module;

		// 报错
		if (x === 1) {
		  import { foo } from 'module1';
		} else {
		  import { foo } from 'module2';
		}
```
* 模块的整体加载
```
	除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
		import * as circle from './circle';}
```
* export default 命令
```
		使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。
		为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。

			// export-default.js
			export default function () {
			  console.log('foo');
			}

			其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。

			// import-default.js
			import customName from './export-default';
			customName(); // 'foo'

		因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。
			// 错误
			export default var a = 1;
```
* 动态加载
```
	ES2020提案 引入import()函数，支持动态加载模块。
		语法： import(specifier)
		import()返回一个 Promise 对象。下面是一个例子。
			const main = document.querySelector('main');
			import(`./section-modules/${someVariable}.js`)
				.then(module => {
			    	module.loadPageInto(main);
			  	})
			  	.catch(err => {
			    	main.textContent = err.message;
			  	});
```			  	
* import.meta
```
	ES2020 为 import 命令添加了一个元属性import.meta，返回当前模块的元信息
	import.meta只能在模块内部使用，如果在模块外部使用会报错。
	（1）import.meta.url 返回当前模块的 URL 路径
		注意，Node.js 环境中，import.meta.url返回的总是本地路径，即file:URL协议的字符串，比如file:///home/user/foo.js。

	（2）import.meta.scriptElement 是浏览器特有的元属性，返回加载模块的那个<script>元素，相当于document.currentScript属性
		<script type="module" src="my-module.js" data-foo="abc"></script>
		import.meta.scriptElement.dataset.foo 	// 输出： abc
```

### Module 的加载实现
* 在浏览器中加载
```
	<script src="path/to/myModule.js" defer></script>
	<script src="path/to/myModule.js" async></script>
	
	defer 下载完成后，文件要在所有元素解析完成之后执行js代码
	async 下载完成后，立即异步执行js代码
	总结：defer是“渲染完再执行”，async是“下载完就执行”；
		如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。
```
* 加载规则
```
	浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性。
	<script type="module" src="./foo.js"></script>
```
* ES6 模块与 CommonJS 模块的差异
```
	CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
	CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
	CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。
```

### ArrayBuffer 对象
```
	ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区，通常在其他语言中称为“byte array”。
	ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（TypedArray视图和DataView视图)来读写，视图的作用是以指定格式解读二进制数据。 ArrayBuffer 是一个可转移对象。
	可转移对象（Transferable object）：是拥有属于自己的资源的对象，这些资源可以从一个上下文转移到另一个，确保资源一次仅在一个上下文可用。传输后，原始对象不再可用；它不再指向转移后的资源，并且任何读取或者写入该对象的尝试都将抛出异常。

	const buffer = new ArrayBuffer(16); // 16个字节
	const int32View = new Int32Array(buffer); // 4个字节

	for (let i = 0; i < int32View.length; i++) {
		int32View[i] = i * 2;
	}

	Nodo.js 中的 Buffer 继承 Uint8Array
  	declare class Buffer extends Uint8Array{ // 翻到Buffer的声明文件(typescript的*.d.ts文件)，你会看到
    	//...
  	}


  	【1】 ArrayBuffer 转 Buffer
  	Buffer.from(arrayBuffer.buffer); // arrayBuffer 为 ArrayBuffer 的某一数据类型视图实例
  	Buffer.from(uint8Array.buffer); // uint8Array 为 Uint8Array 的实例

  	【2】 Buffer 转 ArrayBuffer
  	Buffer 的实例维护了一个属性buffer，亦即ArrayBuffer
  	const arrayBuffer = buffer.buffer; // buffer 为 Buffer 实例
```
### TextEncoder、TextDecoder 对象与 Uint8Array 对象
```
	String（码位流） 	'abc'
	Uint8Array（字节流） Uint8Array(3) [97, 98, 99, buffer: ArrayBuffer(3), byteLength: 3, byteOffset: 0, length: 3, Symbol(Symbol.toStringTag): 'Uint8Array']

  	let textEncoder = new TextEncoder();
  	let uint8Array = textEncoder.encode('abc');
  	console.log(uint8Array);  	// Uint8Array(3) [97, 98, 99, buffer: ArrayBuffer(3), byteLength: 3, byteOffset: 0, length: 3, Symbol(Symbol.toStringTag): 'Uint8Array']

  	let textDecoder = new TextDecoder();
  	let uint8Array = new Uint8Array([97, 98, 99]);
  	let str = textDecoder.decode(uint8Array);
  	console.log(str); 			// abc
```

### vue2 项目中使用 ES6 实验特性
```
	cnpm i '@babel/plugin-proposal-optional-chaining' --save-dev

	babel.config.js 文件中
	module.exports = {
	  presets: [
	    '@vue/app'
	  ],
	  plugins: [
	    '@babel/plugin-proposal-function-bind',						// 用"::"符号来代替"bind", "call"语法.
	    '@babel/plugin-proposal-logical-assignment-operators',		// result.name ||= 1;
	    '@babel/plugin-proposal-nullish-coalescing-operator',		// let name = result.name.cname ?? 'yfx';
	    '@babel/plugin-proposal-optional-chaining',					// res?.data?.img
	    "@babel/plugin-transform-numeric-separator",				// 12_00000_00_000_0
	  ]
	}
```