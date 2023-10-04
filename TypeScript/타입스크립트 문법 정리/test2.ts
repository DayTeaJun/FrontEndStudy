import { Age22 } from "./test.d.js";
// import/export가 할게 많으면
// namespace 또는 import * as 사용

let age: Age22; // number라고 잘나옴

// a모든 타입을 정리해놓은 레퍼런스용 d.ts 파일쓰기
// tsconfig.json 파일에 declaration : true를 하면 ts파일마다 d.ts 파일 자동 생성됨
