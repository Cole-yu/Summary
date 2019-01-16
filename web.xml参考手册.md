# web.xml笔记

### init-param
```
	filter 可以接受一些参数。init-param 的 param-name 就是参数名 param-value 就是参数值， 支持多个参数每一个 filter 都有一个 init 方法 ，可以再这个方法中通过 getInitParamter("key"); key 就是 param-name 的值，来获取对应的参数值，常用的就是设置编码过滤器。
	例如(实例，内容不做考虑)：
		<filter>
			<filter-name>SessionFilter</filter-name>
			<filter-class>com.yfx.SessionFilter</filter-class>
			<init-param>
				<param-name>encoding</param-name>
				<parma-value>UTF-8</param-vaue>
			</init-param>
			<init-param>
				<param-name>resourceType</param-name>
				<parma-value>html,css,js,png,jpeg,txt</param-vaue>
			</init-param>
		</filter>
		<filter-mapping>
		    <filter-name>SessionFilter</filter-name>
		    <url-pattern>/*</url-pattern>
		</filter-mapping>			

		public List<String> filter(Path configPath){
			String temp_types=configPath.getInitParamter(resourceType);
			List<String> types=Arrays.asList(temp_types.split(","));
			return types;            // [html,css,js,png,jpeg,txt]
		}


```

### security-constraint
```	
	四个子元素:
	1. web-resource-collection
		所有security-constraint元素都必须包含至少一个web-resource-collection项.
		此元素由一个给出任意标识名称的web-resource-name元素、一个确定应该保护URL的url-pattern元素、一个指出此保护所适用的HTTP命令（GET、POST等，缺省为所有方法）的http-method元素和一个提供资料的可选description元素组成。
		<web-resource-collection>    
	   		<web-resource-name>baseproject</web-resource-name>    
		   	<url-pattern>*.jsp</url-pattern>    
		   	<url-pattern>*.do</url-pattern>    
		   	<http-method>GET</http-method>    
		   	<http-method>PUT</http-method>    
		   	<http-method>HEAD</http-method>    
		   	<http-method>TRACE</http-method>    
		  	<http-method>POST</http-method>    
		  	<http-method>DELETE</http-method>    
		  	<http-method>OPTIONS</http-method>    
	  	</web-resource-collection>
	
	2. auth-constraint
		元素指出哪些用户具有受保护资源的访问权。此元素应该包含一个或多个标识具有访问权限的用户类别role-name元素，以及包含（可选）一个描述角色的description元素。 
		<1> 如果没有<auth-constraint>子元素，这表明任何身份的用户都可以访问相应的资源。也就是说，如果 <security-constraint> 中没有 <auth-constraint> 子元素的话，配置实际上是不起中用的。
		<2> 如果加入了 <auth-constraint> 子元素，但是其内容为空，这表示所有身份的用户都被禁止访问相应的资源。 
		<auth-constraint>
		   	<description>baseproject</description>  
   			<role-name>webAdmin</role-name>   // 只允许web管理员访问该资源
 		</auth-constraint>

		再tomcat的tomcat-users.xml中配置安全管理角色
 		<role rolename="webAdmin"/>
 		<role rolename="user"/>
  		<user username="yfx" password="123456" roles="webAdmin,user"/>  // yfx既是web管理员，又是用户
	
	3. user-data-constraint
		这个可选的元素指出在访问相关资源时使用任何传输层保护。它必须包含一个transport-guarantee子元素（合法值为NONE、INTEGRAL或CONFIDENTIAL），并且可选地包含一个description元素。
		transport-guarantee为NONE值将对所用的通讯协议不加限制。
		INTEGRAL值表示数据必须以一种防止截取它的人阅读它的方式传送。虽然原理上（并且在未来的HTTP版本中），在INTEGRAL和CONFIDENTIAL之间可能会有差别，但在当前实践中，他们都只是简单地要求用SSL。
		<user-data-constraint>
			<transport-guarantee>NONE</transport-guarantee>
		</user-data-constraint>

	4. 四种方式（参考链接：https://my.oschina.net/itblog/blog/678845）
		当访问服务器中受保护的资源时，容器管理的验证方法可以控制确认用户身份的方式。Tomcat支持四种容器管理的安全防护，它们是：
		BASIC(基本验证)：通过HTTP验证，需要提供base64编码文本的用户口令
		DIGEST(摘要验证)：通过HTTP验证，需要提供摘要编码字符串的用户口令
		FORM(表单验证)：在网页的表单上要求提供密码
		CLIENT-CERT(客户端证书验证)：以客户端证书来确认用户的身份		
```	