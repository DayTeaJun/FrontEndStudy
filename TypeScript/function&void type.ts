function 함수2(x: number): number {
  // 파라미터, return 값 타입지정 가능
  return x * 2;
}

function 함수3(x: number): void {
  // void는 실수로 return하는걸 사전에 막을 수 있다.
  1 + 1;
}

// 타입지정된 파라미터는 필수로 파라미터를 넣어야함
함수3(3);

// 파라미터가 옵션인 경우 (파라미터가 선택사항인 경우)
function 함수4(x?: number): void {}
함수4();

// 변수? :number는 변수 :number | undefined와 같음 -> 함수에 파라미터를 입력하지 않으면 undefined가 되어있음
function 함수5(x?: number): void {}
함수5();

function 함수6(x: number | string): void {
  console.log(x + 3); // 타입스크립트는 엄격하기 때문에 타입과 타입이 동일한 number 일 경우 +연산이 됨
  // 이때는 number | string 타입(union type)이라 연산이 되지 않는다
  // -> 이 경우 Narrowing 을 통한 if문을 사용한다.
}

function 내함수(x?: number): number {
  return x * 2; // x? 는 x :number | undefined 타입이라서 x 파라미터가 확실하지 않기 때문에 에러가 난다.
}

// 해보기
function 내함수2(x: string | undefined): void {
  // 또는 x?: string
  if (x) {
    console.log(x);
  } else {
    console.log("이름이 없습니다.");
  }
}

function 내함수3(x: string | number): number {
  return x.toString().length;
}

function 내함수4(x: number, y: boolean, z: string): string {
  let result: number = 0;
  result += x;
  if (y) {
    result = +500;
  }
  if (z === "상") {
    result = +100;
  }

  if (result >= 600) {
    return "결혼가능";
  }
}
console.log(내함수4(100, true, "상"));
