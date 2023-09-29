// <> 일반 타입변수에도 사용가능 (타입 파라미터)
type Age22<T> = T;
// 타입파라미터를 받고 그대로 반환해주는 코드

let a44: Age22<string>;

// 타입 파라미터를 삼항연산자로 조건에 맞춰서 사용할 때
// 조건식은 extends 사용 (왼쪽에 있는 타입이 우측에 있는 타입을 가지고 있는지 검사)
type Age33<T> = T extends string ? string : unknown;
// 파라미터로 string이 들어오면 string을 남기고, 아니면 unkown을 남김

let a55: Age33<string>; // string
let a66: Age33<number>; // unkown

// 조건문으로 타입만들기
// 파라미터로 array 타입을 입력하면 array 첫 자료의 타입을 남김
// array 타입 말고 다른거 입력하면 any를 남김
// any는 모든 타입
type FirstItem<T> = T extends any[] ? T[0] : any;

let age77: FirstItem<number[]>;
let age88: FirstItem<number>;

// infer 키워드(R, Return type) (조건문에서 쓸 수 있고, 타입을 왼쪽에서 추출해줌)
type Person44<T> = T extends infer R ? R : unknown; // T 의 타입을 뽑아서 R에 넣음 (만약 타입 파라미터가 string이라면 R은 T에서 뽑기 때문에 string 타입이 됨)
// 타입을 뽑는 이유, R이라는 키워드에 담아서 사용할 수 있기 때문
type a77 = Person44<string>;

// 사용 예제 array 내부의 타입만 뽑고 싶을 때
type 타입추출<T> = T extends (infer R)[] ? R : unknown;
// T는 string[] 이 되고 이 때 (infer R)[] 에서 R은 string이 된다.
type a = 타입추출<string[]>;
// 타입은 string 타입이 된다.

// 함수를 넣으면 함수의 return 타입만 뽑고 싶을 때
type 타입추출2<T> = T extends () => infer R ? R : unknown;
// T에서 이때 infer로 R은 리턴 타입을 뽑는다.
type a22 = 타입추출2<() => void>;
// a22에서 위 R의 리턴값을 뽑으면 void로 타입은 void이다.

// 근데, ReturnType 이라는 기본 함수 쓰면 알아서 해준다.
type b = ReturnType<() => void>;
// 이미 있는 기본 함수를 쓰거나 위의 infer 키워드를 사용해서 쓰든 큰 차이는 없다.

// 해보기 1
// 1. array 타입을 입력하면
// 2. array의 첫 자료가 string이면 string 타입을 그대로 남겨주고
// 3. array의 첫 자료가 string이 아니면 unknown 을 남겨주려면 어떻게 타입을 만들어놔야할까요?
type Age44<T> = T extends [string, ...any] ? T[0] : unknown;

let age99: Age44<[string, number]>;
let age222: Age44<[boolean, number]>;

// 해보기 2
// 함수의 파라미터의 타입을 뽑아주는 기계를 만들어보십시오.
type 타입뽑기<T> = T extends (x: infer R) => any ? R : any;

type aa = 타입뽑기<(x: number) => void>; //이러면 number가 이 자리에 남음
type bb = 타입뽑기<(x: string) => void>; //이러면 string이 이 자리에 남음
