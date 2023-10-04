class Person2 {
  name: string; // constructor 에 this.name 할려면 변수를 미리 생성해야함 (ts)
  constructor(a: string) {
    // return 타입지정 할 필요는 없음 (항상 객체로 리턴되기 때문)
    this.name = a;
  }

  // prototype 함수
  함수(a: string) {
    console.log("굳" + a);
  }
}

let 사람1 = new Person2("kim");
let 사람2 = new Person2("jun");
사람1.함수("굳2");

// 해보기
class Car {
  model: string;
  price: number;
  constructor(a: string, b: number) {
    this.model = a;
    this.price = b;
  }
  tax(): number {
    return this.price / 10;
  }
}

let car1 = new Car("소나타", 3000);
console.log(car1);
console.log(car1.tax());

class Word {
  num;
  str;
  constructor(...a: (string | number)[]) {
    let numbers: number[] = [];
    let strings: string[] = [];

    a.forEach((i) => {
      if (typeof i === "string") {
        strings.push(i);
      } else {
        numbers.push(i);
      }
    });
    this.num = numbers;
    this.str = strings;
  }
}

let word1 = new Word(1, "123", "123", 4, 5);
console.log(word1.num);
console.log(word1.str);
