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
	2. 如果显式的调用构造方法，必须在子类的构造方法的第一行
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
4. 抽象类总结规定
```
	1. 抽象类不能被实例化(初学者很容易犯的错)，如果被实例化，就会报错，编译无法通过。只有抽象类的非抽象子类可以创建对象。
	2. 抽象类中不一定包含抽象方法，但是有抽象方法的类必定是抽象类。
	3. 抽象类中的抽象方法只是声明，不包含方法体，就是不给出方法的具体实现也就是方法的具体功能。
	4. 构造方法，类方法（用 static 修饰的方法）不能声明为抽象方法。
	5. 抽象类的子类必须给出抽象类中的抽象方法的具体实现，除非该子类也是抽象类。
```

### Java 中的接口
```
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
	接口特性:
	1. 接口中每一个方法也是隐式抽象的,接口中的方法会被隐式的指定为 public abstract（只能是 public abstract，其他修饰符都会报错）。
	2. 接口中可以含有变量，但是接口中的变量会被隐式的指定为 public static final 变量（并且只能是 public，用 private 修饰会报编译错误）。
	3. 接口中的方法是不能在接口中实现的，只能由实现接口的类来实现接口中的方法。

	抽象类和接口的区别:
	1. 抽象类中的方法可以有方法体，就是能实现方法的具体功能，但是接口中的方法不行。
	2. 抽象类中的成员变量可以是各种类型的，而接口中的成员变量只能是 public static final 类型的。
	3. 接口中不能含有静态代码块以及静态方法(用 static 修饰的方法)，而抽象类是可以有静态代码块和静态方法。
	4. 一个类只能继承一个抽象类，而一个类却可以实现多个接口。
```

### UML简介
	Unified Modeling Language,又称统一建模语言或标准建模语言，是一个支持模型化和软件系统开发的图图形化语言

### 异常处理简介
```
	Throwable类：Error类和Exception类
	Error类（主要指系统错误，程序彻底崩溃，需要重启）：VirtualMachineError(虚拟机错误)、ThreadDeath(线程死锁)
	Exception类：RuntimeException(非检查异常)、检查异常
	非检查异常：NullPointerException(空指针异常)、ArrayIndexOutOfBoundsException(数组下标越界异常)、ClassCastException(类型转换异常)、ArithmeticException(算术异常)
	检查异常：IOException(文件异常)、SQLException(SQL异常)
	try{
		// todo...
	}
	catch(Exception e){
		e.printStackTrace();  // 打印输出异常信息
		System.out.println("抛出异常了！")；
	}
	finally{
		// todo...结束连接,释放系统资源
	}	
```

### try 语句不可以独立存在,必须与catch或者finally 块共存

### 异常抛出及自定义异常
```
	throw ———— 将产生的异常抛出（动作）
	throws ———— 声明将要抛出何种类型的异常（声明）
	public void 方法名（参数列表）throws 异常类型1,异常类型2... {
		// 调用会抛出异常的方法或者：throw new Exception
	}
	
	自定义异常模板，继承Exception基类或及其子类
	public class 自定义异常类 extends 异常类型{

	}

	public class DrunkException extends Exception{
		public DrunkException(){

		}

		public DrunkException(String message){
			super(message);
		}
	}
```

### Java中的异常链（捕获到的异常可以在当前方法的catch块中处理，也可以继续抛出，让下级调用者来处理）
```
	public void test1 throws DrunkException{
		throw new DrunkException("开车别喝酒");
	}

	第一种异常的传递方式，使用initCause()方法
	try{
		test1();
	}
	catch(DrunkException e){
		RuntimeException newExc=new RuntimeException("司机一滴酒，亲人两行泪");
		newExc.initCause(e);	// public Throwable initCause(Throwable cause) ,将此throwable的原因初始化为指定值(cause)。
		throw newExc;	// 新的异常中包含原始异常的信息，通过调用initCause()方法引用了原始异常
	}

	第二种异常的传递方式，再创建父类异常中传入参数
	try{
		test1();
	}
	catch(DrunkException e){
		RuntimeException newExc=new RuntimeException(e);
		throw newExc;
	}
```

### String 
	java中需要用equals来判断两个字符串值是否相等，Javascript则可以用==直接进行比较；
	String类对象的方法
	indexOf()   	// 传入的参数可以是一个字符或一个字符串
	lastIndexOf()	// 传入的参数可以是一个字符或一个字符串
	trim()          // 开始和结尾去除空格的字符串
	split()         // 按传入的参数进行分隔,返回一个字符串数组
	substring(int startIndex)  				// 获取指定索引开始到结束的字符串
	substring(int startIndex,int endIndex)  // 获取指定开始位置到结束位置的字符串
	length()     // Java中字符串长度用length()方法，数组用length属性，list,set,map长度用size()方法
	equals()  	 // 与指定对象进行比较
	toLowerCase()
	toUpperCase()
	charAt()     // 获取字符串中指定位置的字符
	getBytes()   // 将该字符串转化为byte数组


### 因为String类对象创建后，不可变，当需要频繁操作字符串时，会产生很多的临时变量，因此可以使用StringBuilder或StringBuffer来避免这个问题

### StringBuilder类(没有实现线程安全，性能略高，优先考虑推荐)
	存储效率: StringBulider对象 > StringBuffer对象 > String对象
	StringBuilder str1=new StringBuilder();
	StringBuilder str2=new StringBuilder("imooc");
	方法：
		append(参数)			// 在StringBuilder对象的末尾添加内容
		insert(位置,参数)	// 将内容插入到StringBuilder对象的指定位置
		toString() 			// 将StringBuilder对象转化为String对象
		length()   			// 获取字符串的长度

### StringBuffer类(实现线程安全，性能略低)
	方法：
		append(参数)			// 在StringBuilder对象的末尾添加内容
		insert(位置,参数)	// 将内容插入到StringBuilder对象的指定位置
		toString() 			// 将StringBuilder对象转化为String对象
		length()   			// 获取字符串的长度

### 包装类
	包装类主要提供了两大类方法：
	1. 将本类型和其他基本类型进行转换的方法
	2. 将字符串和本类型及包装类互相转换的方法
	如下：
	int,	 	lang,	char,		boolean,  double,  float,	byte,	short
	Integer,	Lang,	Character,	Boolean,  Double,  Float,	Byte,	Short

###	Integer包装类方法
	byteValue()		// 将该Integer转化为byte类型
	doubleValue()	// 将该Integer转化为double类型
	floatValue()	// 将该Integer转化为float类型
	intValue()  	// 将该Integer转化为int类型
	longVlaue()		// 将该Integer转化为long类型
	parseInt(String str)	// 将字符串转化为int类型
	toString()				// 将该Integer转化为字符串
	valueOf(String str)		// 将字符串转化为integer类型


### 装箱和拆箱的概念
```
	装箱：把基本类型转换成包装类，使其具有对象的性质，又可分为手动装箱和自动装箱
	int i = 10;
	Integer x = new Integer(i); 	// 手动装箱
	Integer y = i;					// 自动装箱

	拆箱：和装箱相反，把包装类对象转换成基本类型的值，又可分为手动拆箱和自动拆箱
	integer i = new Integer(8);
	int x = i.intValue();   // 手动拆箱
	int y = i;				// 自动拆箱
```

### 将字符串转化为基本类型
	将字符串转换成基本类型有两种方法：
	1. 调用包装类的 parseXxx 静态方法
	2. 调用包装类的 valueOf()方法转换为基本类型的包装类，会自动拆箱
	String str = "8";
	int x = Integer.parseInt(str);
	int y = Integer.valueOf(str); // 转化为Integer包装类，再自动拆箱为int;

### 将基本类型转化为字符串
	其中，基本类型转换为字符串有三种方法：
	1. 使用包装类的 toString() 方法
	2. 使用String类的 valueOf() 方法
	3. 用一个空字符串加上基本类型，得到的就是基本类型数据对应的字符串
	int a = 10;
	String str = new Integer(a).toString();
	String str = String.valueOf(a);
	String str = a + '';

### 基本类型是不能调用方法的，而其包装类具有很多方法

### Date和SimpleDateFormat
```	
	注意：
	使用Date类需要导入java.util包；
	使用SimpleDateFormat需要导入java.text包；
	
	使用SimpleDateFormat对象的 format() 方法将日期转换为指定格式的文本
	Date date = new Date();
	// 创建SimpleDateFormat对象，指定目标格式
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	String today = sdf.format(sdf);	// 使用 format() 方法将日期转换为指定格式的文本
	System.out.println(today);

	使用SimpleDateFormat对象的parse()方法将文本转换为日期
	String day = "2019年01月12日 22:30:45";
	// 创建SimpleDateFormat对象，指定目标格式
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
	Date date =sdf.parse(day);
	System.out.println(date);
```

### Calendar类
```
	java.util.Calendar 类是一个抽象类，可以通过调用 getInstance() 静态方法获取一个 Calendar 对象，此对象已由当前日期时间初始化，即默认代表当前时间，如 Calendar c = Calendar.getInstance();
	Calendar c = Calendar.getInstance();	// 创建Calendar对象
	int year = c.get(Calendar.YEAR);
	int month = c.get(Calendar.MONTH) + 1;  // 返回索引，月份需要加1
	int day = c.get(Calendar.DAY_OF_MONTH);
	int hour = c.get(Calendar.HOUR_OF_DAY);
	int minute = c.get(Calendar.MINUTE);
	int second = c.get(Calendar.SECOND);

	Date date = c.getTime();    // 将Calendar对象转化为Date对象
	System.out.println(date);	// Sat Jar 12 22:30:59 CST 2019
```	

### Math类
	Math 类位于 java.lang 包中
	Math.round(arg) 	// 返回四舍五入的整数
	Math.floor(arg) 	// 返回小于参数的最大整数，向下取整
	Math.ceil(arg)		// 返回大于参数的最小整数，向上取整
	Math.random(arg)	// 返回[0，1）之间的伪随机浮点数;在安全要求较高的场景，使用强随机生成器,java.util.Secure.SecureRandom
	产生[0,100)之间的随机数
	double random = Math.random() * 100 ;

### Java 中的集合框架概述
```	
	Collection家族 父接口拥有三个子接口：List, Queue, Set	
	List => ArrayList（序列）
	Queue（队列） => LinkedList (链表)
	Set（集，无序不重复） => HashSet（哈希集）

	Map家族 父接口拥有众多的子接口，一个重要的实现类 HashMap：<Key , Value>
```

### 泛型
	public List<Course> courseToSelect; 	// 只能往序列里添加Course类
	泛型不能使用基本类型（int,lang,char,boolean,double,float,byte,short）;必须是引用类型,它们的包装类（Integer,Lang,Character,Boolean,Double,Float,Byte,Short）

### List
```
	List<Course> courseToSelect=new ArrayList<Course>();
	courseToSelect.add(cr1);
	courseToSelect.add(0,cr2);
	Course course1 = (Course)courseToSelect.get(0);  // list取出来的统一都是Object对象，需要强制类型转化；
	Course类包含一个id和name两个成员变量
	Course[] course={ new Course("1","高等数学") , new Course("2","大学英语") };
	List tempCourseList = Arrays.asList(course);   	// 把数组转化为list序列
	courseToSelect.addAll( 0, tempCourseList );  // courseToSelect.addAll( tempCourseList );
	
	数组长度用length属性，序列list长度用size()方法
	String[][] data=new String[2][5];
	data.length    // 2
	data[0].length // 5
	//获取数组指定下标的元素
	data[0][3]
	序列长度用size()方法
	List data=new ArrayList();
	data.size();   // 0
	//获取序列指定下标的元素
	(Course)data.get(0); // 索引不能越界,如果不是基本类型，统一返回的是Object对象；需要自己强制转换成相应的类（如：Course类）；
	
	// 用迭代器（Iterator）实现序列的遍历
	Iterator it=courseToSelect.Iterator();
	while(it.hasNext()){
		Course cr=(Course)it.next();
		System.out( "课程id:"+ cr.id + "课程名称:"+cr.name );
	}
	// 用forEach方法遍历
	for(Object obj:couseToSelect){
		Course cr=(Course)obj;
		System.out( "课程id:"+ cr.id + "课程名称:"+cr.name );
	}
	// 用for循环遍历
	int len=courseToSelect.size();
	for(int i=0;i<len;i++){
		Course cr=(Course)courseToSelect.get(i);
		System.out( "课程id:"+ cr.id + "课程名称:"+cr.name );	
	}

	courseToSelect.set(2,new Course("1","数据结构"));  //修改索引为2的元素的值

	courseToSelect.remove(2);  //传入索引
	Course tempCr=(Course)courseToSelect.get(2);
	courseToSelect.remove(tempCr); //传入待删除元素对象

	Course[] courseArray={ courseToSelect.get(4) , courseToSelect.get(5) };  // 获取一个待删除的数组
	var tempList=Arrays.asList(courseArray); 			//使用数组方法asList将该数组转化为list序列
	CouseArray.removeAll(tempList); 					//使用removeAll删除该指定序列集

	indexOf  获取元素第一次出现所在的索引   courseToSelect.indexOf(new Course("2","大学英语"));
	lastIndexOf 获取元素最后一次出现所在的索引
```

### Set（无序）
```
	无序，不能用索引，因此不能用get()和set()方法；必须使用forEach方法和Interator方法来遍历Set类的对象
	Set<Course> courses=new HashSet<Course>();  //创建一个带泛型的Set类的对象

	Set<Course> courses=new HashSet<Course>();
	Course cr=new Course(("2","高等数学"));
	courses.add(cr)；
	Courses.remove(cr);
	Set类的对象拥有addAll与removeAll,contains,size等方法
```

### Map
```
	Map<String,Student> students=new HashMap<String,Student>(); // Student类包含name,age两个成员属性
	
	put()方法：如果不存在键名则增加映射，若存在则修改指定键名的键值；
	students.put("147136",new Student("yfx","26"));  // 增加一条映射
	students.put("147136",new Student("yfx","27"));  // 修改指定键名147136的键值

	get()方法 //根据键名获取键值
	students.get("147136");
	remove()方法
	students.remove("147136");

	keySet()方法：返回此map对象的所有键名的Set视图
		Set<String> keySet=students.keySet();
		for(String name:keySet){  //遍历返回的键名的set视图，通过键名获取相对应的键值
			Student st = students.get(name);
			if(st!=null){
				System.out.println("学生姓名：" + st.name + "学生年龄" + st.age);
			} 
		}

	values()方法：返回此map对象的所有键值的Collection视图（注：因此键值是可以重复的，所以不是Set视图）
		List<Student> values=studets.values();
		fot(Student st:values){
			System.out.println("学生姓名：" + st.name + "学生年龄" + st.age);
		}

	entrySet()方法：返回此地图中包含的映射的Set视图(因为键名不能重复)
	// entrySet返回的Set视图中的元素都是内部定义的Entry类，且必须同时给Entry加上泛型Entry<String,Student>
	Set<Entry<String,Student>> entrySet=students.entrySet();
	for(Entry<String,Student> entry:entrySet){
		String key = entry.getKey();   //通过getKey获取Entry类对象的键名
		Student st = entry.getValue(); //通过getValue获取Entry类对象的键值
		if(st!==null){
			System.out.println("学生姓名：" + st.name + "学生年龄" + st.age);
		}
	}

	size()方法  获取Map类的对象的长度

	containsKey(value)方法 / containsValue(value)方法：判断是否包含"键名"/"键值"为value的元素，返回true/false	
```

### contains()方法 //在List中判断元素是否存在
	原理，获取序列中的每个元素，调用每个元素的equals()方法，如果存在某个元素的equals()返回true，则contains返回true，否则为false。
	重写equals()方法，就可以实现Contains()判断元素是否存在的条件依据。
	List<Course> courseToSelect=new ArrayList<Course>();
	Course cr=new Course("2","大学英语");
	courseToSelect.contains(cr);
	courseToSelect序列中的每个元素都是Course类，调用contains()方法时，courseToSelct序列中的每个Course类的元素对象会调用equals()方法与cr进行比较，因此应该重写Course类中的equals()方法。

### 重写equals方法的模板
	public boolean equals(Object obj){
		if(this == obj){
			return true;
		}
		if(obj == null){
			return false;
		}
		if(!(obj instanceof Course)){
			return false;
		}
		Course course=(Course)obj;
		if(this.name == null){
			if(course.name == null ){
				return true;
			}
			else{
				return false;
			}
		}
		else{
			// 如果需要多加几个条件判断，在这里添加即可
			if(this.name.equals(course.name)){
				return true;
			}
			else{
				return false;
			}
		}
	}

### Set中判断元素是否存在
	hashSet类实现
	Set<Student> students=new HashSet<Student>();
	Student st = new Student("yfx","27");
	Boolean bool = students.contains(st);
	Set类的对象调用contains()方法时，元素先调用hashCode()方法，再hashCode()结果值相等的情况下，再执行判断equals()方法（因此需要先重写hashCode方法）；如此依次进行。
	hashCode()方法：
	 	@Override
	 	public int hashCode(){
	 		final int prime = 31;
	 		int result = 1;
	 		result = prime * result +((name == null) ? 0 : name.hashCode());
	 		return result;
	 	}
	equals()方法：
		@Override
		public boolean equals(Object obj){
			if(this == obj){
				return true;
			}
			if(obj == null){
				return false;
			}
			if(!(obj instanceof Course)){
				return false;
			}
			Course other=(Course)obj;
			if(this.name == null){
				if(course.name != null ){
					return false;
				}				
			}
			else if(！this.name.equals(other.name)){
				// 如果需要多加几个条件判断，在这里添加即可
				return false;
			}			
			return true;
		}

### Map中判断 键名 / 键值 是否存在
	Map中使用containsValue()方法与List中的contains()方法一样，需要调用每个元素的equals()方法与传入参数做比较。因此可以重写equals方法来改变判断依据。
	Map中的containsKey()方法则直接进行比较（不重复）

### 对List进行排序
	对数字进行排序
	List<integer> intList = new ArrayList<integer>();
	intList.add(3);
	intList.add(1);
	intList.add(2);
	Collections.sort(intList);   // 排序
	对字符串进行排序
	Collections.sort()对字符串的排列顺序(ASCII)  数字：0 - 9
											大写字母：A - Z
											小写字母：a - z
	Comparable接口 默认比较规则
	Comparator接口 临时比较规则
	Comparable和Comparable接口都是Java集合框架的成员

### comparable--默认比较工具接口
```
	实现该接口表示，这个类的实例可以比较大小，可以进行自然排序
	定义默认的比较规则
	其实现类需要实现compareTo()方法
	compareTo()方法返回正数表示大，负数表示小，0表示相等
	public class Student implements Comparable<Student>{
		private int id;
		private String name;
		
		//设置Student类对象的默认排序依据按照id排序
		@Override
		public int compareTo(Student obj){
			return this.id.compareTo(obj.id);
		}
	}

	List<Student> studentList=new ArrayList<Student>();
	Collections.sort(studentList);  // 按id进行排序
```

### Comparator接口--临时比较工具接口
```	
	定义临时比较规则，而不是默认比较规则
	其实现类需要实现compare()方法
	创建一个StudentComparator类
	public class StudentComparator implements Comparator<Student>{		
		@Override
		public int compare(Student obj1,Student obj2){
			return obj1.id.compareTo(obj2.id);
		}
	}

	List<Student> studentList=new ArrayList<Student>();
	Collections.sort(studentList,new StudentComparator());  // 按id进行排序
```

### jdk API 文档	

## JAVA高级教程

### 网络编程

### 发送邮件

### 多线程
```
	生命周期：
	1. 新建状态:
	使用 new 关键字和 Thread 类或其子类建立一个线程对象后，该线程对象就处于新建状态。它保持这个状态直到程序 start() 这个线程。

	2. 就绪状态:
	当线程对象调用了start()方法之后，该线程就进入就绪状态。就绪状态的线程处于就绪队列中，要等待JVM里线程调度器的调度。

	3. 运行状态:
	如果就绪状态的线程获取 CPU 资源，就可以执行 run()，此时线程便处于运行状态。处于运行状态的线程最为复杂，它可以变为阻塞状态、就绪状态和死亡状态。

	4. 阻塞状态:
	如果一个线程执行了sleep（睡眠）、suspend（挂起）等方法，失去所占用资源之后，该线程就从运行状态进入阻塞状态。在睡眠时间已到或获得设备资源后可以重新进入就绪状态。
	可以分为三种：
		等待阻塞：运行状态中的线程执行 wait() 方法，使线程进入到等待阻塞状态。

		同步阻塞：线程在获取 synchronized 同步锁失败(因为同步锁被其他线程占用)。

		其他阻塞：通过调用线程的 sleep() 或 join() 发出了 I/O 请求时，线程就会进入到阻塞状态。当sleep() 状态超时，join() 等待线程终止或超时，或者 I/O 处理完毕，线程重新转入就绪状态。

	5. 死亡状态:
	一个运行状态的线程完成任务或者其他终止条件发生时，该线程就切换到终止状态。
```

### 创建一个线程
```
	Java 提供了三种创建线程的方法：
	1. 通过实现 Runnable 接口；
	2. 通过继承 Thread 类本身；
	3. 通过 Callable 和 Future 创建线程。
```

### 通过实现 Runnable 接口来创建线程
```
	class RunnableDemo implements Runnable {
	   	private Thread t;
	   	private String threadName;
	   
	   	RunnableDemo( String name) {
	      	threadName = name;
	      	System.out.println("Creating " +  threadName );
	   	}
	   	   
	   	public void run() {
		    System.out.println("Running " +  threadName );
		    try {
		        for(int i = 4; i > 0; i--) {
		            System.out.println("Thread: " + threadName + ", " + i);
		            // 让线程睡眠一会
		            Thread.sleep(50);
		        }
		    }catch (InterruptedException e) {
		        System.out.println("Thread " +  threadName + " interrupted.");
		    }
		    System.out.println("Thread " +  threadName + " exiting.");
		}
		   
		// 调用它的 start() 方法它才会运行
		// 线程对象调用了start()方法之后，该线程就进入就绪状态，就绪状态的线程获取 CPU 资源，就可以执行 run()
		public void start () {
		    System.out.println("Starting " +  threadName );
		    	if (t == null) {
		    		// 实例化一个线程对象
		         	t = new Thread (this, threadName);
		         	t.start ();
		      	}
		}
	}
	 
	public class TestThread {
	 
	   	public static void main(String args[]) {
	      	RunnableDemo R1 = new RunnableDemo( "Thread-1");
	      	R1.start();
	      
	      	RunnableDemo R2 = new RunnableDemo( "Thread-2");
	   	   	R2.start();
	   	}   
	}
```

### 通过继承Thread来创建线程
```
	创建一个新的类，该类继承 Thread 类，然后创建一个该类的实例。继承类必须重写 run() 方法，该方法是新线程的入口点。它也必须调用 start() 方法才能执行。该方法尽管被列为一种多线程实现方式，但是本质上也是实现了 Runnable 接口的一个实例。

	class ThreadDemo extends Thread {
	   private Thread t;
	   private String threadName;
	   
	   ThreadDemo( String name) {
	      threadName = name;
	      System.out.println("Creating " +  threadName );
	   }
	   
	   public void run() {
	      System.out.println("Running " +  threadName );
	      try {
	         for(int i = 4; i > 0; i--) {
	            System.out.println("Thread: " + threadName + ", " + i);
	            // 让线程睡眠一会
	            Thread.sleep(50);
	         }
	      }catch (InterruptedException e) {
	         System.out.println("Thread " +  threadName + " interrupted.");
	      }
	      System.out.println("Thread " +  threadName + " exiting.");
	   }
	   
	   public void start () {
	      System.out.println("Starting " +  threadName );
	      if (t == null) {
	         t = new Thread (this, threadName);
	         t.start ();
	      }
	   }
	}
	 
	public class TestThread {
	 
	   public static void main(String args[]) {
	      ThreadDemo T1 = new ThreadDemo( "Thread-1");
	      T1.start();
	      
	      ThreadDemo T2 = new ThreadDemo( "Thread-2");
	      T2.start();
	   }   
	}
```

### 通过 Callable 和 Future 创建线程
1. 创建 Callable 接口的实现类，并实现 call() 方法，该 call() 方法将作为线程执行体，并且有返回值。
2. 创建 Callable 实现类的实例，使用 FutureTask 类来包装 Callable 对象，该 FutureTask 对象封装了该 Callable 对象的 call() 方法的返回值。
3. 使用 FutureTask 对象作为 Thread 对象的 target 创建并启动新线程。
4. 调用 FutureTask 对象的 get() 方法来获得子线程执行结束后的返回值。
```
	实例：
	public class CallableThreadTest implements Callable<Integer> {
	    public static void main(String[] args)  
	    {  
	        CallableThreadTest ctt = new CallableThreadTest();  
	        FutureTask<Integer> ft = new FutureTask<>(ctt);  
	        for(int i = 0;i < 100;i++)  
	        {  
	            System.out.println(Thread.currentThread().getName()+" 的循环变量i的值"+i);  
	            if(i==20)  
	            {  
	                new Thread(ft,"有返回值的线程").start();  
	            }  
	        }  
	        try  
	        {  
	            System.out.println("子线程的返回值："+ft.get());  
	        } catch (InterruptedException e)  
	        {  
	            e.printStackTrace();  
	        } catch (ExecutionException e)  
	        {  
	            e.printStackTrace();  
	        }  
	  
	    }
	    @Override  
	    public Integer call() throws Exception  
	    {  
	        int i = 0;  
	        for(;i<100;i++)  
	        {  
	            System.out.println(Thread.currentThread().getName()+" "+i);  
	        }  
	        return i;  
	    }  
	}
```

###	创建线程的三种方式的对比
1. 采用实现 Runnable、Callable 接口的方式创建多线程时，线程类只是实现了 Runnable 接口或 Callable 接口，还可以继承其他类。
2. 使用继承 Thread 类的方式创建多线程时，编写简单，如果需要访问当前线程，则无需使用 Thread.currentThread() 方法，直接使用 this 即可获得当前线程。
```
	在多线程编程时，需要了解的几个主要概念：
	线程同步
	线程间通信
	线程死锁
	线程控制：挂起、停止和恢复
```

### 多线程的使用
```
	有效利用多线程的关键是理解程序是并发执行而不是串行执行的。例如：程序中有两个子系统需要并发执行，这时候就需要利用多线程编程。
	通过对多线程的使用，可以编写出非常高效的程序。不过需要注意，如果创建太多的线程，程序执行的效率实际上是降低了，而不是提升了。
	需记住，上下文的切换开销也很重要，如果创建了太多的线程，CPU 花费在上下文的切换的时间将多于执行程序的时间！
```

### Java MySQL 连接
```
	MySQL 8.0 以上版本:
	驱动包版本 mysql-connector-java-8.0.12.jar。

	数据库 URL 需要声明是否使用 SSL 安全验证及指定服务器上的时区：
	static final String DB_URL = jdbc:mysql://localhost:3306/runoob?useSSL=false&serverTimezone=UTC;
	conn = DriverManager.getConnection(DB_URL,USER,PASS);
	
	原本的驱动器是:
	Class.forName("com.mysql.jdbc.Driver");
	在 IDEA 里面提示是: Loading class `com.mysql.jdbc.Driver'. This is deprecated. The new driver class is `com.mysql.cj.jdbc.Driver'. The driver is automatically registered via the SPI and manual loading of the driver class is generally unnecessary
	意思是说原本的驱动器不赞成 或者 是废弃了，自动换成了新的驱动器 com.mysql.cj.jdbc.Driver
	Class.forName("com.mysql.cj.jdbc.Driver");
```