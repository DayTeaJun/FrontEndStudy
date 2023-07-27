import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/Home.js";

// 컴포넌트와 들어갈 대상
ReactDOM.hydrate(<Home />, document.querySelector("#root"));
// hydrate는 수분을 공급하다는 뜻으로, 브라우저가 렌더링되어있는 껍데기에 리액트를 붙는 느낌이라고 생각하면됨. react어플리케이션 처럼
// 서버사이드 리액트 문법에만 존재하는 메서드
