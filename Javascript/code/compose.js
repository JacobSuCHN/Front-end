// 组合，流式处理
// compose
// pipe

// 能够链接多个函数，组合成新的函数

function upperCase(str) {
  return str.toUpperCase();
}

function splitStr(str) {
  return str.split("");
}

const str = "hello world";

// const upperCaseRes = upperCase(str);
// const splitStrRes = splitStr(upperCaseRes);
// console.log(splitStrRes);

// 函数的连接有几种形式。pipe(从左往右) 水管 compose(从右往左) 组合

function compose(...fns) {
  if (fns.length === 0) {
    console.log("🚀 ~ compose ~ fns0:", fns)
    return (arg) => arg;
  }
  if (fns.length === 1) {
    console.log("🚀 ~ compose ~ fns1:", fns)
    return fns[0];
  }

  // 数组的reduce
  return fns.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}

const composedFn = compose(console.log, splitStr, upperCase);

composedFn(str)
