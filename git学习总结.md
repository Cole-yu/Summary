# git学习总结
	参考链接欸：https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000
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
	git add filename  						// 可以直接git add -a 提交所有
	git reset Head fileName 				// 从暂存区退回到工作区
	git checkout -- fileName 				// 把工作区修改的文档还原会初始状态
	git commit -m "说明"  					// git commit -a 直接跳过git add; git -am "说明" 跳过git add并添加说明
	git push [origin master]				// 默认提交到master分支

### 基本概念
	工作区   git add 将工作区的文件添加到暂存区
	暂存区   git commit 将暂存区的内容添加到mater分支 
	版本库(分支)







