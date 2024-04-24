// 模板字符串
const hello = "hello"

const html = `<div>
  <h1>${hello}</h1>
</div>`

// tag 函数
// 通过模板字符串可以用字符串形式调用

function tag(sitrngs, ...values) {
  console.log(sitrngs, values);
}

const a = 1;
const b = 2;
tag`hello${1}world${b}`