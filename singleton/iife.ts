class Singleton {
  static getInstance: () => Singleton | null;
  show() {
    console.log("我是一个单例对象");
  }
}

Singleton.getInstance = (function () {
  let instance: Singleton | null = null;
  return function () {
    if (!instance) {
      instance = new Singleton();
    }
    return instance;
  };
})();

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
console.log(s1 === s2); // true
