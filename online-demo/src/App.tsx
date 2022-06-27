import DialogInstance from "./modal/index";
import "./App.css";
import HocDemo from "./hoc-demo";
function App() {
  return (
    <div className="App">
      <p>
        <button
          onClick={() => {
            DialogInstance.getInstance().show();
          }}
        >
          打开弹窗
        </button>
      </p>

      <p>
        <HocDemo />
      </p>
    </div>
  );
}

export default App;
