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

