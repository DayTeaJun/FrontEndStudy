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
// rest parameter
// 함수에 어떤 파라미터가 몇개 들어올지 미리 정의가 불가할 때 사용
function 전부더하기() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    // rest 파라미터는 항상 [] 안에 담겨오기 때문에 array 타입지정
    console.log(a);
    // [1,2,3,4,5]
}
전부더하기(1, 2, 3, 4, 5);
// spread operator는 괄호 벗길 때 사용
var arr = [3, 4, 5];
var arr2 = __spreadArray([1, 2], arr, true);
console.log(arr2); // [1,2,3,4,5]
// Destructuring (구조 분해 할당)
var _a = {
    student2: true,
    age2: 20,
}, student2 = _a.student2, age2 = _a.age2;
// console.log(student2) // true
// 함수 파라미터 객체 destructuring 문법
function 함수(_a) {
    var student = _a.student, age = _a.age;
    console.log(student, age); // true 20
}
함수({ student: true, age: 20 });
// 해보기
// 숫자 여러개를 입력하면 최댓값을 return 해주는 함수
// 방법 1
function maxNum() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    var maxNumber = a[0];
    for (var i = 0; i < a.length; i++) {
        if (a[i] > maxNumber) {
            maxNumber = a[i];
        }
    }
    return maxNumber;
}
console.log(maxNum(4, 6, 3, 2));
// 방법 2
function 최댓값() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
    var result = 0;
    x.forEach(function (i) {
        if (result < i) {
            result = i;
        }
    });
    return result;
}
console.log(최댓값(4, 6, 3, 2));
// object 자료를 파라미터로 입력할 수 있는 함수
// 방법 1
function 김서방(_a) {
    var user = _a.user, comment = _a.comment, admin = _a.admin;
    console.log(user, comment, admin);
}
김서방({ user: "kim", comment: [3, 5, 4], admin: false });
function 함수(_a) {
    var user = _a.user, comment = _a.comment, admin = _a.admin;
    console.log(user, comment, admin);
}
함수({ user: "kim", comment: [3, 5, 4], admin: false });
// array 자료를 파라미터로 입력할 수 있는 함수
// 방법 1
function 함수2(a) {
    a.forEach(function (i) { return console.log(i); });
}
function 함수(_a) {
    var a = _a[0], b = _a[1], c = _a[2];
    console.log(a, b, c);
}
함수2([40, "wine", false]);
