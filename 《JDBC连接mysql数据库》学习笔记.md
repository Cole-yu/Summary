# 使用JDBC连接mysql数据库

##### 网站参考链接：http://www.cnblogs.com/xiaotiaosi/p/6394554.html 
	jdbc驱动下载地址：http://download.csdn.net/source/3451945
	（重要）mysql-connector-java-8.0.13.jar添加到lib中

### 一、JDBC简介
	JDBC全称为：Java Data Base Connectivity (java数据库连接），可以为多种数据库提供填统一的访问。JDBC是sun开发的一套数据库访问编程接口，是一种SQL级的API。
	JDBC的主要功能如下：
	（1）建立与数据库或者其他数据源的链接
	（2）向数据库发送SQL命令
	（3）处理数据库的返回结果

### 二、JDBC中常用类和接口
	连接到数据库（Connection）、建立操作指令（Statement）、执行查询指令（executeQuery）、获得查询结果（ResultSet）等。
1. 驱动程序管理类（DriverManager）
```
	DriverManager类是JDBC的管理类，作用于用户和驱动程序之间。序员需要在此类中直接使用唯一的方法时DriverManager.getConnection()。该方法将建立与数据库的链接。JDBC允许用户调用DriverManager的方法getDriver()、getDrivers()和registerDriver()及Driver的方法connect()。
```
2. 声明类（Statement）
```
	Statement对象用于将SQL语句发送到数据库中。实际上有三种Statement对象，它们都作为在给定链接上执行SQL语句的包容器：Statement、PreparedStatement（它从Statement继承而来）和CallableStatement（它从PreparedStatement继承而来）。
	
	它们都专用于发送特定类型的SQL语句：
	（1）Statement对象用于执行不带参数的简单的SQL语句；Statement接口提供了执行语句和获取结果的基本方法。
	（2）PerparedStatement对象用于执行带或不带IN参数的预编译SQL语句；PeraredStatement接口添加处理IN参数的方法；
	（3）CallableStatement对象用于执行对数据库已存储过程的调用；CallableStatement添加处理OUT参数的方法。

	Statement提供了许多方法，最常用的方法如下：
	（1）execute()方法：运行语句，返回是否有结果集。
	（2）executeQuery()方法：运行查询语句，返回ReaultSet对象。
	（3）executeUpdata()方法：运行更新操作，返回更新的行数。
	（4）addBatch()方法：增加批处理语句。
	（5）executeBatch()方法：执行批处理语句。
	（6）clearBatch()方法：清除批处理语句。
```
3. 数据库连接类 （Connection）
```
	Connection对象代表与数据库的链接。连接过程包括所执行的SQL语句和在该连接上所返回的结果。一个应用程序可与单个数据库有一个或多个连接，或者可与很多数据库有连接。打开连接与数据库建立连接的标准方法是调用DriverManager.getConnection()方法。
	String url="jdbc:mysql://127.0.0.1:3306/imooc";
	String user="root";
	String password="123";
	DriverManager.getConnection(url,user,password);
```
4. 结果集合类 （ResultSet）
```
	ResultSet包含符合SQL语句中条件的所有行记录，并且它通过一套get方法（这些get方法可以访问当前行中的不同列）提供了对这些行中数据的访问。
	ResultSet.next()方法用于移动到ResultSet中的下一行，使下一行成为当前行。
```
5. JDBC编程步骤
```
	（1）加载驱动程序：Class.forName(driverClass)
		加载mysql驱动：Class.forName("com.mysql.cj.jdbc.Driver");
		加载oracle驱动：Class.forName("oracle.jdbc.driver.OracleDriver");
	（2）获得数据库连接
		DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/testDataBase","root","123");
		DriverManager.gerConnection(URL,user,passWord);
	（3）创建Statement对象：conn.createStatement();
	（4）向数据库发送SQL命令
	（5）处理数据库的返回结果(ResultSet类)
```
6. 数据库连接/查询实例
```
	import java.sql.DriverManager;
	import java.sql.ResultSet;
	import java.sql.SQLException;
	import java.sql.Statement;
	import java.sql.Connection;
	import java.sql.DriverManager;
	import java.sql.SQLException;

	public class javaTest {
	   
	    public static void main(String[] args) throws ClassNotFoundException, SQLException  {

	        String URL="jdbc:mysql://127.0.0.1:3306/test?&serverTimezone=GMT&useSSL=false";  
	        //useSSL=false加上，否则会报错误 javax.net.ssl.SSLException: closing indownloadbound before receiving peer's close_no ...

            String USER="root";
            String PASSWORD="";

            //1.加载驱动程序
            Class.forName("com.mysql.cj.jdbc.Driver");
            //2.获得数据库链接
            Connection conn=DriverManager.getConnection(URL, USER, PASSWORD);
            //3.通过数据库的连接操作数据库，实现增删改查（使用Statement类）
            Statement st=conn.createStatement();
            ResultSet rs=st.executeQuery("select * from user");

	        try {
	            //4.处理数据库的返回结果(使用ResultSet类)
	            while(rs.next()){
	                System.out.println(rs.getString("name")+" / "+rs.getString("age"));
	            }	            
	    	}
	    	catch (SQLException e){
	    		 e.printStackTrace();
	    	}
	    	finally{
				System.out.println("查询结束,关闭资源");
	    		//	关闭资源
	            closeAll(rs, st, conn);	    		
	    	}
	    }

	    /**
	     * 关闭数据库连接
	     * 
	     * @param rs ResultSet类对象
	     * @param st Statement类对象
	     * @param conn Connection类对象
	     */
	    private static void closeAll(ResultSet rs, Statement st, Connection conn) {
	        if (rs != null) {
	            try {
	                rs.close();
	            } catch (SQLException e) {
	                e.printStackTrace();
	            }
	        }
	        
	        if (st != null) {
	            try {
	                st.close();
	            } catch (SQLException e) {
	                e.printStackTrace();
	            }
	        }
	        
	        if (conn == null) {
	            return;
	        }
	        
	        try {
	            conn.close();
	        } catch (SQLException e) {
	            e.printStackTrace();
	        }
	    }
	}
```

### 三、常用操作
	调用存储过程

### 四、事务
	事务（Transaction）是作为单个逻辑工作单位执行的一系列操作，这些操作作为一个整体一起向系统提交，要么都执行，要么都不执行。
1. 事务的特点
```
	（1）原子性：事务是一个完整的操作
	（2）一致性：当食物完成时，数据必须处于一致状态
	（3）隔离性：对数据进行修改的所有兵法事务彼此隔离
	（4）永久性：事务完成后，它对数据库的修改被永久的保存
```
2. JDBC对事务管理的支持
```
	（1）我们通过提交Commit()或是回退rollback()来管理事务的操作
	（2）事务操作默认是自动提交的
	（3）可以通过调用setAutoCommit（false）来禁止自动提交
```
3. 批处理