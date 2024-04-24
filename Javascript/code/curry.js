// 柯里化

function add(a,b,c) {
  return a+b+c
}

// add(1,2,3)
// add(1)(2)(3)
// add(1,2)(3)
// add(1)(2,3)

// 函数需要进行基层闭包是由参数个数决定的
function curry(fn) {
    // 参数个数
  const len = fn.length
  return function curried(...args) {
    // 判断长度
    // 如果收集的参数个数大于函数本身参数的个数，执行函数
    if (args.length>=len) {
      return fn.apply(this,args)
    }
    else{
      // 否则继续收集参数（继续闭包）
      return function(...args2){
        // 参数拼接
        return curried.apply(this,[...args,...args2])
      }
    }
  }
}

const curryAdd = curry(add)

console.log(curryAdd(1,2,3))
console.log(curryAdd(1)(2)(3))
console.log(curryAdd(1,2)(3))
console.log(curryAdd(1)(2,3))