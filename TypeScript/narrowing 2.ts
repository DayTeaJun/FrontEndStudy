function 함수(a: string | undefined) {
  // a 가 undefined면 if문 실행 x
  // a 가 string이면 if문 실행 o
  if (a && typeof a === "string") {
  }
}

// in 키워드 object narrowing (서로 가진 속성명이 다르면 in을 사용)
type Fish = { swim: string };
type Bird = { fly: string };
function 함수(animal: Fish | Bird) {
  // 속성명 in 오브젝트자료
  if ("swim" in animal) {
    animal.swim;
  }
}

// instanceof 연산자로 object narrowing 가능
// 오브젝트의 부모가 누군지 판별
// 오브젝트 instanceof 부모class;
// object 두개가 비슷하면 부모 class가 누군지 물어봐서 narrowing 가능

let 날짜 = new Date();
if (날짜 instanceof Date) {
  // 날짜가 부모인 Date 로부터 생성이 되었는가로 narrwoing
}

// object 타입이 두개다 비슷하게 생긴 경우 narrowing
// in 키워드(다른 속성이 없음) 및 instanceof(부모가 없음) 불가능
// (똑같은 타입이면 합치는게 좋긴함)
type Car2 = {
  // object마다 literal type을 만들어두면 narrowing 편리해짐
  model: 4; // 내가 정한 문자 (고정된 값을 정해서)
  wheel: "4개";
  color: string;
};
type Bike = {
  wheel: "2개";
  color: string;
};

function 함수(x: Car2 | Bike) {
  if (x.wheel === "4개") {
    console.log("x는 Car타입임");
  }
}
// 논리적으로 이 타입인지 특정지을 수 있으면 narrowing으로 인정
