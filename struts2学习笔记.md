# Struts2学习笔记

### struts.xml
```
	<?xml version="1.0" encoding="UTF-8"?>
	<!DOCTYPE struts PUBLIC
		 "-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"
		  "http://struts.apache.org/dtds/struts-2.3.dtd">
	<struts>
		<!-- include节点是struts2中组件化的方式，可以将每个功能模块独立到一个xml配置文件中，然后用include节点引用
		<include file="struts-default.xml"></include>

		<!--												项目路径/包的命名空间/action的name属性.action -->
		<!-- namespace="/test" , 则为 http://localhost:8080/HelloWorld/test/helloworld.action -->
		<package name="default" namespace="/" extends="struts-default">

			<interceptors>
				<!-- 定义拦截器名称 -->
				<interceptor name="timer" class="com.kay.timer"></interceptor>
				<interceptor name="logger" class="com.kay.logger"></interceptor>

				<!-- 定义拦截器栈-->
				<interceptor-stack name="mystack">
					<interceptor-ref name="timer"></interceptor-ref>
					<interceptor-ref name="logger"></interceptor-ref>
				</interceptor-stack name="mystack">
			<interceptors>

			<!-- 定义默认的拦截器，每个Action都会自动引用，如何Action中引用了其他的拦截器 默认的拦截器将无效 -->
			<default-interceptoy-ref name="mystack"></default-interceptoy-ref>

			<!-- 定义全局的results配置 -->
			<global-results>
				<result name="login">/login.jsp</result>
				<result name="success">/success.jsp</result>
				<result name="error">/error.jsp</result>
			</global-results>

			<!-- name:Action的名称 -->
			<!-- class:对应类的路径 -->
			<!-- method:调用Action类中的方法 -->
			<action name="helloworld" class="com.imooc.action.HelloWorldAction" method="login">
				<!-- 引用拦截器 name:拦截器或拦截器栈的名称 -->
				<interceptor-ref name="timer"></interceptor-ref>
				
				<!-- name:result的name和Action中返回的值相同 -->
				<!-- name:result类型不写则选用superpackage的type struts-default.xml中默认为dispatcher -->
				<result name="success" type="dispatcher">/result.jsp</result>

				<!-- 参数设置 name：对应Action中的get/set方法-->
				<param name="url">http://www.sina.com</param>
			</action>
			
		</package>

		<!-- 定义一个常量的值 -->
		<constant name="PI" value="3.14"><constant>
	</struts>
```

### 创建一个Action类
```
	public class HelloWorldAction extends ActionSupport {

		@Override
		public String execute() throws Exception {
			 System.out.println("执行Action");
			 // todo...
			 return SUCCESS;  //返回的结果是xml文件中result的name匹配对象
		}
		
	}
```	

### 访问Servelt API
	三种方式：	ActionContext 上下文的类（Map形式）
				实现***Aware	
				ServletActionContext

### Action搜索顺序
	http://localhost:8080/struts2/path1/path2/path3/studet.action
		第一步：判断package是否存在，如path1/path2/path3
		第二步：如果package存在，判断action是否存在，如果不存在则去默认namespace的 package里面寻找action，如果没有则报错
				如果package不存在，检查上一级路径的package是否存在（直到默认namespace），重复第一步；如果直到默认namespace也没有，则报错。

### 动态方法调用
```
	解决一个Action对应多个请求的处理，以免Action太多。
	实现的三种方式：
	1. 指定method属性
		<!-- 在HelloWorldAction类中有个add()方法 -->
		<action name="addAction" method="add" class="com.imooc.action.HelloWorldAction">
			<result name="result">/result.jsp</result>
		</action>
	2. 感叹号方式
		<struts>
			<package>
				<action name="helloworld" class="com.imooc.action.HelloWorldAction">
					<result name="add">/add.jsp</result>
					<result name="update">/update.jsp</result>
				</action>
			</package>
			<!-- 启用感叹号方式，管饭官方不推荐-->
			<constant name="struts.enable.DynamicMethodInvocation" value="true">
		</struts>

		url访问地址 http://localhost:8080/项目名称/helloworld!add.action

	3. 通配符方式（推荐方式）
		<struts>
			<package>
				<action name="helloworld_*" method="{1}" class="com.imooc.action.HelloWorldAction">
					<result>/result.jsp</result>
					<result name="add">/{1}.jsp</result>
					<result name="update">/{1}.jsp</result>
				</action>
			</package>			
		</struts>
		url访问地址 http://localhost:8080/项目名称/helloworld_add.action   //此时的helloworld为action的name

		<struts>
			<package>
				<action name="helloworld_*" method="{2}" class="com.imooc.action.{1}Action">
					<result>/result.jsp</result>
					<result name="add">/{2}.jsp</result>
					<result name="update">/{2}.jsp</result>
				</action>
			</package>			
		</struts>
		url访问地址 http://localhost:8080/项目名称/HelloWorld_add.action  //访问路径helloWorld必须与类名的大小写一致才能解析到对应的类
```

### 引入多个配置文件
	struts.xml中引入其他的xml配置文件，注意文件编码问题
	<struts>
		<include file="hello.xml"></include>
		<include file="world.xml"></include>
		<constant name="struts.i18n.encoding" value="UTF-8"></constant>
	</struts>	

### 默认Action
	找不到对应的action,使用默认的action
	<default-action-ref name="index"></default-action-ref>
	<action name="index">
		<result name="success">/index.jsp</result>
		<result name="error">/error.jsp</result>
	</action>	

### Strits2后缀
```
	1. 不添加<constant></constant>,不做任何后缀修改操作，可以添加.action后缀,也可以不添加
		http://localhost:8080/项目名/命名空间名称/hello 或者 http://localhost:8080/项目名/命名空间名称/hello.action
	2. <constant name="struts.action.extension" value="">  不需要添加后缀
		http://localhost:8080/项目名/命名空间名称/hello
	3. <constant name="struts.action.extension" value="html"> 修改为.html后缀，且必须添加
	 	http://localhost:8080/项目名/命名空间名称/hello.html
	
	三种配置后缀方式:
	1. 在struts.xml
		<constant name="struts.action.extension" value="html"> //更改后缀，伪造页面
	2. 在struts.properties
		struts.action.extension=action,do,struts2
	3. 在web.xml中（不常用）
		<filter>
			<filter-name>struts2</filter-name>
			<filter-class>org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter</filter-name>
			<init-param>
				<param-name>struts.action.extension</param-name>
				<param-value>action,do,struts2</param-value>
			</init-param>
		</filter>
```

### 接收参数
```
	1. 使用Action的属性接收参数
		在login.jsp中
			<form action="loginAction" method="post">
				用户名：<input type="text" name="username"/><br/>
				密码：<input type="password" name="password"/><br/>
				<input type="submit" value="登录"/>
			</form>

		在LoginAction类中
		 	public class LoginAction extends ActionSupport {
		 		private String username;	// 需要接收多少个参数，需要全部声明，当表单存在大量的字段时，非常麻烦
		 		private String password;

		 		public String login(){
		 			System.out.println(username);
		 			return SUCCESS;
		 		}
			}
		在struts.xml中配置	
			<action name="loginAction" method="login" class="com.imooc.action.LoginAction">
				<result name="success">/result.jsp</result>
			</action>
	
	2. 使用DomainModel接收参数
		在login.jsp中
			<form action="loginAction" method="post">
				用户名：<input type="text" name="user.username"/><br/>  // 在页面上指定传入的对象
				密码：<input type="password" name="user.password"/><br/>				
				<input type="submit" value="登录"/>
			</form>
		
		创建一个User类,封装成一个对象的属性
			public class User{
				private String username;
				private String password;

				public String getUsername(){
					return username;
				}

				public String getPassword(){
					return password;
				}

				<!-- 省略 setUsername(),setPassword()-->
			}	

		在LoginAction类中
		 	public class LoginAction extends ActionSupport {
				// 通过创建一个类管理username和password，类似封装在一个对象中
		 		private User user;

		 		public String login(){
		 			System.out.println(username.getUsername());  //通过属性的get方法获取表单参数
		 			return SUCCESS;
		 		}
			}

		在struts.xml中配置	
			<action name="loginAction" method="login" class="com.imooc.action.LoginAction">
				<result name="success">/result.jsp</result>
			</action>

	3. 使用ModelDriven接收参数
		在login.jsp中
			<form action="loginAction" method="post">
				用户名：<input type="text" name="username"/><br/>  // 在页面上指定传入的对象
				密码：<input type="password" name="password"/><br/>
				书籍1:<input type="text" name="bookList[0]"/><br/>
				书籍2:<input type="text" name="bookList[1]"/><br/>
				<input type="submit" value="登录"/>
			</form>

		创建一个User类,封装成一个对象的属性
			public class User{
				private String username;
				private String password;
				private List<String> bookList;

				public String getUsername(){
					return username;
				}

				public String getPassword(){
					return password;
				}

				public String getBookList(){
					return BookList;
				}				

				<!-- 省略 setUsername(),setPassword()-->
			}
		
		在LoginAction类中，实现ModelDriven接口,且必须设置需要转换的类User
		 	public class LoginAction extends ActionSupport implements ModelDriven<User> {
				// 通过创建一个类管理username和password，类似封装在一个对象中				 		
		 		private User user = new User();  // 必须手动实例化

		 		public String login(){
		 			System.out.println(username.getUsername());  //通过属性的get方法获取表单参数
		 			System.out.println(username.getBookList().get(0));  //通过属性的get方法获取表单参数
		 			return SUCCESS;
		 		}

		 		@Override
		 		public User getModel(){  
		 			return user; 	// 返回model对象 User
		 		}
			}

		在struts.xml中配置
			<action name="loginAction" method="login" class="com.imooc.action.LoginAction">
				<result name="success">/result.jsp</result>
			</action>
```

### 处理结果类型 <result></result>
```
	Struts2处理流程
	用户请求 => Struts框架 => 控制器(Action,返回的是String字符串) => Struts框架 => 视图资源
	Struts1返回的是ActionForward
	Struts2返回的是String（提高代码复用性，有利于框架分离）
	
	处理结果类型
		<result name="success">/success.jsp</result>
		<result>/success.jsp</result>  // 省略name属性，系统将采用默认的name属性值，默认的name值为success
	
	com.opensymphony.xwork2.Action中内置的五个系统值:
		SUCCESS  Action正确执行，返回相应的视图
		NONE	正确执行，但不反悔任何视图			
		ERROR   执行失败，返回到错误处理视图
		LOGIN   用户没有登录，将返回到该登录视图，要求进行登录验证
		INPUT   Action的执行，需要从前端界面获取参数，INPUT就是代表这个参数输入的界面，一般在应用中，会对这些参数进行验证，如果验证没有通过，将自动返回到该界面
```

### INPUT实例
```
	在struts.xml中配置	
		<action name="loginAction" method="login" class="com.imooc.action.LoginAction">
			<result name="success">/result.jsp</result>
			<result name="input">/login.jsp</result>
		</action>

	在LoginAction类中，实现ModelDriven接口,且必须设置需要转换的类User
	 	public class LoginAction extends ActionSupport implements ModelDriven<User> {
			// 通过创建一个类管理username和password，类似封装在一个对象中				 		
	 		private User user = new User();  // 必须手动实例化

	 		public String login(){
	 			System.out.println(username.getUsername());  //通过属性的get方法获取表单参数
	 			System.out.println(username.getBookList().get(0));  //通过属性的get方法获取表单参数
	 			
	 			if( ... ){ 			//登录校验
	 				// todo...
	 				return INPUT;	//登录校验失败，返回表单提交的页面(INPUT结果)
	 			}	
	 			else{
	 				return SUCCESS;	
	 			}
	 			
	 		}

	 		// todo...
		}
```

### 全局结果与局部结果
```
	全局结果放在<global-result></global-result>标签下，局部结果放在<action></action>标签下

	子标签<param></param>具有两个属性
	location：该属性定义了该视图对应的实际视图资源
	parse：指定是否可以在实际视图名字中使用OGNL表达式，默认为true
	<result name="success">
		<param name="location">/login.jsp</param>
		<param name="parse">false</param>
	</result>

	OGNL:Object-Graph Navigation Language
```

### 处理结果类型--type属性
	默认type="dispatcher"
	chain,dispatcher,freemarker,httpheader,redirect,redirectActionstream,velocity,xslt,plainText,postback
