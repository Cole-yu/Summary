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