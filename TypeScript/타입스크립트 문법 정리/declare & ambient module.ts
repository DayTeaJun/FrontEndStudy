// .js에서 있는 변수를 .ts에서 이용하고 싶을 때 (외부 공용 자바스크립트)
let a11 = 10;
let b11 = { name: "kim" };
// 사용하고자 하는 html에 스크립트(<script src="">) 를 넣으면 모든 내용을 같이 공유함
// 근데 ts에서는 에러를 띄움 (import 등 따로 안해줘서)

// 변수 재정의가 가능한 declare 문법
declare let a12: number; // 일반 js파일 등에 있던 변수를 쓸 때 에러나지 않도록 재정의할 때 사용
// a 변수가 어딘가에 있는데 재정의할 것이니 에러내지 말아달라는 뜻

// 만약 js로 만든 라이브러리를 사용할 때 ts에서 오류남(제이쿼리 등, ts는 제이쿼리 모름)

declare let $;
$().append();

// ts파일 -> ts파일로 변수를 가져다 쓰고 싶다면 import export 사용하면됨
// import {a} from './data'

// ts 특징 : 모든 ts파일은 ambient module(글로벌 모듈)
// 다른 ts 파일에 변수나 함수를 정의해두면 다른 곳에서도 계속 정의된 상태로 사용가능
// 그래서 import export 없어도 다른 파일에 있던 var a 등 쓸 수 있음
// 전부 전역변수가 되기 때문에
// 글로벌 변수가 되지 않게 로컬 모듈로 만듦 (import export 있으면 자동으로 로컬 모듈이 된다)

// declare global {} 은 현재 로컬 모듈에서 글로벌 변수 만들 때
declare global {
  type Dog2 = string;
}
export {};
// 글로벌 타입 또는 글로벌 인터페이스 만들 때 사용

// 다른 파일에서 let b:Dog = 'kim' 와 같이 사용가능
