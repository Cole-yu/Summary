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

### checkbox用法
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