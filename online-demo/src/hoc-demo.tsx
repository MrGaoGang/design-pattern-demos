import React from "react";
import BorderHoc from "./hoc/border-hoc";

// 用BorderHoc装饰目标组件
@BorderHoc
class TargetComponent extends React.Component {
  render() {
    // 目标组件具体的业务逻辑
    return <div>我的具体的内容</div>;
  }
}

// export出去的其实是一个被包裹后的组件
export default TargetComponent;
