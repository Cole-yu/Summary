# PHP学习笔记

### xampp 安装
```
下载地址 https://www.apachefriends.org/index.html
```

### PHPStudy 安装
```
下载地址 https://www.xp.cn/
```

### composer 安装
```
官网 https://www.phpcomposer.com/
下载地址 https://docs.phpcomposer.com/00-intro.html#Using-the-Installer

composer --version
composer config -l -g

使用如下命令将地址改为中国镜像地址：
composer config -g repo.packagist composer https://packagist.phpcomposer.com
中国镜像地址还原成默认地址：(注意：这个是将中国镜像还原)
composer config -g repo.packagist composer https://packagist.org
```

### composer 安装 laravel
```
composer global require "laravel/installer"

laravel new blog
cd blog
php artisan --version // 查看项目的laravel 版本

通过使用 --host 参数与 --port 参数来更换监听的接口地址或端口号
php artisan serve --host=10.15.45.132 --port=8080 启动laravel项目，地址localhost:8000
```

### Laravel 虚拟开发环境
```
Homestead
Valet
```

### vscode + xdebug + xampp + php_debug 进行php调试
```
VSCode+Xdebug 断点调试 PHP
https://www.cnblogs.com/phonecom/p/10340038.html
xdebug.dll 下载
https://windows.php.net/downloads/pecl/releases/xdebug/2.9.8/
【php_xdebug.dll 使用2.8，2.9版本； 使用3.0以上的xdebug.dll会报错：The setting ‘xdebug.remote_autostart‘ has been renamed】

php.ini 文件
[XDebug]
zend_extension=php_xdebug.dll
xdebug.remote_enable = 1
xdebug.remote_autostart = 1
xdebug.remote_handler = "dbgp"
xdebug.remote_port = "9001"
xdebug.remote_host = "127.0.0.1"

.vscode 下会创建 launch.json 文件
{
  // 使用 IntelliSense 了解相关属性。 
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Listen for XDebug",
      "type": "php",
      "request": "launch",
      "port": 9001
    },
    {
      "name": "Launch currently open script",
      "type": "php",
      "request": "launch",
      "program": "${file}",
      "cwd": "${fileDirname}",
      "port": 9001
    }
  ]
}

调试步骤：
启动 xampp
vscode F9打上断点，f5启动调试 
浏览器输入地址访问，将进入打断点
```

### yaf 扩展
```
下载地址
http://pecl.php.net/package/Yaf

[yaf扩展]
extension=php_yaf.dll
yaf.use_namespace = 1
```


### memcache 扩展和 memcached
```
教程 https://blog.csdn.net/u010571301/article/details/53008539

[memcache扩展]
extension=php_memcache.dll

下载地址 
https://windows.php.net/downloads/pecl/releases/memcache/

安装 memcached 应用
以管理员身份运行 cmd.exe，并转至memcached所在文件夹。并安装memcached

【应用相关指令】
memcached.exe -d install
memcached.exe -d start
memcached.exe -d stop
memcached.exe -d uninstall
````

# 语法

### global 关键字
```
1. 在所有函数外部定义的变量，拥有全局作用域；
2. PHP 将所有全局变量存储在一个名为 $GLOBALS[key] 的数组中；
3. 在函数内调用函数外定义的全局变量，我们需要在函数中的变量前加上 global 关键字；
<?php
$x=5;
$y=10;
 
function myTest(){
    global $x,$y;
    $y=$x+$y;
}

?>
```

### Static 作用域
函数运行结束后，static参数不会被回收，仍然保留上一次的值。类似于js使用闭包原理保存的参数
```
<?php
function myTest()
{
    static $x=0;
    echo $x;
    $x++;
    echo PHP_EOL;    // 换行符
}
 
myTest();
myTest();
myTest();
?>
```

### 数据类型
String（字符串）, Integer（整型）, Float（浮点型）, Boolean（布尔型）, Array（数组）, Object（对象）, NULL（空值）

### 常量
1. 设置常量，使用 define() 函数
2. 常量在定义后，默认是全局变量，在整个脚本的任何地方使用
3. 常量使用不能添加 $
```
define("PAGESIZE", 10);
echo PAGESIZE;
```

### 魔术常量（预定义常量）
1. __LINE__ 常量：该常量所在文件中的当前行号。
2. __FILE__ 常量：当前文件的完整路径和文件名
3. __DIR__ 常量：文件所在的目录
4. __FUNCTION__ 常量：返回该函数被定义时的名字
5. __CLASS__ 常量：返回该类被定义时的名字
6. __TRAIT__ 常量：包括其被声明的作用区域
```
  PHP 实现了代码复用的一个方法，称为 trait
  优先顺序是当前类中的方法会覆盖 trait 方法，而 trait 方法又覆盖了基类中的方法  
  <?php
    class Base {
        public function sayHello() {
            echo 'Hello ';
        }
    }
     
    trait SayWorld {
        public function sayHello() {
            parent::sayHello();
            echo 'World!';
        }
    }
     
    class MyHelloWorld extends Base {
        use SayWorld; // trait方法会覆盖基类中的sayHello方法
    }
     
    $o = new MyHelloWorld();
    $o->sayHello();
  ?>

  输出结果: Hello World!
```
7. __METHOD__ 常量：返回该方法被定义时的名字
8. __NAMESPACE__ 常量：当前命名空间的名称（区分大小写）

### 字符串
1. 并置运算符(.)用于把两个字符串值连接起来，等价于js中的“+”
```
$txt1="Hello world!";
$txt2="What a nice day!";
echo $txt1.$txt2;
```
2. strlen() 函数返回字符串的长度（字节数）
```
echo strlen("Hello world!");
```
3. strpos() 函数
在字符串内查找一个字符或一段指定的文本。如果在字符串中找到匹配，该函数会返回第一个匹配的字符位置。如果未找到匹配，则返回 FALSE。
```
echo strpos("Hello world!","world");
```
4. 更多字符串的方法：trim()，substr();

### isset() 用来检测变量是否设置
若变量不存在则返回 FALSE;
若变量存在且其值为NULL，也返回 FALSE;
若变量存在且值不为NULL，则返回 TURE;

### $\_GET 全局数组变量，包含url上的所有query的数组
```
$_GET 通过 URL 参数（又叫 query string）传递给当前脚本的变量的数组
http://example.com/?name=yfx
$name = $_GET["name"];
```

### 三元运算符

### for 循环
```
$cars = array("Volvo","BMW","Toyota");
$arrlength = count($cars);
for($x = 0; $x < $arrlength; $x++){
    echo $cars[$x];
    echo "<br>";
}
```

### php关联数组
关联数组是使用您分配给数组的指定的键的数组
```
$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
foreach($age as $x=>$x_value){
    echo "Key=" . $x . ", Value=" . $x_value;
    echo "<br>";
}
```

### 数组对象的常用方法
1. sort()
```
$cars = array("Volvo","BMW","Toyota");
sort($cars);
```
2. count()
3. array_push()
语法： array_push(array, value1, value2...)
```
$a = array("red", "green");
array_push($a, "blue", "yellow");
print_r($a);
```
4. foreach 循环遍历数组
```
  $age = array("Peter"=>35, "Ben"=>37, "Joe"=>43);    
  foreach($age as $key => $value){
    echo "Key=" . $key . ", Value=" . $value; // 字符串并置连接符
    echo "<br>";
  }

  不带key的简洁写法
  $x = array("Google", "Runoob", "Taobao");
  foreach ($x as $value){
    echo $value . PHP_EOL;
  }
```


### 超级全局变量
1. $GLOBALS
2. $_SERVER
```
  $_SERVER['QUERY_STRING'] 获取url上的queryparams 
  示例：http://www.learn.com/home.php?name=yfx&mode=1&type=2
  值： name=yfx&mode=1&type=2
  $_SERVER['HTTP_HOST']
  当前请求头中 Host 项的内容
  $_SERVER['REMOTE_PORT']
  用户机器上连接到 Web 服务器所使用的端口号
```
3. $_REQUEST // php获取前端js请求发送的requestParams参数
```
  Request Payload 和 queryParams， Form Data中都可以获取到
  $_POST('name')
```
4. $_POST
```
  method='post'
  $_POST('name')
```
5. $_GET
``` 
  method='get'
  localhost:80/test_get.php?name=yfx&pwd=123
  url中的 queryParams 
  $_GET('name')
```
6. $_FILES
7. $_ENV
8. $_COOKIE
9. $_SESSION
-

### 命名空间(namespace）
```
在声明命名空间之前唯一合法的代码是用于定义源文件编码方式的 declare 语句，所有非 PHP 代码包括空白符都不能出现在命名空间的声明之前。
<?php
  declare(encoding='UTF-8'); //定义多个命名空间和不包含在命名空间中的代码

  namespace User {
    use Api\Qs as Org; // 引入了 Api\Org 命名空间，并定义了个别名Org

    Org\getList(); // 调用函数 Api\Qs\getList()
    $getList = 'Org\getList'; // 函数引用
    $getList();

    /* 如果使用双引号，使用方法为 "\\namespacename\\classname"*/
    $fruit = '\Org\Fruit'; // 定义类
    $apple = new $fruit; // 实例化对象
    $apple->color; // 获取对象的属性
    $apple->method();// 调用对象的方法

    const CONNECT_OK = 1;
    class Connection {
      function connect(){
        // todo:...
      }
    }
  }

  namespace { // 全局代码
    session_start();
    $a = MyProject\connect();
    echo MyProject\Connection::start();
  }
?>
```

### 面向对象
1. 构造函数
在实例化对象时会执行一次__construct构造方法
```
  function __construct( $par1, $par2 ) {
     $this->url = $par1;
     $this->title = $par2;
  }
```
2. 析构函数
析构函数(destructor) 与构造函数相反，当对象结束其生命周期时（例如对象所在的函数已调用完毕），系统自动执行析构函数
```
 function __destruct(){
  print "销毁".__CLASS__.'\n';
 }
```
3. 继承
```
  class Child_Site extends Site{
    
  }
```
4. 方法重写
在子类中重写父类中继承的方法，改写的过程叫方法的覆盖 override，方法重写
5. 访问控制
```
方法的访问控制
属性的访问控制

  public，公有的类成员可以在任何地方被访问。
  protected，受保护的类成员则可以被其自身以及其子类和父类访问。
  private 私有的类成员则只能被其定义所在的类访问。
```
6. 接口
```
  // 声明一个'api'接口
  interface api{
    public function getHeaders($name, $var);
    public function getResponse($template);
  }
  // 实现接口
  class Request implements api{

  }
```
7. 抽象类
```
1. 抽象类不能被实例化；
2. 抽象方法只是声明了其调用方式（参数），不能定义其具体功能；
3. 实现类继承抽象类的时候，实现类必须定义抽象类中的所有抽象方法；
4. 实现类中的抽象方法可以包含抽象类的抽象方法中不存在的可选参数（即可以加参数）。
```
8. static 关键字
```
1. 声明类属性或方法为 static(静态)，就可以不实例化类而直接访问。
2. 静态属性不能通过一个类已实例化的对象来访问（但静态方法可以）。
3. 静态方法不需要通过对象即可调用，所以伪变量 $this 在静态方法中不可用。
4. 静态属性不可以由对象通过 -> 操作符来访问。
``` 
9. Final 关键字