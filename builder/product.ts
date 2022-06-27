// 手机建造者
abstract class Builder {
  // cpu
  public abstract buildCPU(): void;
  // 鼠标
  public abstract buildMouse(): void;
  // 充电器
  public abstract buildPower(): void;
  // 构造产品
  public abstract buildProduct(): Product;
}

// 具体建造者——富士康
class ConcreteBuilder extends Builder {
  private product: Product;
  constructor(product: Product) {
    super();
    this.product = product;
  }

  public buildCPU(): void {}
  public buildMouse(): void {}
  public buildPower(): void {}

  // 最终组建一个产品
  public buildProduct(): Product {
    return this.product;
  }
}
interface Product {
  doSomething(): void;
}
// iphone 产品
class IPhoneProduct implements Product {
  public doSomething(): void {
    // 独立业务
  }
}

// iphone 负责人 库克
class Director {
  private _builder: Builder;
  constructor(builder: Builder) {
    this._builder = builder;
  }

  set builder(builder: Builder) {
    this._builder = builder;
  }

  // 为有钱人建造
  public constructorForRichMan() {
    this._builder.buildCPU();
    this._builder.buildMouse();
    this._builder.buildPower();
    return this._builder.buildProduct();
  }
  // 为贫困人员构造
  public constructorForDiaosi() {
    this._builder.buildCPU();
    // 对比起，屌丝不配拥有鼠标和电源
    // this._builder.buildMouse();
    // this._builder.buildPower();
    return this._builder.buildProduct();
  }
}

// 应用
const builder: Builder = new ConcreteBuilder(new IPhoneProduct());
const director: Director = new Director(builder);
// 是否为有钱人
const product: Product = isRichMan
  ? director.constructorProduct()
  : director.constructorForDiaosi();
