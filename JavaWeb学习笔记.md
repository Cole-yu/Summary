# JavaWeb学习笔记

### Servlet生命周期
	加载Servlet类
	初始化 init()
	处理 service()
	销毁 destroy()
	卸载(垃圾回收机制)

### web.xml
	<?xml version="1.0" encoding="UTF-8"?>
	<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
	  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	  xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
	                      http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd" version="3.1">
	    <servlet>
	        <servlet-name>HelloServlet</servlet-name>
	        <servlet-class>lt.HelloServlet</servlet-class>
	    </servlet>
	    
	    <servlet-mapping>
	        <servlet-name>HelloServlet</servlet-name>
	        <url-pattern>/hello</url-pattern>
	    </servlet-mapping>
	</web-app>

### tomcat	
	1. 修改默认端口
		Tomcat 根目录下的conf文件夹下的server.xml,设置了默认的端口号为8080,修改port属性来更改默认端口	
		<Connector port="8080" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443" />	
	2. 	将javaSE项目部署到Tomcat中，url访问Servlet
	 	<Host name="localhost" ...下 <Context path="/" docBase="D:\\文件路径...\\项目名" />
	 	path="/" 表示直接通过http://127.0.0.1/hello就可以访问
	 	path="/j2ee" 表示进行url拼接，需要通过http://127.0.0.1/j2ee/hello才可以访问
	3.  Tomcat服务器的命令控制台 
		点击bin文件夹下的startup.bat,启动了Tomcat服务器，并可以查看控制台输出内容

### Servlet请求过程
	Tomcat 服务器接受客户请求并做出响应的过程如下（以上面搭建的项目为例）：
	1. 打开浏览器发起请求：http://localhost:8080/hello
	2. 服务器接收到请求后处理请求：
		htpp：所使用的协议 localhost：ip地址，确定访问的主机 8080：端口号 hello：上下文路径，确定访问项目的根路径 index.html：确定访问项目中的具体哪一个资源；
	3. 根据 hello 去 tomcat/conf/server.xml 文件中找到相关配置文件，根据上下文路径找到项目的根路径：<Context path="" docBase="D:\\eclipse-workspace\\HelloServlet\\webapp" />，如果找不到根路径（因为这里默认上下文路径为空），返回 404；
	4. 根据资源名称去项目中的 web.xml 文件中找到相关的配置，找到配置中的<url-pattern>，如果找不到 hello 的资源名称，则返回 404；
		// web.xml内容
		<servlet>
	        <servlet-name>HelloServlet</servlet-name>        		// Servlet别名
	        <servlet-class>com.yfx.HelloServlet</servlet-class>		// 映射的类名
	    </servlet>
	    <servlet-mapping>
	        <servlet-name>HelloServlet</servlet-name>          		// Servlet别名
	        <url-pattern>/hello</url-pattern>						// url路径
	    </servlet-mapping>
	5. 根据资源名称找到 Servlet 的全限定名，如果找不到则在启动服务器的时候报错java.lang.IllegalArgumentException: Servlet mapping specifies an unknown servlet name HelloServlet；
	6. 根据找到的全限定名创建对象，在创建对象之前需要判断是否是第一次请求，使用 Tomcat 中使用 Servlet 实例缓存池来实现，若是第一次则调用对象的 init 方法。
	7. 创建 req,resp 对象，执行 service 方法；
	8. 使用 resp 对象给浏览器响应信息。

### Servlet接口
	HttpServlet继承了GenericServlet，而GenericServlet实现Servlet接口
	Servlet接口
		GenericServlet接口
			HttpServlet接口
	实现Servlet接口需要重写5个方法：init【初始化】，destroy【销毁】,service【服务】,ServletConfig【Servlet配置】,getServletInfo【Serlvet信息】。

###	Servlet 是单例的
	每次访问请求对象和响应对象都是新的。
	对于每次访问请求，Servlet引擎都会创建一个新的HttpServletRequest请求对象和一个新的HttpServletResponse响应对象，
	然后将这两个对象作为参数传递给它调用的Servlet的service()方法，service方法再根据请求方式分别调用doXXX方法。


### HttpServlet常用API
1.	HttpServletRequest 常用方法
```
	String getContextPath():
	获取上下文路径,<Context path="上下文" ../>

	String getHeader(String headName):
	根据指定的请求头获取对应的请求头的值.

	String getRequestURI():
	返回当期请求的资源名称. 上下文路径/资源名

	StringBuffer getRequestURL():
	返回浏览器地址栏的内容

	String getRemoteAddr():
	返回请求服务器的客户端的IP
	
	获取请求参数的方法：
	String getParameter(String name):
	根据参数名称,获取对应参数的值.

	String[] getParameterValues(String name):
	根据参数名称,获取该参数的多个值.

	Enumeration<String> getParameterNames():
	获取所有请求参数的名字

	Map<String,String[]> getParameterMap():
	返回请求参数组成的Map集合.
	key:参数名称
	value:参数值,封装在String数组中.
```	
2.	HttpServletResponse 常用方法
```
	OutputStream getOutputStream():
	获取字节输出流:文件下载

	Writer getWriter():
	获取字符输出流:输出内容

	setContentType()
	设置文件输出的编码格式和内容类型：resp.setContentType("text/html;charset=utf-8");
```

### 请求中文乱码的处理
	在 Tomcat 服务器中，接受请求的时候，默认的编码方式为 ISO-8859-1
	解决方案：
		1.对于 POST 请求：
		设置请求的编码方式：request.setCharacterEncoding("UTF-8");
		注意：必须在获取第一个参数之前设置，并且该方式只对 POST 方式有效。
		2.对于 GET 请求：
		重新设置 Tomcat 的编码方式，修改 Tomcat 的配置文件:
		Tomcat根目录/conf/server.xml(修改端口的那一行)
			<Connector port="8080" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443" URIEncoding="utf-8" />


### 通过注解配置 Servlet，从而放弃在web.xml中配置
	@WebServlet("/hello")
	等价于 ===
	<servlet>
        <servlet-name>HelloServlet</servlet-name>        		// Servlet别名
        <servlet-class>com.yfx.HelloServlet</servlet-class>		// 映射的类名
    </servlet>
    <servlet-mapping>
        <servlet-name>HelloServlet</servlet-name>          		// Servlet别名
        <url-pattern>/hello</url-pattern>						// url路径
    </servlet-mapping>

### 请求转发（forward）
	又叫做直接转发方式，客户端和浏览器只发出一次请求，Servlet、HTML、JSP或其它信息资源，由第二个信息资源响应该请求，在请求对象request中，保存的对象对于每个信息资源是共享的。
	比如：从 AServlet 请求转发到 BServlet
	语法：
	request.getRequestDispatcher(path).forward(request, response);
	参数：path，要跳转到的资源路径：上下文路径 / 资源路径
	特点：
	1.地址栏中的地址【不会】改变
	通常看作是服务端的跳转
	2.只有一个请求
	3.资源是共享的，也就是说在两个 Servlet 中可以共享请求的资源
	可以通过request.setAttribute(String var1,Object var2)设置要共享的数据资源，并通过request.getAttribute(String var1);来获取传递的资源
	4.【可以】访问 WEB-INF 中的资源
	WEB-INF 文件夹是 Java Web 应用的默认安全目录，即客户端无法直接访问，只有服务端可以访问的目录。
	如果想在页面中直接访问其中的文件，必须通过web.xml文件对要访问的文件进行相应映射才能访问。
	注意：在实际的开发中，可以把不希望用户直接访问到（通过浏览器输入地址栏）的网页放在文件夹中通过此方式访问。
	5.请求转发【不能】跨域访问
	所谓的同域，是指域名，协议，端口均相同

### WEB-INF
	WEB-INF 文件夹是 Java Web 应用的默认安全目录，即客户端无法直接访问，只有服务端可以访问的目录。
	如果想在页面中直接访问其中的文件，必须通过web.xml文件对要访问的文件进行相应映射才能访问。    

### URl 重定向（redirect）
	又叫做间接转发方式（Redirect）实际是两次HTTP请求，服务器端在响应第一次请求的时候，让浏览器再向另外一个URL发出请求，从而达到转发的目的。
	语法：
	response.sendRedirect(String location);
	特点：
	1.地址栏中的地址【会】发生改变
	通常看作是客户端跳转
	2.有两个请求
	3.在两个 Servlet 中不可以共享请求中的数据
	4.最终的响应由 BServlet 来决定，和 AServlet 没有关系
	5.【不可以】访问 WEB-INF 中的资源
	6.请求转发【能】跨域访问
	就像是在网页中点开了新的链接一样
	总结：URL 重定向相当于是将重定向的资源路径，重新复制到浏览器地址栏中按下回车一样，重新发送一次新的请求。

###	MVC 模式
	MVC 是一种分层的设计模式 。
	M 代表 模型（Model）模型就是数据，就是dao,bean
	V 代表 视图（View） 就是网页, JSP，用来展示模型中的数据
	C 代表 控制器（controller) 控制器的作用就是把不同的数据(Model)，进行业务逻辑处理，显示在不同的视图(View)上。

### Cookie

### Session	

### JSP

### 文件的上传和下载

### 过滤器

### 监听器

### 学生管理系统项目