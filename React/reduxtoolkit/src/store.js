import { configureStore, createSlice } from "@reduxjs/toolkit";

import { user2 } from "./store/userSlice";

// createSlice 만들고 configureStore에 등록함
// createSlice안인 reducers안에 state변경하는 함수를 만들어줘서 그 만든 함수를 export함.

// useState랑 비슷한 역할.
// 아래 configureStore에 담아 사용하기 위해 변수에 저장
let user = createSlice({
  // state 3개 등록가능.
  name: "user",

  // 스테이트의 초기값
  initialState: { name: "Jun", age: 1 },

  // useState의 setState랑 비슷한역할
  reducers: {
    // state는 위의 기존의 state(현재 Jun) 값이 들어감
    changeName(state) {
      // 이렇게 받아와도 되지만,
      //  return { name: "young", age: 100 };

      // 아래처럼 객체안의 name키의 값만 변경할 수 있음.
      state.name = "young";
    },
  },
});

// let user2 = createSlice({
//   name: "user2",
//   initialState: { name: "Jun2", age: 20 },
//   reducers: {
//     // 매개변수
//     changeAge(state, action) {
//       // action의 역할, changeAge 함수가 실행될때 받은 매개변수는 action에 들어와서
//       // .payload를 붙히면 불러온 매개변수를 받음.
//       state.age += action.payload;
//     },
//   },
// });

// 아래 내용은 다른 폴더로 구조화해서 옮김.
// let user2 = createSlice({
//   name: "user2",
//   // 보통 데이터를 받아오면 배열안에 객체형식으로 받아옴. 그래서 실습 예제가 이렇다.
//   initialState: [
//     { name: "count", count: 1 },
//     { name: "count", count: 2 },
//   ],
//   reducers: {
//     // 함수실행될때 받아온 매개변수 값을 action으로 받아오고, .payload로 쓸수있음
//     addCount(state, action) {
//       state[action.payload].count++;
//     },
//     subCount(state, action) {
//       state[action.payload].count--;
//     },
//   },
// });

// 컨스트럭쳐 문법, 한개인데도 불구하고 사용한 이유는, 리듀서 안에 한개가 아닌 더 많은 내용을 담을 수 있음, changeName, changeItem, changeGame 등 여러개
export let { changeName } = user.actions;
// createSlice로 생성한 user에 actions을 붙히면 changeName이라는 함수를 사용할 때마다 user의 state를 변경해줌

// createSlice를 만들 때마다 export를 한번더 해줘야함.
// export let { changeAge } = user2.actions;
// export let { addCount, subCount } = user2.actions;

// store.js 파일에는 아래 부분만 남김.
// state에 등록을 함.
export default configureStore({
  reducer: {
    // createSlice 값 저장.
    user: user.reducer,
    user2: user2.reducer,
  },
});
