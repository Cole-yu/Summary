# Vuex学习笔记

### Vuex 是什么？
```
	Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
```

### 什么是“状态管理模式”?
```
	new Vue({
	  // state
	  data () {
	    return {
	      count: 0
	    }
	  },
	  // view
	  template: `
	    <div>{{ count }}</div>
	  `,
	  // actions
	  methods: {
	    increment () {
	      this.count++
	    }
	  }
	})

	这个状态自管理应用包含以下几个部分：
		state，驱动应用的数据源；
		view，以声明方式将 state 映射到视图；
		actions，响应在 view 上的用户输入导致的状态变化。
```
### Vue.use(Vuex)）：

### 在组件中获取vuex的值
```	
	Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）：
	通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到
	const app = new Vue({
		el: '#app',  		
  		store,						// 重点，把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
	  	template: `<div>{{ count }}</div>`,
	  	data(){
	  		return {

	  		}
	  	}
	  	computed: {
	    	count () {
	      		return store.state.count
	    	}
	  	},
	  	methods:{
	  		increment () {
     			this.count++		// 错误示例，不要直接修改count的值
     								// 应该通过store.commit("increment")来修改count，封装了一层
    		}
	  	}
	}

	在子组件中通过 this.$store.state.todos 获取值
	在子组件中使用 this.$store.commit('xxx') 提交 mutation
```

### mutation
```	
	通过提交要执行的方法名来改变对应的值, this.$store.commit("increment");
	在子组件中更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。

	const store = new Vuex.Store({
	  	state: {
	    	count: 1
	  	},
	 	mutations: {
	    	increment (state) {	     
	      		state.count++		// 变更状态
	    	}
	  	}
	});

	提交载荷（Payload）
		向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）
		mutations: {
			increment (state, n) {
		    	state.count += n
		  	}
		}
		store.commit('increment', 10);

		在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：
			mutations: {
		  		increment (state, obj) {		// 传入一个对象
		    		state.count += obj.amount;
		  		}
			}
		在子组件中载荷为一个对象进行传递：
			store.commit('increment', {
		  		amount: 10
			});

	子组件中的方法映射:
	cosnt app=new vue({
		methods: {
		    ...mapMutations([
		      	'increment', 			// 将 this.increment() 映射为 this.$store.commit('increment')

		      	// mapMutations 也支持载荷：
		      	'incrementBy' 			// 将 this.incrementBy(amount) 映射为 this.$store.commit('incrementBy', amount)
		    ]),
		    ...mapMutations({
		      	add: 'increment' 		// 将 this.add() 映射为 this.$store.commit('increment')
		    })
		}
	});

```

### Action	
```	
	Action 提交的是 mutation，而不是直接变更状态。
	Action 可以包含任意异步操作。

	const store = new Vuex.Store({
	  	state: {
	    	count: 0
	  	},
	  	mutations: {
	    	increment (state) {
	      		state.count++
	    	}
	  	},
	  	actions: {
	    	increment (context) {
	      		context.commit('increment')
	    	}
	  	}
	});

	分发 Action:
	Action 通过 store.dispatch 方法触发：store.dispatch('increment')

	Actions 支持同样的载荷方式和对象方式进行分发：
		// 以载荷形式分发
		store.dispatch('incrementAsync', {
		  	amount: 10
		});

		// 以对象形式分发
		store.dispatch({
		  	type: 'incrementAsync',
		  	amount: 10
		});

	在组件中分发 Action:
		const app = new vue({
			methods: {
		    ...mapActions([
		    	'increment', 			// 将 this.increment() 映射为 this.$store.dispatch('increment')

		      	// mapActions 也支持载荷：
		      	'incrementBy' 			// 将 this.incrementBy(amount) 映射为 this.$store.dispatch('incrementBy', amount)
		    ]),
		    ...mapActions({
		      	add: 'increment' 		// 将 this.add() 映射为 this.$store.dispatch('increment')
		    })
		  }
		})

	组合 Action
	store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise：		
		actions: {
		  	actionA ({ commit }) {
		    	return new Promise((resolve, reject) => {
		      		setTimeout(() => {
		        		commit('someMutation')
		        		resolve()
		      		}, 1000)
		    	})
		  	}
		}

		可以继续操作：
		store.dispatch('actionA').then(() => {
  			// ...
		})

		另外一个 action 中也可以：
		actions: {
		  	// ...
		  	actionB ({ dispatch, commit }) {
		    	return dispatch('actionA').then(() => {
		      		commit('someOtherMutation')
		    	})
		  	}
		}

	如果我们利用 async / await，我们可以如下组合 action：
		// 假设 getData() 和 getOtherData() 返回的是 Promise
		actions: {
		  	async actionA ({ commit }) {
			    commit('gotData', await getData())
			},
		  	async actionB ({ dispatch, commit }) {
		    	await dispatch('actionA') 				// 等待 actionA 完成
		    	commit('gotOtherData', await getOtherData())
		  	}
		}

	store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。
```	

### module
```
	Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块

		const moduleA = {
		  	state: { ... },
		  	mutations: { ... },
		  	actions: { ... },
		  	getters: { ... }
		}

		const moduleB = {
		  	state: { ... },
		  	mutations: { ... },
		  	actions: { ... }
		}

		const store = new Vuex.Store({
		  	modules: {
		    	a: moduleA,
		    	b: moduleB
		  	}
		});

		store.state.a 			// -> moduleA 的状态
		store.state.b 			// -> moduleB 的状态

	对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。 
	【 注意：没有 { }, 是一个变量 state 】
		const moduleA = {
		  	state: { count: 0 },
		  	mutations: {
		    	increment (state) {
		      		// 这里的 `state` 对象是模块的局部状态
		      		state.count++
		    	}
		  	},

		  	getters: {
		   		doubleCount (state) {
		      		return state.count * 2
		    	}
		  	}
		}


	对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState； 
	【 注意：	有 { } 包裹的，是个对象 {state,commit,rootState} 】
		const moduleA = {
		  	// ...
		  	actions: {
		    	incrementIfOddOnRootSum ({ state, commit, rootState }) {    // context = { state , commit, rootState}  ES6的解构赋值
		      		if ((state.count + rootState.count) % 2 === 1) {		// 局部状态: state = context.state ; 根节点状态: rootState = context.rootState
		        		commit('increment');
		      		}
		    	}
		  	}
		}

	对于模块内部的 getter，根节点状态会作为第三个参数暴露出来；
	【 注意：和上面 action 的区别，是没有 { } 的，是三个变量 state,getters,rootState 】
		const moduleA = {
		  	// ...
		  	getters: {
		    	sumWithRootCount (state, getters, rootState) {
		      		return state.count + rootState.count
		    	}
		  	}
		}
```

### 模块动态注册
```	
	在 store 创建之后，你可以使用 store.registerModule 方法注册模块：
	store.registerModule('myModule', {			// 注册模块 `myModule`
	  	// todo...
	});

	store.registerModule(['nested', 'myModule'], {			// 注册嵌套模块 `nested/myModule`
	  	// todo...
	});
```