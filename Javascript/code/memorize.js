function add(a,b) {
  for (let i = 0; i < 1000000000; i++) {
    // do something
  }
  return a+b
}

// console.log(add(1,2))
// console.log(add(1,2))
// console.log(add(1,2))
// console.log(add(1,2))

// 缓存函数
function memorize(fn) {
  // 缓存区
  const cache = {}
  // const cache = new Map()

  // 如果我现在的入参给定了，闹我们把这个入参处理之后作为key，函数结果作为value，存入缓存区
  const argsStr = JSON.stringify(arguments)

  // 柯里化实现缓存命中
  return function () {
    // 命中缓存
    const cacheValue = cache[argsStr]
    if (cacheValue) {
      return cacheValue
    }
    
    // 未命中缓存
    const value = fn.apply(this, arguments)
    cache[argsStr] = value
    return value
  }

}

const memorizedAdd = memorize(add)

console.log(memorizedAdd(1,2))
console.log(memorizedAdd(1,2))
console.log(memorizedAdd(1,2))
console.log(memorizedAdd(1,2))