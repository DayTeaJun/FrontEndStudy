interface StringOnly {
  name: string;
  age: string;
  location: string;
}

// 위의 interface로 타입 일일이 지정해주기엔 귀찮음
let user22: StringOnly = {
  name: "kim",
  age: "20",
  location: "seoul",
};

// 모든 속성을 같은 타입으로 지정 가능 (index signatures)
interface StringOnly2 {
  // [key : string] -> 모든 속성(지금은 문자로 된 속성 string 타입은 string만 반환)
  [key: string]: string;
  // age :number -> 위에 모든 속성은 문자로 하겠다고 정의했으므로 에러가 나게됨
  // [key: string]: number | string 이라면 위 가능
}
// 모든 속성에 string 속성을 넣음
let user33: StringOnly2 = {
  name: "kim",
  age: "20",
  location: "seoul",
};

// 속성이름이 숫자인 경우
let user44: StringOnly2 = {
  0: "kim",
  1: "20",
  2: "seoul",
};
// 이때도 index signature 사용가능
// 위의 StringOnly2 에서 속성을 string이라고 했는데 에러가 안나는 이유는 object(객체)에서는 속성이름을 숫자로 해도 결국은 문자화해주기 때문

// 이런 객체의 타입지정은 어떻게 하는가?
let css: CssType = {
  "font-size": {
    "font-size": {
      "font-size": 14,
    },
  },
};

// 아래처럼 만들 수 있지만 간략하게 가능
interface CssType {
  "font-size": {
    "font-size": {
      "font-size": number;
    };
  };
}

// recursive(재귀)하게 타입
interface CssType2 {
  // font-size 속성안에 CssType와 같은 내용이 들어가면서 여러번 중첩하게 사용가능
  "font-size": CssType2 | number;
  // 마지막 중첩에서 number 타입을 넣을 수 있게 만듦
}

let css2: CssType2 = {
  "font-size": {
    "font-size": {
      "font-size": 14,
    },
  },
};

// 해보기 1 타입 지정
let obj: ObjType = {
  model: "k5",
  brand: "kia",
  price: 6000,
  year: 2030,
  date: "6월",
  percent: "5%",
  dealer: "김차장",
};

interface ObjType {
  [key: string]: string | number;
}
// 유연한 타입지정이 가능하지만, 엄격하지 않기 때문에 버그를 잡아주지 않을 수 있다.

// 해보기 2 recursive(재귀)한 타입 지정
let obj2: ObjType2 = {
  "font-size": 10,
  secondary: {
    "font-size": 12,
    third: {
      "font-size": 14,
    },
  },
};

interface ObjType2 {
  "font-size": number;
  [key: string]: ObjType2 | number;
}
