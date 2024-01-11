import Header from "./components/Header";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./store";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  return (
    <Provider store={store}>
      <DragDropContext>
        <div className="App">
          <Header />
          <div className="flex">
            <Sidebar />
            <Body />
          </div>
        </div>
      </DragDropContext>
    </Provider>
  );
}

export default App;
