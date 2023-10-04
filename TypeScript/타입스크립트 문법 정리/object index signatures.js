"use strict";
// 위의 interface로 타입 일일이 지정해주기엔 귀찮음
var user22 = {
    name: "kim",
    age: "20",
    location: "seoul",
};
// 모든 속성에 string 속성을 넣음
var user33 = {
    name: "kim",
    age: "20",
    location: "seoul",
};
// 속성이름이 숫자인 경우
var user44 = {
    0: "kim",
    1: "20",
    2: "seoul",
};
// 이때도 index signature 사용가능
// 위의 StringOnly2 에서 속성을 string이라고 했는데 에러가 안나는 이유는 object(객체)에서는 속성이름을 숫자로 해도 결국은 문자화해주기 때문
// 이런 객체의 타입지정은 어떻게 하는가?
var css = {
    "font-size": {
        "font-size": {
            "font-size": 14,
        },
    },
};
var css2 = {
    "font-size": {
        "font-size": {
            "font-size": 14,
        },
    },
};
// 해보기 1 타입 지정
var obj = {
    model: "k5",
    brand: "kia",
    price: 6000,
    year: 2030,
    date: "6월",
    percent: "5%",
    dealer: "김차장",
};
// 유연한 타입지정이 가능하지만, 엄격하지 않기 때문에 버그를 잡아주지 않을 수 있다.
// 해보기 2 recursive(재귀)한 타입 지정
var obj2 = {
    "font-size": 10,
    secondary: {
        "font-size": 12,
        third: {
            "font-size": 14,
        },
    },
};
