# JSP学习笔记

### JSP 处理过程
	就像其他普通的网页一样，您的浏览器发送一个HTTP请求给服务器。
	Web服务器识别出这是一个对JSP网页的请求，并且将该请求传递给JSP引擎。通过使用URL或者.jsp文件来完成。
	JSP引擎从磁盘中载入JSP文件，然后将它们转化为servlet。这种转化只是简单地将所有模板文本改用println()语句，并且将所有的JSP元素转化成Java代码。
	JSP引擎将servlet编译成可执行类，并且将原始请求传递给servlet引擎。
	Web服务器的某组件将会调用servlet引擎，然后载入并执行servlet类。在执行过程中，servlet产生HTML格式的输出并将其内嵌于HTTP response中上交给Web服务器。
	Web服务器以静态HTML网页的形式将HTTP response返回到您的浏览器中。
	最终，Web浏览器处理HTTP response中动态产生的HTML网页，就好像在处理静态网页一样。

### JSP 生命周期（类似于servlet生命周期，区别在于JSP生命周期还包括将JSP文件编译成servlet）
	1. 	编译阶段：
		servlet容器编译servlet源文件，生成servlet类。
	2. 	初始化阶段：
		加载与JSP对应的servlet类，创建其实例，并调用它的初始化方法
	3. 	执行阶段：
		调用与JSP对应的servlet实例的服务方法
	4. 	销毁阶段：
		调用与JSP对应的servlet实例的销毁方法，然后销毁servlet实例

#### JSP编译
	当浏览器请求JSP页面时，JSP引擎会首先去检查是否需要编译这个文件。如果这个文件没有被编译过，或者在上次编译后被更改过，则编译这个JSP文件。
	编译的过程包括三个步骤：
	解析JSP文件。
	将JSP文件转为servlet。
	编译servlet。
	
####	JSP初始化
	容器载入JSP文件后，它会在为请求提供任何服务前调用jspInit()方法。如果您需要执行自定义的JSP初始化任务，复写jspInit()方法就行了，就像下面这样：
	public void jspInit(){
	  // 初始化代码
	}
	一般来讲程序只初始化一次，servlet也是如此。通常情况下您可以在jspInit()方法中初始化数据库连接、打开文件和创建查询表。

####	JSP执行
	这一阶段描述了JSP生命周期中一切与请求相关的交互行为，直到被销毁。
	当JSP网页完成初始化后，JSP引擎将会调用_jspService()方法。
	_jspService()方法需要一个HttpServletRequest对象和一个HttpServletResponse对象作为它的参数，就像下面这样：
	void _jspService(HttpServletRequest request,HttpServletResponse response)
	{
	   // 服务端处理代码
	}
	_jspService()方法在每个request中被调用一次并且负责产生与之相对应的response，并且它还负责产生所有7个HTTP方法的回应，比如GET、POST、DELETE等等。

####	JSP清理
	JSP生命周期的销毁阶段描述了当一个JSP网页从容器中被移除时所发生的一切。
	jspDestroy()方法在JSP中等价于servlet中的销毁方法。当您需要执行任何清理工作时复写jspDestroy()方法，比如释放数据库连接或者关闭文件夹等等。
	jspDestroy()方法的格式如下：
	public void jspDestroy()
	{
	   // 清理代码
	}

### JSP 语法

###	脚本程序
	脚本程序可以包含任意量的Java语句、变量、方法或表达式，只要它们在脚本语言中是有效的。
	脚本程序的语法格式：
	<% 代码片段 %>
	例如：
	<% 
		out.println("Your IP address is " + request.getRemoteAddr()); 
	%>
	或者，您也可以编写与其等价的XML语句，就像下面这样：
	<jsp:scriptlet>   
	  代码片段
	</jsp:scriptlet>

###	JSP声明
	一个声明语句可以声明一个或多个变量、方法，供后面的Java代码使用。在JSP文件中，您必须先声明这些变量和方法然后才能使用它们。
	JSP声明的语法格式：
	<%! 
		declaration; 
		[ declaration; ]
		... 
	%>
	或者，您也可以编写与其等价的XML语句，就像下面这样：
	<jsp:declaration>   
	  代码片段
	</jsp:declaration>
	程序示例：	
	<%! 
	  private int initVar=0;
	  private int serviceVar=0;
	  private int destroyVar=0;
	%>
	  
	<%!
	  public void jspInit(){
	    initVar++;
	    System.out.println("JSP被初始化了"+initVar+"次");
	  }
	  public void jspDestroy(){
	    destroyVar++;
	    System.out.println("JSP被销毁了"+destroyVar+"次");
	  }
	%>

###	JSP表达式
	一个JSP表达式中包含的脚本语言表达式，先被转化成String，然后插入到表达式出现的地方。
	由于表达式的值会被转化成String，所以您可以在一个文本行中使用表达式而不用去管它是否是HTML标签。
	表达式元素中可以包含任何符合Java语言规范的表达式，但是不能使用分号来结束表达式。
	JSP表达式的语法格式：
	<%= 表达式 %>
	<p>   
	  	Today's date: <%= (new java.util.Date()).toLocaleString()%>
	</p>
	同样，您也可以编写与之等价的XML语句：
	<jsp:expression>   
	  表达式
	</jsp:expression>	

### JSP注释
	JSP注释主要有两个作用：为代码作注释以及将某段代码注释掉。
	JSP注释的语法格式：<%-- 这里可以填写 JSP 注释 --%>	
	不同场景下的注释类型
	<%-- JSP注释 --%>	JSP注释，注释内容不会被发送至浏览器甚至不会被编译
	<!-- HTML注释 -->	HTML注释，通过浏览器查看网页源代码时可以看见注释内容	

###	JSP指令
	JSP指令用来设置与整个JSP页面相关的属性。
	JSP指令语法格式：
	<%@ directive attribute="value" %>
	这里有三种指令标签：
	指令	描述
	<%@ page ... %>	定义页面的依赖属性，比如脚本语言、error页面、缓存需求等等
	<%@ include ... %>	包含其他文件
	<%@ taglib ... %>	引入标签库的定义，可以是自定义标签

### Page指令
	作用：
	定义 JSP 页面的各种属性
	语法：
	Page指令的语法格式：
		<%@ page attribute="value" %>
	等价的XML格式：
		<jsp:directive.page attribute="value" />
	属性：
	1.language：指示JSP页面中使用脚本语言。默认值java，目前只支持java。
	2.extends：指示 JSP 对应的 Servlet 类的父类。不要修改。
	3.*import：导入JSP中的Java脚本使用到的类或包。（如同Java中的import语句）
	JSP 引擎自动导入以下包中的类：
	javax.servlet.*
	javax.servlet.http.*
	javax.servlet.jsp.*
	注意：一个import属性可以导入多个包，用逗号分隔。
	4.*sessioin：指示JSP页面是否创建 HttpSession 对象。默认值是true，创建
	5.*buffer：指示 JSP 用的输出流的缓存大小.默认值是8Kb。
	6.autoFlush：自动刷新输出流的缓存。
	7.isThreadSafe：指示页面是否是线程安全的（过时的）。默认是true。
	true：不安全的。
	false：安全的。指示 JSP 对应的 Servlet 实现 SingleThreadModel 接口。
	8.*errorPage:指示当前页面出错后转向（转发）的页面。
	> 配置全局错误提示页面：
	> web.xml 文件中添加：
	<error-page>
	    <exception-type>java.lang.Exception</exception-type>
	    <location>/error.jsp</location>
	</error-page>
	<error-page>
	    <error-code>404</error-code>
	    <location>/404.jsp</location>
	</error-page>
	9.*isErrorPage:指示当前页面是否产生 Exception 对象。
	10.*contentType：指定当前页面的 MIME 类型。作用与 Servlet 中的response.setContentType() 作用完全一致
	11.*pageEncoding：通知引擎读取 JSP 时采用的编码（因为要翻译）
	12.*isELIgnored：是否忽略EL表达式。${1+1}。默认值是false。
	page 指令最简单的使用方式：
	<%@ page pageEncoding="UTF-8"%>

### include指令
	作用：
	包含其他的组件
	语法：
	<%@ include file=""%>
	file 指定要包含的目标组件。路径如果以 "/"（当前应用）就是绝对路径。
	原理：
	把目标组件的内容加到源组件中，输出结果。
	静态包含和动态包含的区别：
	静态包含：
	<%@ include file="被包含的页面的路径"%>
	包含的时机：在 JSP 文件被翻译的时候合并在一起
	最终会被翻译成一个 class 文件
	动态包含：
	<jsp:include page="被包含页面的路径"></jsp:include>
	包含的时机：在运行阶段合并代码
	最终将得到两个 class 文件
	总结：在实际开发中，能用静的就别用动的

### taglib
	作用：
	引入外部的标签
	语法：
	<%@ taglib uri="标签名称空间" prefix="前缀"%>
	例如：<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

### JSP 九大内置对象
	内置对象：JSP 中事先创建好的对象，可以直接拿来使用
	名称 / 类型 / 描述
	pageContext / PageContext /	表示当前的JSP对象，PageContext类的实例，提供对JSP页面所有对象以及命名空间的访问
	request / HttpServletRequest / 表示一次请求对象，HttpServletRequest类的实例
	session / HttpSession / 表示一次会话对象,session="true"，HttpSession类的实例
	application / ServletContext / 表示当前应用对象，ServletContext类的实例，与应用上下文有关
	response / HttpServletResponse / 表示一次响应对象，HttpServletResponse类的实例
	exception / Throwable / 表示异常对象,isErrorPage="true"，Exception类的对象，代表发生错误的JSP页面中对应的异常对象
	config / ServletConfig / 表示当前JSP的配置对象，ServletConfig类的实例
	out / JspWriter / 表示一个输出流对象，PrintWriter类的实例，用于把结果输出至网页上
	page / Object / 表示当前页面，类似于Java类中的this关键字

### JSP 四大作用域
	名称 / 类型 / 描述
	pageContext / PageContext / 表示当前的JSP对象
	request / HttpServletRequest / 表示一次请求对象
	session / HttpSession / 表示一次会话对象,session="true"
	application / ServletContext / 表示当前应用对象

### JSP行为
	JSP行为标签使用XML语法结构来控制servlet引擎。它能够动态插入一个文件，重用JavaBean组件，引导用户去另一个页面，为Java插件产生相关的HTML等等。
	行为标签只有一种语法格式，它严格遵守XML标准：
	<jsp:action_name attribute="value" />
	行为标签基本上是一些预先就定义好的函数，下表罗列出了一些可用的JSP行为标签：
	语法 / 描述
	jsp:include	/ 用于在当前页面中包含静态或动态资源
	jsp:useBean	/ 寻找和初始化一个JavaBean组件
	jsp:setProperty	/ 设置 JavaBean组件的值
	jsp:getProperty	/ 将JavaBean组件的值插入到 output中
	jsp:forward	/ 从一个JSP文件向另一个文件传递一个包含用户请求的request对象
	jsp:plugin	/ 用于在生成的HTML页面中包含Applet和JavaBean对象，根据浏览器类型为Java插件生成OBJECT或EMBED标记。
	jsp:element	/ 动态创建一个XML元素
	jsp:attribute	/ 定义动态创建的XML元素的属性
	jsp:body	/ 定义动态创建的XML元素的主体
	jsp:text 	/ 用于封装模板数据，在JSP页面和文档中使用写入文本的模板

###	<jsp:include>动作元素
	<jsp:include>动作元素用来包含静态和动态的文件。该动作把指定文件插入正在生成的页面。语法格式如下：
	<jsp:include page="relative URL" flush="true" />
	　前面已经介绍过include指令，它是在JSP文件被转换成Servlet的时候引入文件，而这里的jsp:include动作不同，插入文件的时间是在页面被请求的时候。
	以下是include动作相关的属性列表。
	属性	 / 描述
	page / 包含在页面中的相对URL地址。
	flush / 布尔属性，定义在包含资源前是否刷新缓存区。
	实例
	以下我们定义了两个文件date.jsp和main.jsp，代码如下所示：
	date.jsp文件代码：
	<p>
	   Today's date: <%= (new java.util.Date()).toLocaleString()%>
	</p>
	main.jsp文件代码：
	<html>
		<head>
			<title>The include Action Example</title>
		</head>
		<body>
			<center>
				<h2>The include action Example</h2>
				<jsp:include page="date.jsp" flush="true" />
			</center>
		</body>
	</html>
	现在将以上两个文件放在服务器的根目录下，访问main.jsp文件。显示结果如下：
	The include action Example
	Today's date: 12-Sep-2013 14:54:22	


###	<jsp:useBean>动作元素
	jsp:useBean动作用来装载一个将在JSP页面中使用的JavaBean。
	属性	 / 描述
	class / 指定Bean的完整包名。
	type / 指定将引用该对象变量的类型。
	beanName / 通过 java.beans.Beans 的 instantiate() 方法指定Bean的名字。
	<jsp:useBean id="name" class="package.class" />
	
###	<jsp:setProperty>动作元素
```
　  jsp:setProperty用来设置已经实例化的Bean对象的属性，有两种用法。
	第二种用法是可以在jsp:useBean元素的外面（后面）使用jsp:setProperty，如下所示：
		<jsp:useBean id="myName" class="package.class" />
		<jsp:setProperty name="myName" property="someProperty" value="hello" />
	此时，不管jsp:useBean是找到了一个现有的Bean，还是新创建了一个Bean实例，jsp:setProperty都会执行。

	第二种用法是把jsp:setProperty放入jsp:useBean元素的内部，如下所示：
		<jsp:useBean id="myName" ... >		
	   		<jsp:setProperty name="myName" property="someProperty" .../>
		</jsp:useBean>
	此时，jsp:setProperty只有在新建Bean实例时才会执行，如果是使用现有实例则不执行jsp:setProperty。	
```

### <jsp:getProperty>动作元素
	jsp:getProperty动作提取指定Bean属性的值，转换成字符串，然后输出。语法格式如下：
	<jsp:useBean id="myName" class="package.class" />	
	<jsp:getProperty name="myName" property="someProperty" />
	下表是与getProperty相关联的属性：
	属性 / 描述
	name /	要检索的Bean属性名称。Bean必须已定义。
	property /	表示要提取Bean属性的值

###	<jsp:useBean>、<jsp:setProperty>、<jsp:getProperty>三个动作元素的实例
	以下实例我们使用了Bean:
	/* 文件: TestBean.java */
	package action;
	 
	public class TestBean {
	   private String message = "No message specified";
	 
	   public String getMessage() {
	      return(message);
	   }
	   public void setMessage(String message) {
	      this.message = message;
	   }
	}
	现在在index.jsp文件中调用该Bean:
	<html>
		<head>
			<title>Using JavaBeans in JSP</title>
		</head>
	<body>
		<center>
			<h2>Using JavaBeans in JSP</h2>
			<jsp:useBean id="test" class="action.TestBean" />
			<jsp:setProperty name="test" property="message" value="Hello JSP!" />
			<p>Got message....</p>
			<jsp:getProperty name="test" property="message" />
		</center>
	</body>
	</html>	
	执行以上文件，输出如下所示：
	Using JavaBeans in JSP
	Got message....
	Hello JSP...

### <jsp:forward> 动作元素
	jsp:forward动作把请求转到另外的页面。jsp:forward标记只有一个属性page。
	语法：<jsp:forward page="Relative URL" />
	page属性包含的是一个相对URL。page的值既可以直接给出，也可以在请求的时候动态计算，可以是一个JSP页面或者一个 Java Servlet.

### JSP HTTP状态码
	1XX 消息
	2XX 成功
	3XX 重定向
	4XX 客户端请求错误
	5XX 服务端相应错误

### JSP 表单处理
	url中直接get请求，如 http://localhost:8080/login.jsp?userName=yfx&passWord=123  //不安全，缺点很多
	form表单中 method="GET" 与 method="POST"
	<form action="login.jsp" method="POST" target="_blank">
		用户名<input type="text" name="userName"/><br/>
		密码<input type="text" name="passWord"/><br/>
		<input type="checkbox" name="chemistry" checked="checked" /> 记住密码<br/>
		<input type="submit" value="login" />
	</form>
	JSP 读取表单数据
	getParameter(): 		使用 request.getParameter() 方法来获取表单参数的值。
	getParameterValues(): 	获得所有参数的值
	getParameterNames():	该方法可以取得所有参数的名称，该方法返回一个Emumeration。
	getInputStream():		调用此方法来读取来自客户端的二进制数据流

### JSP 过滤器
```	
	作用：
	过滤器可以对所有的请求或者响应做拦截操作
	Web 中过滤器的作用：
	1.可以在请求资源之前设置请求的编码
	2.可以进行登录校验
	3.可以进行请求参数的内容的过滤
	4.数据压缩 / 数据加密 / 数据格式的转换
	5.可以设置浏览器相关的数据
	<!-- web.xml文件 -->
	<filter>
	    <filter-name>filter的名称</filter-name>
	    <filter-class>filter类的全限定名</filter-class>
	</filter>
	<filter-mapping>
	    <filter-name>指定对哪一个filter做的映射</filter-name>
	    <url-pattern>指定对哪些资源进行过滤</url-pattern>
	</filter-mapping>
	注意：此时 <url-pattern> 表示对哪些资源做过滤/拦截。例如：
	/hello.jsp 	当前 Filter 就仅仅只对 hello.jsp 资源做拦截
	/index 		当前 Filter 就仅仅只对 /index 资源做拦截
	/* 			当前 Filter 就对所有资源做拦截.访问任意的资源,都会先进入该过滤器器
	/system/* 	当前 Filter 就对以 /system/ 打头的资源做拦截，如/system , /system/a,  /system/a/b/c, /systema

	实例如下：
	LogFilter.java文件，位于com.w3cschool.test包名下
	//  引入Java包
	import java.io.*;
	import javax.servlet.*;
	import javax.servlet.http.*;
	import java.util.*;
	 
	// 实现 Filter 类
	public class LogFilter implements Filter  {
	   public void  init(FilterConfig config) throws ServletException{
	      // 获取初始化参数
	      String testParam = config.getInitParameter("test-param"); 
	 
	      //打印初始化参数
	      System.out.println("Test Param: " + testParam); 
	   }
	   public void  doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws java.io.IOException, ServletException {	 
	      
	      // 获取客户端ip地址  
	      String ipAddress = request.getRemoteAddr();
	 
	      // 输出ip地址及当前时间
	      System.out.println("IP "+ ipAddress + ", Time " + new Date().toString());
	 
	      // 传递请求道过滤器链
	      chain.doFilter(request,response);
	   }
	   public void destroy( ){
	      /* 在Filter实例在服务器上被移除前调用。*/
	   }
	}

	web.xml文件
	<filter>
	   <filter-name>LogFilter</filter-name>
	   <filter-class>com.w3cschool.test.LogFilter</filter-class>
	   <init-param>
		  <param-name>test-param</param-name>
		  <param-value>Initialization Paramter</param-value>
	   </init-param>
	</filter>
	<filter-mapping>
	   <filter-name>LogFilter</filter-name>
	   <url-pattern>/*</url-pattern>
	</filter-mapping>
```
### 使用多重过滤器
	过滤器的应用顺序
	在web.xml中<filter>元素的映射顺序决定了容器应用这些过滤器的顺序。要反转应用的顺序，您只需要反转web.xml中<filter>元素的定义顺序就行了。
	下面的例子会首先应用 LogFilter然后再应用AuthenFilter：
	<filter-mapping>
	   <filter-name>LogFilter</filter-name>
	   <url-pattern>/*</url-pattern>
	</filter-mapping>
	 
	<filter-mapping>
	   <filter-name>AuthenFilter</filter-name>
	   <url-pattern>/*</url-pattern>
	</filter-mapping>

### JSP Cookies 处理

### JSP Session
	session对象的一些重要方法：
	1.	public Object getAttribute(String name)
	返回session对象中与指定名称绑定的对象，如果不存在则返回null
	2.	public Enumeration getAttributeNames()
	返回session对象中所有的对象名称
	3.	public long getCreationTime()
	返回session对象被创建的时间， 以毫秒为单位，从1970年1月1号凌晨开始算起
	4.	public String getId()
	返回session对象的ID
	5.	public long getLastAccessedTime()
	返回客户端最后访问的时间，以毫秒为单位，从1970年1月1号凌晨开始算起
	6.	public int getMaxInactiveInterval()
	返回最大时间间隔，以秒为单位，servlet 容器将会在这段时间内保持会话打开
	7.	public void invalidate()
	将session无效化，解绑任何与该session绑定的对象
	8.	public boolean isNew(
	返回是否为一个新的客户端，或者客户端是否拒绝加入session
	9.	public void removeAttribute(String name)
	移除session中指定名称的对象
	10.	public void setAttribute(String name, Object value) 
	使用指定的名称和值来产生一个对象并绑定到session中
	11.	public void setMaxInactiveInterval(int interval)
	用来指定时间，以秒为单位，servlet容器将会在这段时间内保持会话有效	

### 文件上传