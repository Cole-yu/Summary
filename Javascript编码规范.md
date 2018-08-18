# JavaScript编码规范

### 目录
1. JavaScript文件
2. 排版规则
3. 命名规范
4. 编码规范
5. 注释规则
6. 浏览器兼容问题

### 进行编码规范的目的
1. 统一编码风格
2. 提高代码的可阅读性
3. 减少错误代码
4. 减少性能漏洞
5. 提高代码可读性
6. 减少错误的编码设计
7. 作为代码检查的依据
8. 建立可维护的JavaScript语言编码规范


### JavaScript文件
1. 	文件引用
	```
	js文件不应该被包含在html文件中(html中的js代码不能被缓存和压缩)，将增加文件大小
	filename.js应尽量放到body后面,减少载入脚本而造成页面内容被延迟加载的问题
	禁止使用language属性,必须使用type属性
	<script type="text/javascript" src="filename.js"></script>
	```
2. 	编码格式
	```
	js文件必须采用UTF-8无BOM格式编码,避免出现乱码问题。
	维护已存在的js脚本文件必须把编码格式转换成规范要求的UTF-8无BOM格式
	```

### 排版规则
1. 	缩进
	```
	每一级缩进4个空白符,不要使用Tab作为缩进(不同编辑器的Tab缩进长度不一致)
	```
2.  空白
	* 空行
	* 空格
3.  换行:
	* 每行一个语句
	* 较长的语句(>80字符),必须多行书写
	* 行结束，必须使用;表示结束

### 命名规范
* 	约定"类名"使用Pascal命名法,即用英文的大小写来分割单词,所有单词的首字母大写
*   约定"变量"和"方法"使用Camel命名法,即第一个英文首字母小写,其余单词首字母大写
1.  变量命名
	```
	采用Camel命名法(全局变量除外)
	1) 全局变量使用全大写字母,单词间下划线间隔 var MAX_COUNT=10
	2) 不要将在循环中频繁使用的临时变量如i,j等用于其他用途
	3) UI(用户界面)控制变量应在名称后面加控制类型,例如：leftComboBox,TopScrollPane
	4) 带有"num"或者"count"开头的变量名约定为数字
	5) 能缩写的名称尽量使用缩写
	6) 缩写词不要全部使用大写字母
	7) 前面加"is"的变量名,应该为布尔值,同理可以为"has","can"或者"should"
	8) 含有集合意义的属性命名,尽量包含其复数的意义,例如products
	```
2.  类命名
	```
	用Pascal命名规则,尽量谨慎的使用缩写,不要用下划线作类名单词连接符。类使用英文的大小写来分割单词,所有单词的首字母大写
	例如:MouseEventHandler
		 EventHandler
		 UIEventHandler
	```
	* 类方法命名
		```
		普通方法使用意义完整的英文描述命名,采用Camel命名法。每个方法执行一个动作，尽量采用动词和动宾结构
		例如：obj.getProductName()
		```
	* 类属性命名
		```
		类的属性采用camel命名规则
		如果类的属性设置为私有,则前面必须添加下划线
		例如:obj._somePrivateVariable
		```
3.  函数命名
	```
	函数名使用意义完整的英文描述,采用Camel命名,采用第一个单词的字母小写,剩余单词首字母的大写其余字母小写的大小写混合法
	例如：function productClick(index,productName){}
	```

### 编码规范
	变量是程序的基础,规范的变量编码不仅能降低程序的出错率,更能增加代码的可读性,方便维护和扩展。

#### 变量
1.	声明
	```
    所有的变量必须在使用前先声明,虽然JavaScript并不强制必须这么做,但可以让程序易于阅读，且也容易发现那些没有声明的变量(未声明的变量会被程序默认编译成全局变量)
 	每个变量的声明语句单独放到一行，并加上注释说明,声明变量必须加上var关键字
   	例如：var currentActivedVersionIndex;  //当前激活的版本号
   	```
2.  变量初始化
	```
	变量必须在声明初始化以后才能使用,即便是NULL类型
	```
3. 	生命周期
	```
	变量应该尽量保持最小的生命周期(作用域范围)
	在函数的首部定义所有的变量
	尽量减少全局变量的使用,不要让局部变量覆盖全局变量
	```
4.  浮点数
	```
	浮点数必须指明小数点后一位(即使是0)
	浮点数必须指明实部,即使它们为零(使用 0. 开头,禁止写成 .5)
	例如：var floatNum=0.0
	```
5.  json对象
	```
	json对象定义,应该补全双引号
	例如:{name:"Tom"}
		 {'name':"Tom"}	
		应该写成:
		{"name":"Tom"}
	```

#### 操作符
1.  {}和[]
	```
	使用字面量方式创建空对象和空数组,代码看起来简单易懂。避免new Object()和new Array()的方法
	例如:var productArr=[];
		 var studentObj={};
	```
2.  =,==和===
	```
	=是赋值操作符
	==做逻辑等判断时,会先进行类型转换后在进行比较,但"==="则不会(数据类型必须也相同)
	```
3.  ?:
	```
	三元表达式
	(condition)?func1():func2();
	如果方法比较长,可以放在不同的行
	(condition)
	?long statement
	:another long statement
	```
4.  巧用"+"
	```
	作用1:数字值相加
	作用2:字符串连接
	作用3:一元运算符,把字符串转换为数字(数据类型转换)
	例如：	var valueA=20;
			var valueB="10";
			alert(valueA + valueB);		//输出:2010
			alert(valueA + (+valueB));	//输出:30
			alert(valueA ++valueB);		//Compile error
	```

#### 语句
1.  简单语句
	```
	使用分号表示语句结束;如果一个赋值语句使用函数或对象来赋值,可能会跨多行,需要在赋值语句末加上分号。
	```
2.  复杂语句
	```
	复合语句if,for,while,do,switch,try...catch...等代码体,需要放在'{}'里面
	'{'统一另起一行,放在行首,标识代码块的开始
	'}'应在一行开头,标志代码块结束,同时需要和'{'所在行的开始对齐。
	```
3.  return语句
	```
	如果返回表达式,则表达式必须与return关键字在同一行,不能另起一行。
	若没有返回表达式,则返回undefined。
	```
4.  for/for-in循环
	```
	for-in循环只用于object/map/hash的遍历,遍历数组通常用最普通的for循环。避免在for循环中使用关键字continue
	```
5.  with语句(扩展作用域链)
	```
	不要使用with语句,这将使得你的代码在语义上变得不清晰,且JavaScript编译器难以在作用域链上查找某个变量,难以决定应该在哪个对象上来取值
	with (Math) {
	  a = PI * r * r;
	  x = r * cos(PI);
	  y = r * sin(PI / 2);
	}
	```
6.  不要使用生偏语法,不违反代码易读性原则

#### 函数
1.  函数声明
	```
	函数在调用前应先进行函数声明
	```
2.  函数参数
	```
	明确定义函数固定数量的参数和参数名称
	禁止在函数内部使用arguments去获取某个函数参数,而应直接使用参数名称
	```
3.  函数返回值
	```
	一个函数尽量返回统一的数据类型
	在根据条件(if...else...)返回不同的值时,尽量保证不同条件下返回的值数据类型一致
	```
4.  eval是恶魔
	```
	eval(string)
	eval会先计算并执行()内的JavaScript代码语句
	在把变量json化时,需要先把JSON字符串用'()'括号先括起来
	var jsonStr='{"name":"Tom","sex":"male"}';
	var jsonObj=eval( '(' + jsonStr + ')' );	//先进行字符串拼接,在eval()
	console.log(jsonObj.name);					//Tom
	```
5.  闭包
	```
	闭包中局部变量是传引用,不是传值;产生循环引用,进一步导致内存泄漏。
	函数对象,活动对象,作用域链,执行上下文对象(执行环境),垃圾回收机制(GC)
	```
6.  setTimeout/setInterval
	```
	不要给setTimeout或者setInterval传递字符串参数.javascript会把传入的字符串参数解析执行。
	setTimeout("alert('test')",2000);
	```

####其他规范
1. 	禁止修改内置对象的原型
	```
	内置对象作为一套公共接口,具有约定俗成的行为方式，修改其原型，可能破坏接口语义。
	错误示例：修改了数组对象的index方法
	array.prototype..indexOf=function(){
		return -1
	}
	```
2. 	降低与XHTML的耦合性
	```
	不要过于依赖DOM的一些内容特征来调用不同的脚本代码,而应该定义不同功能的方法,然后在DOM调用,这样不管DOM是按钮还是链接,方法的调用都是一样的。	
	```
3.  变量与恒量相比
	表达式或者变量与恒量相比时,总是将恒量放在等号/不等号的左边。假如你在等式中漏了一个等号,语法检查器会为你报错。
4. 	没有含义的数字
	尽量避免赤裸裸的数字,它们应该使用常量来代替
5. 	页面卸载、局部刷新调整时,要注销相应的定时器和延时器
	clearInterval
6.  页面卸载时要注销绑定的事件监听
	el.addEventListener(type,listener,options);
	el.removeEventListener('click',listener);
7.  避免嵌入式的赋值
8.  删除不再使用的代码段

####陷阱和技巧
1.  parseInt必须指定基数。如果不指定parseInt的第二个参数,如果前缀为"0x",按16进制转换;如果前缀为"0"的字符串,在chrome和firefox下,默认为10进制转换,但在IE浏览器下按照8进制转换。如果以1~9数字开头,将被解析为十进制的整数。
2.  布尔表达式
	```
	0,-0,null,""(空字符串),false,undefined,NaN,对于上面7个值,if(x)返回false
	'0',[](空数组),{}(空对象),对于上面3个值,if(x)返回true
	```
3.  DOM节点ID
	```
	DOM节点的ID命名使用英文字母、_和数字,避免使用.<>等其他特殊字符,常用作CSS等的选择器
	```
4.	遍历NodeList
	```
	var el=document.getElementsByClassName("btn");
	for(var i=0,len=el.length;i<len;i++){
		//doSomething(el[i]);		
	}
	```
5.  遗漏的参数
	```
	给可选参数或者新增参数设置默认值。
	function addParams(country){
		var country=country||"China";	//如果没有传入country这个参数，给出默认值China 
	}
	```
6.  HTML id冲突
	```
	尽量不要使用HTML中的ID作为Javascript的变量名,这样将使得难以追踪业务逻辑错误
	```

### 注释规则
1.  一般规则
	```
	当代码不清晰时使用注释,用来阐明代码的意图,而不要做无谓的注释
	//dialogActived表示对话框激活状态,true表示显示,false表示隐藏
	var dialogActived=false;
	* 不容易理解的代码总是需要注释
	* 容易被其他开发人员误认为是错误的,这些代码需要加上注释,比如一些技巧性的用法:
	while(element&&(element=element[axis])) //注意:这里是赋值不是比较
	{
		//doSomething();
	}
	* 特定浏览器专用的用法需要被注释,如不同浏览器下的鼠标滚轮方向判断：
	function scroll(e) {  
        e = e || window.event;  
        if (e.wheelDelta) {  				//判断浏览器IE,谷歌滑轮事件
            if (e.wheelDelta > 0) { 		//当滑轮向上滚动时  
               //事件
            }  
            if (e.wheelDelta < 0) { 		//当滑轮向下滚动时  
                //事件 
            }  
        } else if (e.detail) {  			//Firefox滑轮事件  
            if (e.detail> 0) { 				//当滑轮向上滚动时  
               //事件 
            }  
            if (e.detail< 0) { 				//当滑轮向下滚动时  
                //事件  
            }  
        }  
    }  
	```
2.  函数注释
	```
	/*
		对比的类型和对象
		@param {Number} type 1表示按时间,2表示按EMUI版本,3表示按产品
		@param {Object} item 当前特性对象,包含特性名称,特性编码
		@return {Array} 新数组
	*/
	function compare(type,item){
		//doSomething();
	}
	```
3.  版权信息
	```
	示例：
	/*
		Title:页面信息(如：新闻建立页面)
		Description:描述信息(如：建立和修改新闻信息)
		Copyright:Copyright (c) 2011-2012 yfx All Rights Reserved
		Nameplace:AddNewDetailInfo
		@author:作者姓名
		@version:1.00
	*/
	```

### 浏览器兼容问题
	为了获得最大的可移植性和兼容性,尽量依赖标准方法
	说明：在开放式系统中,我们不能约束系统使用者的运行环境,要充分考虑兼容性问题
1.  HTML对象获取问题：document.getElementById("idName")或jquery:$(selector)
2.  event.x与event.y问题：startX=event.x?event.x:event.pageX;
3.  window.location.href问题：使用win.location来代替window.location.href
4.  js获取对象的属性：$(selector).attr("attribute");将jquery对象转换为dom对象获取效率更高,$(selector)[0].id,$(selector)[0].name
5.  js设置对象的属性：$(selector).attr({Id:id,Name:name,Title:title});
6.  js获取对象的样式：$(selector).css("background");
7.  js设置对象的属性：$(selector).css({Background:"#DDDDDD",Position:"absolute","z-index":99});
8.  js获取对象的物理位置
	```
	var offset=$(selector).offset();
	var offLeft=offset.left;			//相对页面X轴位移
	var offTop=offset.top;				//相对页面Y轴位移
	var positon=$(selector).position();
	var positionLeft=position.Left;  	//相对定位的X轴位移
	var positionTop=position.top;       //相对定位的Y轴位移
	//offset可以理解为相对于根目录的的坐标位移(整个文档document)
	//position是相对于它的父级元素的坐标位置
	```
9.  js事件源位移：var e=event||window.event;var x=e.pageX;var y=e.pageY;