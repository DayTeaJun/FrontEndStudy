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

// Object value의 타입 변형
interface Attributes {
  firstName: string;
  lastName: string;
  age: number;
}

type Keys = keyof Attributes;
// keyof 는 Attributes의 키들을 union 한다.
// "first" | "lastName" | "age"

type AttributeGetters = {
  [k in keyof Attributes]: () => Attributes[k];
  // K에 Attributes를 keyof로 Union을 만든 내용을 하나씩 루프를 돌면서
  // 각 키의 값에 Attributes[k]를 넣는데 Attributes[K]는 각 키의 밸류 타입을 정의한다.
};

// 아래는 위의 내용이 맞는지에 대한 코드
type tests = [
  Expect<
    Equal<
      AttributeGetters,
      {
        firstName: () => string;
        lastName: () => string;
        age: () => number;
      }
    >
  >
];

// Object Key의 타입 변형
interface Attributes {
  firstName: string;
  lastName: string;
  age: number;
}

type AttributeGetters = {
  // key앞에 문자열 추가 및 변형을 하기 위해선 as를 붙인다.
  // as + Template literals 를 이용하여, 기존 firstName에
  // get + firstName이 되고,
  // Capitalize 타입 유틸리티를 사용하여 첫 글자를 대문자로 수정한다.
  [K in keyof Attributes as `get${Capitalize<K>}`]: () => Attributes[K];
};

// 위 내용의 결과가 맞는지 확인하는 코드
type tests = [
  Expect<
    Equal<
      AttributeGetters,
      {
        getFirstName: () => string;
        getLastName: () => string;
        getAge: () => number;
      }
    >
  >
];

// Object union type을 object로 타입 변형
type Route =
  | {
      route: "/";
      search: {
        page: string;
        perPage: string;
      };
    }
  | { route: "/about"; search: {} }
  | { route: "/admin"; search: {} }
  | { route: "/admin/users"; search: {} };

type RoutesObject = {
  // Route 객체에 있는 Union 타입을 전부 순회한뒤,
  // 각 키를 as로 route키값으로 변경, 각 값은 search키값으로 변경함.
  [R in Route as R["route"]]: R["search"];
};

type tests = [
  Expect<
    Equal<
      RoutesObject,
      {
        "/": {
          page: string;
          perPage: string;
        };
        "/about": {};
        "/admin": {};
        "/admin/users": {};
      }
    >
  >
];

// Object를 Tuple로 변형
interface Values {
  email: string;
  firstName: string;
  lastName: string;
}

type ValuesAsUnionOfTuples = {
  [K in keyof Values]: [K, Values[K]];
}[keyof Values];
// 각각의 Key에 해당하는 루프를 돌리면 뒤에 값만 추출된다.
// 결과적으로, [K, Values[K]] 로 즉, 아래처럼 추출된다.
// ["email", string] | ["firstName", string] | ["lastName", string]

type tests = [
  Expect<
    Equal<
      ValuesAsUnionOfTuples,
      ["email", string] | ["firstName", string] | ["lastName", string]
    >
  >
];
