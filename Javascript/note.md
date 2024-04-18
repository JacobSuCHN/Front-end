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