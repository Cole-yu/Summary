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

2. 赋值（Java中数组定义时用[]来表示,赋值时用{}来包裹）
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
	方法名：
	参数列表：

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
1. 包的使用：包的命名规范是全小写字母拼写,例：com.imooc.music.MyMusic

### 访问修饰符，修饰属性和方法
private 本类（私有属性）
默认 本类，同包
protected 本类，同包，子类
public  本类，同包，子类，其他

### Java中的this关键字
	在类中代表当前对象，this.属性，this.方法，getter/setter中经常使用

###	什么是Java中的内部类
	定义：内部类（ Inner Class ）就是定义在另外一个类里面的类。与之对应，包含内部类的类被称为外部类。
	作用：	1. 内部类提供了更好的封装，可以把内部类隐藏在外部类之内，不允许同一个包中的其他类访问该类
		  	2. 内部类的方法可以直接访问外部类的所有数据，包括私有的数据
			3. 内部类所实现的功能使用外部类同样可以实现，只是有时使用内部类更方便
	问：内部类有几种呢？
	答：内部类可分为以下几种：
		成员内部类
		静态内部类
		方法内部类
		匿名内部类

### Java 中的成员内部类		
	注意事项：
		1、 外部类是不能直接使用内部类的成员和方法滴。可先创建内部类的对象，然后通过内部类的对象来访问其成员变量和方法。
			* 创建内部类对象的方法:定义了成员内部类后，必须使用外部类对象来创建内部类对象，而不能直接去 new 一个内部类对象，语法：内部类 对象名 = 外部类对象.new 内部类();。
		2、 如果外部类和内部类具有相同的成员变量或方法，内部类默认访问自己的成员变量或方法，如果要访问外部类的成员变量，可以使用 this 关键字
	例：
	//外部类HelloWorld
	public class HelloWorld{
	    
	    //外部类的私有属性name
	    private String name = "imooc";
	    
	    //外部类的成员属性
	    int age = 20;
	    
		//成员内部类Inner
		public class Inner {
			String name = "爱慕课";
	        //内部类中的方法
			public void show() { 
				System.out.println("外部类中的name：" + HelloWorld.this.name );  // 防卫外部类中的成员属性
				System.out.println("内部类中的name：" + name );
				System.out.println("外部类中的age：" + age);
			}
		}
	    
		//测试成员内部类
		public static void main(String[] args) {
	        
	        //创建外部类的对象
			HelloWorld o = new HelloWorld ();
	        
	        //创建内部类的对象
			Inner inner = o.new Inner() ;    // 语法：内部类 对象名 = 外部类对象.new 内部类();
	        
	        //调用内部类对象的show方法
			inner.show();
		}
	}

### Java 中的静态内部类，静态内部类是 static 修饰的内部类：
	1、 静态内部类不能直接访问外部类的非静态成员，但可以通过 new 外部类().成员 的方式访问 
	2、 如果外部类的静态成员与内部类的成员名称相同，可通过“类名.静态成员”访问外部类的静态成员；如果外部类的静态成员与内部类的成员名称不相同，则可通过“成员名”直接调用外部类的静态成员
	3、 创建静态内部类的对象时，不需要外部类的对象，可以直接创建 内部类 对象名= new 内部类();
	//外部类
	public class HelloWorld {
	    
	    // 外部类中的静态变量score
	    private static int score = 84;
	    
	    // 创建静态内部类
		public static class SInner {
	        // 内部类中的变量score
	        int score = 91;
	        
			public void show() {
				System.out.println("访问外部类中的score：" + HelloWorld.score );   //类名.静态成员访问外部类的静态成员
				System.out.println("访问内部类中的score：" + score);
			}
		}
		// 测试静态内部类
		public static void main(String[] args) {
			// 直接创建内部类的对象
	        SInner si=new SInner();			//不需要创建外部类的对象，可以直接创建，语法：内部类 对象名= new 内部类();
	        
	        // 调用show方法
			si.show();
		}
	}

### Java 中的方法内部类
	定义：方法内部类就是内部类定义在外部类的方法中，方法内部类只在该方法的内部可见，即只在该方法内可以使用。
	注：由于方法内部类不能在外部类的方法以外的地方使用，因此方法内部类不能使用访问控制符和 static 修饰符。
	//外部类
	public class HelloWorld {
	    
	    private String name = "爱慕课";
	    
	    // 外部类中的show方法
	    public void show() { 
			// 定义方法内部类
			class MInner {								// 方法内部类不能使用访问控制符和 static 修饰符
				int score = 83;
				public int getScore() {
					return score + 10;
				}
			}
	        
			// 创建方法内部类的对象
	        MInner inner=new MInner();
	        
	        // 调用内部类的方法
			int newScore=inner.getScore();
	        
			System.out.println("姓名：" + name + "\n加分后的成绩：" + newScore);
		}
	    
		// 测试方法内部类
		public static void main(String[] args) {
	        
			// 创建外部类的对象
	        HelloWorld mo=new HelloWorld();
	        
	        // 调用外部类的方法
			mo.show();
		}
	}

### Java中的语法继承
	语法：class 子类 extends 父类 {}
	继承的初始化顺序
	1. 先初始化父类再初始化子类
	2. 先执行初始化对象中的属性，再执行构造方法中的初始化
	3. 初始化顺序：父类对象的属性初始化>父类的构造方法>子类的属性初始化>子类的构造方法

### Java 中 final 的使用
	可以用来修饰类，方法，属性
	如果修饰父类，子类不能继承
	如果修饰方法，子类不能重写，覆盖
	如果修饰属性，属性不能修改，且必须初始化（直接声明时初始化，或者在构造函数中手动初始化；系统将不再自动初始化赋值，不声明会报错）
	如果修饰局部变量，变量不能修改，成为常量

### super关键字的使用	
	在对象的内部使用，代表父类对象
	访问父类的属性和方法，super.属性，super.方法名()
	子类的构造过程当中必须调用其父类的构造方法。
	super()的应用：
	1. 如果子类的构造方法中没有显示调用父类的构造方法，则系统默认调用父类无参的构造方法。隐式执行super()。
	2. 如果显示的调用构造方法，必须在子类的构造方法的第一行
	3. 如果子类构造方法中既没有显式调用父类的构造方法，而父类又没有无参的构造方法（父类的构造方法中带参数），则编译会报错。

### Object类	
	Object类是所有类的祖先
	类对象与类的对象
	getClass()  //获取对象的类信息
	没有重写 toString 方法的情况下,默认继承Object的toString()方法，输出对象地址

### Java 中的多态
	继承是多态的基础
	对象的多种形态
	1. 引用多态
		父类的引用可以指向本类的对象
		父类的引用可以指向子类的对象
		Animal obj1=new Animal();
		Animal obj2=new Dog();  // Dog类是Animal类的子类，父类的引用是可以指向子类对象的。
		Dog obj3=new Animal();  // 错误
	2. 方法多态
		创建本类对象时，调用的方法为本类方法
		创建子类对象时，调用的方法为子类重写的方法或者继承的方法
	注：
	Animal obj2 = new Dog();
	* obj2可以引用子类从父类继承和重写的方法，但是不可以引用Dog类中所独有（父类中没有的）方法；
	* 创建的是子类Dog的对象；
	* 声明的是Animal类（数据结构类型），所以是父类的引用。
	* 父类无法直接调用子类特有的方法，但是可以将Animal向下转型(Dog)obj2，然后再调用watchDoor方法。 // ((Dog)obj2).watchDoor();

### 多态中的引用类型转换
1. 向上类型转换（隐式/自动类型转换），是小类型到大类型的转换
2. 向下类型转换（强制类型转换），是大类型到小类型，会发生溢出、丢失数据等风险问题
```	
	通过instanceof运算符避免类型转换的安全性问题
	animal instanceof Dog  			// animal对象是否含有Dog类的元素
	if(animal instanceof Dog) {
		Dog dog=(Dog)animal;
	}
	else{
		System.out.println("无法进行强制类型转换");
	}
```

### Java 中的抽象类(abstract关键字)
1. 应用场景：
	* 在某些场景下，某个父类只是知道其子类应该包含怎样的方法，但无法准确知道这些子类如何实现这些方法。约束子类应该具有哪些方法，但不关心如何去实现。
	* 从多个具有相同特征的类中抽象出一个抽象类，以这个抽象类作为子类的模板，从而避免了子类设计的随意性。
2. 作用：限制规定子类必须实现某些方法，但不关注实现细节。
3. 使用规则：
	* abstract定义抽象类
	* abstract定义抽象方法，只有声明，不需要实现
	* 包含抽象方法的类必须是抽象类
	* 抽象类中可以包含普通的方法，也可以没有抽象方法
	* 抽象类不能直接创建，可以定义引用变量
```
	抽象方法没有方法体以分号结束
	// 定义一个抽象类
	public abstract class Telphone{
		public abstract void call();  //定义一个抽象方法
	}

```

### Java 中的接口
	语法： [修饰符] interface 接口名 [extends 父接口1,父接口2...]{ 
		零个到多个常量定义   			// 接口中的属性是常量，即使定义时不添加public static final修饰符，系统也会自动加上
		零个到多个抽象方法的定义 		//接口中的方法只能时抽象方法，即使定义时不添加public abstract 修饰符，系统也会自动加上 
	}
	接口就是用来被继承\实现的，修饰符一般建议public
	注意：不能使用private和protected修饰接口
	接口是多继承的，可以继承多个父接口
	类是单继承的，只能继承一个父类；但可以实现继承多个接口，实现接口使用implements关键字
	[修饰符] class 类名 extends 父类 implements 接口1, 接口2...{
		//如果继承了抽象类，需要实现继承的抽象方法；同时也要实现接口中的抽象方法。
	}
	接口使用中可以与匿名内部类配合使用
	Interface i=new Interface(){
		public void method(){
			System.out.println("匿名内部类实现接口的方式");
		}
	};

### UML简介
	Unified Modeling Language,又称统一建模语言或标准建模语言，是一个支持模型化和软件系统开发的图图形化语言

### trt-catch-finally

### Java 中的集合框架概述
	Collection 父接口拥有三个子接口：List, Queue, Set	
	List => ArrayList（数组序列）
	Queue（队列） => LinkedList (链表)
	Set => HashSet（哈希集）
	Map 父接口拥有众多的子接口，一个重要的实现类 HashMap；<Key , Value> 

### jdk API 文档	
