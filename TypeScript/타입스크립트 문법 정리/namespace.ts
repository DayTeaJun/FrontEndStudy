// 타입도 import export 가능
export type Name = string;
export interface 인터페이스 {}

// namespace
// 타입변수 숨기기 문법(object 안에 숨겨서 사용하는 것)
namespace 네임스페이스 {
  export type Name = string | number;
}
// 옛날 import가 없을 때 충돌을 방지하고자 object안에 넣어서 숨김
let 변수: 네임스페이스.Name = "kim";
// 지금은 잘 안씀, 타입변수 숨기고 싶을 때 사용하거나 레거시 코드 볼 때 사용
module 네임스페이스2 {
  // 더 옛날엔 namespace 말고 module이라고 적어서 사용했음
}

// 해보기 namespace test.ts
import { Car3, Bike3 } from "./namespace test";

let 차: Car3 = { wheel: 4, model: "BMW" };
let 자전거: Bike3 = { wheel: 2, model: "bing" };

import { 자주쓰는함수 } from "./namespace test";
const ObjFc: 자주쓰는함수 = function (a) {
  console.log(a);
};
ObjFc({ a: "굳" });

namespace Dogspace {
  export type Dog = string;
}

namespace Dogspace2 {
  export interface Dog {
    name: string;
  }
}

let dog2: Dogspace.Dog = "bark";
let dog3: Dogspace2.Dog = { name: "paw" };
