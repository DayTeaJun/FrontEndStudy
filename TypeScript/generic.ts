// array 입력하면 첫 자료 return 해주는 함수
function 함수(x: unknown[]) {
  // unknown 타입은 any 타입과 동일하게 모든 값을 허용하지만, 할당된 값이 어떤 타입인지 모르기 때문에 함부로 프로퍼티나 연산을 할 수 없음
  return x[0];
}
let a = 함수([4, 2]);
console.log(a);
// console.log(a + 1)은 안됨 a타입이 unkown타입이라서 (narrowing은 할수 있긴함)

// Generic 함수 만들기 (파라미터로 타입을 입력하는 함수)
function 함수2<MyType>(x: unknown[]) {
  // <> 안에는 파라미터 작명하듯이 아무거나 넣으면 됨
  return x[0];
}
let b = 함수2<number>([4, 2]);

// Generic 함수 (파리미터 받아서 적용하는 것처럼 값을 입력받으면 전체에 적용됨)
// 아래의 사용할 때 number을 받으면
// function 함수3<number>(x :number[]) :number 가 됨
function 함수3<MyType>(x: MyType[]): MyType {
  return x[0];
}
// 사용할 때
let numberC = 함수3<number>([4, 2]);
// 위 Generic 함수 장점
// 확장성 있음 (기존꺼에 string으로 바꾼다면 string도 사용 가능), 매번 다른 타입 출력가능
let stringC = 함수3<string>(["4", "2"]);
// 타입을 지정하지 않아도 자동으로 유추해줌
let numberC2 = 함수3([4, 2]);
let stringC2 = 함수3(["4", "2"]);

function 함수4<MyType extends number>(x: MyType) {
  return x - 1; // 아래 실행할 때 number을 받았지만 string이 들어올지 몰라서 에러가남
  //extends를 사용하여 미리 우측에 있는 타입을 가지고 있는지 체크해줌 (narrowing 과 비슷하게 인정)
}
let d = 함수4<number>(100);

// 커스텀 타입(또는 인터페이스)으로도 타입파라미터 제한가능
interface LengthCheck {
  length: number;
}
// MyType이 LengthCheck의 length라는 속성이 있는지 만족하면 아래의 return을 실행하게 해줌
function 함수5<MyType extends LengthCheck>(x: MyType) {
  return x.length; // 에러나는 이유는 string을 집어넣어도, 나중에 number를 실수로 넣는다면 미리 조작 방지를 위해 에러를 냄
}
// string이나 배열은 length라는 속성을 사용할 수 있음
// 그래서 if문처럼(string은 length 속성이 있는가에 판별하여 에러날지 나지 않을지 판별)
let e = 함수5<string>("good");
let f = 함수5<string[]>(["100"]);

// class도 Generic 사용가능
class 클래스<MyType> {} // new로 인스턴스를 만들 때 타입파라미터를 집어넣을 수 있음
// 타입변수에도 사용가능
type Age<MypType> = MypType;
