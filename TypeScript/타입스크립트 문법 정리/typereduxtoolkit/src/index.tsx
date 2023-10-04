import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const 초기값: { count: number; user: string } = { count: 0, user: "kim" };

const counterSlice = createSlice({
  name: "counter",
  initialState: 초기값,
  reducers: {
    // 타입지정 불필요(초기값에 타입지정 했기때문)
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
    // PayloadAction action 타입 지정, number인 이유는 dispacth할때 number 사용하기 위함
    incrementByAmount(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
  },
});

let store = configureStore({
  reducer: {
    counter1: counterSlice.reducer,
  },
});

//state 타입을 export 해두는건데 나중에 쓸 데가 있음
export type RootState = ReturnType<typeof store.getState>;

//수정방법 만든거 export
export let { increment, decrement, incrementByAmount } = counterSlice.actions;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
