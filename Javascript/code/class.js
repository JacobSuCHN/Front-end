// OOP 面向对象思想：1.封装 2.继承 3.堕胎

// 1.封装
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log("🚀 ~ Person ~ greet ~ name:", this.name);
  }
}


// 2.继承
class Student extends Person {
  constructor(name, level) {
    super(name)
    this.level = level;
  }

  greet() {
    console.log("🚀 ~ Person ~ greet ~ level:", this.level);
  }
}

// 3.多态
// typescript
// 接口是统一规范的定义，定义了行为和动作的规范
// 接口是类的进一步抽象，是对类的约束
// interface Duck {
//   age: number;
//   speak(): void;
// }

// class NiceDuck implements Duck {
//   age: number;
//   speak() {
//     console.log('Quack');
//   }
// }

// class BadDuck implements Duck {
//   age: number;
//   speak() {
//     console.log('Quack');
//   }
// }

// function speak(duck: Duck) {
//   duck.speak()
// }