this.name = "window"

function test(){
  console.log(this.name);
  console.log(arguments); // 箭头函数没有arguments
}

// test() // "window"

// const js = {
//   name: "js",
//   test: test
// }

// js.test() // "js"

// 硬绑定
const sx = {name:"sx"}
// test.call(sx) // "sx"
// test.apply(sx) // "sx"
// const t = test.bind(sx)
// t() // "sx"

// 手写call

Function.prototype.myCall = function(context, ...args) {
  // 用户嗅探 typeof
  const globalCtx = typeof window === "undefined" ? globalThis : window;
  // 参数兜底
  const ctx = context || globalCtx
  // this指向谁? test
  ctx.fn = this
  ctx.fn(...args)
  delete ctx.fn
}

test.myCall(sx, 1, 2)
test.myCall(null)