let obj22 = { name: "kim" };
// 객체의 키의 값을 뽑을 때 사용
Object.keys(obj22); // ['name', 'age']

// keyof 연산자 : key 값을 전부 가져옴
interface Person22 {
  age: number;
  name: string;
}

type PersonKeys = keyof Person22; // 새로운 union 타입 남음('age' | 'name')
let a22: PersonKeys = "name"; // ('age' | 'name') 리터럴 타입인 age, name 사용

// index signature 에 keyof를 사용하면
interface Person33 {
  // 모든 문자 키는 number의 값을 가지게 함
  [key: string]: number;
}

type PersonKeys22 = keyof Person33;
// PersonKeys22 가 number | string 인 이유는 객체의 키값은 숫자든 문자든 문자로 바뀌기 때문이다.
let a33: PersonKeys22 = "name";

// 아래 타입을 전부 string으로 바꾸려면
type Car12 = {
  color: boolean;
  model: boolean;
  price: boolean | number;
};

// 타입 변환기 (mapping(a -> b 변환))
type TypeChanger<MyType> = {
  // 입력받은(파라미터) object 타입의 키(key)를 union 타입으로 만듦('color' | 'model' | 'price')
  // 왼쪽에 있는 키가 오른쪽에 있는 MyType(union 타입들 ('color' | 'model' | 'price'))이 있으면 값을 string 으로 지정해주게 해줌
  [key in keyof MyType]: string;
};

// 전부 string으로 변경해짐
type 새로운타입 = TypeChanger<Car12>;

// 해보기 1 mapping
type Bus = {
  color: string;
  model: boolean;
  price: number;
};
// color, model, price 속성은 전부 string 또는 number 타입으로 변경하기

type TypeBusChanger<MyType> = {
  [key in keyof MyType]: number | string;
};

type NewBus = TypeBusChanger<Bus>;

// 해보기 2
// object안에 들어있는 모든 속성을
// string, number 이렇게 고정된 타입으로 변환해주는게 아니라
// 내가 원하는 타입을 입력하면 그걸로 변환해주는 범용성 좋은 변환기를 만들어보십시오.
type TypeCustomChanger<MyType, T> = {
  [key in keyof MyType]: T;
};

type Bus2 = {
  color: string;
  model: boolean;
  price: number;
};

type NewBus2 = TypeCustomChanger<Bus2, number>;
type NewBus3 = TypeCustomChanger<Bus2, string[]>;
