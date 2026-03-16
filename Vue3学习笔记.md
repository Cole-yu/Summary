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


1. 为什么需要使用带有 .value 的 ref？

// 伪代码，不是真正的实现
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}

-----源码解读-----
function ref(value) {
  return createRef(value, false);
}

function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}

class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = undefined;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}

const toReactive = (value) => isObject(value) ? reactive(value) : value;

function reactive(target) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap); // Proxy对象
}

function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  // target is already a Proxy, return it.
  // exception: calling readonly() on a reactive object
  if (target["__v_raw" /* ReactiveFlags.RAW */] &&
    !(isReadonly && target["__v_isReactive" /* ReactiveFlags.IS_REACTIVE */])) {
    return target;
  }
  // target already has corresponding Proxy
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  // only specific value types can be observed.
  const targetType = getTargetType(target);
  if (targetType === 0 /* TargetType.INVALID */) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 /* TargetType.COLLECTION */ ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
```

### 额外的 ref 解包细节
```
1. 作为 reactive 对象的属性
一个 ref 会在作为响应式对象的属性被访问或修改时自动解包

const count = ref(0);
const state = reactive({
  count
});

console.log(state.count); // 0

state.count = 1
console.log(count.value); // 1

2. 数组和集合的注意事项
当 ref 作为响应式数组或原生集合类型 (如 Map) 中的元素被访问时，它不会被解包。
const books = reactive([ref('Vue 3 Guide')]);
// 这里需要 .value
console.log(books[0].value);

const map = reactive(new Map([['count', ref(0)]]));
// 这里需要 .value
console.log(map.get('count').value);

3. 在模板中解包的注意事项
在模板渲染上下文中，只有顶级的 ref 属性才会被解包。

const count = ref(0);
const object = { id: ref(1) };
count 和 object 是顶级属性，但 object.id 不是顶级属性，在计算表达式时 object.id 没有被解包，仍然是一个 ref 对象

模板语法中：正确 ✅
{{ count + 1 }} // 表达式按预期工作

模板语法中：错误 ❌
{{ object.id + 1 }} // [object Object]1，在计算表达式时 object.id 没有被解包，仍然是一个 ref 对象

模板语法中：正确 ✅
const { id } = object; // 定义新属性 id 为顶级属性
{{ id + 1 }}

如果 ref 是文本插值的最终计算值 (即 {{ }} 标签)，那么它将被解包，内容将正确渲染
模板语法中：正确 ✅
{{ object.id }} // 在插值表达式中为最终计算值
```

### v-if 与 v-show
```
v-if 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建。
v-if 也是惰性的：如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染。

v-show 元素无论初始条件如何始终会被渲染，只有 CSS display 属性会被切换。
如果表达式为 true：元素的 display 属性为默认值（如 block/inline），正常显示；
如果表达式为 false：Vue 会给该元素添加内联样式 display: none，元素存在于 DOM 中但不可见。

v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。

总结:
  1. v-if 初始渲染：遵循「惰性原则」，条件为 false 时完全跳过渲染，无 DOM 节点、无生命周期执行，
    初始开销极低；条件为 true 时才创建 DOM 并执行生命周期。
  2. v-show 初始渲染：无惰性，无论条件真假，都会先创建 DOM 并执行完整生命周期，
    仅通过 display: none 控制隐藏，初始始终有 DOM 渲染开销。
  3. 选型依据：初始条件大概率为 false 且很少切换（如权限控制），用 v-if 节省初始渲染资源；
    初始条件可能频繁切换（如开关），用 v-show 避免后续 DOM 重建开销。
```

### 侦听器
1. watch 与 watchEffect​
```
watch 和 watchEffect 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：
  (1) watch 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。
    watch 会避免在发生副作用时追踪依赖，因此，能更加精确地控制回调函数的触发时机。

  (2) watchEffect，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。
    这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。
```

2. 侦听器的副作用清理
```
(1) 使用 onWatcherCleanup()  API 来注册一个清理函数，当侦听器失效并准备重新运行时会被调用。
import { watch, onWatcherCleanup } from 'vue';

watch(id, (newId) => {
  const controller = new AbortController();

  fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
    // 回调逻辑
  });

  onWatcherCleanup(() => {
    // 终止过期请求
    controller.abort();
  });
});

(2) 使用 onCleanup 函数
onCleanup 函数作为 watch 中回调函数第三个参数“(newId, oldId, onCleanup)”传递给侦听器回调，
以及 watchEffect 作用函数的第一个参数。

watch(id, (newId, oldId, onCleanup) => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  });
});

watchEffect((onCleanup) => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  });
});
```

3. 侦听器回调的触发时机
```
默认情况下，侦听器回调会在父组件更新 (如有) 之后、所属组件的 DOM 更新之前被调用。

Post Watchers 如果想在侦听器回调中能访问被 Vue 更新之后的所属组件的 DOM，你需要指明 flush: 'post'。

watch(source, callback, {
  flush: 'post'
});

watchEffect(callback, {
  flush: 'post'
});

后置刷新的 watchEffect() 有个更方便的别名 watchPostEffect()。

import { watchPostEffect } from 'vue';
watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
});
```

4. 同步侦听器
```
创建一个同步触发的侦听器，它会在 Vue 进行任何更新之前触发：

watch(source, callback, {
  flush: 'sync'
});

watchEffect(callback, {
  flush: 'sync'
});

同步触发的 watchEffect() 有个更方便的别名 watchSyncEffect()。

import { watchSyncEffect } from 'vue';
watchSyncEffect(() => {
  /* 在响应式数据变化时同步执行 */
});
```

5. 停止侦听器
```
在 setup() 或 <script setup> 中用同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。
因此，在大多数情况下，无需关心怎么停止一个侦听器。

要手动停止一个侦听器，调用 watch 或 watchEffect 返回的函数：
const unwatch = watch(source, (newId, oldId) => {});
unwatch(); // ...当该侦听器不再需要时

const unwatch = watchEffect(() => {});
unwatch();
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