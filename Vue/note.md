# Vue2 高级用法

业务项目 2~3 个 + 横向产出 2 个

1. 业务项目
1. Vue2
1. Vue2 -> Vue3
1. Vue3：生态库升级
1. Vue2: webpack 性能优化

## mixin

混用

created
data
methods

合并

optionMergeStrategies

## plugin

vue-router

## 自定义指令

v-permission

- bind：初始化调用
- unbind：解绑调用
- inserted：指令对应的元素 -> 绑定到父节点的时候（被绑定元素插入父节点时调用 仅保证父节点存在，但不一定已被插入文档中）
- update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前

```html
<div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
<!-- 
  name: "demo"
  value: "hello!"
  expression: "message"
  argument: "foo"
  modifiers: {"a":true,"b":true}
  vnode keys: tag, data, children, text, elm, ns, context, fnContext, fnOptions, fnScopeId, key, componentOptions, componentInstance, parent, raw, isStatic, isRootInsert, isComment, isCloned, isOnce, asyncFactory, asyncMeta, isAsyncPlaceholder
 -->
```

```js
Vue.directive("demo", {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify;
    el.innerHTML =
      "name: " +
      s(binding.name) +
      "<br>" +
      "value: " +
      s(binding.value) +
      "<br>" +
      "expression: " +
      s(binding.expression) +
      "<br>" +
      "argument: " +
      s(binding.arg) +
      "<br>" +
      "modifiers: " +
      s(binding.modifiers) +
      "<br>" +
      "vnode keys: " +
      Object.keys(vnode).join(", ");
  },
});

new Vue({
  el: "#hook-arguments-example",
  data: {
    message: "hello!",
  },
});
```

## slot

v-slot -> web components

## filter

```js
export default {
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
Vue.filter("capitalize", function (value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});
```

串联过滤器 `{{ message | filterA | filterB }}`

# Vue3 新特性

## Vue3 和 Vue2 的响应式

- object.defineProperty vs Proxy

```js
const initData = {value:1}
const data = {}

Object.keys(initData).forEach(key => {
  Object.defineProperty(data,key,{
    get(){
      console.log('访问了',key);
      return initData[key];
    },
    set(v){
      console.log('修改了',key);
      initData[key] = v;
    }
  })
});
```

新增属性无法观测到，Vue使用Vue.set解决该问题
响应式对象添加一个属性，确保新的属性同样具有响应式，并且能够触发试图更新
Vue.set(target,key,value) / this.$set(target,key,value)

原理
- 基础类型 undefined null
- 数组
- 对象


```js
const initData = {value:1}
const proxy = new Proxy(initData,{
  get:function(target,key,receiver){
    console.log('访问了',key);
    return Reflect.get(target,key,receiver)
  },
  set:function(target,key,value,receiver){
    console.log('修改了',key);
    return Reflect.set(target,key,value,receiver)
  },
})
```

## 多实例

new Vue().mount('app')

createAPP().mount('xx')
createAPP().mount('xx')
createAPP().mount('xx')

## Composition API

### setup

提供了统一入口

- props：用来接收props数据 响应的
- context
  - js对象
  - this.$xxx
  - attrs
  - emit
  - slots
  - expose

```js
setup(props,context)
```

### ref 与 reactive

- 从定义数据角度对比：
  - ref用来定义：基本类型数据
  - reactive用来定义：对象（或数组）类型数据
  - 备注：ref也可以用来定义对象（或数组）类型数据, 它内部会自动通过reactive转为代理对象
- 从原理角度对比：
  - ref通过Object.defineProperty()的get与set来实现响应式（数据劫持）
  - reactive通过使用Proxy来实现响应式（数据劫持）, 并通过Reflect操作源对象内部的数据
- 从使用角度对比：
  - ref定义的数据：操作数据需要.value，读取数据时模板中直接读取不需要.value
  - reactive定义的数据：操作数据与读取数据：均不需要.value

### 声明周期

renderTracked ​
在一个响应式依赖被组件的渲染作用追踪后调用
这个钩子仅在开发模式下可用，且在服务器端渲染期间不会被调用

```js
interface ComponentOptions {
  renderTracked?(this: ComponentPublicInstance, e: DebuggerEvent): void
}

type DebuggerEvent = {
  effect: ReactiveEffect
  target: object
  type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
  key: any
}
```

renderTriggered ​
在一个响应式依赖被组件触发了重新渲染之后调用
这个钩子仅在开发模式下可用，且在服务器端渲染期间不会被调用

```js
interface ComponentOptions {
  renderTriggered?(this: ComponentPublicInstance, e: DebuggerEvent): void
}

type DebuggerEvent = {
  effect: ReactiveEffect
  target: object
  type: TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
  key: any
  newValue?: any
  oldValue?: any
  oldTarget?: Map<any, any> | Set<any>
}
```

## 异步组件
> 性能优化

在大型项目中，我们可能需要拆分应用为更小的块，并仅在需要时再从服务器加载相关组件
换言之，我们的组件可能不再是同步导入或者组件需要等待 Promise resolve 完成后才被渲染

等待异步组件时渲染一些额外内容，让应用有更好的用户体验

使用步骤

- 异步引入组件
- 使用Suspense包裹组件，并配置好default 与 fallback

```js
import {defineAsyncComponent} from 'vue'
const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
```


```html
<template>
	<div class="app">
		<h3>我是App组件</h3>
		<Suspense>
			<template v-slot:default>
				<Child/>
			</template>
			<template v-slot:fallback>
				<h3>加载中.....</h3>
			</template>
		</Suspense>
	</div>
</template>

```

## 自定义指令
> 性能优化

```js
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```





