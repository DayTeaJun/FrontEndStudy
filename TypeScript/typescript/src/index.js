"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
require("./index.css");
var App_1 = require("./App");
var root = client_1.default.createRoot(document.getElementById("root"));
// redux 타입스크립트
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
// 모든 컴포넌트가 공유할 state
var 초기값 = { count: 0 };
// 위에 지정(Counter)해서 자동지정해줌(state), action (dispatch() 날릴때 넣는 파라미터)
function reducer(state, action) {
    if (state === void 0) { state = 초기값; }
    // 미리 정의한 state 수정방법
    if (action.type === "증가") {
        return { count: state.count + 1 };
    }
    else if (action.type === "감소") {
        return { count: state.count - 1 };
    }
    else {
        return 초기값;
    }
}
var store = (0, redux_1.createStore)(reducer);
root.render(<react_1.default.StrictMode>
    <react_redux_1.Provider store={store}>
      <App_1.default />
    </react_redux_1.Provider>
  </react_1.default.StrictMode>);
