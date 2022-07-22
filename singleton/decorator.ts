import Symbol from 'es6-symbol';

export const SINGLETON_KEY = Symbol();

const INSTANCE = Symbol('singleton-decorator:instance');
function getInstance(Class: any, args = []) {
  return (Class[INSTANCE] = Class[INSTANCE] instanceof Class ? Class[INSTANCE] : new Class(...args));
}

export type Singleton<T extends new (...args: any[]) => any> = T & {
  // @ts-ignore
  [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never;
};

export const Singleton = <T extends new (...args: any[]) => any>(type: T) => {
  if (Proxy && Reflect) {
    return new Proxy(type, {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      construct(target: Singleton<T>, argsList, newTarget) {
        if (target.prototype !== newTarget.prototype) {
          return Reflect.construct(target, argsList, newTarget);
        }
        if (!target[SINGLETON_KEY]) {
          target[SINGLETON_KEY] = Reflect.construct(target, argsList, newTarget);
        }
        return target[SINGLETON_KEY];
      },
    });
  } else {
    const partiallyGetInstance = getInstance.bind(null, type);
    return partiallyGetInstance;
  }
};
