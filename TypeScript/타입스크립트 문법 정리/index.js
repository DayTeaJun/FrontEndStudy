"use strict";
// 브라우저는 ts 파일을 읽지 못함 -> 그래서 js로 변환해줘야함
// tsc -w 입력해두면 자동으로 계속해서 변환됨 (필수)
// 위의 내용을 컴파일하는 옵션 설정은 tsconfig.json 에서 함
var naming = "kim"; // 타입을 정의할 수 있음
// 이름 = 123; // 다음과 같이 문자형으로 정한 것을 숫자형으로 하면 오류가 나고 알려줌
var 배열 = ["kim", "park"]; // 이 배열이라는 변수엔 무조건 string이 담긴 array만 들어올 수 있도록 함.
var 객체 = { name: "kim" }; // 객체변수는 무조건 객체이고, 안에 name의 값은 무조건 문자열만 담기도록 함
var 객체2 = {}; // 키에 ?을 주면 name이라는 속성이 안들어와도 에러가 안나게 해줌
var 이름숫자 = "kim"; // OR 연산자를 사용하여 문자형이나 숫자형이 들어와도 되게 해줌
var 이름숫자타입써보기 = 123; // 내가 정의한 타입 쓰기
// 함수에도 타입지정이 가능함
function 함수1(x) {
    return x * 2; // 어떤 타입이 리턴 될지는 위의 () :타입에 정의를 할 수 있음
}
var john = [123, true]; // tuple타입(무조건 정의한 타입의 순서대로 넣게 함)
var john2 = { name: "kim" }; // 무조건 name : string 이 들어오게 함
var john3 = { name: "kim", age: "23" };
// class 타입지정 문법
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    return User;
}());
var 회원들 = "park"; // 타입스크립트는 타입지정 문법을 생략해도 자동으로 타입이 지정된다.
// 해보기
var 내이름 = "jun";
var 내나이 = 25;
var 출생지역 = "부산";
var 좋아하는가수 = {
    song: "도쿄플래시",
    singer: "바운디",
};
var project = {
    member: ["kim", "park"],
    days: 30,
    started: true,
};
