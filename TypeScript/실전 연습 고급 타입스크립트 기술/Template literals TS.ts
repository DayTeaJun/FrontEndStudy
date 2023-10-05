// Template literals 타입스크립트
type Path = `/${string}`;

export function makeUrl(path: Path) {
  return `https://mywebsite.com${path}`;
}

// Should be OK
makeUrl("/users");

// 위 타입의 템플릿 리터럴에서 정의한 대로 넘기지 않으면 에러발생
makeUrl("users/1");
// string을 받는 함수를 안전하게 호출하는 것이 가능.

// Extract 유틸리티를 이용하여, 뽑아낼 타입, 패턴을 넣으면 됨.
import { Equal, Expect } from "../../helper";

type Routes = "/users" | "/users/:id" | "/products" | "/products/:id";

// 뽑아낼 패턴을 넣어 "/users/:id" | "/products/:id" 만 추출하게 함.
type DynamicRoutes = Extract<Routes, `/${string}/:id`>;

type tests = [Expect<Equal<DynamicRoutes, "/users/:id" | "/products/:id">>];

// Template literals을 이용한 아이템 조합
type Top = "t-shirt" | "shirts" | "jacket";

type Bottom = "jeans" | "skirt" | "slacks";

type Outfit = `${Top} with ${Bottom}`;
// Top과 Bottom의 조합이 생성되어 모든게 섞인 조합이 생성된다.
type tests = [
  Expect<
    Equal<
      Outfit,
      | "t-shirt with jeans"
      | "t-shirt with skirt"
      | "t-shirt with slacks"
      | "shirts with jeans"
      | "shirts with skirt"
      | "shirts with slacks"
      | "jacket with jeans"
      | "jacket with skirt"
      | "jacket with slacks"
    >
  >
];

// 패턴을 갖고 있는 Object를 Template literals로 손쉽게 만들기
type First = "user" | "post" | "comment";
type Second = "Id" | "Name";
// 밑의 객체 키의 같은점을 찾고, 두개를 묶어 패턴을 만들 수 있도록 타입을 분리.

type ObjectOfKeys = Record<`${First}${Second}`, string>;
// 유틸리티 Record를 이용하여 왼쪽의 키의 값들은 다 string을 갖게함

type tests = [
  Expect<
    Equal<
      ObjectOfKeys,
      {
        userId: string;
        userName: string;
        postId: string;
        postName: string;
        commentId: string;
        commentName: string;
      }
    >
  >
];
