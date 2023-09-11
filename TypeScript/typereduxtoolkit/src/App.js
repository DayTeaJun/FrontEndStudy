"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
var react_redux_1 = require("react-redux");
var index_1 = require("./index");
function App() {
    var 꺼내온거 = (0, react_redux_1.useSelector)(function (state) { return state; });
    var dispatch = (0, react_redux_1.useDispatch)();
    return (<>
      {꺼내온거.counter1.count}
      <button onClick={function () {
            dispatch((0, index_1.increment)());
        }}>
        버튼
      </button>
    </>);
}
exports.default = App;
