import React from "react";
import DialogInstance from ".";

export interface IApplyTipsProps {}

export default function content(props: IApplyTipsProps) {
  return (
    <div
      style={{
        color: "red",
        textAlign: "center",
        fontSize: "30px",
        margin: "100px",
      }}
    >
      content

      <button
          onClick={() => {
            DialogInstance.getInstance().hide();
          }}
        >
          关闭弹窗
        </button>
    </div>
  );
}
