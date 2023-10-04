let 이름: "kim"; // Literal types 내가 정한 문자만 들어올 수 있게해줌
이름 = "kim";
이름 = "jun"; // 다른건 안됨

let 접니다: "대머리" | "솔로";
접니다 = "대머리";
접니다 = "솔로";
// Literal types은 변수에 뭐가 들어올지 더 엄격하게 관리가능함 (자동완성도 해줌 굳)

function 함수(a: "hello"): 1 | 0 {
  return 0; // 리턴하는 값을 1이나 0으로 제한할 수 있음
}
함수("hello"); // 리터럴 타입으로 매개변수를 제한해줌

// 해보기
function 묵찌빠(x: "가위" | "바위" | "보"): ("가위" | "바위" | "보")[] {
  // 주의! Union type은 소괄호() 묶어줘야함
  return ["가위"];
}
묵찌빠("가위");

// const 를 업그레이드 한 것이 리터럴 타입
var 자료 = {
  // 해결법 1 object 만들 때 타입지정을 확실히 하기 :'kim'
  name: "kim",
} as const;
// 해결법 3 as const 키워드 쓰기 -> 이 object는 literal type 지정 알아서 해달라는 것
// ㄴ> object value 값을 그대로 타입으로 지정해줌 (name이란 속성은 앞으로 'kim')
// ㄴ> object 속성들에 모두 readonly 붙여줌
// => object 자료를 완전히 잠가놓고 싶으면 as const 사용

자료.name;

function 내함수(a: "kim") {}
내함수(자료.name); // 에러가 나는 이유는 a라는 파리미터의 자료형에 'kim'이라는 타입만 들어오게함
// 자료.name의 타입은 string으로 'kim' 타입은 string 타입이 아니라서 에러가 남
// 해결법 2 as 문법으로 타입 바꾸기
