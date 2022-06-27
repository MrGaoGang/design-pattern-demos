import ReactDOM from "react-dom";
import Content from "./content";

export default class DialogInstance {
  private static instance: DialogInstance;
  static getInstance() {
    if (!DialogInstance.instance) {
      DialogInstance.instance = new DialogInstance();
    }
    return DialogInstance.instance;
  }
  show = () => {
    const container = document.createElement("div");
    container.id = "custom-modal-id";
    container.setAttribute(
      "style",
      "width:100%;height:100%;z-index:9998;background-color:#00000052;position:fixed;left:0px;top:0px;"
    );
    document.body.appendChild(container);
    ReactDOM.render(<Content />, container);
  };

  hide = () => {
    const container = document.getElementById("custom-modal-id");
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
      document.body.removeChild(container);
    }
  };
}
