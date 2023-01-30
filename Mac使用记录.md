# Mac 使用记录

### sudo 超级用户权限执行命令
```
sudo 代表 superuser do（超级用户执行）
sudo npm install -g @vue/cli
```

### 使用 windows 外接键盘 操作
```
windows / mac
Alt     / Option
Ctrl    / Command（Control）
ctrl + c / window + c
输入大写V /  shift + v
```

### 终端命令行
```
Mac 命令行终端使用的Bourne-Again Shell命令，简称bash
bash是GNU组织开发和推广的一个项目，是对Bourne shell的扩展
Bourne shell是 UNIX 最初使用的 Shell，作者Steven Bourne
bash是许多Linux平台的内定Shell。传统UNIX上还有许多Shell，包括tcsh、csh、ash、bsh、ksh
Shell Script大致都类同，一个Shell Script通常可以在很多种Shell上使用
狭义的Shell指的就是命令行终端
shell的作用：用户输入指令，通过Shell和内核沟通，控制硬件正常工作

【注】不区分文件名大小写
cd 返回上一级
ls 显示当前文件列表
pwd 显示当前目录的路径
mkdir 创建一个文件夹
touch 创建文件
rmdir 删除一个文件夹

shift+a = A
Caps Lock 切换英文和中文输入法
```

### Mac os、Linux 及 Unix 之间的关系
```
Mac， Linux是类Unix系统
Unix相当于父亲，Linux和Mac OS是兄弟关系
```

### 常用指令
```
ls     	显示当前目录下的文件内容 list show
ls -l  	列出文件的属性与权限  
cd -   	返回上一个访问的目录
cd /	跳转到根目录
cd ..	返回上级目录
cd ~	进入用户目录 /usr
ls /   	查看根目录的内容
cd xxx  进入xxx的文件夹(Tab键会自动补齐) come directory
pwd  	查看当前所在的位置
mkdir xxx   创建一个名字为xxx的文件夹
touch yyy   创建一个名字为yyy的文件
清屏 	控制台->编辑->清除屏幕
sudo cp httpd.conf httpd.conf.bak 复制httpd.conf,并命名为httpd.conf.bak
rm httpd.conf.bak  删除httpd.conf.bak文件
rm -rf  xxx  删除xxx文件夹
mv aaa bbb  将当前目录下得aaa文件，移动到当前目录下，并改名为bbb
vi yyy  如果文件不存在，则创建一个yyy的文件，并打开，如果文件存在，则是打开yyy文件
vim httpd.conf 修改普通权限文件
sudo vim httpd.conf 超级权限修改文件
```

### 编辑文本命令
```
a  		在光标下一个字符处插入
i  		在光标处插入
o  		在光标所在行下一行插入一个新行
r 		替换光标所在字符
R  		进入到替换模式
dd  	剪切光标所在的一行内容
ndd 	剪切从光标所在行开始后的N行内容
yy  	复制光标所在的一行内容
nyy 	复制从光标所在行开始后的N行内容
p   	粘贴到光标所在行
D   	删除光标右边的所有内容
x   	删除光标所在字符
gg 		将光标快速移动到文件首
G  		将光标快速移动到文件尾
数字零  	将光标快速移动到行首
$   	将光标快速移动到行尾
/n  	查找内容 n跳到下一项
gg=G 	段落对齐
:set nu 设置行号
:set nonu   取消行号
:行号   定位到指定行
u   	 撤销
:x   	相当于:wq
:w   	保存
:q   	未保存直接退出
:wq  	保存并退出
:w!  	强制保存
:q!  	强制退出
:wq! 	强制保存退出
:X!  	强制保存退出
:syntax on/off 			开启/关闭语法提示
shell的意外关闭 .*.swp 	（首先用ls –a 命令找到相应的.*.swp文件，然后删除.*.swp文件）
:1,10s/printf/kkk/g 	表示将1-10行的printf替换成kkk
```

### apache2命令
```
查看apache版本
apachectl -v httpd -v

cd /
sudo vi httpd.conf 		  	// /private/etc/apache2/httpd.conf
sudo vi httpd-vhost.conf   	// /private/etc/apache2/extra/httpd-vhosts.conf
sudo apachectl -k start
sudo apachectl -k restart
sudo apachectl -k stop
```

### mac host 路径
```
/private/etc/hosts
sudo vi hosts
```


### 修改文件的读写执行权限属性
```
chmod 命令

查看文件权限属性
ls -l ：列出文件的属性与权限等等数据(常用)

chmod 777 index.html
chmod 777 api.php

```