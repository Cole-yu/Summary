#	JAVA学习笔记

### 核心概念
	JDK Java Development Kit（Java开发工具包）
	JRE Java Runtime Environment（Java运行时环境)
	JVM Java Virtual Machine（Java虚拟机,包含编译器、解释器）	


### java开发环境搭建
1.	安装JDK
2.	配置环境变量
	* JAVA_HOME 配置JDK安装路径
	* PATH	配置JDK命令文件的位置(bin)
	* CLASSPATH	配置类库文件的位置(lib)  .;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar;

### 使用记事本编写java
1.  编写源文件（.java）
	```
	public class HelloWorld{
		public static void main (String[] args){
			System.out.println("welcome to imooc");
		}
	}
	```
2.  编译源文件成字节码文件（.class） javac HelloWorld.java（会生成一个HelloWorld.class文件）
3.  用解释器输出	java HelloWorld  (不需要带.class后缀)

### eclipse与MyEclipse的区别

### 使用Eclipse开发Java程序
1. 创建Java项目（create Java Project）
2. 创建程序包（create Package)
3. 编写Java源程序（create Class文件,类名必须与程序包名保持一致）
4. 运行Java程序（run as Java Application）

### Java数据类型
1. 基本数据类型(数据本身)
	* 数值型
		* 整数类型(byte,short,int,long)
		* 浮点类型(float,double)
	* 字符型(char)
	* 布尔型(boolean)
2. 引用数据类型(引用类型变量存的是保存数据的空间地址)
	* 类（class）
	* 接口(interface)
	* 数组
	* 字符串（String）//char类型的数组

### float与double的区别
1. 在内存中占有的字节数不同
	```
	单精度浮点数（float）在机内占4个字节
	双精度浮点数（double）在机内占8个字节
	```	
2. 有效数字位数不同
	```
	单精度浮点数（float）有效数字8位
	双精度浮点数（double）有效数字16位
	```
3. 所能表示数的范围不同
	```
	单精度浮点（float）的表示范围：-3.40E+38 ~ +3.40E+38
	双精度浮点（double）的表示范围：-1.79E+308 ~ +1.79E+308
	```
4. 在程序中处理速度不同
	```
	一般来说，CPU处理单精度浮点数的速度比处理双精度浮点数快	
	```

### char与String的区别
1. 类型不同，char是字符类型，String是字符串类型
2. String字符串是用""来包含串的， char是用''来包含单字符的
	```
	char a='1';				//定义一个字符
	String b="Hello World";	//定义一个字符串
	```
3. String内部用来存储的结果是一个char字符数组。
	```
	private final char value[];		//这是string中用来存储值的结构。
	```

### Java中变量的使用规则
1. Java中的变量需要先声明后使用
2. main方法中定义的变量必须先赋值，然后才能输出

### 类型转换
1. 自动类型转换
	* 目标类型能与源类型兼容，如 double 型兼容 int 型，但是 char 型不能兼容 int 型
	* 目标类型大于源类型，如 double 类型长度为 8 字节， int 类型为 4 字节，因此 double 类型的变量里直接可以存放 int 类型的数据，但反过来就不可以了
2. Java中的强制类型转换
	* char与String的转换
	* double,int,float直接的转换

### Java常量的应用
	语法：final 数据类型 常量名 = 值;	
	final char female='女';
	final int age=18;

### 如何在Java中使用注释
	Java 中注释有三种类型：单行注释、多行注释、文档注释
1. 文档注释以/**开头，以*/结尾
	```
	/**
	  * 这是文档注释
	  * @author yfx
	  * @version v1.0
	  * @see 参考转向，也就是相关主题
      * @param 对方法中某参数的说明
      * @return 对方法返回值的说明
      * @exception 对方法可能抛出的异常进行说明
	  */
	```
2. 多行注释以/*开头，以*/结尾
	```
	/*
	 * 可以包括多行代码内容
	 */
	```
3. 单行注释以//开头，行末结尾
	```	
	// 一行代码内容
	```

### 如何使用 Java 中的数组(Java中数组定义时用[]来表示,赋值时用{}来包裹)
1. 声明数组
	```
	语法:数据类型[ ] 数组名
	String[] subjects;
	```
2. 分配空间
	```
	语法：数组名 = new  数据类型 [ 数组长度 ];
	subjects=new String[5];
	```
3. 步骤合并，在声明数组的同时为它分配空间
	```
	String[] subjects=new String[5];		//定义一个长度为5的字符串数组
	int[] scores={78,91,84,68};				//创建一个长度为4的整型数组
	int[] scores=new int[]{78,91,84,68};	//必须为空，不能指定长度
	```

###	使用 Arrays 类操作 Java 中的数组
	import java.util.Arrays;
	Arrays.sort();   //改变原数组
	Array.toString();

### Java 中的二维数组
1. 声明数组并分配空间
	```
	数据类型[][] 数组名=new 数据类型[行的个数][列的个数]
	或者
	数据类型[][] 数组名;
	数组名=new 数据类型[行的个数][列的个数];	
	int[][] tableInfos=new int[2][3];
```
2. 赋值(Java中数组定义时用[]来表示,赋值时用{}来包裹)
	```
	数组名[行的索引][列的索引]=值;
	或者
	在声明数组的同时为其赋值
	int[][] tableInfos = {{2,3,4},{-1,-2,-3}};
	```

### 如何定义 Java 中的方法
	语法： 访问修饰符 返回值类型 方法名(参数列表){
		方法体
	}
	访问修饰符:public、protected、private
	返回值类型：如果方法不返回任何值，则返回值类型指定为 void ；如果方法具有返回值，则需要指定返回值的类型，并且在方法体中使用 return 语句返回值
	方法名
	参数列表

### Java 中无参无返回值方法的使用
	public class HelloWorld {
    	public static void main(String[] args) {
			HelloWorld hello=new HelloWorld(); 	// 创建对象，对象名为hello
			hello.showMyLove();		// 调用方法
		}
		/*
		 * 定义无参无返回值的方法
		 */
		public void showMyLove() {
			System.out.println("我爱慕课网!");
		}
	}

### Java 中无参带返回值方法的使用
1. 如果方法的返回类型为 void ，则方法中不能使用 return 返回值
2. 方法的返回值最多只能有一个，不能返回多个值
3. 方法返回值的类型必须兼容，例如，如果返回值类型为 int ，则不能返回 String 型值

### Java 中带参无返回值方法的使用
	//定义一个对分数排序的方法
	public void scoresSort(int[] scores){
		Arrays.sort(scores);
	}

### Java 中带参带返回值方法的使用
	public String show(String name){
		return "欢迎你," + name + "!";
	}

### Java 中方法的重载
1. 如果同一个类中包含了两个或两个以上方法名相同、方法参数的个数、顺序或类型不同的方法，则称为方法的重载，也可称该方法被重载了
2. 当调用被重载的方法时，Java 会根据参数的个数和类型来判断应该调用哪个重载方法，参数完全匹配的方法将被执行。
3. 判断方法重载的依据：
	```
	1、 必须是在同一个类中
	2、 方法名相同
	3、 方法参数的个数、顺序或类型不同
	4、 与方法的修饰符或返回值没有关系	
	```

### 编程练习
	```
	//导入java.util.Arrays;
	import java.util.Arrays;
	import java.util.Random;

	public class HelloWorld {
	    public static void main(String[] args) {	        	         
	    	HelloWorld hello = new HelloWorld();	        // 创建对象，对象名为hello
	        
			int[] nums = hello.getArray(8);	        		// 调用方法并将返回值保存在变量中
	        
			System.out.println(Arrays.toString(nums)); 		// 将数组转换为字符串并输出
		}
		/*
		 * 功能：创建指定长度的int型数组，并生成100以内随机数为数组中的每个元素赋值
		 * 定义一个带参带返回值的方法，通过参数传入数组的长度，返回赋值后的数组
		 */
		public int[] getArray(int length) {
	        // 定义指定长度的整型数组
			int[] nums = new int[length];
	        // 循环遍历数组赋值
			for (int i=0;i<length;i++) {
				// 产生一个100以内的随机数，并赋值给数组的每个成员
				nums[i]=(int)(Math.random()*100);	// 注意不要写成(int)Math.random()*3，这个结果为0，因为先执行了强制转换,坑
			}
			return nums; // 返回赋值后的数组
		}
	}
	```

### main方法
	public 公有的，也就是对外可见的，也就是别的类可以以 obj.xxx 方式调用你
	static 静态的，也就是不用 new 这个对象，这个方法也存在，也就是 Obj.xxx 就可以调用了（注意是大写的 O）；表明方法是静态的,不依赖类的对象的,是属于类的,在类加载的时候main()方法也随着加载到内存中去
	void 空类型，也就是不返回任何值
	main 是Java应用程序的入口方法，也就是说，程序在运行的时候，第一个执行的方法就是main()方法
	String[] 参数类型为字符串数组
	args 参数

### 成员变量和局部变量
1. 作用域不同
	```
	局部变量的作用域仅限于它地方法中
	成员变量的作用域在整个类内部都是可见的
	```
2. 初始值不同
	```
	Java会给成员变量一个初始值
	Java不会给局部变量赋予初始值	
	```
3. 两类变量同名时，局部变量具有更高的优先级（就近原则）


### 需不需要插入import？ 答：同一个包里面的类可以直接使用，不加import关键字也是可以的

### 构造方法
	语法： 类名 对象名=new 构造方法（与类名相同，不指定，系统自动生成）; //注：类是对象的数据类型
	Person mather=new Person("yxf",58,"male");
	创建一个新的对象并初始化，通过有参的构造方法可以实现对象属性的赋值

### 当某个类中，没有指定构造方法时，new对象时，系统会自动添加无参的构造方法

### Java 中的 static 使用之静态变量
* Java 中被 static 修饰的成员称为静态成员或类成员。它属于整个类所有，而不是某个对象所有，即被类的所有对象所共享。静态成员可以使用类名直接访问，也可以使用对象名进行访问。
* 使用 static 可以修饰变量、方法和代码块

### 静态变量与成员变量的区别
1. 生命周期不一样
2. 成员变量的使用必须实例化对象，每个对象都有自己独立的成员变量 ；静态变量则可以直接通过类名直接调用，类实例化产生的对象都能共享静态变量

### Java 中的 static 使用之静态方法
1. 静态方法中可以直接调用同类中的静态成员，但不能直接调用非静态成员。
2. 静态方法中不能直接调用非静态方法，需要通过对象来访问非静态方法
3. 在普通成员方法中，则可以直接访问同类的非静态变量和静态变量

### 问：既然main方法为静态方法，在里面定义一个非静态变量，为什么可以直接打印出来，不会报错？
	答：在main函数方法内部肯定是可以使用这个非静态变量的（等价于局部变量）；静态方法无法访问静态方法外部的非静态变量，但可以访问静态方法内部的非静态变量（类似于方法中调用局部变量）
	层次： 类的外部 / 类的内部 / 静态方法的外部 / 静态方法的内部

### Java 中的 static 使用之静态初始化块
	静态初始化块只在类加载时执行，且只会执行一次，同时静态初始化块只能给静态变量赋值，不能初始化普通的成员变量。
	public class Hello{
		//构造方法
		public Hello(){
			num1=77;
			System.out.println("构造方法最后被打印出来");
		}
		// 初始化块
		{
			num2=88;
			System.out.println("初始化块第二个被输出，且每次实例化对象时都会被打印出来");
		}
		// 静态初始化块
		static {
			num3=99;
			System.out.println("静态初始化块最先被输出");
		}

		public static void main(String[] args) {        
	        // 创建对象时会自动执行构造方法
			HelloWorld hello = new HelloWorld();			
		}	
	}	
	注：程序运行时静态初始化块最先被执行，然后执行普通初始化块，最后才执行构造方法。静态初始化块只在类加载时执行一次。

###  Java的封装

