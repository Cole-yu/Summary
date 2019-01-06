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

### HTTP 无状态协议
	HTTP 是 hypertext transfer protocol（超文本传输协议）的简写，它是 TCP/IP 协议之上的一个应用层的协议，用于定义 Web 浏览器与 Web 服务器之间交互数据的过程以及数据本身的格式。
	特点：无状态，默认端口 80
	HTTP 是一个无状态的协议，也就是没有记忆力，这意味着每一次的请求都是独立的，缺少状态意味着如果后续处理需要前面的信息，则它必须要重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就很快。
	HTTP 的这种特性有优点也有缺点：
	优点：解放了服务器，每一次的请求“点到为止”，不会造成不必要的连接占用。
	缺点：每次请求会传输大量重复的内容信息，并且，在请求之间无法实现数据的共享。
	主要问题：请求之间无法实现数据的共享
	解决方案：
	1.使用参数传递机制：
	将参数拼接在请求的 URL 后面，实现数据的传递（GET方式），例如：/param/list?username=wmyskxz
	问题：可以解决数据共享的问题，但是这种方式一不安全，二数据允许传输量只有1kb
	2.使用Cookie技术
	3.使用Session技术

### Cookie
	特点：客户端的技术，将共享数据保存在客户端（浏览器）中
	当一个用户通过 HTTP 访问一个服务器时，这个服务器会将一些 Key/Value 键值对返回给客户端浏览器，并给这些数据加上一些限制条件，在条件符合时这个用户下次访问这个服务器时，数据又被完整地带回给服务器。

### Cookie 操作
1.	创建 Cookie 对象，设置共享数据
```
	Cookie c = new Cookie(String name,String value);  // 相当于办卡
	注意：一个Cookie只能存储一个字符串类型的数据,不能存储其他类型的数据
```

2.	将 Cookie 响应给浏览器
```	response对象.addCookie(cookie对象)                // 相当于把卡交给用户  ```

3.	获取请求中的 Cookie 信息
```
	Cookie[] cs = request对象.getCookies();
	for(Cookie c : cs){
	    if(“username”.equals(c.getName())){
	        String value = c.getValue();
	    }
	}
```	

4.	修改 Cookie 中的共享数据	
```
	1.重新创建一个新的 Cookie，名称要和要修改的数据一致
	2.现获取到要修改的 Cookie 对象，再调用 setValue(String newValue) 重新设置
	注意：修改 Cookie 中的数据，需要再次发送给浏览器（第2点）
```

5.	操作 Cookie 的生命周期
```
	默认：在关闭浏览器的时候销毁 Cookie 对象
	语法：void setMaxAge(int expiry)
	expiry > 0：设置 Cookie 对象能够存活 expiry 秒，即使关闭浏览器，也不影响 Cookie 中的共享数据，比如设置一个月：setMaxAge(60*60*24*30);
	expiry = 0：立即删除当前的 Cookie 信息
	expiry < 0：关闭浏览器时销毁
```	

6.	删除 Cookie 中的共享数据
```
	通过setMaxAge(0)来实现
```

7.	Cookie 中的 key 和 value 不支持中文
```
	设置 Cookie 时需要对中文字符串进行编码：
	Cookie c = new Cookie("username", URLEncoder.encode(username,"UTF-8"));
	在获取 Cookie 数据的时候再进行解码：
	username = URLDecoder.decode(value, "UTF-8");
```

8.	Cookie 的路径和域范围
```
	Cookie 的路径
	Cookie 在创建的时候，会根据当前的Servlet的相对路径来设置自己的路径，比如 Servlet 的url-pattern为 /cookie/login，相对路径则为：/cookie/
	出现的问题：
	只有在访问路径为 /cookie/ 下面的资源的时候，才会将该 Cookie 发送到服务器
	解决方案：
	设置 Cookie 的路径：void setPath(String uri)
	Cookie对象.setPath("/"); 表示当前应用中的所有的资源都能够共享该Cookie信息
	域范围：（了解）
	在多个应用之间实现数据的共享，那么就需要设置域范围，比如：
	www.baidu.com / news.baidu.com / map.baidu.com
	语法：Cookie对象.setDomain("baidu.com");
```	
9.	Cookie 的缺陷
```
	Cookie 的作用其实就是一种会话跟踪技术，但存在一些缺陷：
	获取 Cookie 信息比较麻烦
	Cookie 不支持中文
	一个 Cookie 只能存储一个字符串类型的数据
	Cookie 在浏览器中有大小和数量上的限制（不同浏览器存在不同的限制，例如FireFox一个站点最多存储50个 Cookie ，浏览器最多存储 4097个字大小的 Cookie）
	共享数据时保存在浏览器中，容易造成数据的泄露，不安全
	最好的解决方案：将数据保存在服务端（session）
```

10. 实例
```
	package com.servlet;

	import java.io.IOException;
	import java.util.Date;
	import javax.servlet.ServletException;
	import javax.servlet.annotation.WebServlet;
	import javax.servlet.http.Cookie;
	import javax.servlet.http.HttpServlet;
	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;
	/**
	 * 基于session的回显上次访问时间的案例
	 * 
	 * @author Administrator
	 *
	 */
	@WebServlet("/slad.do")
	public class ShowLastAccessDateServlet extends HttpServlet {
	    private static final long serialVersionUID = 1L;

	    protected void doGet(HttpServletRequest request, HttpServletResponse response)
	            throws ServletException, IOException {
	        // 涉及到中文，解决下乱码问题
	        response.setCharacterEncoding("UTF-8");
	        // 告诉浏览器以什么方式和编码打开
	        response.setContentType("text/html; charset=UTF-8");
	        // 1.回写上次的访问时间
	        Cookie[] cookies = request.getCookies();
	        for (int i = 0; cookies != null && i < cookies.length; i++) {
	            if (cookies[i].getName().equals("lastAccessTime")) {
	                Date date = new Date(Long.parseLong(cookies[i].getValue()));
	                response.getWriter().print("您上次的访问时间是：" + date.toLocaleString());
	            }
	        }

	        // 2.记录下这次的访问时间
	        Cookie dateCookie = new Cookie("lastAccessTime", System.currentTimeMillis() + "");
	        // 设置cookie的有效时间，单位为秒，这里设置一个月
	        dateCookie.setMaxAge(30 * 24 * 3600);
	        // 设置那些url地址访问有效，这里设置是整个项目访问都有效
	        dateCookie.setPath("/JavaWebDemo/");
	        // 加入到response中
	        response.addCookie(dateCookie);
	    }
	}
```

### Session技术
	Session：会话，从浏览器打开开始，直到浏览器关闭结束，无论在这个网站中访问了多少页面，点击了多少链接，都属于同一个会话。Session 也可以称为会话 Cookie。
	Cookie 可以让服务端程序跟踪每个客户端的访问，但是每次客户端的访问都必须传回这些 Cookie，如果 Cookie 很多，则无形增加了客户端与服务端的数据传输量，而 Session 的出现正是为了解决这个问题。
	同一个客户端每次和服务端交互时，不需要每次都传回所有的 Cookie 值，而是只要传回一个 ID，这个 ID 就是客户端第一次访问服务器生成的，而且每个客户端是唯一的。这样每个客户端就有了一个唯一的 ID，客户端只要传回这个 ID 就行了，这个 ID 通常是 NAME 为 JSESIONID 的一个 Cookie。
1. 获取 Session 对象
```
	request对象.getSession()
	和参数为true的一样
	request对象.getSession(true)
	获取Session对象,如果没有Session对象,直接创建一个新的返回,缺省值
	request对象.getSession(false)
	获取Session对象,如果没有返回null
	有些人不理解，为什么是通过request来获取session？ 可以这样理解，在获取session时，需要检测请求中是否有session标识，所以需要用request来获取
```

2. 设置共享数据
```	Session对象.setAttribute(String name, Object value)	```

3.	修改共享数据
```	重新设置一个同名的共享数据```

4.	获取共享数据
```	Object value = Session对象.getAttribute(String name);```

5.	删除 Session 中的共享数据
```	Session对象.removeAttribute(String name);	```

6.	销毁 Session
```	void invalidate() ```

7.	Session 的超时管理
```
	超时：在访问当前的资源的过程中,不和网页进行任何的交互,超过设定的时间就是超时
	在 Tomcat 服务器中有默认的配置为30分钟，一般不需要去修改
	语法：void setMaxInactiveInterval(int interval)
```	

### session技术实例：把SessionId添加进cookie中
	// 获取session对象
	HttpSession session = request.getSession();
	// 重写cookie返回给浏览器
	Cookie cookie = new Cookie("SessionId", session.getId());
	// 设置有效期，时间为秒
	cookie.setMaxAge(30 * 60);
	// 设置path
	cookie.setPath("/JavaWebDemo");
	// 加入到response对象中
	response.addCookie(cookie);
	// 设置存储在服务器端属性名为lastAccessTime的值，request.getSession()后是在对session对象进行操作
	request.getSession().setAttribute("lastAccessTime", System.currentTimeMillis() + "");

### Session 扩展
1.	Seesion 中的共享数据的属性名的命名规范：
```	通常为：XXX_IN_SESSION，例如：Session对象.setAttribute(“USER_IN_SESSION”,user)```

2.	序列化与反序列化：
```
	Session 中存储的对象通常需要实现序列化接口，因为在网络之间传输的数据格式为二进制数据：
	序列化：将对象转换成二进制数据
	反序列化:将二进制数据转换成对象
```
3.	URL 重写
```
	出现的问题：
	当浏览器禁用Cookie之后,那么我们的jsessionid就不能在浏览器中保存,那么后面的请求中就不会将 jsessionid 发送到服务器,服务器这面就找不到数据
	解决方案：
	1.在url后手动的拼接上 jsessionid
	传递格式如 /path/Servlet;jsessionid=sessionid
	2.使用响应对象中的encodeURL(String path)实现 jsessionid 的自动拼接
	String path = resp.encodeURL("path/Servlet");	//推荐方式
```

### JSP
	详见JSP学习笔记

### 文件的上传和下载

### 过滤器

### 监听器

### 学生管理系统项目