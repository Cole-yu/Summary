# Vue3学习笔记

### 单文件组件
```
Vue 的单文件组件 (即 *.vue 文件，英文 Single-File Component，简称 SFC) ，
Vue 的单文件组件会将一个组件的逻辑 (JavaScript)，模板 (HTML) 和样式 (CSS) 封装在同一个文件里。

Webpack 和 Vue CLI(基于 webpack) 构建 vue3 项目时使用 @vue/compiler-sfc 解析 SFC 文件。
@vitejs/plugin-vue​ 为 Vite 提供 Vue SFC 支持的官方插件。
```

### 渐进式框架
```
注重灵活性和“可以被逐步集成”这个特点。
声明式渲染、组件系统、客户端路由、大规模状态管理、构建工具多个核心部件可以任意组合使用。

为什么将 Vue 称为“渐进式框架”的原因？
可以用不同的方式使用 Vue：
  1. 无需构建步骤，渐进式增强静态的 HTML
  2. 在任何页面中作为 Web Components 嵌入
  3. 单页应用 (SPA)
  4. 全栈 / 服务端渲染 (SSR)
  5. Jamstack / 静态站点生成 (SSG)
  6. 开发桌面端、移动端、WebGL，甚至是命令行终端中的界面
```

### ​API 风格
```
两种不同的风格书写：选项式API和组合式API。

（1）选项式 API 
  以“组件实例”的概念为中心，对于有面向对象语言背景的用户来说，这通常与基于类的心智模型更为一致。
  同时，它将响应性相关的细节抽象出来，并强制按照选项来组织代码，从而对初学者而言更为友好。
  当不需要使用构建工具，或者打算主要在低复杂度的场景中使用 Vue，例如渐进增强的应用场景，推荐采用选项式 API。

（2）组合式 API 
  组合式 API 的核心思想是直接在函数作用域内定义响应式状态变量，并将从多个函数中得到的状态组合起来处理复杂问题。这种形式更
  加自由，也需要对 Vue 的响应式系统有更深的理解才能高效使用。相应的，它的灵活性也使得组织和重用逻辑的模式变得更加强大。打
  算用 Vue 构建完整的单页应用，推荐采用组合式 API + 单文件组件。
```

### 响应式基础
```
<script setup> 中顶层的导入、声明的变量和函数可在同一组件的模板中直接使用。
可以理解为模板是在同一作用域内声明的一个 JavaScript 函数——它自然可以访问与它一起声明的所有内容。

reactive() 返回的是一个原始对象的 Proxy，它和原始对象是不相等的。
const raw = {};
const proxy = reactive(raw);
// 代理对象和原始对象不是全等的
console.log(proxy === raw); // false
```

### 内置组件
```
Transition
TransitionGroup
KeepAlive
Teleport
Suspense
```

### 编译宏
```
编译时宏‌不是运行时函数，而是在代码编译阶段被 Vue 编译器识别并转换为等价的选项式 API 代码（如 props 选项），
最终不会出现在打包后的 JavaScript 文件中。 ‌编译时宏‌仅限 <script setup>‌：它只能在 <script setup> 的顶层使用，
不能在条件语句、函数内部或其他文件中调用。defineProps, defineEmits, defineModel, defineExpose, defineOptions,
defineSlots 这些是 Vue 3 中的编译时宏，它在 <script setup> 语法糖中被特殊处理，无需从 Vue 中导入即可直接使用。‌
```

### 不同文件模式的写法方式
```
方式一，在使用 <script setup> 的单文件组件(.vue)中，props 可以使用 defineProps() 宏来声明：
// mv-count.vue
<template>
	<div class="component-card mv-counter-wrap">
      <h2>Counter 组件</h2>
      <p>当前计数：{{ count }}</p>
      <div>
        <button @click="increment">+ 增加</button>
      </div>
    </div>
</template>

<script setup>
	import { ref } from "vue";
	const emit = defineEmits(['count-change']);

	// const props = defineProps(["count", "txt"]);
	const props = defineProps({
		initialCount: {
			type: Number,
			required: false,
      		default: 0,
      		validator: (value) => value >= 0;
		},
	});

	const count = ref(props.initialCount);

    // 增加计数的方法
    const increment = () => {
      count.value++;
      // 触发自定义事件，向父组件传递当前计数
      emit("count-change", count.value);
    };
</script>

方式二，在没有使用 <script setup> 的组件中，props 可以使用 props 选项来声明：
// mv-count.js
import { ref } from 'vue';
export default {
  emits: ["count-change"],
  // props: ['initialCount'],
  props: {
  	initialCount: {
		type: Number,
		required: false,
      	default: 0,
      	validator: (value) => value >= 0;
	},
  },
  // setup() 接收 props 作为第一个参数
  setup(props, { emit, attrs, expose, slots }) {
  	const count = ref(props.initialCount);

    // 增加计数的方法
    const increment = () => {
      count.value++;
      // 触发自定义事件，向父组件传递当前计数
      emit("count-change", count.value);
    };

    return {
    	count,
    	increment,
    }
  },
  // 组件模板
  template: `
    <div class="component-card mv-counter-wrap">
		<h2>Counter 组件</h2>
      	<p>当前计数：{{ count }}</p>
      	<button @click="increment">+ 增加</button>
    </div>
  `
}
```

### 组件v-model
```
使用<script setup>单文件模式

<!-- child.vue -->
<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="update">Increment</button>
</template>

<script setup>
// const model = defineModel();
const model = defineModel({
	default: 0,
	// require: true, // 使 v-model 必填
});

function update() {
  model.value++;
}
</script>

父组件
<!-- parent.vue -->
<template>
	<Child v-model="countModel" />
</template>

defineModel() 返回的值是一个 ref。

model.value 和父组件的 v-model=countModel 的值同步
```

### 依赖注入
1. Provide (提供)
```
要为组件后代提供数据，需要使用到 provide() 函数：
<script setup>
  import { ref, provide } from 'vue';
  count value = ref(0);
  provide('message', value);
</script>
```

2. Inject (注入)
```
要注入上层组件提供的数据，需使用 inject() 函数：
<script setup>
  import { inject } from 'vue';
  const message = inject('message');
  const value = inject('message', '这是默认值');
</script>

注入默认值：在注入一个值时不要求必须有提供者，那么应该声明一个默认值。
```

### 异步组件
```
Vue 提供了 defineAsyncComponent 方法来实现此功能，defineAsyncComponent 方法接收一个返回 Promise 的加载函数。

import { defineAsyncComponent } from 'vue';
const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...从服务器获取组件
    resolve(/* 获取到的组件 */)
  })
});

全局注册一个异步组件
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue'); // import（ES模块动态导入）返回一个 Promise 对象
));

defineAsyncComponent 高级选项配置语法：

const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,

  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```