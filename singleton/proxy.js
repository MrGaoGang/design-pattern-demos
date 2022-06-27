function singletonify(func){
  let instance = null;
  let handler = {
    construct(target, arges) {
      if (!instance) {
        instance = Reflect.construct(target, arges);
      }
      return instance;
    },
  };
  return new Proxy(func, handler);
}

class A {
  show() {
    console.log("我是一个单例对象");
  }
}
const SingleA = singletonify(A);
const a1 = new SingleA();
const a2 = new SingleA();

console.log(a1 === a2);// true
