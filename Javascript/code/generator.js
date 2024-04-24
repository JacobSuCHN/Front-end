function getData() {
  // 先拿到第一个数据返回内容
  // 再拿到第二个数据返回内容
  // 再拿到第三个数据返回内容
}

// 函数只能返回一次，并且函数的执行无法中断

function* getAsyncData() {
  // 先拿到第一个数据返回内容
  yield "hello 1"
  // 再拿到第二个数据返回内容
  yield "hello 2"
  // 再拿到第三个数据返回内容
  yield "hello 3"
}

let gen = getAsyncData()

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);

// await async 就是借助promise和generator