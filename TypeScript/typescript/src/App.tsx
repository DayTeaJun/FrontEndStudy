import React, { useState } from "react";
import "./App.css";

// jsx 타입지정 (자동으로 타입지정 되어있긴함)
let 박스: JSX.Element = <div></div>;

function App() {
  // useState 타입 지정 (초기값이 있다면 초기값으로 타입이 지정됨(현재 string))
  let [user, setUser] = useState("kim");
  // useState에 string 또는 number(또는 다른 타입들)를 넣고 싶을 때(Generic 문법 사용)
  let [user2, setUser2] = useState<string | number>("kim");

  return (
    <div>
      <h4>하이</h4>
      <Profile name="철수" age="20"></Profile>
    </div>
  );
}

// props를 받을 때의 props는 객체로 타입지정해줌
function Profile(props: { name: string; age: string }): JSX.Element {
  // html로 리턴하면 :JSX.Element 타입 지정 (return 이 html이 아닐경우 에러발생)
  return <div>프로필임</div>;
}

export default App;
