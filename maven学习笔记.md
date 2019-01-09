# Maven 学习笔记

### 使用maven创建springMVC项目
```
	报错：Maven创建项目时出现Generating project in Interactive mode就一直卡住的解决方案
	加个参数 -DarchetypeCatalog=internal
	让它不要从远程服务器上取catalog:
	mvn archetype:generate -DgroupId=imooc-arthur -DartifactId=spring-mvc-study -DarchetypeArtifactId=maven-archetype-webapp -DarchetypeCatalog=internal
```

### 缺少了jstl.jar包和standard.jar包。报错	

### eclipse中未加入maven包
	报错 ：Error configuring application listener of class org.springframework.web.context.ContextLoaderListener java.lang.ClassNotFoundException: org.springframework.web.conte
	项目点击右键 点击 Properties 选择Deployment Assembly，再点击右边的Add按钮 选择Java Build Path Entries后点击Next按钮 然后选择Maven Dependencies，把maven加入到eclipse项目中， 确定即可


### maven项目启动语句
	项目pom.xml文件所在目录，mvn jetty:run
	不能用eclipse中的tomcat启动，无效
