# React学习笔记

### 简介
```
	单向响应的数据流
	虚拟Dom,最大限度地减少与DOM的交互
	JSX语法，方便使用
	组件式开发，复用代码

	适用业务场景，框架优缺点，生命周期，组件间通信，核心思想
```	

### 环境搭建
```
	npm install create-react-app -g
	create-react-app [项目名称]
	npm run start  默认http:loacalhost:3000
```

### 注 
```
1. React只会更新必要的部分，值得注意的是 React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。

2. 由于 JSX 就是 JavaScript，一些标识符像 class 和 for 不建议作为 XML 属性名。作为替代，React DOM 使用 className 和 htmlFor 来做对应的属性。

3. 原生 HTML 元素名以小写字母开头，而自定义的 React 类名以大写字母开头，比如 HelloMessage 不能写成helloMessage。除此之外还需要注意组件类只能包含一个顶层标签，否则也会报错。
```

### React JSX
```
	元素是构成 React 应用的最小单位，JSX 就是用来声明 React 当中的元素。
	React DOM可以确保浏览器 DOM 的数据内容与 React 元素保持一致。
	通过把React元素（虚拟DOM）传递给 ReactDOM.render() 的方法来将其渲染到页面上
	可以在花括号 {} 中写表达式,
	JSX 中不能使用 if else 语句，但可以使用 conditional (三元运算) 表达式来替代

	1. 样式
	React 推荐使用内联样式。我们可以使用 camelCase 语法来设置内联样式. React 会在指定元素数字后自动添加 px 。
	var myStyle = {
	    fontSize: 100,
	    color: '#FF0000'
	};
	ReactDOM.render(
	    <h1 style = {myStyle}>菜鸟教程</h1>,
	    document.getElementById('example')
	);

	2. 注释
	注释需要写在花括号中。	
	ReactDOM.render(
	    <div>
	    <h1>菜鸟教程</h1>
	    {/*注释...*/}
	     </div>,
	    document.getElementById('example')
	);

	3. 数组
	JSX 允许在模板中插入数组，数组会自动展开所有成员。
	var arr = [
	  <h1>菜鸟教程</h1>,
	  <h2>学的不仅是技术，更是梦想！</h2>,
	];
	ReactDOM.render(
	  <div>{arr}</div>,
	  document.getElementById('example')
	);	
```	

### 组件
```
	function HelloMessage(props) {
	    return <h1>Hello {props.name} !</h1>;
	}
	
	也可以使用 ES6 class 来定义一个组件:

	class Welcome extends React.Component {
	  render() {
	    return <h1>Hello World!</h1>;
	  }
	}

	注意，原生 HTML 元素名以小写字母开头，而自定义的 React 类名以大写字母开头，比如 HelloMessage 不能写成helloMessage。除此之外还需要注意组件类只能包含一个顶层标签，否则也会报错。
	function HelloMessage(props) {
	    return <h1>Hello {props.name}!</h1>;
	}
	const element = <HelloMessage name="Runoob" />
	ReactDOM.render(
	    element,
	    document.getElementById('example')
	);
```

### State(状态)
```
	将生命周期方法添加到类中
	每当 Clock 组件第一次加载到 DOM 中的时候，我们都想生成定时器，这在 React 中被称为挂载。
	同样，每当 Clock 生成的这个 DOM 被移除的时候，我们也会想要清除定时器，这在 React 中被称为卸载。
	class Clock extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {date: new Date()};
	  }
	 
	  componentDidMount() {
	    this.timerID = setInterval(
	      () => this.tick(),
	      1000
	    );
	  }
	 
	  componentWillUnmount() {
	    clearInterval(this.timerID);
	  }
	 
	  tick() {
	    this.setState({
	      date: new Date()
	    });
	  }
	 
	  render() {
	    return (
	      <div>
	        <h1>Hello, world!</h1>
	        <h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
	      </div>
	    );
	  }
	}
	 
	ReactDOM.render(
	  <Clock />,
	  document.getElementById('example')
	);

	代码执行顺序：
	1. 当 <Clock /> 被传递给 ReactDOM.render() 时，React 调用 Clock 组件的构造函数。 由于 Clock 需要显示当前时间，所以使用包含当前时间的对象来初始化 this.state 。 我们稍后会更新此状态。

	2. React 然后调用 Clock 组件的 render() 方法。这时 React 了解屏幕上应该显示什么内容，然后 React 更新 DOM 以匹配 Clock 的渲染输出。

	3. 当 Clock 的输出插入到 DOM 中时，React 调用 componentDidMount() 生命周期钩子。 在其中，Clock 组件要求浏览器设置一个定时器，每秒钟调用一次 tick()。

	4. 浏览器每秒钟调用 tick() 方法。 在其中，Clock 组件通过使用包含当前时间的对象调用 setState() 来调度UI更新。 通过调用 setState() ，React 知道状态已经改变，并再次调用 render() 方法来确定屏幕上应当显示什么。 这一次，render() 方法中的 this.state.date 将不同，所以渲染输出将包含更新的时间，并相应地更新 DOM。

	5. 一旦 Clock 组件被从 DOM 中移除，React 会调用 componentWillUnmount() 这个钩子函数，定时器也就会被清除。

	数据自顶向下流动
	父组件或子组件都不能知道某个组件是有状态还是无状态，并且它们不应该关心某组件是被定义为一个函数还是一个类。
	这就是为什么状态通常被称为局部或封装。 除了拥有并设置它的组件外，其它组件不可访问。
	
	从Colck组件流向FormattedDate组件
	function FormattedDate(props) {
	  return <h2>现在是 {props.date.toLocaleTimeString()}.</h2>;
	}

	class Clock extends React.Component {
		constructor(props) {
		    super(props);
		    this.state = {date: new Date()};
		}
		render() {
		    return (
		      <div>
		        <h1>Hello, world!</h1>
		        <FormattedDate date={this.state.date} />
		      </div>
		    );
		}
	}
```	

### this的指向
```
	class Clock extends React.Component {
	  	constructor(props) {
	    	super(props);
	    	this.state = {date: new Date()};
	  	}
	 
	  	componentDidMount() {
	    	this.timerID = setInterval(
	      		() => this.tick(),
	      	1000);
	  	}
		
		render(){
			return (...);
		}
	}
	
	错误写法：
	this.timerID = setInterval(function () {
	  	return this.tick();
	},1000);

	this.tick() 中的 this 指代的是 function，而不是我们想要的指代所在的组件类 Clock，会报错，tick() 不是一个方法。
	所以我们要想办法让 this 能被正常指代。这里我们采用围魏救赵的办法:	
	
	let that = this;
	this.timerID = setInterval(function () {
	  	return that.tick();
	},1000);

	或者使用箭头表达式
	this.timerID = setInterval(
      	() => this.tick(),
    1000);
```

### props
```
	state 和 props 主要的区别在于 props 是不可变的，而 state 可以根据与用户交互来改变。这就是为什么有些容器组件需要定义 state 来更新和修改数据。 而子组件只能通过 props 来传递数据。

	1. 默认 Props
	组件类的 defaultProps 属性为 props 设置默认值
	class HelloMessage extends React.Component {
	  	render() {
	    	return (
	      		<h1>Hello, {this.props.name}</h1>
	    	);
	  	}
	}
	 
	HelloMessage.defaultProps = {
	  	name: 'Runoob'
	};

	2. Props 验证
	class MyTitle extends React.Component {
		render() {
	    	return (
	      		<h1>Hello, {this.props.title}</h1>
	    	);
	  	}
	}
	 
	MyTitle.propTypes = {
	  	title: PropTypes.string
	};

	更多验证器说明如下：
	MyComponent.propTypes = {
	    // 可以声明 prop 为指定的 JS 基本数据类型，默认情况，这些数据是可选的
	    optionalArray: React.PropTypes.array,
	    optionalBool: React.PropTypes.bool,
	    optionalFunc: React.PropTypes.func,
	    optionalNumber: React.PropTypes.number,
	    optionalObject: React.PropTypes.object,
	    optionalString: React.PropTypes.string,
	 
	    // 可以被渲染的对象 numbers, strings, elements 或 array
	    optionalNode: React.PropTypes.node,
	 
	    //  React 元素
	    optionalElement: React.PropTypes.element,
	 
	    // 用 JS 的 instanceof 操作符声明 prop 为类的实例。
	    optionalMessage: React.PropTypes.instanceOf(Message),
	 
	    // 用 enum 来限制 prop 只接受指定的值。
	    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),
	 
	    // 可以是多个对象类型中的一个
	    optionalUnion: React.PropTypes.oneOfType([
	      React.PropTypes.string,
	      React.PropTypes.number,
	      React.PropTypes.instanceOf(Message)
	    ]),
	 
	    // 指定类型组成的数组
	    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
	 
	    // 指定类型的属性构成的对象
	    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),
	 
	    // 特定 shape 参数的对象
	    optionalObjectWithShape: React.PropTypes.shape({
	      color: React.PropTypes.string,
	      fontSize: React.PropTypes.number
	    }),
	 
	    // 任意类型加上 `isRequired` 来使 prop 不可空。
	    requiredFunc: React.PropTypes.func.isRequired,
	 
	    // 不可空的任意类型
	    requiredAny: React.PropTypes.any.isRequired,
	 
	    // 自定义验证器。如果验证失败需要返回一个 Error 对象。不要直接使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效。
	    customProp: function(props, propName, componentName) {
	      if (!/matchme/.test(props[propName])) {
	        return new Error('Validation failed!');
	      }
	    }
	  }
	}

	React 点击事件的 bind(this) 如何传参?需要通过 bind 方法来绑定参数，第一个参数指向 this,第二个参数开始才是事件函数接收到的参数:
	<button onClick={this.handleClick.bind(this, props0, props1, ...}></button>	 
	handleClick(porps0, props1, ..., event) {
	    // your code here
	}
	事件：this.handleclick.bind(this，要传的参数)
	函数：handleclick(传过来的参数，event)

	在JavaScript中，this对象是运行时基于函数的执行环境（也就是上下文）绑定的。
	this 的本质就是：this跟作用域无关的，只跟执行上下文有关。
```

### react事件处理
```
	在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为， 你必须明确的使用 preventDefault。

	1. 向事件处理程序传递参数
	通常我们会为事件处理程序传递额外的参数。例如，若是 id 是你要删除那一行的 id，以下两种方式都可以向事件处理程序传递参数：
	<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
	<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

### 条件渲染
```
	1. 与运算符 &&在 
	JavaScript 中，true && expression 总是返回 expression，而 false && expression 总是返回 false。因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。
	function Mailbox(props) {
	  	const unreadMessages = props.unreadMessages;
	  	return (
	    	<div>
	      		<h1>Hello!</h1>
      			{
      				unreadMessages.length > 0 &&
	        	<h2>
	          		您有 {unreadMessages.length} 条未读信息。
	        	</h2>
      			}
	    	</div>
	  	);
	}
	 
	const messages = ['React', 'Re: React', 'Re:Re: React'];
	ReactDOM.render(
	  	<Mailbox unreadMessages={messages} />,
	  	document.getElementById('example')
	);

	2. 三目运算符(条件表达式)
	条件渲染的另一种方法是使用 JavaScript 的条件运算符:
	condition ? true : false
	render() {
	  	const isLoggedIn = this.state.isLoggedIn;
	  	return (
	    	<div>
	      		{isLoggedIn ? (
	        		<LogoutButton onClick={this.handleLogoutClick} />
	      		) : (
	        		<LoginButton onClick={this.handleLoginClick} />
	      		)}
	    	</div>
	  	);
	}

	3. 阻止组件渲染
	在极少数情况下，可能希望隐藏组件，即使它被其他组件渲染。让 render 方法返回 null 而不是它的渲染结果即可实现。
	function WarningBanner(props) {
	  	if (!props.warn) {
	    	return null;
	  	}
	 
	  	return (
	    	<div className="warning">
	      		警告!
	    	</div>
	  	);
	}
```

### 列表 & keys
```
	1. 组件接收数组参数，每个列表元素需要分配一个 key，不然会出现警告 a key should be provided for list items，意思就是需要包含 key。
	const numbers = [1, 2, 3, 4, 5];
	const listItems = numbers.map((number) =>
	  <li key={number.toString()}>{number}</li>
	);
	

	2. JSX 允许在大括号中嵌入任何表达式，需要注意的事项（请看注释）：

	var ListItem = (props) => {       //es6中箭头函数
	    return <li>{props.value}</li>;
	}

	function NumberList(props) {
	    var numbers;    //声明在外面是因为 {} 中不能出现var,const,let等这种关键字
	    return (
	    <ul>
	      {
	        numbers = props.numbers,   //注意这里要加逗号

	        numbers.map((number) =>
	        <ListItem key={number}
	         value={number} />
	      )}
	    </ul>
	    );
	}

	var arr = [1,2,3];   //要传递的参数
	ReactDOM.render(
	    <NumberList numbers={arr}/>,  //这里的numbers就是props下的numbers,即props.numbers
	    document.all('example')
	);
```

### 组件API
```
	设置状态：setState
	替换状态：replaceState
	设置属性：setProps
	替换属性：replaceProps
	强制更新：forceUpdate
	获取DOM节点：findDOMNode
	判断组件挂载状态：isMounted

	setState(object nextState[, function callback])
	replaceState(object nextState[, function callback])
	replaceState()方法与setState()类似，但是方法只会保留nextState中状态，原state不在nextState中的状态都会被删除。
```

### 组件生命周期
```
	组件的生命周期可分成三个状态：
		Mounting：已插入真实 DOM
		Updating：正在被重新渲染
		Unmounting：已移出真实 DOM

	生命周期的方法有：
		componentWillMount 在渲染前调用,在客户端也在服务端。

		componentDidMount : 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。

		componentWillReceiveProps 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。

		shouldComponentUpdate 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 可以在你确认不需要更新组件时使用。

		componentWillUpdate在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。

		componentDidUpdate 在组件完成更新后立即调用。在初始化时不会被调用。

		componentWillUnmount在组件从 DOM 中移除之前立刻被调用。
```

### React AJAX
```
	class UserGist extends React.Component {
	  constructor(props) {
	      super(props);
	      this.state = {username: '', lastGistUrl: ''};
	  }
	 	 
	  componentDidMount() {
	    this.serverRequest = $.get(this.props.source, function (result) {
	      var lastGist = result[0];
	      this.setState({
	        username: lastGist.owner.login,
	        lastGistUrl: lastGist.html_url
	      });
	    }.bind(this));
	  }
	 
	  componentWillUnmount() {
	    this.serverRequest.abort();
	  }
	 
	  render() {
	    return (
	      <div>
	        {this.state.username} 用户最新的 Gist 共享地址：
	        <a href={this.state.lastGistUrl} rel="nofollow">{this.state.lastGistUrl}</a>    // rel="nofollow"表示搜索引擎不需要去追踪访问页面
	      </div>
	    );
	  }
	}
	 
	ReactDOM.render(
	  <UserGist source="https://api.github.com/users/octocat/gists" />,
	  document.getElementById('example')
	);
```

### 表单与事件
```
	从子组件中更新父组件的 state 时，你需要在父组件通过创建事件句柄 (handleChange) ，并作为 prop (updateStateProp) 传递到你的子组件上.

	class Content extends React.Component {
	  render() {
	    return  <div>
	              <button onClick = {this.props.updateStateProp}>点我</button>			//点击时会触发父组件上updateStateProp属性绑定的this.handleChange事件
	              <h4>{this.props.myDataProp}</h4>
	           </div>
	  }
	}
	class HelloMessage extends React.Component {
	  constructor(props) {
	      super(props);
	      this.state = {value: 'Hello Runoob!'};
	      this.handleChange = this.handleChange.bind(this);
	  }

	  handleChange(event) {
	    this.setState({value: '菜鸟教程'})
	  }

	  render() {
	    var value = this.state.value;
	    return <div>
	            <Content myDataProp = {value} 								// 传入数据
	              updateStateProp = {this.handleChange}></Content>			// 传入绑定事件
	           </div>;
	  }
	}

	ReactDOM.render(
	  <HelloMessage />,
	  document.getElementById('example')
	);
```

### React Refs
```
	使用 this.ref 来获取组件的引用，这个特殊的属性允许你引用 render() 返回的相应的支撑实例（ backing instance ）。这样就可以确保在任何时间总是拿到正确的实例。
	类似于使用 getDOMNode()方法获取DOM元素

	class MyComponent extends React.Component {
	  handleClick() {
	    // 使用原生的 DOM API 获取焦点
	    this.refs.myInput.focus();
	  }
	  render() {
	    //  当组件插入到 DOM 后，ref 属性添加一个组件的引用于到 this.refs
	    return (
	      <div>
	        <input type="text" ref="myInput" />
	        <input type="button" value="点我输入框获取焦点" onClick={this.handleClick.bind(this)}
	        />
	      </div>
	    );
	  }
	}
	 
	ReactDOM.render(
	  <MyComponent />,
	  document.getElementById('example')
	);
```