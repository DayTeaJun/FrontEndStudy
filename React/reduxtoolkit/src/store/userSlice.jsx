import { createSlice } from "@reduxjs/toolkit";

let user2 = createSlice({
  name: "user2",
  // 보통 데이터를 받아오면 배열안에 객체형식으로 받아옴. 그래서 실습 예제가 이렇다.
  initialState: [
    { name: "count", count: 1 },
    { name: "count", count: 2 },
  ],
  reducers: {
    // 함수실행될때 받아온 매개변수 값을 action으로 받아오고, .payload로 쓸수있음
    addCount(state, action) {
      state[action.payload].count++;
    },
    subCount(state, action) {
      state[action.payload].count--;
    },
  },
});

export let { addCount, subCount } = user2.actions;

export { user2 };
