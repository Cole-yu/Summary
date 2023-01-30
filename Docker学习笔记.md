# Docker 学习笔记

### Docker 名称概念
```
dockerfile 			image的源代码
image（镜像）		可执行程序
container（容器）	运行起来的进程
Docker 				编译器

只需要在 dockerfile 中指定需要哪些程序、依赖什么样的配置，之后把 dockerfile 交给 “编译器”docker 进行“编译”，
也就是 docker build 命令，生成的可执行程序就是 image，之后就可以运行这个 image 了，这就是 docker run 命令，
image 运行起来后就是 docker container。
```

### 镜像
```
创建镜像
方法一 更新镜像
从已有镜像中改造：
1. 使用镜像来创建一个容器；
2. 在运行的容器内使用 apt-get update 命令进行更新；
3. 完成操作之后，输入 exit 命令来退出这个容器；
4. 命令 docker commit 来提交容器副本；

docker commit -m='描述信息' -a='userID' [containerID] 【imageID】
-m: 提交的描述信息
-a: 指定镜像作者
e218edb10161：容器 ID
runoob/ubuntu:v2: 指定要创建的目标镜像名

例： docker commit -m="has update" -a="runoob" e218edb10161 runoob/ubuntu:v2

方法二 构建镜像
命令 docker image build 零开始来创建一个新的镜像:
1. 创建一个 Dockerfile 文件；
2. 执行命令 docker build；

docker image build -t [imageID] .
-t ：指定要创建的目标镜像名
. ：Dockerfile 文件所在目录，可以指定Dockerfile 的绝对路径

例： docker image build -t dockertest D:\\myProjects\\demodockeruse


列出所有的 image 文件
docker image ls

删除镜像
docker rmi 【imageID】
```

### 容器（container）
```
(注：镜像名必须全部小写)
创建容器
docker container run [containerID] 				新建容器，每运行一次，就会新建一个容器
docker run -itd --name [containerID] [imageID]
例： docker run -itd --name node-test node

进入一个正在运行的 docker 容器
docker container exec -it node-test /bin/bash

docker container ls 			列出本机正在运行的容器
docker container ls --all 		列出本机所有容器，包括终止运行的容器

docker container start [containerID] 			用来启动已经生成、已经停止运行的容器文件。
docker container stop [containerID]				终止容器运行
docker container kill [containerID]				强行立即终止，正在进行中的操作会全部丢失

查看容器输出
docker container logs [containerID]				查看 docker 容器的输出
docker container exec -it [containerID] 【/bin/bash】			进入一个正在运行的 docker 容器
注： 带 /bin/bash 命令，使用户可以立即使用 bash 命令

删除容器
docker container rm [containerID]
```

### Docker 命令字典
```
默认为 library 组
docker image pull library/hello-world 
可以省略 library ； 简写为 docker image pull hello-world
docker pull 					获取镜像
docker search 					查找镜像
docker pull 					拉取镜像
docker rmi 镜像ID				删除镜像
docker image ls					列出所有的 image 文件


注意，docker container run 命令具有自动抓取 image 文件的功能。
如果发现本地没有指定的 image 文件，就会从仓库自动抓取。
因此，前面的docker image pull命令并不是必需的步骤。
docker container run [containerID] 				新建容器，每运行一次，就会新建一个容器
docker container start [containerID] 			用来启动已经生成、已经停止运行的容器文件。
docker container stop [containerID]				终止容器运行
docker container kill [containerID]				强行立即终止，正在进行中的操作会全部丢失

docker container logs [containerID]				查看 docker 容器的输出
docker container exec -it [containerID] 【/bin/bash】			进入一个正在运行的 docker 容器
注： 带 /bin/bash 命令，使用户可以立即使用 bash 命令


docker container ls 			列出本机正在运行的容器
docker container ls --all 		列出本机所有容器，包括终止运行的容器

docker login 					登录账户
docker logout					登出账户

docker version
docker info
docker help

```

### Dockerfile 模板
```
# Version 1.0

# 基础镜像
FROM node:14.19.2

# 将当前目录下的所有文件（除了.dockerignore排除的路径），都拷贝进入 image 文件的/app目录
COPY . /app

# 指定接下来的工作路径为/app
WORKDIR /app

# 镜像操作命令
RUN npm install --registry=https://registry.npm.taobao.org

# 将容器 8080 端口暴露出来， 允许外部连接这个端口
EXPOSE 8080

# 容器启动后自动执行 npm run serve
CMD npm run serve
```

### 实例
```
创建镜像
docker image build -t dockertestimage D:\\myProjects\\demodockeruse (注：镜像名必须全部小写)

创建容器并启动
docker container run --rm -itd -p 3000:8080 dockertestimage /bin/bash
docker container run --rm -itd -p 3000:8080 --name dockertestContainer dockertestimage /bin/bash
--rm参数，在容器终止运行后自动删除容器文件

启动容器
docker container start dockertestContainer

进入容器
docker container exec -it dockertestContainer /bin/bash

npm run serve

ctrl + C 停止 Node 进程

ctrl + D 退出容器

exit

停止容器
docker container stop dockertestContainer

删除容器
docker container rm dockertestContainer

删除镜像
docker rmi dockertestimage
```

### windows 下如何进行访问容器
```
问题：上文将 docker 容器的 8080 端口映射到了宿主机的 3000 端口，但是当访问 localhost:3000 时却无法访问。
原因：docker 是运行在 linux 上的，windows 运行 docker 实质上是先开启了 linux 的虚拟机，然后再到上面运行的，所以映射到"本机"，实际上是映射到了 linux 的虚拟机 ip；
解决方法： 通过命令行 docker-machine ip default 可以查看 Linux 的本机ip，一般默认为 192.168.99.100；
```