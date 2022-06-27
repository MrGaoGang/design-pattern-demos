// 懒汉式
class Singleton {
  static instance: Singleton;
  show() {
    console.log("我是一个单例对象");
  }
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
console.log(s1 === s2); // true

// 饿汉式
class Singleton2 {
  private static instance: Singleton2 = new Singleton2();
  show() {
    console.log("我是一个单例对象");
  }

  public static getInstance(): Singleton2 {
    return Singleton2.instance;
  }
}

const s3 = Singleton2.getInstance();
const s4 = Singleton2.getInstance();
console.log(s3 === s4); // true
