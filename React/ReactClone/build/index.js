/* @jsx createElement */
// 위처럼 적으면(이하 지시자) 바벨이 jsx를 변환할 때, 리액트를 붙히지 않음
import { createElement, render } from "./react.js";

// 컴포넌트
function Title() {
  return createElement("div", null, createElement("h1", {
    className: "title"
  }, "hello react title"), createElement("strong", null, "goodddddddddd"));
}
console.log(Title());

// 실제 리액트를 만든 것 처럼, 렌더링
render(createElement(Title, null), document.querySelector("#root"));

// npm build 를 따로 작성하여 만들었을 경우, npm 'run' build 를 해줘야함