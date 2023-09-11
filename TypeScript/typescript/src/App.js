"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
require("./App.css");
var react_redux_1 = require("react-redux");
// jsx 타입지정 (자동으로 타입지정 되어있긴함)
var 박스 = <div></div>;
function App() {
    // useState 타입 지정 (초기값이 있다면 초기값으로 타입이 지정됨(현재 string))
    var _a = (0, react_1.useState)("kim"), user = _a[0], setUser = _a[1];
    // useState에 string 또는 number(또는 다른 타입들)를 넣고 싶을 때(Generic 문법 사용)
    var _b = (0, react_1.useState)("kim"), user2 = _b[0], setUser2 = _b[1];
    // redux에 있는 useSelector로 redux내용을 꺼내옴
    var 꺼내온거 = (0, react_redux_1.useSelector)(function (state) { return state; }); // 꺼내온거 에 redux에 있던 state를 넣음
    // dispatch 타입 지정
    var dispatch = (0, react_redux_1.useDispatch)(); // state 수정 요청
    return (<>
      <div>
        <h4>하이</h4>
        <Profile name="철수" age="20"></Profile>
      </div>
      {/* redux에서 만든 state쓸 때 */}
      <div className="App">
        {꺼내온거.count}
        <button onClick={function () {
            dispatch({ type: "증가" });
        }}>
          버튼
        </button>
      </div>
    </>);
}
// props를 받을 때의 props는 객체로 타입지정해줌
function Profile(props) {
    // html로 리턴하면 :JSX.Element 타입 지정 (return 이 html이 아닐경우 에러발생)
    return <div>프로필임</div>;
}
exports.default = App;
