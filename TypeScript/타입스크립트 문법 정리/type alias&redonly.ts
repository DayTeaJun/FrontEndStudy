type Animal = string | number | undefined; // type 키워드로 변수 만들기 type alias(타입 변수)
let 동물: Animal = 123; // 아래와 같음
// let 동물 :string | number | undefined;

type Animal2 = { name: string; age: number }; // 객체도 타입 변수를 만들 수 있음
let 동물2: Animal2 = { name: "kim", age: 20 }; // 아래와 같음
// let 동물2 : { name : string, age : number } = {name: 'kim', age:20}

// 타입 변수의 작명은 대문자로 시작하는게 관습이다 (일반 변수와 차별화)

const 출생지역2 = { resion: "seoul" };
출생지역2.resion = "busan"; // const변수는 등호로 재할당만 막는 역할로, const로 담은 object 수정은 자유롭게 가능

type Girlfriend = {
  readonly name?: string; // readonly(읽기전용) 속성을 주면 object자료 수정을 막을 수 있음
};
const 여친: Girlfriend = {
  name: "엠버",
};
여친.name = "유라"; // 위의 readonly 때문에 수정이 불가함
// 이렇게 에러가 뜨더라도 실제 자바스크립트에서는 잘 실행됨 ts에서만 에러를 띄어줌

type Name2 = string;
type Age2 = number;
type Person = Name2 | Age2; // type 변수 또한 union type으로 합칠 수 있음

type PositionX = { x: number };
type PositionY = { y: number };

type Position = PositionX & PositionY; // &연산자로 object 타입 합칠 수 있음
// { x : number, y : number } 와 같음
let postion: Position = { x: 10, y: 20 }; // &연산자로 object타입을 extend(확장)한다라고도 함

// 같은 이름의 type alias(타입 변수) 재정의 불가능

// 해보기
// object 타입을 정의한 type alias 두개를 & 기호로 합칠 때 중복된 속성이 있으면 어떻게 될까
type Test1 = { test: number };
type Test2 = { test: number };
type AllTest = Test1 & Test2; // 중복된 속성이 있어도 되지만, 중복된 속성에 값이 다르면 둘다 안됨
let testing: AllTest = { test: 123 };

// 1. 이 타입은 object 자료형이어야합니다.
type ObjectColor = { color?: string }; // 2. 이 타입은 color 라는 속성을 가질 수도 있으며 항상 문자가 들어와야합니다.
type ObjectSize = { size: number }; // 3. 이 타입은 size 라는 속성이 있어야하며 항상 숫자가 들어와야합니다.
type ObjectPosition = { readonly position: number[] }; // 4. 이 타입은 position 이라는 변경불가능한 속성이 있어야하며 항상 숫자가 담긴 array 자료가 들어와야합니다.

type ObjectAll = ObjectColor & ObjectSize & ObjectPosition; // type alias로 만들어보셈

// 위 코드 축약
type MyType = {
  color?: string;
  size: number;
  readonly position: number[];
};

let 테스트용변수: ObjectAll = {
  size: 123,
  position: [1, 2, 3],
};

// object 안에 있는 이름, 전화번호, 이메일 속성이 옳은 타입인지 검사
type User2 = { name: string; phone: number; email: string };
let 테스트유저정보: User2 = {
  name: "jun",
  phone: 123,
  email: "gkfnck",
};

type UserInfo = User2 & { minor: boolean };
let 테스트유저정보2: UserInfo = {
  name: "jun",
  phone: 123,
  minor: false,
  email: "gkfnck",
};
