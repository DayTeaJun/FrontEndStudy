import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState, increment } from "./index";
import { Dispatch } from "redux";

function App() {
  const 꺼내온거 = useSelector((state: RootState) => state);
  const dispatch: Dispatch = useDispatch();
  return (
    <>
      {꺼내온거.counter1.count}
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        버튼
      </button>
    </>
  );
}

export default App;
