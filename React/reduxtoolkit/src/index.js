import React from "react";
// import ReactDOM from 'react-dom'; //구버전
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
// store.js에서 configureStore를 export한 내용을
// 다른 이름으로 바꿔줄 수 있다 (여기선 configureStore -> store)
import store from "./store.js";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  // 아래처럼 Provider로 감싸면 store에 저장되있는 state들을 감싼 내용안에서 다 쓸 수 있음.
  <Provider store={store}>
    <App />
  </Provider>
);
