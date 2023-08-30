// fucntion return 값에 붙일 수 있는 never type
function 함수(): never {
  // 조건 1. return 값이 없어야함
  // 조건 2. endpoint가 없어야함
  // (endpoint가 없는 함수 (함수실행이 끝나지 않는 함수))
  throw new Error(); // 강제로 에러내기 -> 코드실행 중단(함수실행이 끝나지 않고 중단)
  while (true) {
    // 내부 코드가 무한히 돌아서 endpoint가 없음 -> never타입 가능
  }
}

// never타입 등장 경우 1
function 함수2(parameter: string) {
  if (typeof parameter == "string") {
    console.log(parameter);
  } else {
    // parameter은 string만 들어오기 때문에 성립하지 않음
    console.log(parameter);
    // 여기서의 prameter의 타입은 never(이런 타입은 있을 수 없다고 타입을 정의함)가 됨
  }
}
// never타입 등장 경우 2
let 함수10 = () => {
  throw new Error(); // undefined도 아무것도 return되지 않음 , 그래서 never타입이 된다
};
// 결과적으로 never타입은 void타입이 있기 때문에 쓸일은 없지만 어쩌다 등장할 경우가 있음 그때 왜 등장했는지에 이해만 하면된다.
