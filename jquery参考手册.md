# 	jquery参考总结

### 选择器
	$(this)  					//函数中使用,被事件绑定的当前元素
	$("*")  					//所有元素			
	$("#app")					//id为app的元素
	$(".wrapper")				//class为wrapper的所有元素
	$("div")					//所有div标签元素
	$(".wrapper.selected")		//所有class="wrapper"且class="demo" 的元素
	$(".wrapper .demo")			//class="wrapper"的元素后代的class="demo"元素
	$("p:first")				//第一个<p>元素
	$("p:last")					//最后一个<p>元素
	$("tr:even")				//所有偶数<tr>元素
	$("tr:odd")   				//所有奇数<tr>元素
	$("ul li:eq(3)")			//列表中的第四个元素（index 从 0 开始）
	$("ul gt:eq(3)")			//列出 index 大于 3 的元素
	$("ul lt:eq(3)")			//列出 index 小于 3 的元素
	$("input:not(:empty)")		//所有不为空的 input 元素
1.  遍历选择
	```
	$("li").eq(3).css("background-color","red");
	$("p").eq(3) == $("p:eq(3)")
	```
2. 	属性选择器[]
	```
	$("a[href='http://www.baidu.com']")
	$("input[type='checkbox']")
	```

### checkbox复选框
1.	注意事项：jquery1.6以前版本用attr,1.6以后建议用prop
2.	获取所有的checkbox元素
	```
	$("input:checkbox")			//获取所有checkbox元素
	$("input[type='checkbox']")	//获取所有checkbox元素
	$("input:checkbox:checked") 			//获取所有选中的checkbox元素
	$("input:[type='checkbox']:checked")	//获取所有选中的checkbox元素
	$("input[type='checkbox']:checked")		//获取所有选中的checkbox元素
	```
3.	判断checkbox是否为选中状态
	```
	<input id="rememberPassword" type='checkbox>
	$("#rememberPassword").prop('checked')
	$("#rememberPassword").attr('checked')
	```
4.	设置checkbox为选中状态
	```
	$("input:checkbox").prop("checked","checked")
	$("input:checkbox").prop("checked",true)
	$("input:checkbox").attr("checked","checked")
	$("input:checkbox").attr("checked",true)
	```
5.	设置checkbox为不选中状态
	```
	$("input:checkbox").prop("checked"," ")
	$("input:checkbox").prop("checked",false)
	$("input:checkbox").attr("checked"," ")
	$("input:checkbox").attr("checked",false)
	```
6. 	设置checkbox为禁用状态
	```
	$("input[type='checkbox']").prop("disabled",true);
	$("input[type='checkbox']").prop("disabled","disabled");
	$("input[type='checkbox']").attr("disabled",true);
	$("input[type='checkbox']").attr("disabled","disabled");
	```
7.  设置checkbox为启用状态
	```
	$("input[type='checkbox']").removeAttr("disabled");
	$("input[type='checkbox']").prop("disabled",false);
	$("input[type='checkbox']").prop("disabled"," ");
	$("input[type='checkbox']").attr("disabled",false);
	$("input[type='checkbox']").attr("disabled"," ");
	```
8.	$("#checkbox").val();   			//获取checkbox的值


### jQuery的on()方法
	语法:$(selector).on(event,childSelector,data,function);
1.  事件监听的方法
	```
	$("button").on("click",function(){
		//dosomething
	});		
	$("button").click(function(){
		//dosomething
	});
	$("button").bind("click",function(){
		$(this).css("background-color","pink");
	});
	$("button").live("click",function(){
		$(this).css("background-color","pink");
	});
	```
2.	利用map结构对元素使用on方法绑定多个事件
	```
	$("p").on({
		mouseover:function(){
			$("body").css("background-color","lightgray");
		},  
	    mouseout:function(){
	    	$("body").css("background-color","lightblue");
	    }, 
	    click:function(){
	    	$("body").css("background-color","yellow");
	    }  
	});
	```
3.  childSelector(规定将事件处理程序绑定到指定的子元素上的,此时父元素将无效)
	```
	<div id="demo" style="border:1px solid black;">外部div内容区域
		<p>点击此处,才会触发on()方法来设置背景颜色</p>
	</div>
	$("#demo").on("click","p",function(){
		$(this).css("background-color","pink");
	});
	注意事项：当点击div#demo区域时不会触发点击事件,只有点击p元素区域时,才会成功触发事件效果
	$("#demo").delegate("p","click",function(){
		$(this).css("background-color","pink");
	});
	```
4. 	on()方法也适用于向未来的元素(尚未创建的元素)添加事件处理程序
	```
	<div id="demo"></div>//在将来会向div#demo中添加一个新的子元素<p>this is a paragraph<p>,添加后点击这个p元素,通过下面的on事件绑定机制,可以触发隐藏效果
	$("div#demo").on("click","p",function(){
    	$(this).slideToggle();
  	});
  	```
5. 	向函数中传递数据
	```
	function handlerName(event){
	  	alert(event.data.msg);
	}
	$("p").on("click", {msg:"You just clicked me!"}, handlerName);
	```
6.  移除通过on方法绑定的事件监听
	```
	$("button).off("click");
	```

### jQuery的children()
	返回目标元素的直接子元素(只包含子代,不包括孙子代)
	$("#demo").children(".selected").css("color", "blue");	//找到类名为"selected"的所有#demo元素的子元素,并将其设置为蓝色：

###	jQuery的find()
	返回目标元素的所有后代元素,一路向下直到最后一个后代
	$("div").find("span");									//返回div元素的所有span元素

### jQuery的clone()方法
	$(selector).clone(includeEvents)  						//布尔值,规定是否复制元素的所有事件处理,默认不复制元素上的事件监听
	clone() 方法生成被选元素的副本，包含子节点、文本和属性。
	$("p").clone();											//复制p元素,包含子节点、文本和属性
	$("body").append($("p").clone());						//复制p元素,并将其添加到body元素的后面