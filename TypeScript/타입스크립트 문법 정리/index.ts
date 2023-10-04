// 브라우저는 ts 파일을 읽지 못함 -> 그래서 js로 변환해줘야함
// tsc -w 입력해두면 자동으로 계속해서 변환됨 (필수)
// 위의 내용을 컴파일하는 옵션 설정은 tsconfig.json 에서 함

let naming: string = "kim"; // 타입을 정의할 수 있음
// 이름 = 123; // 다음과 같이 문자형으로 정한 것을 숫자형으로 하면 오류가 나고 알려줌
let 배열: string[] = ["kim", "park"]; // 이 배열이라는 변수엔 무조건 string이 담긴 array만 들어올 수 있도록 함.
let 객체: { name: string } = { name: "kim" }; // 객체변수는 무조건 객체이고, 안에 name의 값은 무조건 문자열만 담기도록 함
let 객체2: { name?: string } = {}; // 키에 ?을 주면 name이라는 속성이 안들어와도 에러가 안나게 해줌
let 이름숫자: string | number = "kim"; // OR 연산자를 사용하여 문자형이나 숫자형이 들어와도 되게 해줌

type 숫자나이름가능 = string | number; // 내가 직접 타입을 정의해서 사용가능, 타입은 변수에 담아쓸 수 있음
let 이름숫자타입써보기: 숫자나이름가능 = 123; // 내가 정의한 타입 쓰기
type Name = string; // 보통 타입 작명은 대문자로 시작함

// 함수에도 타입지정이 가능함
function 함수1(x: number): number {
  return x * 2; // 어떤 타입이 리턴 될지는 위의 () :타입에 정의를 할 수 있음
}
// 함수('123') // 다음과 같이 매개변수와 리턴을 number타입으로 정의했는데 문자열을 넣을 경우 에러를 발생시키도록 함

type Member = [number, boolean]; // array에 쓸 수 있는 tuple타입(무조건 정의한 타입의 순서대로 넣게 함)
let john: Member = [123, true]; // tuple타입(무조건 정의한 타입의 순서대로 넣게 함)

type Meber2 = {
  name: string;
};
let john2: Meber2 = { name: "kim" }; // 무조건 name : string 이 들어오게 함

// 객체에 타입지정해야할 속성이 너무 많으면
type Meber3 = {
  [key: string]: string; // 글자로 된 모든 object 속성의 타입은 string 이어야 한다고 타입 지정
};
let john3: Meber3 = { name: "kim", age: "23" };

// class 타입지정 문법
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

let 회원들 = "park"; // 타입스크립트는 타입지정 문법을 생략해도 자동으로 타입이 지정된다.

// 해보기
let 내이름: string = "jun";
let 내나이: number = 25;
let 출생지역: string = "부산";

let 좋아하는가수: { song: string; singer: string } = {
  song: "도쿄플래시",
  singer: "바운디",
};

let project: { member: string[]; days: number; started: boolean } = {
  member: ["kim", "park"],
  days: 30,
  started: true,
};
