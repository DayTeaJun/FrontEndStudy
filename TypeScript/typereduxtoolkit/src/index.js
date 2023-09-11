"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementByAmount = exports.decrement = exports.increment = void 0;
var react_1 = require("react");
var client_1 = require("react-dom/client");
require("./index.css");
var App_1 = require("./App");
var toolkit_1 = require("@reduxjs/toolkit");
var react_redux_1 = require("react-redux");
var 초기값 = { count: 0, user: "kim" };
var counterSlice = (0, toolkit_1.createSlice)({
    name: "counter",
    initialState: 초기값,
    reducers: {
        // 타입지정 불필요(초기값에 타입지정 했기때문)
        increment: function (state) {
            state.count += 1;
        },
        decrement: function (state) {
            state.count -= 1;
        },
        // PayloadAction action 타입 지정, number인 이유는 dispacth할때 number 사용하기 위함
        incrementByAmount: function (state, action) {
            state.count += action.payload;
        },
    },
});
var store = (0, toolkit_1.configureStore)({
    reducer: {
        counter1: counterSlice.reducer,
    },
});
//수정방법 만든거 export
exports.increment = (_a = counterSlice.actions, _a.increment), exports.decrement = _a.decrement, exports.incrementByAmount = _a.incrementByAmount;
var root = client_1.default.createRoot(document.getElementById("root"));
root.render(<react_1.default.StrictMode>
    <react_redux_1.Provider store={store}>
      <App_1.default />
    </react_redux_1.Provider>
  </react_1.default.StrictMode>);
