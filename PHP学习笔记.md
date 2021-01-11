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

调试步骤：
启动 xampp
vscode F9打上断点，f5启动调试 
浏览器输入地址访问，将进入打断点
```

