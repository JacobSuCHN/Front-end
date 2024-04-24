const handler = {
  get(target, key, receiver) {
    console.log("get");
    // 值的获取就是所谓的依赖收集
    // track()
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    console.log("set");
    // 值的设置就是所谓的更新操作 
    // trigger()
    Reflect.set(target, key, value, receiver)
  },
}

const target = {
  a: 1,
  b: 2
}
const reactiveTarget = new Proxy(target, handler)

reactiveTarget.a = 10