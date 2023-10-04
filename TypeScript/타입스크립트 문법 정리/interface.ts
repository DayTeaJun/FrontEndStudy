let 네모 = { color: "red", width: 100 }; // 타입 지정은 자동으로 됨
type Square = { color: string; width: number }; // 아래와 같음
// object 타입지정 시 interface 사용가능, class 만드는 법이랑 유사함
interface Square2 {
  color: string;
  width: number;
}

let 학생: Student = { name: "kim" };
let 선생: Teacher = { name: "kim", age: 20 };

type Student = { name: string };
interface Teacher extends Student {
  // Student에 있는 내용을 Teacher에 복사해서 붙여줌
  // 중복속성을 주면 에러가 발생하여 잡아줌
  age: number;
}

// interface 장점 -> extends로 복사 가능 (class extends)

type Animal3 = { name: string };
// & 기호 (intersection type)
type Cat = { age: number } & Animal3; // 왼쪽도 만족하고 오른쪽도 만족하는 타입을 생성, extends와 다르게 복사가 아닌 타입을 생성
let 선생2: Cat = { name: "kim", age: 20 };

// type vs interface
interface Student2 {
  name: string;
}
// 중복 선언 가능 (type은 중복선언 불가능)
interface Student2 {
  score: number;
}
// student 는 { name : string, score : number } (자동으로 extends가 되어 합쳐진다.)
// 외부 라이브러리같은 경우는 interface를 많이 씀 -> 추후에 type 에 더 속성을 추가하여 커스터마이징이 쉽게함
// 다른 사람이 이용많이할 것 같으면 object 타입정할 때 interface 씀

// & 쓸 때 중복속성 발생시
type Dog = { name: string };
type Hotdog = { name: number } & Dog; // 미리 에러가 나지 않음
let 개냥이: Hotdog = { name: "kim" }; // 사용할 때 에러가 남 (&은 합치는게 아니라 왼쪽 오른쪽 둘 다 만족하는 타입이기 때문)

// 해보기
interface Product {
  brand: string;
  serialNumber: number;
  model: string[];
}
let 상품: Product = {
  brand: "Samsung",
  serialNumber: 1360,
  model: ["TV", "phone"],
};

interface Basket {
  product: string;
  price: number;
}
let 장바구니: Basket[] = [
  { product: "청소기", price: 7000 },
  { product: "삼다수", price: 800 },
];

interface Card extends Basket {
  card: boolean;
}
let 장바구니2: Card = { product: "청소기", price: 7000, card: false };

interface MathOb {
  plus: (a: number, b: number) => number;
  minus: (a: number, b: number) => number;
}

let MathPM: MathOb = {
  plus(a, b) {
    return a + b;
  },
  minus(a, b) {
    return a - b;
  },
};
