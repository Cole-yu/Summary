# RxJS学习笔记

### 官方文档
	https://cn.rx.js.org/

### RxJS 基础实现原理简析
```
	参考链接：https://blog.csdn.net/zhoulu001/article/details/53072604#0-tsina-1-81126-397232819ff9a47a7b7e80a40613cfe1
	三个核心思想：观察者模式，迭代器模式，函数式编程
```	

### Rx.js适用的场景
```
	参考链接：https://zhuanlan.zhihu.com/p/25383159
	<1> 联动，整体性：在于数据的冗余展示。我们可以把同一份业务数据以不同形态展示在不同视图上，甚至在PC端，由于屏幕大，可以允许同一份数据以不同形态同时展现，这时候，为了整体协调，对此数据的更新就会要产生很多分发和联动关系。
	<2> 分发: 服务端是否会主动向推送一些业务更新信息，如果用得比较多，也会产生不少的分发关系。		
	总结：在分发和联动关系多的时候，RxJS才能更加体现出它比Generator、Promise的优势。

	参考链接：https://blog.csdn.net/zhoulu001/article/details/53072604#0-tsina-1-81126-397232819ff9a47a7b7e80a40613cfe1
	多个复杂的异步或事件组合在一起。
	处理多个数据序列
	假如没有被复杂的异步，事件， 数据序列困扰， 如果promise已经足够的话， 就没必要适用Rx.js。	
```

### 常用API
```
	参考链接：https://segmentfault.com/a/1190000008834251?share_user=1030000012565296&utm_source=Weibo&utm_medium=shareLink&utm_campaign=socialShare
	也可查看RxJS官方文档 https://cn.rx.js.org/class/es6/Observable.js~Observable.html
	from
		
	fromEvent	

	repeat
		重复 count 次，源 Observable 发出的值

	mapTo
		对 Observable 对象发出的每个值，映射成固定的值。

	scan
		对 Observable 发出值，执行 accumulator 指定的运算，可以简单地认为是 Observable 版本的 Array.prototype.reduce 。

	buffer 
		缓冲源 Observable 对象已发出的值，直到 closingNotifier 触发后，才统一输出缓存的元素。	

	bufferTime
		设定源 Observable 对象已发出的值的缓冲时间。

	bufferCount 
		缓冲源 Observable对象已发出的值，直到大小达到给定的最大 bufferSize 。

	concatMap
		对每个 Observable 对象发出的值，进行映射处理，并进行合并。该操作符也会先处理前一个 Observable 对象，在处理下一个 Observable 对象。

	switchMap
		对源 Observable 对象发出的值，做映射处理。若有新的 Observable 对象出现，会在新的 Observable 对象发出新值后，退订前一个未处理完的 Observable 对象。

	filter
		对 Observable 对象发出的每个值，作为参数调用指定的 predicate 函数，若该函数的返回值为 true，则表示保留该项，若返回值为 false，则舍弃该值。	

	take
		用于获取 Observable 对象发出的前 n 项值，取完后就结束。	

	first
		用于获取 Observable 对象发出的第一个元素，取完后就结束。	

	takeUntil
		当 takeUntil 传入的 notifier 发出值时，源 Observable 对象就会直接进入完成状态。

	skip
		跳过源 Observable 对象前 count 项，并返回新的 Observable 对象。

	takeLast
		获取源 Observable 对象发出的，后面 count 项的值。

	last
		获取源 Observable 对象发出的最后一项的值	

	debounceTime
		在设定的时间跨度内，若源 Observable 对象没有再发出新值，则返回最近一次发出的值。	

	throttleTime
		从源 Observable 对象发出第一个值开始，忽略等待时间内发出的值，等待时间过后再发出新值。与 debounceTime 不同的是，throttleTime 一开始就会发出值，在等待时间内不会发出任何值，等待时间过后又会发出新的值。

	distinct
		过滤源 Observable 发出的值，确保不会发出重复出现的值。	

	distinctUntilChanged
		过滤源 Observable 发出的值，若当前发出的值与前一次值不一致，则发出该值。	

	concat 
		把多个 Observable 对象合并为一个 Observable 对象，Observable 对象会依次执行，即需等前一个 Observable 对象完成后，才会继续订阅下一个。	

	concatAll
		合并多个 Observable 对象，并在上一个 Observable 对象完成后订阅下一个 Observable 对象。

	startWith
		在开始发出源 Observable 数据之前发出已设置的参数值，并返回新的 Observable 对象。

	merge
		合并 Observable 对象，并按给定的时序发出对应值。	

	mergeAll
		将高阶 Observable 对象转换为一阶Observable 对象，并同时处理所有的 Observable 对象。

	combineLatest
		用于合并输入的 Observable 对象，当源 Observable 对象和 other Observable 对象都发出值后，才会调用 project 函数。

	zip
		根据每个输入 Observable 对象的输出顺序(索引一样)，产生一个新的 Observable 对象。

	withLatestFrom

	switch
		切换为最新的 Observable 数据源，并退订前一个 Observable 数据源。	

	delay
		延迟源 Observable 对象，发出第一个元素的时间点。

	delayWhen
		delayWhen 的作用跟 delay 操作符类似，最大的区别是 delayWhen 会影响每个元素，而且调用的时候需要设置 delayDurationSelector 函数，该函数的返回值是 Observable 对象。

	multicast
		用于挂载 Subject 对象，并返回一个可链接 (connectable) 的 Observable 对象。

	refCount
		refCount 必须搭配 multicast 一起使用，在调用 multicast 操作符后，接着调用 refCount() 。这样只要有订阅就会自动进行 connect (链接) 操作。

		var source = Rx.Observable.interval(1000)
	             .take(3)
	             .multicast(new Rx.Subject());

	    var observerA = {
		    next: value => console.log('A next: ' + value),
		    error: error => console.log('A error: ' + error),
		    complete: () => console.log('A complete!')
		};

	    source.subscribe(observerA); // subject.subscribe(observerA)

		source.connect(); // source.subscribe(subject)

		通过 multicast 挂载 Subject 对象之后返回了 source 对象，该对象通过 subscribe 添加的观察者，都是添加到 Subject 对象内部的观察者列表中。此外当调用 source 对象的 connect() 方法后才会真正的订阅 source 对象，如果没有执行 connect() ，source 不会真正执行。

		如果要真正退订观察者，应该使用以下方式：

		var realSubscription = source.connect();
		// todo...
		realSubscription.unsubscribe();

	publish
		用于挂载 Subject 对象，并返回一个可链接 (connectable) 的 Observable 对象。即 publish 操作符与 multicast(new Rx.Subject()) 是等价的。

		var source = Rx.Observable.interval(1000)
	             .publish() 
	             .refCount();
		等价于             
		var source = Rx.Observable.interval(1000)
	             .multicast(new Rx.Subject()) 
	             .refCount();

	share

		share 操作符是 publish + refCount 的简写。
		var source = Rx.Observable.interval(1000)
	             .share();
	             
		var source = Rx.Observable.interval(1000)
	             .publish()
	             .refCount();

		var source = Rx.Observable.interval(1000)
	             .multicast(new Rx.Subject()) 
	             .refCount();

	catch
		用于捕获异常，同时可以返回一个 Observable 对象，用于发出新的值。

	retry
		发生错误后，重试 count 次数

	retryWhen	
		捕获异常 Observable 对象，进行异常处理后，可重新订阅源 Observable 对象。

```