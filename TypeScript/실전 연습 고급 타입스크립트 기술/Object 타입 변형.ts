// Union 을 Object로 변형
import { Equal, Expect } from "../../helper";

type Route = "/" | "/about" | "/admin" | "/admin/users";

type RoutesObject = {
  [K in Route]: K;
  // for of 문 처럼 Route 타입안의 값들이 (value space) 각 키값들의 object가 생성이 된다.
};
// 위를 풀면 아래처럼 된다.
// {
//     "/": "/";
//     "/about": "/about";
//     "/admin": "/admin";
//     "/admin/users": "/admin/users";
// }

type tests = [
  Expect<
    Equal<
      RoutesObject,
      {
        "/": "/";
        "/about": "/about";
        "/admin": "/admin";
        "/admin/users": "/admin/users";
      }
    >
  >
];
