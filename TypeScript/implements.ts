// interface는 object 타입지정할 때 쓴다.
// 다른 용도로는 class 타입을 확인하고 싶을 때도 interface 문법을 사용할 수 있다.
// 이때, implements 키워드를 필요로 한다.

class Car22 {
  model: string;
  price: number = 1000;
  constructor(a: string) {
    this.model = a;
  }
}
let 붕붕이2 = new Car22("morning");
// class가 model, price 속성을 가지고 있는지 타입으로 확인하고 싶을 때
// interface + implements 키워드로 확인

interface CarType {
  model: string;
  price: number;
}

// implements 쓰고 interface 사용시 -> 이 class가 이 interface에 있는 속성을 다 들고 있는지 확인이 가능하다.
// 다 가지고 있다면 에러가 없고 빠진 속성이 있다면 에러로 알려준다.
class Car33 implements CarType {
  model: string;
  price: number = 1000;
  constructor(a: string) {
    this.model = a;
  }
}
let 붕붕이3 = new Car33("morning");

// implements는 타입지정 문법이 아니다.
interface CarType2 {
  model: string;
  tax: (price: number) => number;
}

// implements는 interface CarType2에 있던 model: string 이 반영되는게 아님
// tax() 함수 또한 number타입이 전혀 반영되지 않는다.
class Car44 implements CarType2 {
  model; ///any 타입됨
  tax(a) {
    ///a 파라미터는 any 타입됨
    return a * 0.1;
  }
}
// 결론은 implements는 class의 타입을 체크하는 용도지 할당하는게 아님
