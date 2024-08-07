"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var 멍멍 = ["dog", true];
// 위치, 개수까지 고려한 타입 지정 가능 tuple type
var 멍멍2 = ["dog", true];
// 무조건 첫번째는 string 두번째는 boolean 아니면 에러남
// tuple 안에 옵션 표시 가능 (옵션 (?)은 뒤에서부터 넣어야함 중간부터 안됨)
var 멍멍3 = ["dog", true];
// ...x(rest parameter) 파리미터가 몇개 들어올지 모를때 쓰는거
// rest parameter는 배열이기 때문에 tuple type 가능
function 함수() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
    console.log(x);
}
function 함수(a, b) {
    console.log([a, b]);
}
// 위 2개는 거의 같지만 rest parameter로 받은것은 []에 파라미터가 전부 담겨온다.
함수(111, "222");
var arr11 = [1, 2, 3];
// spread 연산시 타입지정 (rest parameter와 유사함(array가 들어오는데 몇개 들어올지 모를 때))
var arr22 = __spreadArray([4, 5], arr11, true);
// 해보기
// 음식의 1. 이름 2. 가격 3. 맛있는지여부를 array 자료에 담아보고 타입지정
var 배고파 = ["동서녹차", 4000, true];
var 배고파2 = [
    "동서녹차",
    4000,
    true,
    false,
    true,
    true,
    false,
    true,
];
// 1. 이 함수의 첫째 파라미터는 문자,
// 2. 둘째 파라미터는 boolean,
// 3. 셋째 파라미터부터는 숫자 또는 문자가 들어와야합니다.
function 함수11() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
    console.log(x);
}
함수11("11", true, 22, "1", 22, 3, "33");
// 문자/숫자 분류기 함수
// 파라미터 중 문자만 모아서 [] 에 담아주고, 숫자만 모아서 [] 에 담아주는 함수가 필요합니다.
// 문자 숫자 외의 자료는 입력불가능하고 파라미터 갯수 제한은 일단 없습니다.
function 함수22() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
    var result = [[], []];
    x.forEach(function (a) {
        if (typeof a === "string") {
            result[0].push(a);
        }
        else {
            result[1].push(a);
        }
    });
    console.log(result);
}
함수22("b", 5, 6, 8, "a");
