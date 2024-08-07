# git学习总结
```	
	git是一款免费开源的分布式版本控制系统，Git是一种工具；
	Github是用git做版本控制的代码托管平台，GitHub是一种服务；
	[参考链接](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
```

### 初始化
```
	mkdir fileName   						//创建一个文件夹
	git init		 						//初始化一个git仓库
```

### 克隆仓库
```
	git clone 仓库地址
	git clone https://github.com/Cole-yu/summary.git
```

### 更新代码
```
	git status(查看文件信息)
	git branch(查看当前分支情况)
	git pull(更新代码)	
```

### 创建分支
```
	git branch 查看分支
	git branch foo 创建foo分支
	git checkout bar 切换到分支bar
	git checkout -b <name> 创建+切换到分支
	git merge <name>   合并某分支到当前分支   未 push 前取消合并 git merge --abort
	git branch -d <name> 删除本地分支				git branch --delete <name>
	git push origin -d <name> 删除远程分支		git push origin --delete <name>
```

### 常用命令
```
	git log 								// 查看提交的版本历史记录
	git diff HEAD -- fileName 				// 比较工作区与版本库里面最新版本的区别
	git add filename  						// 可以直接git add -a 提交所有
	git reset Head fileName 				// 从暂存区退回到工作区
	git checkout -- fileName 				// 把工作区修改的文档还原会初始状态
	git commit -m "说明"  					// git commit -a 直接跳过git add; git -am "说明" 跳过git add并添加说明
	git push [origin master]				// 默认提交到master分支
```

### 基本概念
```
	工作区   git add 将工作区的文件添加到暂存区
	暂存区   git commit 将暂存区的内容添加到mater分支 
	版本库(分支)
```

### stash (存放)的使用
```
	git stash save 'name'
	git stash list
	git stash apply [stash]		// 将某个stash的变更应用到当前工作目录，git stash pop [stash]

	git stash drop [stash] 		// 删除某个 stash。如果不指定stash，默认删除最新的stash

	git stash clear 			// 删除所有的 stash，【慎用】

	git stash pop [stash] 与 git stash apply [stash] 类似，但在应用完 stash 后，会将 stash 从 stash 列表中移除。如何不指定 stash，默认会应用最新的 stash。
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
```
	1. 文件夹内右键git bash，输 touch .gitignore，注意中间有空格,空格后面有小数点(.)
	2. 编辑器打开生成的 .gitignore 文件，加入:
		node_modules
		/*以及其他你想要忽略的文件或文件夹*/
		dist/
	3. 保存；
	4. 以后再add到暂存区的时候就会忽略你配置的文件或文件夹了。


	[参考经验](https://blog.csdn.net/m0_63230155/article/details/134471033)
	忽略已提交过的文件
		git rm 命令，连同 --cached 选项，从版本库中删除文件，但不删除实际的文件。这意味着该文件仍然在你的本地系统和工作目录中作为一个被忽略的文件。
			git rm --cached example.txt
			git commit -m "remove example.txt"
```

```
	git branch
	git pull origin master
	git push origin master
	git remote add origin ssh://git@git.gw.com.cn:7999/dtv/tv.git
	git clone --branch [tags标签] [git地址]
```

### git 设置区分大小写
```
	git config --global core.ignorecase false // 忽略大小写 false === 区分大小写
	git config core.ignorecase false // 设置值
	git config core.ignorecase // 查看值
	git config --list
```

### 查看当前文件所在的代码库地址，项目源
```
	git remote show origin

	重新设置文件代码库地址
	git remote set-url origin git@github.com:Cole-yu/how-webpack-works.git
```

### git 版本回退
```
	git merge master 后在未提交情况下，使用 git reset --hard 从暂存区退回到工作区
	git reset --hard // 从暂存区退回到工作区
```

### Git 全局设置
```
	git config --global user.name "yfx"
	git config --global user.email "email.com"
```

### 创建一个新仓库
```
	git clone git@xxxxxx/codebase.git
	cd rzrq.market
	touch README.md
	git add README.md
	git commit -m "add README"
	git push -u origin master
```

### 推送现有文件夹到线上新建空代码库
```
	cd existing_folder
	git init
	git remote add origin git@xxxxxx/codebase.git
	git add .
	git commit -m "Initial commit"
	git push -u origin master
```

### 推送现有的 Git 仓库
```
	cd existing_repo
	git remote rename origin old-origin
	git remote add origin git@xxxxxx/codebase.git
	git push -u origin --all
	git push -u origin --tags
```

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

### Tag 标签
1. 创建标签
```
	git tag <tagName>
	git tag -a <tagName> -m "附注"
```
2. 推送到远程仓库
```
	git push origin <tagName>
```
3. 指定版本为标签
```
	git tag -a <tagName> <commitId>
```
4. 查看所有标签
```
	git tag  // 查看本地标签
	git ls-remote --tags origin // 查看远程仓库标签
```
5. 删除标签
```
	git tag -d <tagName>
	git push origin :refs/tags/<tagName> // 推送到远程仓库
```
6. 删除远程仓库中的标签
```
	git push -d origin <tagName>
```
7. 查看某个标签详情
```
	git show <tagName> 
```

### Vim 的进入和退出
```
	i 键 小写的 i 键在光标之前插入文本
	I 键 大写的 I 即 shift + i 键在光标所在行行首插入文本
	a 键 小写的 a 键在光标之后插入文本
	A 键 大写的 A 即 shift + a 键在光标所在行行尾插入文本
	o 键 小写的 o 键在光标下面新开一行并进入插入模式
	O 键 大写的 O 即 shift + o 键在光标上面新开一行并进入插入模式
	<ESC>键 退出编辑，返回正常模式，按下<ESC>键后，退出编辑回到正常模式
	:q! 键 点击回车后，不会保存之前所做的修改，强制退出。
	:wq 键 点击回车后，保存更改并退出
	语法相关链接： https://blog.csdn.net/qq_27127385/article/details/103627332
```

### Git 检测不到新增文件的修复方法
```
1. 清除 Git 缓存：
	git rm -r --cached .

2. 重新添加文件：	
	git add . 

3. 提交更改：
	git commit -m "日志信息"

4. 推送：
	git push
```