# XAMPP学习总结

### 下载地址 
https://www.apachefriends.org/download.html

### 相关指令
```
xampp-control.exe 控制面板启动
```

### 开启虚拟目录
```
xampp\apache\conf\httpd.conf 文件
<Directory />
#   AllowOverride none

#   所有请求都拒绝，deny 拒绝
#   Require all denied

    Options All
    AllowOverride All
    Require all granted
</Directory>

# 开启虚拟目录
# Virtual hosts
Include conf/extra/httpd-vhosts.conf


xampp\apache\conf\httpd-vhosts.conf 文件
<VirtualHost *:80>
    DocumentRoot "D:\web.sj\gyf10"

    ServerName www.gyf10dev.com
    ## 国元f10开发环境
</VirtualHost>

C:\Windows\System32\drivers\etc\hosts
添加域名映射 
127.0.0.1 www.gyf10dev.com
```

### 修改端口
```
添加所需的自定义端口
xampp\apache\conf\extra\httpd.conf 文件
Listen 81

更改端口号
xampp\apache\conf\httpd-vhosts.conf 文件
<VirtualHost *:81>
    DocumentRoot "D:\web.sj\f10dongfang"
    ServerName www.dff10.com    
</VirtualHost>
```

### 通过IP形式访问
```
<VirtualHost 10.15.45.132:80>    
    DocumentRoot "E:\Private\guokai.weixin.login"
    ## 国开微信公众号登录服务后台
</VirtualHost>
```

### xampp中的代理配置
```
在开启虚拟目录的基础上

xampp\apache\conf\extra\httpd.conf 文件
# apache启动时必须开启，否则无法运行
LoadModule proxy_module modules/mod_proxy.so

# 需要代理时必须开启。等同于开启http请求的nginx的代理
LoadModule proxy_http_module modules/mod_proxy_http.so

xampp\apache\conf\httpd-vhosts.conf 文件
<VirtualHost *:80>
    DocumentRoot "D:\web.sj\f10dongfang"

    # 将 http://www.dff10.com/pankou?code=SH601519 代理到 http://localhost:3000/pankou?code=SH601519
    ProxyPass /pankou http://localhost:3000/pankou

    ServerName www.dff10.com
    ## 东方证券f10开发环境
</VirtualHost>
```