# git学习总结
	参考链接：https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000
	git是一款免费开源的分布式版本控制系统---工具，就是一个软件
	Github是用git做版本控制的代码托管平台---平台，就是一个网站

### 初始化
	mkdir fileName   						//创建一个文件夹
	git init		 						//初始化一个git仓库

### 克隆仓库
	git clone 仓库地址
	git clone https://github.com/Cole-yu/summary.git

### 更新代码
	git status(查看文件信息)
	git branch(查看当前分支情况)
	git pull(更新代码)	

### 创建分支
	git branch 查看分支
	git branch foo 创建foo分支
	git checkout bar 切换到分支bar
	git checkout -b <name> 创建+切换到分支
	git merge <name>   合并某分支到当前分支
	git branch -d <name> 删除分支

### 常用命令
	git log 								// 查看提交的版本历史记录
	git diff HEAD -- fileName 				// 比较工作区与版本库里面最新版本的区别
	git add filename  						// 可以直接git add -a 提交所有
	git reset Head fileName 				// 从暂存区退回到工作区
	git checkout -- fileName 				// 把工作区修改的文档还原会初始状态
	git commit -m "说明"  					// git commit -a 直接跳过git add; git -am "说明" 跳过git add并添加说明
	git push [origin master]				// 默认提交到master分支

### 基本概念
	工作区   git add 将工作区的文件添加到暂存区
	暂存区   git commit 将暂存区的内容添加到mater分支 
	版本库(分支)

### stash的使用
```
	git stash sava 'name'
	git stash pop
	git stash list
```

### 账号
```
	查看当前用户和邮箱
	git config user.name
	git config user.email

	修改当前的用户账号和邮箱
	git config --global user.name 'yufeixiang'
	git config --global user.email 'xxxx@qq.com'
```	

### SSH设置
```
	git init
	ssh-keygen -t rsa -C "yufeixiang@gw.com.cn" 生成秘钥对（id_rsa是私钥，id_rsa.pub是公钥）
	把公钥 id_rsa.pub 的全部内容拷贝到git服务器
	ssh-add ~/ssh/id_rsa  添加私钥到本地账号设置中
	git config --global user.name 'yufeixiang'
	git config --global user.email 'yufeixiang@gw.com.cn'
	现在就可以git clone 项目
```

### git中忽略 node_module 的方法
	1. 文件夹内右键git bash，输 touch .gitignore，注意中间有空格,空格后面有小数点(.)
	2. 编辑器打开生成的 .gitignore 文件，加入:
		node_modules
		/*以及其他你想要忽略的文件或文件夹*/
		dist/
	3. 保存；
	4. 以后再add到暂存区的时候就会忽略你配置的文件或文件夹了。

	git branch
	git 
	git pull origin master
	git push origin master
	git remote add origin ssh://git@git.gw.com.cn:7999/dtv/tv.git
	git clone --branch [tags标签] [git地址]
	

### git 设置区分大小写
```
	git config --global core.ignorecase false // 忽略大小写 false === 区分大小写
	git config core.ignorecase false // 设置值
	git config core.ignorecase // 查看值
	git config --list
```

### 查看当前文件所在的代码库地址
```
	git remote show origin

	重新设置文件代码库地址
	git remote set-url origin git@github.com:Cole-yu/how-webpack-works.git
```

### git 版本回退


### Git 全局设置
git config --global user.name "yfx"
git config --global user.email "email.com"

### 创建一个新仓库
git clone git@xxxxxx/codebase.git
cd rzrq.market
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master

### 推送现有文件夹到线上新建空代码库
cd existing_folder
git init
git remote add origin git@xxxxxx/codebase.git
git add .
git commit -m "Initial commit"
git push -u origin master

### 推送现有的 Git 仓库
cd existing_repo
git remote rename origin old-origin
git remote add origin git@xxxxxx/codebase.git
git push -u origin --all
git push -u origin --tags

### 多版本BUG修复后的合并
```
首先在master分支上修复bug并提交后
1. 查看现有分支
git branch
2. 切换到需要修复的分支
git checkout 需要修复的分支
3. 进入到修复分支后,合并master分支
git merge master
4. 提交代码
git commit -m "merge master";
git push
```

### tag标签
```
1. 创建标签
git tag <tagName>
2. 推送到远程仓库
git push origin <tagName>
3. 指定版本为标签
git tag -a <tagName> <commitId>
4. 查看所有标签
git tag  // 本地tag
git ls-remote --tags origin // 远程仓库
5. 删除标签
git tag -d <tagName>
git push origin :refs/tags/<tagName> // 推送到远程仓库
```