# Nginx学习总结

### 下载地址 
http://nginx.org/en/download.html 

### 相关指令
```
进入到nginx 文件夹所在目录内，cmd开启命令行工具
start nginx 
nginx -s reload
nginx -s stop // 将杀死nginx进程并退出，执行过程有可能会延迟
nginx -s quit
```
### 进程查看
任务管理器->进程 nginx.exe *32


### 代理配置
```
conf/nginx.conf文件
server {
        listen       8080;
        server_name  localhost;
   
        location / {
            root   D:\web.sj\web.simulate\dist;
            index  login.html;
        }

#		将http:localhost:8080/api/getList 代理到 http://10.15.144.130:11050/getList 重写路径，去掉/api
        location /api {  
            proxy_pass http://10.15.144.130:11050;            
            rewrite "^/api/(.*)$" /$1 break;
        }   
#		等价于      
#		location /api/ {
#       	proxy_pass http://10.15.144.130:11050/;
#       }  
#		参考链接： https://www.cnblogs.com/lianxuan1768/p/8383804.html
    }
```