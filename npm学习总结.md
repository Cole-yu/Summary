# npm 学习总结

### 登录
	npm login

### npm 发布
	npm publish	

### 运行 npm publish 报 401 或者 403 的错
```
	- 检查仓库是否被设成了淘宝镜像库：
		npm config get registry
	- 如是，则设回原仓库：
		npm config set registry=https://registry.npmjs.com 	// node.js v18.17.0
	
	-待发布成功后，则再次将仓库地址设为淘宝镜像地址：
		npm config set registry=https://registry.npm.taobao.org/
```

### npm 更新
```
	修改 package.json 的 version 字段
	npm publish
```	

### publish 发布时忽略掉无用文件
```
	-增加 .npmignore 文件
```

### 删除发布的包(仅24小时内有效，否则将永远无法删除)
	npm unpublish 包名

### 安装模块
```
	npm install 模块： 					安装好后不写入package.json中
	npm i 模块	
	npm install 模块 --save  			安装好后写入package.json的dependencies中（生产环境依赖）
	npm i 模块 -S
	npm install 模块 --save-dev  		安装好后写入package.json的devDepencies中（开发环境依赖）

	指定模块的版本
	npm i vue@2.7 -S
```

### 删除全局模块
	npm uninstall -g <package>利用npm

### 删除本地模块
	npm uninstall 模块：					删除模块，但不删除模块留在package.json中的对应信息
	npm uninstall 模块 --save  			删除模块，同时删除模块留在package.json中dependencies下的对应信息
	npm uninstall 模块 --save-dev  		删除模块，同时删除模块留在package.json中devDependencies下的对应信息	

### package.json
1. 版本号 X.Y.Z
```	
	dependencies 依赖包的版本号前面的符号有两种，一种是~，一种是^

	~: 匹配最近的小版本。比如~1.0.2将会匹配所有的 1.0.x 版本，但不匹配 1.1.0
	^: 匹配最近的一个大版本。比如^1.0.2 将会匹配所有的 1.x.x 版本, 但不包括 2.x.x

	^: 将当前库的版本更新到第一个数字，例："^4.1.0" 是库会更新到 4.X.X 的最新版本，但不会更新到 5.X.X 版本。
	~: 将当前库的版本更新到中间数字的版本，例："~4.7.4" 是库会更新到 4.7.X 的最新版本，但不会更新到 4.8.X 版本。
```	

### pnpm 命令
```
	[pnpm 官网](https://pnpm.io/zh/installation)

	performant npm （高性能的npm）

	pnpm init // 创建一个 package.json 文件

	pnpm list // 以一个树形结构输出所有的已安装package的版本及其依赖

	pnpm install 模块名	// 安装模块
	pnpm i 模块名
	pnpm add 模块名

	pnpm remove 模块名	// 卸载模块
	pnpm update 模块名	// 更新模块
	pnpm run 脚本命令	// 运行脚本命令
	pnpm store
	pnpm link

	升级 pnpm 到最新版
	npm install -g pnpm@latest

	pnpm install 时报错: ERR_PNPM_LINKING_FAILED Error: EPERM: operation not permitted, rename
	排查原因: pnpm 版本太高, 校验太严格了导致，使用 pnpm 的 8.6.2版本
	npm install -g pnpm@8.6.2
	"engines": {
		"pnpm": ">=8.6.2"
	}
```

### npm yarn pnpm 三种包管理器对比
```
	选择使用哪种包管理工具取决于个人需求和项目需求。
	如果需要快速安装依赖项并具有良好的缓存机制，则可以选择 pnpm。
	如果需要具有大量社区支持和广泛的生态系统，则可以选择 npm。
	如果需要支持工作区和锁定文件，则可以选择 yarn。

	[参考文档](https://blog.csdn.net/u011374856/article/details/129417674)
```