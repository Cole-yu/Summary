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

