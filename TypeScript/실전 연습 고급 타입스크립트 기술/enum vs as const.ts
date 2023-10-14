import { Equal, Expect } from "../../helper";

export const Color = {
  Red: "red",
  Green: "green",
  Blue: "blue",
} as const; // as const 붙이면 리터럴(값 문자 그대로 실제 값을 넣어줌) 타입으로 추론이 된다.
// 이렇게 하면 값이 변경되지 않게, 또는 예상할 때 string이 아닌 특정 리터럴로 고정시킬 수 있음
// 이제 Color의 property를 수정할 수 없고 읽기만 가능함
// 위에 특정 값이 아닌 다른 값을 넣을 경우의 잠재적인 버그를 예방하는 장점이 있다.

type Red = (typeof Color)["Red"];
type Green = (typeof Color)["Green"];
type Blue = (typeof Color)["Blue"];

type tests = [
  Expect<Equal<Red, "red">>,
  Expect<Equal<Green, "green">>,
  Expect<Equal<Blue, "blue">>
];

// enum과의 차이점
enum ColorEnum {
  Red = "Red",
  Green = "Green",
  Blue = "Blue",
}

// enum의 경우 함수 파라미터에 리터럴 값('Red' 등)을 넣게되면 에러가 발생하고 ColorEnum.Red 같은 값을 넘겨야 함.
// 이처럼 의도치않은 일이 발생 할 수 있음.
function Color2(c: ColorEnum) {}
Color2("Red");

function Color3(c: ColorEnum) {}
Color3(ColorEnum.Red);

// as const indexing 예제
import { Equal, Expect } from "../../helper";

export const Color = {
  Red: "red",
  Green: "green",
  Blue: "blue",
} as const; // as const 사용하여 리터럴 타입 추론

// 기존 value space를 typeof로 변환(type space)
// indexing을 통해 값을 찾고, Union 타입으로 넘김
type RedAndBlue = (typeof Color)["Red" | "Blue"];

type tests = [Expect<Equal<RedAndBlue, "red" | "blue">>];

// Object value들 타입 Union으로 변형
import { Equal, Expect } from "../../helper";

export const Color = {
  Red: "red",
  Green: "green",
  Blue: "blue",
} as const;

// Color 에 있는 리터럴 타입들을 다 넣고 싶을 때, 일일이 추가하는게 아니고 추가가 될 때마다 자동으로 추가하기
// keyof 키워드는 Color의 타입에서 모든 key에 접근하여 각각의 값을 뽑아오는 역할을 함
type RedGreenBlueValue = (typeof Color)[keyof typeof Color];

type tests = [Expect<Equal<RedGreenBlueValue, "red" | "blue" | "green">>];

// Array indexing
import { Equal, Expect } from "../../helper";

const rgb = ["red", "green", "blue"] as const;

type RedAndBlue = (typeof rgb)[0 | 1];
// array 에 number을 입력하면 모든 배열의 값이 추론되게 해줌 (객체의 keyof 와 같음)
type RGB = (typeof rgb)[number];

type tests = [
  Expect<Equal<RedAndBlue, "red" | "green">>,
  Expect<Equal<RGB, "red" | "green" | "blue">>
];

// Template literals infer
type Names = ["Junsuk Park", "Bill Evans", "Stan Getz", "Foo"];

// Names 타입에서 각 요소의 마지막 단어만 추출하게 하기
// 템플릿 리터럴을 사용하여 타입 파라미터 T를 첫단어 마지막 단어로 나누어 2개 이상으로 나누어진 요소가 있을 경우 마지막 단어를 리턴 없을 경우 never을 리턴한다.
type GetSurname<T> = T extends `${infer FirstName} ${infer LastName}`
  ? LastName
  : never;

type tests = [
  Expect<Equal<GetSurname<Names[0]>, "Park">>,
  Expect<Equal<GetSurname<Names[1]>, "Evans">>,
  Expect<Equal<GetSurname<Names[2]>, "Getz">>,
  Expect<Equal<GetSurname<Names[3]>, never>>
];

// Next.js InferPropsFromSeverSideFuction 타입 만들기
const getServerSideProps = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const json: { title: string } = await data.json();
  return {
    props: {
      json,
    },
  };
};

// getServerSideProps의 return 값인 props 값의 타입을 리턴하는 값을 추출
// 타입 파리미터의 조건은 getServerSideProps는 함수기 때문에 함수 조건으로 추출하고, 비동기 함수이기 때문에 Promise의 리턴 값인 {props: infer TData}에서 TData를 infer을 사용하여 타입을 추론하게 한다.
// 결과적으로 getServerSideProps 의 리턴 값에서 props의 값이 있으면 그 값의 타입을 반환하고, 없다면 never을 반환한다.
type InferPropsFromServerSideFunction<T> = T extends () => Promise<{
  props: infer TData;
}>
  ? TData
  : never;

type tests = [
  Expect<
    Equal<
      InferPropsFromServerSideFunction<typeof getServerSideProps>,
      { json: { title: string } }
    >
  >
];

// 복잡한 조건 타입
const parser1 = {
  parse: () => 1,
};

const parser2 = () => "123";

const parser3 = {
  extract: () => true,
};

// 위의 3가지의 조건을 만족하는 타입을 만들기
// 다중 삼항연산자를 이용하여 parser1,2,3 들이 포함된다면 그 포함된 것의 리턴값의 타입을 반환한다.
type GetParserResult<T> = T extends { parse: () => infer T1 }
  ? T1
  : T extends () => infer T2
  ? T2
  : T extends { extract: () => infer T3 }
  ? T3
  : never;

type tests = [
  Expect<Equal<GetParserResult<typeof parser1>, number>>,
  Expect<Equal<GetParserResult<typeof parser2>, string>>,
  Expect<Equal<GetParserResult<typeof parser3>, boolean>>
];
