# PWA学习笔记
	https://segmentfault.com/a/1190000014639473

### Progressive Web App 渐进式网络应用
```
	优点：
		消息推送（实时性）
		后台加载（利用Service Worker实现缓存）
		离线使用（即使用户手机没有网络，依然可以使用一些离线功能）
		原生应用界面（无需安装）
		桌面图标（快捷方便，可以将应用添加至主屏幕）
```

### 生命周期
```
	Parsed => Installing => Installed => Activating => Activated => Redundant

	Parsed （ 解析成功 ）： 首次注册 SW 时，浏览器解决脚本并获得入口点，如果解析成功，就可以访问到 SW 注册对象，在这一点中我们需要在 HTML 页面中添加一个判断，判断该浏览器是否支持 SW 。

	Installing （ 正在安装 ）：SW 脚本解析完成之后，浏览器会尝试进行安装，installing 中 install 事件被执行，如果其中有 event.waitUntil ( ) 方法，则 installing 事件会一直等到该方法中的 Promise 完成之后才会成功，如果 Promise 被拒绝，则安装失败，SW会进入 Redundant（ 废弃 ）状态。

	Installed / Waiting （安装成功/等待中）：如果安装成功，SW 将会进入这个状态。

	Activating （ 正在激活 ）：处于 waiting 状态的 SW 发生以下情况，将会进入 activating 状态中：
	当前已无激活状态的 worker 、 SW脚本中的 self.skipWaiting（）方法被调用 （ ps： self 是 SW 中作用于全局的对象，这个方法根据英文翻译过来也能明白什么意思啦，跳过等待状态 ）、用户已关闭 SW 作用域下的所有页面，从而释放了当前处于激活状态的 worker、超出指定时间，从而释放当前处于激活状态的 worker

	Activated （ 激活成功 ）：该状态，其成功接收了 document 全面控制的激活态 worker 。

	Redundant （ 废弃 ）：这个状态的出现时有原因的，如果 installing 事件失败或者 activating 事件失败或者新的 SW 替换其成为激活态 worker 。installing 事件失败和 activating 事件失败的信息我们可以在 Chrome 浏览器的 DevTools 中查看
```

## 原理实现
### Web Worker

### Service Worker(简称：SW 服务工厂)
```
	SW 的生命周期
		当用户首次导航至 URL 时，服务器会返回响应的网页
		第1步:当你调用 register() 函数时， Service Worker 开始下载。
		第2步:在注册过程中，浏览器会下载、解析并执行 Service Worker ()。如果在此步骤中出现任何错误，register() 返回的 promise 都会执行 reject 操作，并且 Service Worker 会被废弃。
		第3步:一旦 Service Worker 成功执行了，install 事件就会激活
		第4步:安装完成，Service Worker 便会激活，并控制在其范围内的一切。如果生命周期中的所有事件都成功了，Service Worker 便已准备就绪，随时可以使用了！
```

### Manifest(应用清单)
```
	Web App Minifest 
	Manifest 在 PWA 中的作用有：
		能够将你浏览的网页添加到你的手机屏幕上
		控制屏幕 横屏/竖屏 显示
		定义启动画面
		设置你的应用从主屏幕启动还是URL启动
		添加屏幕上的应用程序图标、名字、图标大小
```
### Push Notification
```
	Push 和 Notification 是两个不同的功能，涉及到两个 API 。

	【用户】 <= 【Service Worker】 <= 【服务器】​

​	Push 和 Notification 的关系：
		Push：服务器端将更新的信息传递给 Service Worker（SW作为中转站进行信息接收和二次处理）
		Notification： SW 将更新的信息推送给用户，在浏览器屏幕上提示通知消息
```

### 清空Service Worker的方法
```
	方法一
		第一步：在浏览器中输入 chrome://serviceworker-internals/
		第二步：unregister 相应的地址

	方法二
		进入chrome://inspect里terminate掉了service-worker。
```
