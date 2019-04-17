# Vue学习笔记

### 学习一个框架需要搞清楚的疑问
	数据绑定 组件间通讯 生命周期 Vuex(状态管理) 路由 

### 生命周期
	beforeCreate
	created
	beforeMount
	mounted
	beforeUpdate
	updated
	beforeDestroy	
	destroyed

### 基础知识
```	
	挂载点		
		<div id="app"></div>
		var app=new Vue({
			el:"#app"
		})
	也可以是
		const app = new Vue({
		  	router,
		  	render:(h)=>h(Main)  	// 将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例，createElement(标签,特性,子节点)
		}).$mount('#app')
			
	模板
		<div id="app"></div>里面的内容是模板
	也可以是
		var app=new Vue({
			template:'这里写模板内容'
		})
		
	实例
		var app=new Vue()
```

### v-text与v-html的区别
```
	var app = new Vue({
		el:"#app",
		data:{
			content:"<h1>hell world</h1>"
		}
	})
	<div>
		<div v-text="content"></div>		// 输出 <h1>hello world</h1>   	以文本形式输出，会进行转译'/t'
		<div v-html="content"></div>		// 输出 hello world  			被浏览器解释成一级标题hello world形式输出
	</div>
```

### 使用脚手架工具搭建vue项目环境
```
	cnpm install -g vue-cli
	vue init webpack 项目名称
	npm run dev 以开发环境启动项目
	npm run start
```
	
### 安装Vue Devtools	
	clone Vue-Devtools
	npm install
	npm run build
	chrome浏览器-设置-扩展程序-加载已解压的扩展程序

### 运行时+编译器  VS  只包含运行时
```
	如果需要在客户端编译模板,就将需要加上编译器
	//需要编译器
	new Vue({
		template:`<div>{{hi}}</div>`
	})

	//不需要编译器
	new Vue({
		render(h){
			return h('div',this.hi)
		}
	})
```

### Vue中的关键属性
```
	Vue.component('to-item',{
		template:'<li>全局组件</li>'				// 通过<to-item></to-item>使用
	});

	var app=new Vue({
		el:"#app",
		data:{			//编写多个变量
			firstName:"",
			lastName:"",
			show:true,
			count:0
		},
		components:{	//局部注册的组件
			'do-item':'<h1>局部组件</h1>'		// 通过<do-item></do-item>使用
		},
		methods:{		//编写多个方法
			toggle:function(){
				this.show = !this.show;
			}
		},
		created:function(){

		},
		computed:{		//计算属性的 getter
			fullName:function(){
				return this.firstName + " " + this.lastName
			}
		},
		watch:{			//侦听属性
			firstName:function(){
				this.count++;
			}
			fullName:function(){
				this.count++;
			}
		}
	});
```

### v-model指令,双向数据绑定
	<div id="app">
		<p>{{message}}</p>
		<input type="text" v-model="message">
	</div>
	var app =new Vue({
		el:'app',
		data:{
			message:'hello vue'
		}
	})

### Vue组件
* 	控制器代码：
	```
	Vue.component('todo-item',{		//定义了一个名叫todo-item组件的实例
		props:['todo'],
		template:'<li>{{todo.text}}</li>'
	})
	var app=new Vue({
		el:'#app',
		data:{
			groceryList:[
				{id:0,text:'蔬菜'},
				{id:1,text:'奶酪'},
				{id:2,text:'饮料'}
			]
		}
	})
	```
*	html代码：
	```
	<div id="app">
		<ol>
			<todo-item v-for='item in groceryList' v-bind:todo='item' v-bind:key=item.id ></todo-item>
		</ol>
	</div>
	```

### 指令
```
	使用了指令以后,=后面的内容变成了表达式
	v-html='newHtml'
	v-bind:href='url'
	v-for='item of items'
	v-if='foo==bar'
	v-on:click='doSomething'
```

### 修饰符：是以半角句号.指明的特殊后缀,用于指出一个指令应该以特殊方式绑定
	prevent修饰符告诉v-on指令对于触发的事件调用event.preventDefault()
	<form v-on:submit.prevent='onSubmit'></form>
	.stop        //阻止单击事件继续传播
	.prevent     //提交事件不再重载页面
	.capture     //使用事件捕获模式
	.self        //只有当事件源是自身时才触发处理函数,即事件不是从内部触发(冒泡模式)的
	.once 		 //只执行一次事件
	.passive     //顺从的,不阻止任何默认事件，提高浏览器性能

### 按键修饰符
	<input v-on:keyup.13="submit">   当keyCode是 13时调用vm.submit
	<input v-on:keyup.enter="submit">
	.enter
	.tab
	.delete
	.esc
	.space
	.up
	.down
	.left
	.right
	可以通过全局config.keyCodes对象自定义按键修饰符别名
	Vue.config.keyCodes.f1=112   //可以使用v-on:keyup.f1

### 自动匹配按键修饰符

### 系统修饰键
	.ctrl
	.alt
	.shift
	.meta
*	<!-- Alt + C -->
	```
	<input @keyup.alt.67="clear">
	```
*	<!-- Ctrl + Click-->
	```
	<div @click.ctrl='doSomething'>DoSomething</div>
	```
*	<!-- 单单释放ctrl触发事件 -->	
	```
	<div @keyup.17></div>
	```
*   <!-- 只有按住ctrl的情况下释放其他按键,才能触发keyup.ctrl  -->
	```
	<div @keyup.ctrl.67></div>
	```

### .exact修饰符
	.exact 修饰符允许你控制由精确的系统修饰符组合触发的事件
*	<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
	```
	<button @click.ctrl="onClick">A</button>
	```
*	<!-- 有且只有 Ctrl 被按下的时候才触发 -->
	```
	<button @click.ctrl.exact="onCtrlClick">A</button>
	```
*	<!-- 没有任何系统修饰符被按下的时候才触发 -->
	```
	<button @click.exact="onClick">A</button>
	```

### 鼠标按钮修饰符
	.left
	.right
	.middle
	这些修饰符会限制处理函数仅响应特定的鼠标按钮。

### v-model
	.lazy
	v-model在每次input事件触发后将输入框的值与数据进行同步，通过添加Lazy修饰符,从而转变为使用change事件进行同步
	<input v-model.lazy="msg">
	.number
	自动将用户的输入值转为数值类型
	<input v-model.number="msg">
	.trim
	自动过滤用户输入的首尾空白字符
	<input v-model.trim="msg">

### 指令的简写
*	"v-bind:"简写"："
	```
	<a v-bind:href="url">...</a>简写成：<a :href="url">...</a>
	```
*	"v-on:"简写"@"
	```
	<a v-on:click="doSomething">...</a>简写成：<a @click="doSomething">...</a>
	```

### 计算属性:对于任何复杂逻辑,都应当使用计算属性
```
	因为当依赖性发生改变时,计算属性会自动重新计算结果；如果依赖没有变化，则会从缓存中获取，优化性能。
	var vm=new Vue({
		el:'#example',
		data:{
			message:'hello
		},
		computed:{
			reversedMessage:function(){
				return this.message.split('').reverse('').join()  //this指向vm实例,以声明的方式创建了这种依赖关系
			}
		}
	});
```

### 侦听属性
```
	在执行异步操作(访问一个API)或开销较大的操作时,可以使watch选项来响应数据的变化,在得到最终结果前,设置中间状态pending或其他文字。
	<div id="app">
		<input type="text" v-model="firstName"/>
		<input type="text" v-model="lastName"/>
	</div>
	var app=new Vue({
		el:"#app",
		data:{
			firstName:'',
			lastName:'',
			count:0
		},
		computed:{
			fullName:function(){
				return this.firstName + " " + this.lastName;
			}
		},
		watch:{
			firstName:function(){   // 监听firstName属性
				this.count++;
			},
			lastName:function(){	// 监听lastName属性
				this.count++;
			}
		}
	})
```

### 侦听器

# HTML属性绑定

### class与style绑定
```
	v-bind:style
	v-bind:class

	<div v-bind:style="styleObject"></div>
	data:{
		styleObject:{
			color:'red',
			fontSize:'13px'
		}
	}
```	

### v-for与v-if一起使用
	v-for具有比v-if更高的优先级

### v-for还支持一个可选的第二个参数为当前项的索引
```
	<ul>
		<li v-for="(item,index) in items">
			{{index}},{{item.massage}}
		</li>
	</ul>

	建议在使用v-for的时候，添加：key来提升性能
	<ul>
		<li v-for="itme of items" :key="item">{{item}}</li>
	</ul>
```

### v-for来遍历一个对象的所有属性
	可以提供第一个参数为值,第二个的参数为键名,第三个参数为索引
	<li v-for='(value,key,index) in object'>
		{{key}}:{{value}}
	</li>

### key
	为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。理想的 key 值是每项都有的且唯一的 id。这个特殊的属性相当于 Vue 1.x 的 track-by ，但它的工作方式类似于一个属性，所以你需要用 v-bind 来绑定动态值 (在这里使用简写)：
	<div v-for="item in items" :key="item.id">
	  <!-- 内容 -->
	</div>
	建议尽可能在使用 v-for 时提供 key，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

### 数组更新检测
*	变异方法：会改变被这些方法调用的原始数组
	```
	Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。
	push
	pop
	shift
	unshift
	splice
	sort
	reverse
	```
*	非变异方法：不会改变数组，但总是返回一个新数组
	```
	filter()
	concat()
	slice()	
	当使用非变异方法时,可以用新数组替换旧数组
	```

### vue不能检测以下变动的数组,即修改内容后,不会重新渲染视图
*	以下两个例子,不会重新渲染视图,触发状态更新
	```
	利用索引直接设置一个项时,如
		vm.items[indexOfItem]=newValue  
	当修改数组的长度时,如
		vm.items.length=newLength
	```
* 	通过set修改指定索引的值可以触发状态更新
	```
	vm.$set是Vue.set的一个别名
	Vue.set(vm.items,indexOfItem,newValue);   vm.$set(vm.items,indexOfItem,newValue);
	vm.items.splice(indexOfItem,1,newValue); 	//splice语法	
	```
*	通过splice来修改数组的长度
	```
	vm.items.splice(newLength);
	```

### Vue不能检测对象属性的添加或删除
	对于已经创建的实例，Vue不能动态添加根级别的响应式属性
	但可以使用Vue.set(object,key,value)方法向嵌套对象添加响应式属性
	Vue.set(vm.userProfile,'age',27);
	为已有对象赋予多个新属性，使用Object.assign()或_.extend,应该用两个对象的属性创建一个新的对象
	不要用修改对象的方式:
		Object.assign(vm.userProfile,{
			age:27,
			favoriteColor:'Vue Green'
		})
	而应该应创建新对象的方式：
		vm.userProfile=Object.assign({}，vm.userProfile,{
			age；'27',
			favoriteColor:'Vue Green'
		})

### 向组件中传入数据
```
	<ul>
		<li v-for="item of items" :content="item"></li>
	</ul>
	Vue.component('to-item',{
		props:['content'],
		template:'<li>{{content}}</li>'
	});

```

### 在子组件模板上发射一个事件
	```
	Vue.component('todo-item',{			//创建一个全局组件
		template:'\
			<li>\
					{{titile}}\
					<button v-on:click="$emit(\'remove\')">Remove</button>button>\   //组件向外发射一个remove事件
			</li>\
		', 项下行绑定
	Vue.component('blog-post',{
		props:['title'],
		template:'<h3>{{title}}</h3>'
	})
	<blog-post title='Why Vue is so fun'></blog-post>  //一个prop被注册之后，在组件外部可以像这样把数据作为一个自定义特性传递进来
	当数据是一个数组时,需要为每篇博文渲染一个组件时,可以通过v-bind来动态传递prop
	new Vue({
		el: '#blog-post-demo',  	
		data: {
		    posts: [
		      { id: 1, title: 'My journey with Vue' },
		      { id: 2, title: 'Blogging with Vue' },
		      { id: 3, title: 'Why Vue is so fun' }
		    ]
		}
	})
	<blog-post v-for="post in posts" v-bind:key='post.id' v-bind:title='post.title'></blog-post>

*	原因：当组件变复杂时，需要传入大量的信息,为每个相关的信息定义一个prop会变得很麻烦：
	```
	错误示例：
	<blog-post
	  v-for="post in posts"
	  v-bind:key="post.id"
	  v-bind:title="post.title"
	  v-bind:content="post.content"
	  v-bind:publishedAt="post.publishedAt"
	  v-bind:comments="post.comments"
	></blog-post>
	```
*   解决方案：
	```
	因此可以重构一下这个<blog-post>组件,让它变成接收一个单独的post参数,在模板中完成数据绑定
	<blog-post v-for="post in posts" v-bind:key='post.id' v-bind:post='post'>
	Vue.component('blog-post',{
		props:['post'],             		//通过定义一个新参数对象来实现复杂业务的组件数据传入,在组件模板中完成数据绑定
		template:`
			<div class="blog-post">
				<h3>{{post.title}}</h3>
				<div v-html='post.content'></div>
			</div>
		`
	})	
	模板字符串(多行表达式)来让多行的模板更易读
	如果需要在不经过Babel或TypeScript之类的工具编译的情况下在IE浏览器下运行,应该使用折行转义字符来代替
	```

### 通过事件向父级组件发送消息
1. 	在子组件模板上通过调用内建的$emit方法并传入事件名称，来向父级组件触发一个事件:
	```
	<button v-on:click="$emit('eventName')">向组件外发射一个事件类型</button>
	```
2. 	在父组件调用子组件的组件上监听事件，并在methods中实现doSomething()方法
	```
	<blog-post v-on:eventName='doSomething'><blog-post>
	```

### $emit(事件名称,待发射值)

### 使用事件抛出一个值，在$emit的第二个参数来提供这个值
	<button v-on:click="$emit('enlarge-text',0.1)"></button>   //向组件外发射出去一个结果值
	在父级组件监听这个事件的时候，可以通过$event访问到被抛出的这个值
	<blog-post v-on:enlarge-text='postFontSize+=$event'>      //$event即为0.1
	<blog-post v-on:enlarge-text='onEnlargeText'>             //如果事件处理函数是一个方法
	那么这个值将会作为第一个参数传入到这个事件处理函数中
	methods:{
		onEnlargeText:function(enlargeAmount){                 //enlargeAmount可以为任意的字符串,其本质为$event,为事件抛出的值
			this.postFontSize+=enlargeAmount;
		}
	}

### 基本的局部注册
	new Vue({	  												 //局部注册在一个Vue实例内
		// ...,
		components:{
			'my-component':()=>import('./my-async-component')    //直接提供一个返回Promise的函数
		}
	})	

### 在模块系统中局部注册(webpack)
	import ComponentA from './ComponentA'     //导入每个需要的组件模块
	import ComponentC from './ComponentC'
	export default {
	  components: {
	    ComponentA,
	    ComponentC
	  },
	  // ...
	}

### 基础组件的自动化全局注册
	使用require.context全局注册通用的基础组件
	在应用入口文件(src/main.js)中全局导入基础组件的示例代码：
	import Vue from 'vue'
	import upperFirst from 'lodash/upperFirst'
	import camelCase from 'lodash/camelCase'
	const requireComponent = require.context(
	  // 其组件目录的相对路径
	  './components',
	  // 是否查询其子目录
	  false,
	  // 匹配基础组件文件名的正则表达式
	  /Base[A-Z]\w+\.(vue|js)$/
	)
	requireComponent.keys().forEach(fileName => {
	  // 获取组件配置
	  const componentConfig = requireComponent(fileName)
	  // 获取组件的 PascalCase 命名
	  const componentName = upperFirst(
	    camelCase(
	      // 剥去文件名开头的 `'./` 和结尾的扩展名
	      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
	    )
	  )
	  // 全局注册组件
	  Vue.component(
	    componentName,
	    // 如果这个组件选项是通过 `export default` 导出的，
	    // 那么就会优先使用 `.default`，
	    // 否则回退到使用模块的根。
	    componentConfig.default || componentConfig
	  )
	})

### Prop
*	传入一个布尔值
	```
	<!-- 包含该 prop 没有值的情况在内,都意味着 `true` -->
	<blog-post is-published></blog-post>
	<!-- 即便`false`是静态的,我们仍然需要`v-bind`来告诉Vue,这是一个JavaScript表达式而不是一个字符串 -->	
	<blog-post v-bind:is-published="false"></blog-post>
	<!-- 用一个变量进行动态赋值 -->
	<blog-post v-bind:is-published="post.isPublished"></blog-post>
	```

*	传入一个对象的所有属性,即绑定对象而不是分别绑定属性
	```
	如果需要将一个对象的所有属性都作为prop传入,可以使用不带参数的v-bind(取代v-bind:prop-name)
	例：post:{
		id：1,
		title:'My first Vue'
	}
	<blog-post v-bind='post'></blog-post>
	等价于
	<blog-post v-bind:id="post.id" v-bind:title="post.title"></blog-post>
	```

*	Prop验证
	```
	为组件的prop指定验证要求,如果有一个需求没有被满足,则vue会在浏览器控制台中发出警告,这在多人协作开发的项目中，开发一个会被别人用到的组件时显得尤其有帮助
	可以在组件的props中的值提供一个带有验证需求的对象,而不是一个字符串数组
	Vue.component('my-component', {
	  props: {
	    // 基础的类型检查 (`null` 匹配任何类型)
	    propA: Number,
	    // 多个可能的类型
	    propB: [String, Number],
	    // 必填的字符串
	    propC: {
	      type: String,
	      required: true
	    },
	    // 带有默认值的数字
	    propD: {
	      type: Number,
	      default: 100
	    },
	    // 带有默认值的对象
	    propE: {
	      type: Object,
	      // 对象或数组且一定会从一个工厂函数返回默认值
	      default: function () {
	        return { message: 'hello' }
	      }
	    },
	    // 自定义验证函数
	    propF: {
	      validator: function (value) {
	        // 这个值必须匹配下列字符串中的一个
	        return ['success', 'warning', 'danger'].indexOf(value) !== -1
	      }
	    }
	  }
	});
	```

### sync修饰符
	对一个prop进行"双向绑定"
	this.$emit('update:title',newTitle) 			//update:my-prop-name的模式触发事件
	父组件监听那个事件并根据需要更新一个本地的数据属性
	<text-docuemnt v-bind:title='doc.title' v-on:update:title='doc.title=$event'></text-document>
	为了方便起见,我们为这种模式提供一个缩写，即.sync修饰符：
	<text-document v-bind:title.sync="doc.title"></text-document>
	当我们用一个对象同时设置多个prop的时候,也可以将这个.sync修饰符和v-bind配合使用：
	<text-document v-bind.sync="doc"></text-document>		//这样doc对象的每一个属性都作为一个独立的prop传入到子组件，然后各自添加用于更新的v-on监听器

### 插槽
	将<slot>元素作为承载分发内容的出口,类似于angualr中的投影机制
	<navigation-link url="/profile">
		Your Profile
	</navigation-link>
	在<navigation-link>的模板中写为:
		<a v-bind:href="url" calss="nav-link">
			<slot></slot>
		</a>
	当组件渲染的时候<slot>元素会被替换为"Your Profile";插槽内可以包含任何模板代码,包括hmtl或者其他的组件

### 具名插槽
	当需要多个插槽,<slot>元素有一个特殊的特性:name
	<div class="container">
		<header>
			<slot name="header"></slot>
		</header>
		<main>
			<slot></slot>   //未命名插槽，默认插槽，作为所有未匹配插槽内容的统一出口
		</main>
		<footer>
			<slot name="footer"></slot>
		</footer>
	</div>
	在向具名插槽提供内容的时候，可以在一个父组件的<template>元素上使用slot属性，也可以直接用在一个普通的元素上
	<base-layout>
		<template slot="header">
			<h1>Here might be a page title</h1>
		</template>
		<p>A paragraph for the mian content.</p>
		<p>Another one.</p>
		<template slot="footer">
			<p>Here is some contact information</p>
		</template>
	</base-layout>
	可以保留一个未命名插槽,这个插槽是默认插槽,他会作为所有未匹配到插槽的内容的统一出口,将内容渲染出来

### 插槽的默认内容
	<button type="submit">
		<slot>Submit</slot>   //在slot标签内容指定默认的内容,如果父组件为这个插槽提供了内容,则默认的内容会被替换掉
	</button>

### 编译作用域
	父组件模板的所有东西都会在父级作用域内编译，子组件模板的所有东西都会在自己作用域内编译

### 作用域插槽
	提供的组件带有一个可从子组件获取数据的可复用的插槽
	<ul>
	  <li v-for="todo in todos"  v-bind:key="todo.id" >
	    <!-- 我们为每个 todo 准备了一个插槽，-->
	    <!-- 将 `todo` 对象作为一个插槽的 prop 传入。-->
	    <slot v-bind:todo="todo">
	      <!-- 回退的内容 -->
	      {{ todo.text }}
	    </slot>
	  </li>
	</ul>
	可以选择为代办项定义一个不一样的<template>作为替代方案，并且通过slot-scope特性从子组件获取数据
	<todo-list v-bind:todos="todos">
	  <!-- 将 `slotProps` 定义为插槽作用域的名字 -->
	  <template slot-scope="slotProps">
	    <!-- 为待办项自定义一个模板，-->
	    <!-- 通过 `slotProps` 定制每个待办项。-->
	    <span v-if="slotProps.todo.isComplete">✓</span>
	    {{ slotProps.todo.text }}
	  </template>
	</todo-list>

*	解构 slot-scope
	```
	ES2015 解构语法:
	<todo-list v-bind:todos="todos">
		<template slot-scope="{ todo }">
			<span v-if="todo.isComplete">✓</span>
			{{ todo.text }}
		</template>
	</todo-list>
	这会使作用域插槽变得更干净一些
	```

### 动态组件与异步组件
*	动态组件
	```
	将组件实例在他们第一次被创建的时候缓存下来，为了解决这个问题，可以使用<keep-alive>元素将其动态组件包裹起来
	<!-- 失活的组件将会被缓存! -->
	<keep-alive>
		<component v-bind:is="currentTabComponent"></component>
	<keep-alive>
	```

*	异步组件
	```
	在大型应用中，需要将应用分割成小一些的代码块,并且只有在需要的时候才从服务器加载一个模块。
	Vue允许你以一个工厂函数的方式定义你的组件,这个工厂函数惠异步解析你的组件定义，Vue只有在这个而组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染
	Vue.component('async-example',function(resolve,reject){
		setTimeout(function(){
			resolve({
				template:'<div>I am async!</div>'
			});
		},1000);
	});
	```

*	 处理加载状态
	```
	const AsyncComponent=()=>({
		// 需要加载的组件 (应该是一个 `Promise` 对象)
		component: import('./MyComponent.vue'),
		// 异步组件加载时使用的组件
		loading: LoadingComponent,
		// 加载失败时使用的组件
		error: ErrorComponent,
		// 展示加载时组件的延时时间。默认值是 200 (毫秒)
		delay: 200,
		// 如果提供了超时时间且组件加载也超时了，
		// 则使用加载失败时使用的组件。默认值是：`Infinity`
		timeout: 3000
	});
	```

### 处理边界情况
*	访问根实例
	```
	在每个new Vue实例的子组件中，其根实例可以通过$root属性进行访问
	// Vue 根实例
	new Vue({
	  data: {
	    foo: 1
	  },
	  computed: {
	    bar: function () { /* ... */ }
	  },
	  methods: {
	    baz: function () { /* ... */ }
	  }
	})
	所有的子组件都可以将这个实例作为一个全局store来访问和使用
	// 获取根组件的数据
	this.$root.foo
	// 写入根组件的数据
	this.$root.foo = 2
	// 访问根组件的计算属性
	this.$root.bar
	// 调用根组件的方法
	this.$root.baz()
	对于demo或小型的有少量组件的应用来说很方便;但在中大型应用中,强烈推荐使用Vuex来管理应用的状态
	```

* 	访问父级组件实例:$parent属性
	```
	和$root类似,$parent属性可以用来从一个子组件访问父组件的实例，它提供了一种机会，可以在后期随时触达父级组件，以替代将数据以prop的方式传入子组件的方式。但是这样将使得你的应用更难调试和理解,尤其是当你变更了父级组件的数据的时候。在后期维护的时候将很难判断那个变更是从哪里发起的。
	```

*  	访问子组件实例或子元素(ref特性),类似于angular中模板引用变量
	```
	ref特性为这个子组件赋予一个ID引用，例：
	<base-input ref="usernameInput"></base-input>
	接下来可以在控制器中，直接使用
	this.$refs.usernameInput
	在父级组件上定义方法:
	methods:{
		//用来从父级组件聚焦输入框
		focus:function(){
			this.$refs.input.focus();
		}
	}
	在父组件中通过代码控制子组件中的元素	//$refs只会在组件渲染完成之后生效
	this.$refs.usernameInput.focus()    //在父组件控制器中通过ref特性实现子组件的获取焦点的操作
	```

###	依赖注入(IOC容器，控制反转)
	provide和inject
	provide选项允许我们指定我们想要提供给后代组件的数据/方法。
	provide:function(){
		return {
			getMap:this.getMap
		}
	}
	在任何后代组件例,可以使用inject选项来接收指定的我们想要添加在这个实例上的属性:
		inject:['getMap']
	祖先组件不需要知道那些后代组件使用它提供的属性
	后代组件不需要知道被注入的属性来自哪里

### Vuex状态管理方案

### 程序化的事件侦听器
	// 一次性将这个日期选择器附加到一个输入框上
	// 它会被挂载到 DOM 上。
	mounted: function () {
	  // Pikaday 是一个第三方日期选择器的库
	  this.picker = new Pikaday({
	    field: this.$refs.input,
	    format: 'YYYY-MM-DD'
	  })
	},
	// 在组件被销毁之前，
	// 也销毁这个日期选择器。
	beforeDestroy: function () {
	  this.picker.destroy()
	}
	潜在的两个问题：
	*	需要在组件实例中保存picker,最好只有生命周期钩子可以访问到它
	*	建立的代码独立于清理代码，使得我们比较难于程序化的清理我们建立的所有东西
	通过程序化的侦听器解决这两个问题：
	mounted:function(){
		var picker=new Pikaday({
			field：this.$refs.input,
			format:"YYYY-MM-DD"
		})
		this.$once('hook:beforeDestroy',function(){
			picker.destroy()
		})
	}

### 循环引用	
	递归组件	
	组件是可以在它们自己的模板中调用自身的，但是必须通过name选项来完成。
	必须确保递归调用是条件性的,最终会得到false的v-if

### 组件之间的循环引用
	组件A依赖组件B，组件B又依赖组件A，变成一个循环,不知道如何解析出组件


# 	模板定义的替代品
### 内联模板
	当inline-template这个特性出现在一个子组件上，这个组件将会使用其里面的内容作为模板，而不是将其作为被分发的内容，使得模板的撰写工作更加灵活。
	<my-component inline-template>    //组件的html模板
	  <div>
	    <p>These are compiled as the component's own template.</p>
	    <p>Not parent's transclusion content.</p>
	  </div>
	</my-component>

### X-Templates(不推荐,了解就行,导致模板和组件的其他定义分离)
	在script元素中给，并未其带上text/x-template的类型，然后通过一个id将模板引用过去。	
	<script type="text/x-template" id="hello-world-template">
	  <p>Hello hello hello</p>
	</script>
	Vue.component('hello-world',{
		template:"#hello-world-template"
	})

### 控制更新
	如果你发现你自己需要在 Vue 中做一次强制更新，99.9% 的情况，是你在某个地方做错了事
	可以通过$forceUpdate来实现手动强制更新
*	通过v-once创建低开销的静态组件
	```
	Vue.component('terms-of-service', {
	  template: `
	    <div v-once>
	      <h1>Terms of Service</h1>
	      ... a lot of static content ...
	    </div>
	  `
	})	
	当需要渲染大量静态内容时，极少数的情况下会给你带来便利。 静态组件：模板是个静态固定内容，无法修改、更新。
	例如，设想另一个开发者并不熟悉 v-once 或者 在模板中漏看了它，他们可能会花很多个小时去找出模板为什么无法正确更新的原因。
	```

### 进入、离开&列表的过渡
1.  Vue在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。
	* 在 CSS 过渡和动画中自动应用 class
	* 可以配合使用第三方 CSS 动画库，如 Animate.css
	* 在过渡钩子函数中使用 JavaScript 直接操作 DOM
	* 可以配合使用第三方 JavaScript 动画库，如 Velocity.js
2. 	Vue提供了transition的封装组件,可以给任何元素和组件添加进入/离开过渡
	```
	<div id="demo">
	  <button v-on:click="show = !show">
	    Toggle
	  </button>
	  <transition name="fade">
	    <p v-if="show">hello</p>
	  </transition>
	</div>
	new Vue({
		<button v-on:click="show=!show">Toggle</button>
		<transition name="fade">
			<p v-if="show">Hello</p>
		</transition>
	})
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
	```
*  当插入或删除包含在 transition 组件中的元素时，Vue 将会做以下处理：
    1. 自动嗅探目标元素是否应用了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名。
	2. 如果过渡组件提供了 JavaScript 钩子函数，这些钩子函数将在恰当的时机被调用。
	3. 如果没有找到 JavaScript 钩子并且也没有检测到 CSS 过渡/动画，DOM 操作 (插入/删除) 在下一帧中立即执行。(		注意：此指浏览器逐帧动画机制，和 Vue 的 nextTick 概念不同)

### 过渡的类名
1. 	v-enter:进入过渡的开始状态，在元素被插入之前生效，在元素被插入之后的下一帧移除
2. 	v-enter-active：进入过渡生效时的状态,在整个进入过渡的阶段中应用，在元素之前生效
3.  v-enter-to：进入过渡的结束状态，元素被插入之后下一帧生效(v-enter被移除)
4.  v-leave：离开过度的开始状态，在离开过渡被触发时立刻生效，下一帧被移除
5.  v-leave-active：离开过渡生效时的状态，整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除;用力定义离开过渡的过程时间，延迟和曲线函数。
6.  v-leave-to：离开过渡的结束状态，在离开过渡被触发之后下一帧生效(同时v-leave被移除),在过渡/动画完成之后移除

* 	如果transition标签没有名字，则v-是这些类名的默认前缀，如果使用了name属性(<transiton name="my-transition">),那么v-enter会被替换为my-transition--enter,即name属性值会替换v-前缀

### 自定义过渡的类名
	enter-class
	enter-active-class
	enter-to-class
	leave-class
	leave-active-class
	leave-to-class
	他们的优先级高于普通的类名

###	JavaScript钩子
	<transition
	  v-on:before-enter="beforeEnter"
	  v-on:enter="enter"
	  v-on:after-enter="afterEnter"
	  v-on:enter-cancelled="enterCancelled"
	  v-on:before-leave="beforeLeave"
	  v-on:leave="leave"
	  v-on:after-leave="afterLeave"
	  v-on:leave-cancelled="leaveCancelled" >
	  	//someThing
	</transition>
		// ...
	methods: {
	  // --------
	  // 进入中
	  // --------
	  beforeEnter: function (el) {
	    // ...
	  },
	  // 此回调函数是可选项的设置
	  // 与 CSS 结合时使用
	  enter: function (el, done) {      //当只用JavaScript过渡的时候,在enter和leave中必须使用done进行回调。否则,它们将被同步调用,过渡会立即完成。
	    // ...
	    done()
	  },
	  afterEnter: function (el) {
	    // ...
	  },
	  enterCancelled: function (el) {
	    // ...
	  }
	  // --------
	  // 离开时
	  // --------
	  beforeLeave: function (el) {
	    // ...
	  },
	  // 此回调函数是可选项的设置
	  // 与 CSS 结合时使用
	  leave: function (el, done) { 		//当只用JavaScript过渡的时候,在enter和leave中必须使用done进行回调。否则,它们将被同步调用,过渡会立即完成。
	    // ...
	    done()
	  },
	  afterLeave: function (el) {
	    // ...
	  },
	  // leaveCancelled 只用于 v-show 中
	  leaveCancelled: function (el) {
	    // ...
	  }
	}

### 过渡模式
	in-out：新元素先进行过渡，完成之后当前元素过渡离开。
	out-in：当前元素先进行过渡，完成之后新元素过渡进入。	

### 列表过渡
```
	<transition-group></transiton-group>组件
	* 不同于 <transition>，它会以一个真实元素呈现：默认为一个 <span>。你也可以通过tag特性更换为其他元素。
	* 过渡模式不可用,因为我们不再相互切换特有的元素。
	* 内部元素总是需要提供唯一的key属性值。
	<transition-group name="list" tag="p">
	    <span v-for="item in items" v-bind:key="item" class="list-item">
	      {{ item }}
	    </span>
	</transition-group>

	列表的进入/离开过渡
	列表的排序过渡
	列表的交错过渡//筛选

	可复用的过渡
	将 <transition> 或者 <transition-group> 作为根组件，然后将任何子组件放置在其中就可以了。

	动态过渡
	动态过渡最基本的例子是通过 name 特性来绑定动态值。
	创建动态过渡的最终方案是组件通过接受 props 来动态修改之前的过渡。
	<transition v-bind:name="transitionName">
  		<!-- ... -->
	</transition>
```

### 全局样式与局部样式,添加scoped修饰符
	scoped修饰符可以确保样式保持在组件范围内，不会影响其它组件。


# vue-router

### 安装
```
	npm install vue-router -g
	npm install vue-router -save-dev

	import Vue from 'vue'
	import VueRouter from 'vue-router'

	Vue.use(VueRouter)
```	

### vue-router 遇到的问题	
```	
	[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. 
	Either pre-compile the templates into render functions, or use the compiler-included build.

	webpack.cong.js 文件中设置为编译版本
	resolve: {
	    alias: {
	        'vue$': 'vue/dist/vue.esm.js' 		//内部为正则表达式  vue结尾的
	    }
	}
```

### this.$router 和 router 使用起来完全一样。 使用 this.$router 的原因是可以避免在每个独立需要封装路由的组件中都导入路由。
```	
	类似与 this.$store.state , this.$rootState 获取根节点的 store , state

	方式一
	const app = new Vue({
	  	router
	}).$mount('#app')

	.vue 单文件
	export default {
	    data(){
	        return {

	        }
	    },
	    router,
	    store,
	    components:{

	    },
	    methods:{

	    }    
	}
```

###	路由中传递参数的方式
```	
	在一个路由中设置多段“路径参数”，对应的值都会设置到 this.$route.params 中
	{ path: '/user/:username', component: User } 	通过 this.$route.params.username 获取
```

### 捕获所有路由或 404 Not found 路由
```
	{  		
  		path : '/user-*' , component: App					// 会匹配以 `/user-` 开头的任意路径
  		path : '*' , redirect : "/user"
	}

	当使用一个通配符 * 时，$route.params 内会自动添加一个名为 pathMatch 参数。它包含了 URL 通过通配符被匹配的部分：

	// 给出一个路由 { path: '/user-*' }
	this.$router.push('/user-admin')
	this.$route.params.pathMatch // 'admin'

	// 给出一个路由 { path: '*' }
	this.$router.push('/non-existing')
	this.$route.params.pathMatch // '/non-existing'
```

###	嵌套路由
```
	注意： 以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。	

	routes: [
	    { 	
	    	path: '/user/:id', component: User,
	      	children: [
	    		{
	          		// 当 /user/:id/profile 匹配成功，
	          		// UserProfile 会被渲染在 User 的 <router-view> 中
	          		path: 'profile',
	          		component: UserProfile
	        	},
	        	{
	          		// 当 /user/:id/posts 匹配成功
	          		// UserPosts 会被渲染在 User 的 <router-view> 中
	          		path: 'posts',
	          		component: UserPosts
	        	}
	      	]
	    }
	]
```

### 编程式的导航
```
	除了使用 <router-link> 创建 a 标签来定义导航链接，还可以借助 router 的实例方法，通过编写代码来实现。
	
	点击 <router-link :to="/app"> 等同于调用 router.push("/app")
	
	声明式 <router-link :to="/app">
	编程式 router.push("/app")
	
	router.push(location, onComplete?, onAbort?)

	router该方法的参数可以是一个字符串路径，或者一个描述地址的对象。
	例如：
		// 字符串
		router.push('home')

		// 对象, params 会被忽略，详见下面的 【注意】
		router.push({ path: 'home' })

		// 命名的路由，可以带属性 "params"
		router.push({ name: 'user', params: { userId: '123' }})

		// 带查询参数，变成 /register?plan=private
		router.push({ path: 'register', query: { plan: 'private' }})

		const userId = '123'
		router.push({ name: 'user', params: { userId }}) 			// -> /user/123		
	
	注意：如果提供了 path，params 会被忽略，需要提供路由的 name 或手写完整的带有参数的 path
		// 这里的 params 不生效
		router.push({ path: '/user', params: { userId }}) 			// -> /user
	应该改写为：
		提供路由的 name 或手写完整的带有参数的 path
		router.push({ name: 'user', params: { userId }}) 			// -> /user/123
		router.push({ path: `/user/${userId}` }) 					// -> /user/123
```

### router.replace 
```
	router.replace(location, onComplete?, onAbort?)
	跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

	声明式	<router-link :to="/life" replace>	
	编程式 	router.replace("/life");		// 替换当前的url localhost:8080/#/app => localhost:8080/#/life
```	

### router.go(n)
```
	// 在浏览器记录中前进一步，等同于 history.forward()
	router.go(1)

	// 后退一步记录，等同于 history.back()
	router.go(-1)

	// 前进 3 步记录
	router.go(3)

	// 如果 history 记录不够用，那就默默地失败呗
	router.go(-100)
	router.go(100)
```

### 操作history
```
	router.push 	window.history.pushState
	router.replace 	window.history.replaceState
	router.go 		window.history.go
```

### 命名路由
```
	const router = new VueRouter({
	  routes: [
	    {
	      path: '/user/:userId',
	      name: 'user',
	      component: User
	    }
	  ]
	})
	要链接到一个命名路由，可以给 router-link 的 to 属性传一个对象：

	<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
	
	这跟代码调用 router.push() 是一回事：
	router.push({ name: 'user', params: { userId: 123 }});
```	

### 命名视图
```
	<router-view class="view one"></router-view>
	<router-view class="view two" name="a"></router-view>
	<router-view class="view three" name="b"></router-view>

	const router = new VueRouter({
	  	routes: [
	    	{
	      		path: '/',			// 不同的视图中显示不同的组件
	      		components: {
	        		default: Foo,
	        		a: Bar,
	        		b: Baz
	      		}
	    	}
	  	]
	})
```	

###	重定向路由 和 别名
```
	const router = new VueRouter({
	  	routes: [
	    	{ path: '/a', redirect: '/b' }
	    	{ path: '/c', redirect: { name: 'foo' }},
	    	{ path: '/d', redirect: to => {
		      	// 方法接收 目标路由 作为参数
		      	// return 重定向的 字符串路径/路径对象
		    }},

		    // alias: e 的别名是 /f，意味着当用户访问 /f 时，URL 会保持为 /f，但是路由匹配则为 /e，就像用户访问 /e 一样。
		    { path: '/e', component: A, alias: '/f' }
	  	]
	})
```

### 路由组件传参
```
	通过 props 解耦
	const User = {
	  	props: ['id'],
	  	template: '<div>User {{ id }}</div>'
	}
	const router = new VueRouter({
	  	routes: [
	    	{ path: '/user/:id', component: User, props: true },

	    	// 对于包含命名视图的路由，必须分别为每个命名视图添加 `props` 选项：
	    	{
	      		path: '/user/:id',
	      		components: { default: User, sidebar: Sidebar },
	      		props: { default: true, sidebar: false }		// 对于多个视图的props , 用对象来表示
	    	}
	  	]
	})
	布尔模式:
		如果 props 被设置为 true，route.params 将会被设置为组件属性。
		const User={
			props:["id"],
			template: '<div>User {{ id }}</div>'
		}

	对象模式:
		如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。		
		const router = new VueRouter({
		  	routes: [
		    	{ path: '/promotion/from-newsletter', component: Promotion, props: { newsletterPopup: false } }
		  ]
		})

		const User={
			props:[{
				newsletterPopup: false
			}],
			template: '<div>User {{ newsletterPopup }}</div>'	
		}

	函数模式:
		创建一个函数返回 props
		props:function(route){
			return {
				query : route.query.q
			}
		}

		const router = new VueRouter({
		  	routes: [
		    	{ path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }
		  	]
		});

		// route.query.q = "vue"
		props:{
			query : "vue"
		}
		URL /search?q=vue 会将 {query: 'vue'} 作为属性传递给 SearchUser 组件。
```	

### vue-router 默认 hash 模式(/#) —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

##	路由守卫

### 全局前置守卫
```
	const router = new VueRouter({ ... })

	router.beforeEach((to, from, next) => {
	  	// ...
	})

	每个守卫方法接收三个参数：
		to: Route: 即将要进入的目标 路由对象
		from: Route: 当前导航正要离开的路由
		next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
			next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
			
			next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。

			next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。

			next(error): 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
```

###	路由 API
```
	router.beforeEach 	全局前置守卫
	router.afterEach  	全局后置钩子
	
	beforeEnter 		在路由配置上直接定义 beforeEnter 守卫
		const router = new VueRouter({
		  	routes: [
		    	{
		      		path: '/foo',
		      		component: Foo,
		      		beforeEnter: (to, from, next) => {
		        		// ...
		      		}
		    	}
		  	]
		})
	
	组件内的守卫
		beforeRouteEnter 	在渲染该组件的对应路由被 confirm 前调用不！能！获取组件实例 `this`,因为当守卫执行前，组件实例还没被创建
		beforeRouteUpdate	当前路由改变，但是该组件被复用时调用
		beforeRouteLeave	导航离开该组件的对应路由时调用
```		

### 完整的导航解析流程
```
	导航被触发。
	在失活的组件里调用离开守卫。
	调用全局的 beforeEach 守卫。
	在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
	在路由配置里调用 beforeEnter。
	解析异步路由组件。
	在被激活的组件里调用 beforeRouteEnter。
	调用全局的 beforeResolve 守卫 (2.5+)。
	导航被确认。
	调用全局的 afterEach 钩子。
	触发 DOM 更新。
	用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
```

### 过渡动效

### 路由懒加载
```	
	首先，可以将异步组件定义为返回一个 Promise 的工厂函数 (该函数返回的 Promise 应该 resolve 组件本身)：
	const Foo = () => Promise.resolve({ /* 组件定义对象 */ })

	第二，在 Webpack 2 中，我们可以使用动态 import语法来定义代码分块点 (split point)：
	import('./Foo.vue') 				// 返回 Promise

	把组件按组分块
	有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。
	只需要使用 命名 chunk，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。

	// webpack 设置chunk name 的方式：/* webpackChunkName: " 自定义的名称 " */
	const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
	const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
	const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
	
	Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。
```	

### 路由懒加载的三种方式
```
	方法一：最原始的异步组件
	Vue.component('async-webpack-example', function (resolve, reject) {
	  	// 这个特殊的 `require` 语法将会告诉 webpack 自动将你的构建代码切割成多个包，这些包会通过 Ajax 请求加载
		require(['./my-async-component'], resolve)
	})
	Vue.component('async-example', function (resolve, reject) {	  
	    // 向 `resolve` 回调传递组件定义
	    resolve({
	      template: '<div>I am async!</div>'
	    })	  
	})

	方法二
	component: resolve => require(['./my-async-component'], resolve)

	方法三 webpack2 和 ES2015 语法组合 
	// import` 函数会返回一个 `Promise` 对象。
	component: () => import('./my-async-component')
```

### 非父子组件传参
```
	第一步 创建一个公共实例
	bus.js
	import Vue from "vue";
	export default new Vue();

	第二步 组件A中
	import Bus from 'bus.js';
	Bus.$emit('eventName', data);				// 发射事件

	第三步 组件B中
	import Bus from 'bus.js';
	Bus.$on('eventName', function(data){		// 接收事件
		console.log(data);
	});
```