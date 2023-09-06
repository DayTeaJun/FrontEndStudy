import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// redux 타입스크립트
import { Provider } from "react-redux";
import { createStore } from "redux";

interface Counter {
  count: number;
}

const 초기값: Counter = { count: 0 };
// 위에 지정해서 자동지정해줌(state), action (dispatch() 날릴때 넣는 파라미터)
function reducer(state = 초기값, action: { type: string }) {
  if (action.type === "증가") {
    return { count: state.count + 1 };
  } else if (action.type === "감소") {
    return { count: state.count - 1 };
  } else {
    return 초기값;
  }
}

const store = createStore(reducer);

// store의 타입 미리 export 해두기 (리덕스 공식문서 내용)
export type RootState = ReturnType<typeof store.getState>;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
