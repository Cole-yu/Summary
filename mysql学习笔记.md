# mysql学习笔记

### 安装mysql
	https://blog.csdn.net/recky_wiers/article/details/79243804

### 登录mysql
	net start mysql  	启动mysql
	mysql -u root -p  	登录用户(本地数据库的用户名为root)
	show databases;
	quit
	net stop mysql		关闭mysql

### 常用的mysql命令行	
	mysql>CREATE DATABASE test;   										//创建一个数据库
	mysql>use test;  													//指定test为当前要操作的数据库
	mysql>CREATE TABLE user (name VARCHAR(20),password VARCHAR(20));   	//创建一个表user，设置两个字段。
	mysql>INSERT INTO user VALUES('huzhiheng','123456'); 				//插入一条数据到表中


### 使用Navicat连接MySQL8出现1251错误
	mysql8以后默认使用加强的密码验证方式
	加密方式不统一(传统密码验证方式和加强的密码验证方式)

### navicat连接mysql
	主机名或IP地址localhost
	端口 3306
	用户名 root
	密码 (空)

