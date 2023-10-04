type 함수타입 = (a: string) => number;
// 화살표함수에서 파리미터는 string에 리턴값은 number인 type alias

// 함수 type alias를 부착하려면 함수표현식 사용
let 함수12: 함수타입 = function () {
  return 10;
};

type NumberFc = (a: number) => number;
let PlusOne: NumberFc = function (a) {
  return a + 1;
};

// 해보기
type 회원정보타입 = {
  name: string;
  PlusOne: (x: number) => number;
  changeName: () => void;
};

let 회원정보: 회원정보타입 = {
  name: "kim",
  PlusOne,
  changeName: () => {
    return 10;
  },
};

type 에러 = (name: string) => void;
let 에러냐: 에러 = () => {
  return 10;
};
// 위 코드에서 void가 있는데도 에러 표시안해주는 이유
// https://pozafly.github.io/typescript/why-can-typescript-return-any-value-using-void/
// 1. 타입으로 분리되지 않은 함수 자체에 붙어 있는 void 값은 return 값이 존재하면 안된다.
// 2. 타입으로 분리되거나 타입이 선언과 할당이 따로 나뉘어 있는 void 값은 값이 존재해도 된다.
// TypeScript의 타입 시스템은 JavaScript의 런타임 동작을 모델링하는 타입 시스템을 갖고 있다. 따라서, TypeScript는 JavaScript를 문제 없이 구현하기 위해 void 반환 타입에 예외를 둔 것이다.

// type NumberFc = (a: number) => number;
type ZeroCut = (a: string) => string;

const cutZero: ZeroCut = (a) => {
  if (a[0] === "0") {
    const newA = a.replace(/^0/, "");
    return newA;
  }
};

type HighRemove = (a: string) => number;

const remove: HighRemove = (a) => {
  const newA = a.replace(/-/g, "");
  // replaceAll 안되는 이유 -> 컴파일러 설정 파일(tsconfig.json)에서 "lib" 옵션을 "es2021" 또는 그 이후 버전으로 변경 해야함
  return parseInt(newA);
};

function removeDash(x: string): number {
  let result = x.replace(/-/g, "");
  return parseFloat(result);
}

type CutZeroType = (a: string) => string;
type RemoveType = (a: string) => number;
const combine = (a: string, b: CutZeroType, c: RemoveType) => {
  console.log(c(b(a)));
};

combine("010-1111-2222", cutZero, remove);
