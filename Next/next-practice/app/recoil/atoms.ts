// store.ts 와 비슷한 파일
// 웹의 모든 state 모음

import { atom } from "recoil";

// atom은 state를 정의하는는 함수
export const userState = atom<{ email: string; name: string }>({
  key: "userState",
  default: {
    email: "",
    name: "",
  },
});

// selector는 state를 읽고 쓰는 함수
// 기존에 존재하는 state를 변형하여 특정값을 반환
