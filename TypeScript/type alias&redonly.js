"use strict";
var 동물 = 123; // 아래와 같음
var 동물2 = { name: "kim", age: 20 }; // 아래와 같음
// let 동물2 : { name : string, age : number } = {name: 'kim', age:20}
// 타입 변수의 작명은 대문자로 시작하는게 관습이다 (일반 변수와 차별화)
var 출생지역2 = { resion: "seoul" };
출생지역2.resion = "busan"; // const변수는 등호로 재할당만 막는 역할로, const로 담은 object 수정은 자유롭게 가능
var 여친 = {
    name: "엠버",
};
여친.name = "유라"; // 위의 readonly 때문에 수정이 불가함
// { x : number, y : number } 와 같음
var postion = { x: 10, y: 20 }; // &연산자로 object타입을 extend(확장)한다라고도 함
var testing = { test: 123 };
var 테스트용변수 = {
    size: 123,
    position: [1, 2, 3],
};
var 테스트유저정보 = {
    name: "jun",
    phone: 123,
    email: "gkfnck",
};
var 테스트유저정보2 = {
    name: "jun",
    phone: 123,
    minor: false,
    email: "gkfnck",
};
