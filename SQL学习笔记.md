# SQL学习笔记
	SQL 不区分大小写

## 基础教程

###	distinct
	用于返回唯一不同的值,SELECT DISTINCT 列名称 FROM 表名称

### AND/OR
	AND 和 OR 结合起来（使用圆括号来组成复杂的表达式）:
	SELECT * FROM Persons WHERE (FirstName='Thomas' OR FirstName='William') AND LastName='Carter'

### Order By
```
	DESC按降序对记录进行排序(3,2,1,c,b,a)，ASC以升序进行排序(1,2,3,a,b,c)
	
	以逆字母顺序显示公司名称，并以数字顺序显示顺序号：

	SELECT Company,OrderNumber FROM Orders ORDER BY Company DESC, OrderNumber ASC

	结果集：
		Company	 /	OrderNumber
		W3School /		2356
		W3School /		6953
		IBM		 /		3532
		Apple	 /		4698
```	
### SELECT
	SELECT 列1,列2,列3 FROM 表名称 WHERE (条件)

### INSERT INTO
	INSERT INTO 表名称 VALUES (值1, 值2,....)
	或者
	INSERT INTO table_name (列1, 列2,...) VALUES (值1, 值2,....)

### UPDATE
	UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值

### DELETE
	DELETE FROM 表名称 WHERE 列名称 = 值

	可以在不删除表的情况下删除所有的行。这意味着表的结构、属性和索引都是完整的：
	DELETE FROM table_name
	或者：
	DELETE * FROM table_name

## 高级教程

### TOP
	sql语法
		SELECT TOP 50 PERCENT * FROM Persons
	mysql语法与Oracle语法
		SELECT 列1,列2... FROM table_name LIMIT number
		select * from Persons limit 5

### LIKE
	"%" 可用于定义通配符（模式中缺少的字母）。
	SELECT 列1,列2... FROM Persons WHERE City LIKE 'N%'				// %N,  N%,  %N%
	通过使用 NOT 关键字，可以从 "Persons" 表中选取居住在不包含 "lon" 的城市里的人：
	SELECT * FROM Persons WHERE City NOT LIKE '%lon%'

### 通配符
```
	通配符							描述
	%								替代一个或多个字符
	_								仅替代一个字符
	[charlist]						字符列中的任何单一字符
	[^charlist]或者[!charlist]		不在字符列中的任何单一字符		
	
	例子：
	SELECT * FROM Persons WHERE City LIKE '[!ALN]%'
```

### IN操作符
	IN 操作符允许我们在 WHERE 子句中规定多个值。
	SELECT column_name(s) FROM table_name WHERE column_name IN (value1,value2,...)
	SELECT * FROM Persons WHERE LastName IN ('Adams','Carter')

### BETWEEN操作符
	以字母顺序显示范围之外的人，复合使用 NOT 操作符
	SELECT * FROM Persons WHERE LastName NOT BETWEEN 'Adams' AND 'Carter'	

### 使用别名 as
```
	可以为列名明和表名称指定别名(Alias)
	表的 SQL Alias 语法
	SELECT column_name(s) FROM table_name AS alias_name
	列的 SQL Alias 语法
	SELECT column_name AS alias_name FROM table_name

	实例
	假设我们有两个表分别是："Persons" 和 "Product_Orders"。 我们分别为它们指定别名 "p" 和 "po"
	SELECT po.OrderID, p.LastName, p.FirstName FROM Persons AS p, Product_Orders AS po WHERE p.LastName='Adams' AND p.FirstName='John'
```

### JOIN关键字
	SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo FROM Persons INNER JOIN Orders ON Persons.Id_P = Orders.Id_P ORDER BY Persons.LastName
	INNER JOIN(内连接)
	JOIN: 如果表中有至少一个匹配，则返回行，INNER JOIN 与 JOIN 是相同的。
	LEFT JOIN: 即使右表中没有匹配，也从左表返回所有的行
	RIGHT JOIN: 即使左表中没有匹配，也从右表返回所有的行
	FULL JOIN: 只要其中一个表中存在匹配，就返回行

### INNER JOIN
```
	参考链接 http://www.w3school.com.cn/sql/sql_join_inner.asp
	在表中存在至少一个匹配时，INNER JOIN 关键字返回行。
	SELECT column_name(s) FROM table_name1
	INNER JOIN table_name2 
	ON table_name1.column_name=table_name2.column_name

	SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo FROM Persons 
	INNER JOIN Orders 
	ON Persons.Id_P=Orders.Id_P ORDER BY Persons.LastName	
	INNER JOIN 关键字在表中存在至少一个匹配时返回行。如果 "Persons" 中的行在 "Orders" 中没有匹配，就不会列出这些行。(Orders中有Person的主键，在Persion表中能找到，才会列出Orders表中的行数据)
```

### LEFT JOIN
	LEFT JOIN 关键字会从左表 (table_name1) 那里返回所有的行，即使在右表 (table_name2) 中没有匹配的行。
	SELECT column_name(s) FROM table_name1
	LEFT JOIN table_name2 
	ON table_name1.column_name=table_name2.column_name

### RIGHT JOIN
	RIGHT JOIN 关键字会右表 (table_name2) 那里返回所有的行，即使在左表 (table_name1) 中没有匹配的行。	
	SELECT column_name(s) FROM table_name1 
	RIGHT JOIN table_name2
	ON table_name1.column_name=table_name2.column_name

### FULL JOIN
```	
	SELECT column_name(s) FROM table_name1
	FULL JOIN table_name2 
	ON table_name1.column_name=table_name2.column_name

	FULL JOIN 关键字会从左表 (Persons) 和右表 (Orders) 那里返回所有的行。如果 "Persons" 中的行在表 "Orders" 中没有匹配，或者如果 "Orders" 中的行在表 "Persons" 中没有匹配，这些行同样会列出。	
```

### UNION
	UNION 操作符用于合并两个或多个 SELECT 语句的结果集。
	注意，
	1. UNION 内部的 SELECT 语句必须拥有相同数量的列。列也必须拥有相似的数据类型。同时，每条 SELECT 语句中的列的顺序必须相同。
	2. 默认地，UNION 操作符选取不同的值。如果允许重复的值，请使用 UNION ALL。
	3. UNION 结果集中的列名总是等于 UNION 中第一个 SELECT 语句中的列名。
	4. UNION ALL 命令和 UNION 命令几乎是等效的，不过 UNION ALL 命令会列出所有的值。
		SQL Statement 1
		UNION ALL
		SQL Statement 2

### SELECT INTO
```
	SELECT INTO 语句从一个表中选取数据，然后把数据插入另一个表中。
	使用场景：用于创建表的备份复件或者用于对记录进行存档（中间表）

	SELECT column_name(s)
	INTO new_table_name [IN externaldatabase] 
	FROM old_tablename

	从一个以上的表中选取数据也是可以做到的。
	创建一个名为 "Persons_Order_Backup" 的新表，其中包含了从 Persons 和 Orders 两个表中取得的信息，例子：
	SELECT Persons.LastName,Orders.OrderNo
	INTO Persons_Order_Backup
	FROM Persons
	INNER JOIN Orders
	ON Persons.Id_P=Orders.Id_P
```

### CREATE DB
	CREATE DATABASE database_name

### CREATE TABLE
```
	CREATE TABLE 表名称
	(
	列名称1 数据类型,
	列名称2 数据类型,
	列名称3 数据类型,
	....
	)

	数据类型（data_type）

	数据类型	描述
	integer(size)	仅容纳整数。在括号内规定数字的最大位数。
	int(size)
	smallint(size)
	tinyint(size)
	
	decimal(size,d)
	numeric(size,d)	容纳带有小数的数字。"size" 规定数字的最大位数。"d" 规定小数点右侧的最大位数。

	char(size)		容纳固定长度的字符串（可容纳字母、数字以及特殊字符）。在括号中规定字符串的长度。

	varchar(size)	容纳可变长度的字符串（可容纳字母、数字以及特殊的字符）。在括号中规定字符串的最大长度。

	date(yyyymmdd)	容纳日期。

	例子：
	CREATE TABLE Persons
	(
	Id_P int,
	LastName varchar(255),
	FirstName varchar(255),
	Address varchar(255),
	City varchar(255)
	)
```

### SQL约束（constraints）
```
	NOT NULL
	UNIQUE
	PRIMARY KEY
	FOREIGN KEY
	CHECK
	DEFAULT
```

### NOT NULL
```
	NOT NULL 约束强制列不接受 NULL 值。NOT NULL约束强制字段始终包含值。这意味着，如果不向字段添加值，就无法插入新记录或者更新记录。
	CREATE TABLE Persons
	(
	Id_P int NOT NULL,
	LastName varchar(255) NOT NULL,
	FirstName varchar(255),
	Address varchar(255),
	City varchar(255)
	)
```

### UNIQUE（唯一约束）
```
	1. UNIQUE 约束唯一标识数据库表中的每条记录。
	2. UNIQUE 和 PRIMARY KEY 约束均为列或列集合提供了唯一性的保证。
	3. PRIMARY KEY 拥有自动定义的 UNIQUE 约束。

	MySQL语法:
		CREATE TABLE Persons
		(
		Id_P int NOT NULL,
		LastName varchar(255) NOT NULL,
		FirstName varchar(255),
		Address varchar(255),
		City varchar(255),
		UNIQUE (Id_P)
		)

	SQL Server / Oracle / MS Access语法:
		CREATE TABLE Persons
		(
		Id_P int NOT NULL UNIQUE,
		LastName varchar(255) NOT NULL,
		FirstName varchar(255),
		Address varchar(255),
		City varchar(255)
		)
```

### PRIMARY KEY （主键约束）
```
	1. PRIMARY KEY 约束唯一标识数据库表中的每条记录。
	2. 主键必须包含唯一的值。
	3. 主键列不能包含 NULL 值。
	4. 每个表都应该有一个主键，并且每个表只能有一个主键。

	<1> 创建PRIMARY KEY 约束
	MySQL语法:
		CREATE TABLE Persons
		(
		Id_P int NOT NULL,
		LastName varchar(255) NOT NULL,
		FirstName varchar(255),
		Address varchar(255),
		City varchar(255),
		PRIMARY KEY (Id_P)
		)

	SQL语法
		CREATE TABLE Persons
		(
		Id_P int NOT NULL PRIMARY KEY,
		LastName varchar(255) NOT NULL,
		FirstName varchar(255),
		Address varchar(255),
		City varchar(255)
		)	

	<2> 在表已存在的情况下为 "Id_P" 列创建 PRIMARY KEY 约束：
	MySQL / SQL Server / Oracle / MS Access语法:
		ALTER TABLE Persons
		ADD PRIMARY KEY (Id_P)

	<3> 撤销 PRIMARY KEY 约束：
	MySQL语法:
		ALTER TABLE Persons
		DROP PRIMARY KEY
	SQL Server / Oracle / MS Access语法:
		ALTER TABLE Persons
		DROP CONSTRAINT pk_PersonID		
```	

### FOREIGN KEY（外键）约束
	一个表中的 FOREIGN KEY 指向另一个表中的 PRIMARY KEY。

### CHECK 约束
```
	CHECK 约束用于限制列中的值的范围。
	如果对单个列定义 CHECK 约束，那么该列只允许特定的值。
	如果对一个表定义 CHECK 约束，那么此约束会在特定的列中对值进行限制。
	My SQL语法:
	CREATE TABLE Persons
	(
	Id_P int NOT NULL,
	LastName varchar(255) NOT NULL,
	FirstName varchar(255),
	Address varchar(255),
	City varchar(255),
	CHECK (Id_P>0)
	)

	SQL Server / Oracle / MS Access 语法:
	CREATE TABLE Persons
	(
	Id_P int NOT NULL CHECK (Id_P>0),
	LastName varchar(255) NOT NULL,
	FirstName varchar(255),
	Address varchar(255),
	City varchar(255)
	)
```

### DEFAULT 约束
```
	DEFAULT 约束用于向列中插入默认值。
	如果没有规定其他的值，那么会将默认值添加到所有的新记录。

	My SQL / SQL Server / Oracle / MS Access 语法:
	CREATE TABLE Persons
	(
	Id_P int NOT NULL,
	LastName varchar(255) NOT NULL,
	FirstName varchar(255),
	Address varchar(255),
	City varchar(255) DEFAULT 'Sandnes'
	)
```

### CREATE INDEX（索引）
```	
	用户无法看到索引，它们只能被用来加速搜索/查询。
	INDEX 语句用于在表中创建索引。
	在不读取整个表的情况下，索引使数据库应用程序可以更快地查找数据。
	CREATE INDEX index_name
	ON table_name (column_name)

	例子：
	CREATE INDEX PersonIndex
	ON Person (LastName) 

	唯一索引：唯一的索引意味着两个行不能拥有相同的索引值。
	CREATE UNIQUE INDEX index_name
	ON table_name (column_name)

	优点
	1. 索引大大减小了服务器需要扫描的数据量(相当于图书的目录，可以根据目录中的页码快速找到所需的内容，跳过无关的部分)
	2. 索引可以帮助服务器避免排序和临时表

	缺点：
	1. 缺点虽然索引大大提高了查询速度，同时却会降低更新表的速度，如对表进行INSERT、UPDATE和DELETE。因为更新表时，MySQL不仅要保存数据，还要保存索引文件。
	2. 建立索引会占用磁盘空间的索引文件。一般情况这个问题不太严重，但如果你在一个大表上创建了多种组合索引，索引文件的会膨胀很快。
	3. 如果某个数据列包含许多重复的内容，为它建立索引就没有太大的实际效果。
	4. 对于非常小的表，大部分情况下简单的全表扫描更高效；
```

### DROP
	轻松地删除索引、表和数据库
	mysql语法：
	ALTER TABLE table_name DROP INDEX index_name
	删除表：
	DROP TABLE 表名称
	删除数据库：
	DROP DATABASE 数据库名称

### ALERT
```
	ALERT TABLE
	ALTER TABLE 语句用于在已有的表中添加、修改或删除列。

	在表中添加列，语法:
	ALTER TABLE table_name
	ADD column_name datatype

	要删除表中的列，语法：
	ALTER TABLE table_name 
	DROP COLUMN column_name
	注释：某些数据库系统不允许这种在数据库表中删除列的方式 (DROP COLUMN column_name)。

	要改变表中列的数据类型，语法：
	ALTER TABLE table_name
	ALTER COLUMN column_name datatype
```

### AUTO INCREMENT 字段
```
	Auto-increment 会在新记录插入表中时生成一个唯一的数字。
	把 "Persons" 表中的 "P_Id" 列定义为 auto-increment 主键：

	MySQL 语法:
	CREATE TABLE Persons
	(
	P_Id int NOT NULL AUTO_INCREMENT,
	LastName varchar(255) NOT NULL,
	FirstName varchar(255),
	Address varchar(255),
	City varchar(255),
	PRIMARY KEY (P_Id)
	)

	要让 AUTO_INCREMENT 序列以其他的值起始，请使用下列 SQL 语法：
	ALTER TABLE Persons AUTO_INCREMENT=100


	SQL Server语法：
		CREATE TABLE Persons
		(
		P_Id int PRIMARY KEY IDENTITY,
		LastName varchar(255) NOT NULL,
		FirstName varchar(255),
		Address varchar(255),
		City varchar(255)
		)
	要规定 "P_Id" 列以 20 起始且递增 10，只需把 identity 改为 IDENTITY(20,10)		
```	

### View
```
	视图
```

### Date
	NOW()			返回当前的日期和时间
	CURDATE()		返回当前的日期
	CURTIME()		返回当前的时间
	DATE()			提取日期或日期/时间表达式的日期部分
	EXTRACT()		返回日期/时间按的单独部分
	DATE_ADD()		给日期添加指定的时间间隔
	DATE_SUB()		从日期减去指定的时间间隔
	DATEDIFF()		返回两个日期之间的天数
	DATE_FORMAT()	用不同的格式显示日期/时间

### NULL
```
	NULL 值是遗漏的未知数据。
	默认地，表的列可以存放 NULL 值。

	始终使用 IS NULL 来查找 NULL 值。
	SELECT LastName,FirstName,Address FROM Persons WHERE Address IS NULL
```

###	ISNULL()、NVL()、IFNULL() 和 COALESCE() 函数
```
	以下sql语句实现 如果 "UnitsOnOrder" 是 NULL，则 ISNULL() 返回 0

	在 MySQL 中，我们可以使用 IFNULL() 函数：
	SELECT ProductName,UnitPrice*(UnitsInStock+IFNULL(UnitsOnOrder,0)) FROM Products
	或者我们可以使用 COALESCE() 函数，就像这样：
	SELECT ProductName,UnitPrice*(UnitsInStock+COALESCE(UnitsOnOrder,0)) FROM Products

	SQL Server / MS Access语法只能使用 INSULL()函数：	
	SELECT ProductName,UnitPrice*(UnitsInStock+ISNULL(UnitsOnOrder,0)) FROM Products

	Oracle语法使用NVL()函数:
	Oracle 没有 ISNULL() 函数。不过，我们可以使用 NVL() 函数达到相同的结果：
	SELECT ProductName,UnitPrice*(UnitsInStock+NVL(UnitsOnOrder,0)) FROM Products
```

### 数据类型
	http://www.w3school.com.cn/sql/sql_datatypes.asp

### SQL数据库
	DBMS - 数据库管理系统	
	RDBMS - 关系数据库管理系统（RDBMS 是 SQL 的基础，也是所有现代数据库系统诸如 Oracle、SQL Server、IBM DB2、Sybase、MySQL 以及 Microsoft Access 的基础）

### SQL函数
	函数							描述
	AVG(column)				返回某列的平均值
	BINARY_CHECKSUM	 
	CHECKSUM	 
	CHECKSUM_AGG	 
	COUNT(column)			返回某列的行数（不包括NULL值）
	COUNT(*)				返回被选行数
	COUNT(DISTINCT column)	返回相异结果的数目
	FIRST(column)			返回在指定的域中第一个记录的值（SQLServer2000 不支持）
	LAST(column)			返回在指定的域中最后一个记录的值（SQLServer2000 不支持）
	MAX(column)				返回某列的最高值
	MIN(column)				返回某列的最低值
	STDEV(column)	 
	STDEVP(column)	 
	SUM(column)				返回某列的总和
	VAR(column)	 
	VARP(column)

### GROUP BY
```
	GROUP BY 语句用于结合合计函数，根据一个或多个列对结果集进行分组。
	SELECT column_name, aggregate_function(column_name)
	FROM table_name
	WHERE column_name operator value
	GROUP BY column_name

	例子：
	SELECT Customer,SUM(OrderPrice) FROM Orders GROUP BY Customer
```

### having
	在 SQL 中增加 HAVING 子句原因是，WHERE 关键字无法与合计函数一起使用。
	SELECT Customer,SUM(OrderPrice) FROM Orders
	WHERE Customer='Bush' OR Customer='Adams'
	GROUP BY Customer
	HAVING SUM(OrderPrice)>1500

### UCASE()函数
	UCASE 函数把字段的值转换为大写。	

### LCASE()函数
	LCASE 函数把字段的值转换为小写。

### MID()函数
```
	MID 函数用于从文本字段中提取字符。
	SELECT MID(column_name,start[,length]) FROM table_name
	参数				描述
	column_name		必需。要提取字符的字段。
	start			必需。规定开始位置（起始值是 1）。
	length			可选。要返回的字符数。如果省略，则 MID() 函数返回剩余文本。
	
	SELECT MID(City,1,3) as SmallCity FROM Persons
	city字段中的值只会取指定范围的文本，如London 只取 Lon
```

### LEN()函数
	LEN 函数返回文本字段中值的长度。
	SELECT LEN(column_name) FROM table_name


### ROUND()函数
	ROUND 函数用于把数值字段舍入为指定的小数位数。	
	SELECT ROUND(column_name,decimals) FROM table_name

### NOW()函数
	SELECT NOW() FROM table_name	
	SELECT ProductName, UnitPrice, Now() as PerDate FROM Products

### FORMAT()函数
	FORMAT 函数用于对字段的显示进行格式化。	
	SELECT FORMAT(column_name,format) FROM table_name
	例子：
	SELECT ProductName, UnitPrice, FORMAT(Now(),'YYYY-MM-DD') as PerDate FROM Products
