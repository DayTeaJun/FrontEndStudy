// .js에서 있는 변수를 .ts에서 이용하고 싶을 때
let a11 = 10;
let b11 = { name: "kim" };
// 사용하고자 하는 html에 스크립트(<script src="">) 를 넣으면 모든 내용을 같이 공유함
// 근데 ts에서는 에러를 띄움 (import 등 따로 안해줘서)

// 변수 재정의가 가능한 declare 문법
declare let a11; // 일반 js파일 등에 있던 변수를 쓸 때 에러나지 않도록 재정의할 때 사용
