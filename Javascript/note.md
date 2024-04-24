# this 指针/闭包/作用域

## 原型 原型链

```js
function Person() {}
var person = new Person();
person.name = 'JacobSu';
console.log(person.name);

function Person() {}
Person.prototype.name='JacobSu'

const person1 = new Person();
const person2 = new Person();
console.log(person1.name, person2.name)

function Person() {}
const person = new Person();
console.log(person.__proto__ === Person.prototype)
console.log(Person === Person.prototype.constructor)

function Person() {}
const person = new Person();
console.log(Object.getPrototypeOf(person) === Person.prototype)
console.log(Person.prototype.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__)
```

## 作用域

源程序代码中定义变量的区域

静态作用域 / 词法作用域：作用域在函数定义时就确定好了（JS）

动态作用域：函数作用域，在函数调用时才确定

```js
var value = 1
function foo(){
  console.log(value)
}
function bar(){
  var value = 2
  foo()
}
bar() // 1

// case 1
var scope = "global scope"
function checkscope(){
  var scope = "local scope"
  function f(){
    return scope
  }
  return f()
}
console.log(checkscope()) // local scope

// case2
var scope = "global scope"
function checkscope(){
  var scope = "local scope";
  function f(){
    return scope;
  }
  return f
}
console.log(checkscope()()) // local scope
```

## 执行上下文

```js
var foo = function(){
  console.log("foo1")
}
foo() // foo1
var foo = function(){
  console.log("foo2")
}
foo() // foo2

function foo(){
  console.log("foo1")
}
foo() // foo2
function foo(){
  console.log("foo2")
}
foo() // foo2
console.log(add2(1,1)) // 2
function add2(a, b){
  return a + b
}
console.log(add1(1,1)) // Error
var add1 = function(a, b){
  return a + b
}
```

执行上下文 -> 准备工作，准备去执行

execution context

执行上下文栈 FILO

Execution context stack ECS

可执行代码类型

1. 全局类型
2. 函数类型
3. eval

```js
function fun3(){
  console.log("fun3")
}
function fun2(){
  fun3()
}
function fun1(){
  fun2()
}
fun1()
```

ECStack = [
  functionContext,
  blobalContext
]

每一个执行上下文中的属性

1. 变量对象 variable object VO
2. 作用域链 scope chain
3. this

## 变量对象

存储执行上下文中的变量和函数声明

### 全局上下文的变量对象

window console.log(this) // this == window

### 函数上下文的变量对象

AO activation object 活动对象

arguments

#### 进入到当前函数的执行上下文

1. 定义形式参数
2. 函数声明
3. 变量声明

```js
function foo(a){
  var b = 2;
  function c(){}
  var d = function (){};

  b = 3;
}
foo(1)

AO = {
  arguments: {
    0: 1,
    length: 1
  },
  a: 1,
  b: undefined,
  c: reference to function c,
  d: undefined,
}
```

#### 代码执行

```js
AO = {
  arguments: {
    0: 1,
    length: 1
  },
  a: 1,
  b: 3,
  c: reference to function c,
  d: reference to function expression,
}
```

```js
function foo(){
  console.log(a)
  a = 1; // 全局声明
}
foo() // Error

AO = {
  arguments: {
    length: 0
  },
}

function bar(){
  a = 1; // 全局声明
  console.log(a)
}
bar() // 1
```

## 作用域链

```js
function foo(){
  function bar(){
  }
}
```

### 函数创建

foo.[[scope]] = [
  globalContext.VO
]
bar.[[scope]] = [
  foo.AO,
  globalContext.VO
]

### 函数执行

foo.[[scope]] = [
  foo.AO,
  globalContext.VO
]
bar.[[scope]] = [
  bar.AO,
  foo.AO,
  globalContext.VO
]

```js
var scope = "global scope"
function checkscope(){
  var scope2 = "local scope"
  return scope2
}
checkscope()

// 创建时
checkscope.[[scope]] = [
  globalContext.VO
]
// 执行时
checkScope.[[scope]] = [
  checkScope.AO,
  globalContext.VO
]

checkScopeContext = {
  AO:{
    arguments: {
      length: 0
    },
    scope2: "local scope",
    Scope: [
      checkScope.AO,
      globalContext.VO
    ]
  }
}
```

### 闭包

能够访问自由变量的函数 -> 自由变量：能够在函数中使用，但既不是函数的参数，也不是局部变量的那些变量

```js
var scope = "global scope"
function checkscope(){
  var scope = "local scope"
  function f(){
    return scope
  }
  return f
}
var foo = checkscope()
foo()

globalContext = {
  VO:{
    scope: "global scope",
    checkscope: reference to function checkscope,
    foo: function running,
  },
  scope:[globalContext.VO]
}

checkScopeContext = {
  AO: {
    arguments:{
      length:0
    },
    scope:undefined,
    f: reference to f,
  },
  scope:[
    checkScopeContext.AO,
    globalContext.VO
  ]
}
fContext = {
  AO: {
    arguments:{
      length:0
    }
  },
  scope:[
    fContext.AO
    checkScopeContext.AO,
    globalContext.VO
  ]
}
```

## this

TLDR this始终指向调用它的地方

# 面向对象编程/原型及原型链

## 参数按值传递

所有函数的传参都是按值传递的

### 按值传递

基础数据类型：拷贝

### 共享传递

引用数据类型：var

## 原型与原型链

1. 简单说说JavaScript原型继承的概念
2. 怎么理解prototype和__proto__

## 手写call和apply

this 首先需要跟执行上下文挂钩
绑定方式：软绑定，硬绑定（call、apply、bind）

### 手写call


# 前端异步编程规范

## Promise

```js
const p1 = new Promise((resolve,reject)=>{
  resolve('success')
  reject('fail')
})
const p2 = new Promise((resolve,reject)=>{
  reject('fail')
  resolve('success')
})
const p3 = new Promise((resolve,reject)=>{
  throw('error')
})
console.log(p1,p2,p3);
```

1. resolve -> fulfilled
2. reject -> rejected
3. throw -> rejected
4. 状态不可逆，只要进入resolve/reject不可发生变化

```js
// 马上输出 ”success“
const p1 = new Promise((resolve, reject) => {
    resolve('success')
}).then(res => console.log(res), err => console.log(err))

// 1秒后输出 ”fail“
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('fail')
    }, 1000)
}).then(res => console.log(res), err => console.log(err))

// 链式调用 输出 200
const p3 = new Promise((resolve, reject) => {
    resolve(100)
}).then(res => 2 * res, err => console.log(err))
  .then(res => console.log(res), err => console.log(err))
```

1. then 接收两个回调函数 resolve -> cb, reject -> cb 
2. 支持定时器
3. then 支持链式调用

注:可以在外部调用resolve/reject改变Promise的状态

## Promise的方法

all 
1. 接收一个Promise数组，数组中如有非Promise项，则此项当做成功；
2. 如果所有Promise都成功，则返回成功结果数组；
3. 如果有一个Promise失败，则返回这个失败结果；
allsettled 
1. 接收一个Promise数组，数组中如有非Promise项，则此项当做成功；
2. 把每一个Promise的结果，集合成数组后返回；
race 
1. 接收一个Promise数组，数组中如有非Promise项，则此项当做成功；
2. 哪个Promise最快得到结果，就返回那个结果，无论成功失败；
any
1. 接收一个Promise数组，数组中如有非Promise项，则此项当做成功；
2. 如果有一个Promise成功，则返回这个成功结果；
3. 如果所有Promise都失败，则报错；

# 浏览器事件详解

## 浏览器事件模型

DOM

document object modal 文档对象模型

VDOM -> 虚拟DOM(Virtual DOM) API -> js对象 跨平台 -> 作用到宿主环境

### DOM0

```js
btn.onclick = function(e) {
  fn1.call(this)
  fn2()
}
```

### DOM1

98 W3C

### DOM2

addEventListener
removeEventListener

```js
function fn1() {}
function fn2() {}

// btn.addEventListener('click', ()=>{}, boolean) // boolean 是否在冒泡中执行 默认false
btn.addEventListener('click', fn1)
btn.addEventListener('click', fn2)
btn.removeEventListener('click', fn2)
```

IE DOM2
```js
btn.attachEvent('click', fn1)
btn.detachEvent()
```

.browserslist:兼容

### 事件冒泡 事件捕获

事件流程

- 事件捕获
- 处于当前阶段
- 事件冒泡

document
  html
    body
      div
        ul
          li
stopPropagation() 阻塞当前事件传播的过程
preventDefault() 阻止当前事件的默认行为

```js
li.addEventListener('click',function (e) {
  console.log('capture')
  e.stopPropagation()
}, true)

preventDefault()
```

### 事件委托

```html
<ul id="myLinks">
  <li id="goSomewhere">Go somewhere</li>
  <li id="doSomething">Do something</li>
  <li id="sayHi">Say hi</li>
</ul>
```

```js
var item1 = document.getElementById("goSomewhere");
var item2 = document.getElementById("doSomething");
var item3 = document.getElementById("sayHi");
EventUtil.addHandler(item1, "click", function(event){
    location.href = "http://www.xianzao.com";
});
EventUtil.addHandler(item2, "click", function(event){
    document.title = "I changed the document's title";
});
EventUtil.addHandler(item3, "click", function(event){
    alert("hi");
});
```

```js
var list = document.getElementById("myLinks");
EventUtil.addHandler(list, "click", function(event) {
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);
  switch(target.id) {
  case "doSomething":
      document.title = "I changed the document's title";
      break;
  case "goSomewhere":
      location.href = "http://www.wrox.com";
      break;
  case "sayHi": 9 alert("hi");
    break; 
  }
}
```

## 浏览器请求

### ajax

标准定义

Asynchronous JavaScript And XML 异步的JavaScript和XML

1. 创建XHR
2. options url

onreadystatechange
  readyState
    0:还没有调用open
    1:open但没send
    2:header
    3.部分数据可用
    4:ready

HTTP Status code

# 前端模块化

amd cmd cjs esm

## 模块化的概念

1. 内部子模块scope
2. 多个模块间管理
3. 在模块维度上complier

- node.js: 09
- npm: 10
- AMD
- CMD
- grunt: 12
- gulp:13
- react
- vue
- vite
- turbopack

## 模块化演进过程

### 全局函数

```js
function m1() {}

function m2() {}
```

@namespace 容易造成全局污染 模块间的关联不清晰

### namespace

```js
let modalA = {
  data:'js',
  foo(){

  },
  bar(){

  }
}
modalA.data = 'sx' // 可被重写
```

### IIFE

立即执行函数

```js
(function(){
  var a = 1
  console.log(a);
})()

(function(params, $) {
  let data = 'js'
  function getData(){
    return data
  }
  function setData(val){
    data = val
  }

  params.modalA = {
    getData,
    setData
  }
})(window, jQuery)
```

IIFE:引用依赖模糊 引用顺序不可变

### CommonJS

cjs

```js
// example.js
var x = 5
var addX = function (value) {
  return value + x
}
module.exports.x = x
module.exports.addX = addX
// demo.js
var example = require(./example.js)

console.log(example.x);
console.log(example.addX(1));
```

```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
// main.js
var counter = require('./lib').counter;
var incCounter = require('./lib').incCounter;

console.log(counter);  // 3
incCounter();
console.log(counter); // 3
```

browserify

### AMD

async module definition 规范

require.js 实现规范的js库

### CMD

Common module definition

CommonJS + AMD

sea.js

### ESM

ecmascript module definition

import export

```js
import moduleName from 'module';
export default { a, b }

import { a, b } from "module";

export { a, b }
```

ESM CommonJS

CommonJS:值的拷贝
ESM:值的引用

### UMD

universal module definition

CommonJS AMD CMD

# 垃圾回收 & 运行机制

## 垃圾回收

垃圾回收又称为GC

可达性

### 垃圾回收机制

垃圾回收机制算法

- 引用计数：无法解决相互引用
- 标记清除（mark-sweep）
  - 标记清除算法只关注进来了有没有出去，然后当前里面有没有还在引用

### 内存管理方案

分带式垃圾回收机制

V8 中将堆内存分为新生代和老生代两区域，采用不同的垃圾回收器也就是不同的策略管理垃圾回收

当 To 空间超过了 25%，就需要晋级，老生代
经过一次 scavenge 算法

## 运行机制

浏览器主进程 
- 协调控制其他子进程（创建、销毁）
- 浏览器界面显示，用户交互，前进、后退、收藏
- 将渲染进程得到的内存中的Bitmap，绘制到用户界面上
- 存储功能等
第三方插件进程 
- 每种类型的插件对应一个进程，仅当使用该插件时才创建
GPU进程 
- 用于3D绘制等
渲染进程，就是我们说的浏览器内核
- 排版引擎Blink和JavaScript引擎V8都是运行在该进程中，将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，
- 负责页面渲染，脚本执行，事件处理等
- 每个tab页一个渲染进程
- 出于安全考虑，渲染进程都是运行在沙箱模式下
网络进程 
- 负责页面的网络资源加载，之前作为一个模块运行在浏览器主进程里面，最近才独立成为一个单独的进程

### 浏览器事件循环

Event Loop

当前执行栈同步任务
微任务：微任务队列
  - process.nextTick
  - MutationObserver
  - Promise.then catch finally
宏任务：宏任务队列
  - I/O
  - setTimeout
  - setInterval
  - setImmediate
  - requestAnimationFrame

整体流程
- 当前执行栈内容执行
- 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
- 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
- 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
- 渲染完毕后，JS线程继续接管，开始下一个同步任务

# 函数式编程

## 基础介绍

转变函数式，会带来哪些收益
1. 可读性提升
2. 可维护性提升
3. 结果可预测
4. 可测试性提升

一旦聊到了函数式编程，就一定要王react hooks或vue3 composition api去拓展


## 函数变成带来的好处

> react hooks 的实现，代数效应
> composition api 实现

既然保证了相同的输入，那我是不是只要输入一致，就可以将计算结果缓存呢？
- 可缓存
- 可移植
- 可测试

## 一等公民的函数

## 纯函数的好处

纯函数：没有副作用，不会改变外部的数据
纯函数保证：相同的输入，永远会得到相同的输出

常见的副作用
1. 更改文件系统；
2. 往数据库插入记录；
3. 发送一个 http 请求；
4. 可变数据；
5. 打印/log；
6. 获取用户输入；
7. DOM 查询；
8. 访问系统状态...

## 柯里化

## 代码组合   

# ES6 & ESNext 规范及编程工具简介

## let

```js
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i); // 5, 5, 5, 5, 5
    }, 1000);
}
```

let 是块级作用域下的变量声明

### 存储位置

var 变量存储在当前执行上下文中的全局变量存储区
let 变量存储在词法环境（词法分析、语义分析、代码生成）

### 特性

var 变量提升
let 存储在词法环境，不存在提升，形成暂时性死区（词法环境）
const 跟let特性类似，只是const多了一层常量的处理

向上查找时，在作用域中有声明，且在查找之后，不会再次向上查找，会报错

```js
let a = 1
function fn() {
  console.log(a);
  let a = 2;
}
```

typeof 有安全机制，未被定义的变量不会报错，对有定义未声明无效报错

## class语法

## 模板字符串

## 结构语法

## 箭头函数

> 箭头函数与普通函数的区别

- this指向，箭头函数this指向父级
- 不能当作构造函数，不能new实例化对象
- 无法使用arguments访问参数
- 无法使用bind、apply、call改变this指向

## 生成器 generator

函数可中断

await async 就是借助promise和generator

## reflect

反射是一种能够在运行时检查、修改对象、类和函数等程序结构的能力，通过反射，我们可以读取和修改对象属性、调用对象方法、定义新属性、修改原型等
反射的优势：不关心传入需要变更对象的具体实现，只需要关注想要更改的属性
反射，谈到反射就要结合代理

get(target, key, receiver)
set(target, key, value, receiver)
receiver接受者决定this指向

优势
- 更明确的返回值
- 异常的处理，set、get操作返回boolean告诉是否成功
- 方法拓展
- 对于对象操作的统一化

