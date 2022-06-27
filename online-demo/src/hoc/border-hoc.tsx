import React, { Component } from "react";

const BorderHoc = (WrappedComponent: any) =>
  class extends Component {
    render() {
      return (
        <div style={{ border: "solid 1px red" }}>
          <WrappedComponent />
        </div>
      );
    }
  };
export default BorderHoc;
