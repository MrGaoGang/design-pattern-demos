/**
 *
 * @param target 属性原型对象 AButton.prototype
 * @param name 修饰的目标属性属性名
 * @param descriptor 属性描述对象，和Object.defineProperty(obj, prop, descriptor) 中的descriptor 一样
 * @returns
 */
function funcDecorator(target: any, name: string, descriptor: any, params: any) {
  let originalMethod = descriptor.value;
  descriptor.value = function () {
    console.log("我是Func的装饰器逻辑");
    return originalMethod.apply(this, arguments);
  };
  return descriptor;
}


function funcParamsDecorator(params: string) {
    return (target: any, name: string, descriptor: any)=>{
        let originalMethod = descriptor.value;
        descriptor.value = function () {
          console.log("我是Func的装饰器逻辑",params);
          return originalMethod.apply(this, arguments);
        };
        return descriptor;
    };
  }
class Button {
}
class AButton extends Button {
  @funcParamsDecorator('my-params')
  onClick() {
    console.log("我是Func的原有逻辑");
  }
}

// 验证装饰器是否生效
const button = new AButton();
button.onClick();
// 我是Func的装饰器逻辑
// 我是Func的原有逻辑
