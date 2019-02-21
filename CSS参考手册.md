# 	CSS参考手册

### css隐藏元素的方式
1.  display:none;					//显示方式	
2.  visibility:hidden/visible;   	//visibility:visible;可见度:显示
3.  opacity:0;    					//透明度:0-完全透明,1-完全不透明
4.  index:-1;(同一块显示区域存在多层元素时)
5.  position:absolute;top:-999rem;  //在视口以外

### 水平垂直居中
*	脱离文档流元素的居中
1.  margin:auto法
	```
	#parent{
		width:100%;
		height:100%;
		position:relative;
	}
	#child{
		position:absolute;
		top:0;
		left:0;
		bottom:0;
		right:0;
		margin:auto;
		width:400px;
		height:300px;
	}
	```
2. 	使用负margin法
	```
	#parent{
		position:relative;	
	}
	#child{
		position:absolute;
		left:50%;
		top:50%;
		margin-left:-50%;
		margin-top:-50%;
		width:400px;
		height:300px;
	}
	```
3. 	使用display:flex布局
	```
	#parent{
		display:flex;
		justify-content:center;
		align-items:center;
	}
	#child{
		width:400px;
		height:300px;
	}
```

### 元素的层级关系从低到高(元素,before,after)
	如果before和after样式互换,会导致before内容被after内容覆盖,因为after在before的上面。
	.foo{
		width:200px;
		height:200px;			
		position: absolute;
		border-radius: 50%;
		border-width: 20px;
		border-style: solid;			
		border-color: red transparent transparent transparent;
	}
	.foo::before{
		content:'';
		position:absolute;
		left:15px;
		right:15px;
		top:15px;
		bottom:15px;			
		border-radius: 50%;
		border-width: 20px;
		border-style: solid;			
		border-color: green transparent transparent transparent;
	}	
	.foo::after{
		content:'';
		position:absolute;
		left:50px;
		right:50px;
		top:50px;
		bottom:50px;			
		border-radius: 50%;
		border-width: 20px;
		border-style: solid;			
		border-color: blue transparent transparent transparent;
	}

### 让body刚好占满整一个屏幕
	hmtl,body{
		margin:0;
		padding:0;
		width:100%;
		height:100%;
		overflow:hidden;
	}

### 如何实现一个三角形
	当box-sizing:conent-box; 	//边框不计算在宽度中,必须设置内容区域长宽为0
	.bar{		
		width: 0px;
		height: 0px;
		background-color: red;
		border-style: solid;		
		border-width: 100px;		
		border-color: green transparent transparent;		
	}
	当box-sizing:border-box;		//边框会计算在宽度内,因此当宽度小于2倍的border时(即宽度不够时,内容区域自然不会显示出来)
	.foo{
		width: 200px;
		height: 200px;
		background-color: red;
		border-style: solid;
		border-width: 100px;
		border-color: green transparent transparent;
		box-sizing: border-box;
	}

### data属性	
*	data-\*属性来嵌入自定义数据,在css、js中使用,属性名不应该包含任何大写字母,并且在前缀"data-"之后必须至少有一个字符
	```
	<span id='bird' data-animal='鸟类'>喜鹊</span>
	```	
*	在css中使用
	```
	#bird::before{
		content:attr(data-animal);
		color:red;
		font-size:16px;		
	}
	```
* 	在js中使用
	```
		获取所需元素的data-*自定义属性的值
		docunment.getElementById('bird').getAttribute("data-animal");   //获取属性data-animal的值
		添加data-*属性
		docunment.getElementById('bird').dataset.color='red';			//为该元素添加了一个data-color自定义属性,且值为red
	```

### 两列式布局,左侧宽度固定,右侧宽度自适应
1.  margin:auto法
	```
	html,body{
		margin:0;
		padding:0;
		width:100%;
		height:100%;
		overflow:hidden;
	}
	.left{
		width:300px;
		height:100%;		
	}
	.right{
		position:absolute;
		left:300px;		//水平距离右侧300px;
		right:0;
		bottom:0;
		top:0;
		height:100%;
		margin:auto;
	}
	```
2.  浮动布局
	```
	.left{
		float:left;
		width:300px;
		height:100%;
		background-color:red;
	}
	.right{
		margin-left:300px;
		width:100%;
		height:100%;
		background-color:yellow;
	}
	```
3.  calc计算属性
	```
	.left{
		float:left;
		width:300px;
	}
	.rigth{
		float:right;
		width:calc(100% - 300px);            注意：使用calc计算属性的时候 运算符(- +等等)两边必须有空格 
	}
	关键点： 
	* 注意两个div必须一左一右浮动
	* calc的宽度必须要减去的宽度要与固定宽度保持一致
	```	


# 	属性选择器
### 子串匹配属性选择器
	[abc^="def"]    选择abc属性以"def"开头的所有元素
	[abc$="def"]    选择abc属性以"def"结尾的所有元素
	[abc*="def"]    选择abc属性中包含子串"def"的所有元素


# 	Flex布局
	参考链接：http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

### 声明Flex项目
	display:flex;
	display:-webkit-flex;

### 6个属性
	flex-direction
	flex-wrap
	flex-flow
	justify-content
	align-items
	align-content

### flex-direction属性
	决定主轴的方向（即项目的排列方向）	
	.box {
	  flex-direction: row | row-reverse | column | column-reverse;
	}
	row（默认值）：主轴为水平方向，起点在左端。
	row-reverse：主轴为水平方向，起点在右端。
	column：主轴为垂直方向，起点在上沿。
	column-reverse：主轴为垂直方向，起点在下沿。

### flex-wrap属性
	如何换行
	.box{
	  flex-wrap: nowrap | wrap | wrap-reverse;
	}
	nowrap（默认）：不换行。
	wrap：换行，第一行在上方，新的一行在下方。
	wrap-reverse：换行，第一行在下方，新的一行在上方。

### flex-flow属性
	flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。	

### justify-content属性
	justify-content属性定义了项目在主轴上的对齐方式。
	.box {
	  justify-content: flex-start | flex-end | center | space-between | space-around;
	}	
	flex-start（默认值）：左对齐
	flex-end：右对齐
	center： 居中
	space-between：两端对齐，项目之间的间隔都相等。
	space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

### align-items属性
	align-items属性定义项目在交叉轴上如何对齐。	
	.box {
	  align-items: flex-start | flex-end | center | baseline | stretch;
	}
	flex-start：交叉轴的起点对齐。
	flex-end：交叉轴的终点对齐。
	center：交叉轴的中点对齐。
	baseline: 项目的第一行文字的基线对齐。
	stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

### align-content属性
	align-content属性定义了多根水平轴线的布局排列方式。如果项目只有一根轴线，该属性不起作用。
	.box {
	  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
	}
	flex-start：与交叉轴的起点对齐。水平轴线从垂直方向的顶部依此向下排列
	flex-end：与交叉轴的终点对齐。水平轴线分布在垂直方向上的底部区域,且最后一根与底部对齐
	center：与交叉轴的中点对齐。水平轴线分布在中间区域
	space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
	space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
	stretch（默认值）：轴线占满整个交叉轴。


### 使用自定义字体
	@font-face {
		font-family: 'ui-grid';
		src: url('ui-grid.eot');
		src: url('ui-grid.eot#iefix') format('embedded-opentype'), url('ui-grid.woff') format('woff'), url('ui-grid.ttf') format('truetype'), url('ui-grid.svg?#ui-grid') format('svg');
		font-weight: normal;
		font-style: normal;
	}

### CSS3渐变	
1.  线性渐变
	```
	语法：background: linear-gradient(direction, color-stop1, color-stop2, ...);
	* direction:(top/bottom/left/right或者角度值180deg)		
	默认从上到下进行渐变
	top:从上到下()
	left 从左向右
	right:从右向左	
	left top:从左上角到右下角
	示例：
	#bg{
		background-color:linear-gradient(red 10%, green 65%, blue 90%);
	}	
	#grad{
		background:linear-gradient(180deg, red 10%, blue 35%);
	}
	repeating-linear-gradient() 函数用于重复线性渐变：
	#grad{
		background:repeat-linear-gradient(180deg, red 10%, blue 25%);
	}
	```
2. 	径向渐变
	```
	语法：background: radial-gradient(center, shape size, start-color, ..., last-color);
	* shape 参数定义了形状。它可以是值circle或ellipse。其中,circle表示圆形,ellipse表示椭圆形。默认值是ellipse。
	#grad {
		background:radial-gradient(circel, red 5%, green 15%, blue 60%);
	}
	带有不同尺寸大小关键字的径向渐变：
	#grad1 {  
  		background:radial-gradient(60% 55%, closest-side,blue,green,yellow,black);   
	}
	repeating-radial-gradient() 函数用于重复径向渐变：
	#grad {  
  		background:repeating-radial-gradient(red, yellow 10%, green 15%);
  	}
  	```

### float
	设置了 float 的元素，会脱离文档流，然后向左或向右移动，直到碰到父容器的边界或者碰到另一个浮动元素。
	块级元素会忽略 float 元素，文本和行内元素却会环绕它，所以 float 最开始是用来实现文字环绕效果的。

### 什么是块级格式化上下文(Block Formatting Context, BFC),如何创建块级格式化上下文？
```
	https://www.cnblogs.com/dojo-lzz/p/3999013.html
	
	问：什么是块级格式化上下文？
	答：Formatting Context：指页面中的一个渲染区域，并且拥有一套渲染规则，他决定了其子元素如何定位，以及与其他元素的相互关系和作用。
		BFC：块级格式化上下文,它是指一个独立的块级渲染区域,只有Block-level BOX参与，
		该区域拥有一套渲染规则来约束块级盒子的布局,且与区域外部无关。
	
	如何创建块格式化上下文？
	答：	根元素
		float的值不为none
		overflow的值不为visible
		display的值为inline-block、table-cell、table-caption
		position的值为absolute或fixed
```	