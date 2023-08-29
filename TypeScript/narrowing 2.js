"use strict";
function 함수(a) {
    // a 가 undefined면 if문 실행 x
    // a 가 string이면 if문 실행 o
    if (a && typeof a === "string") {
    }
}
function 함수(animal) {
    // 속성명 in 오브젝트자료
    if ("swim" in animal) {
        animal.swim;
    }
}
// instanceof 연산자로 object narrowing 가능
// 오브젝트의 부모가 누군지 판별
// 오브젝트 instanceof 부모class;
// object 두개가 비슷하면 부모 class가 누군지 물어봐서 narrowing 가능
var 날짜 = new Date();
if (날짜 instanceof Date) {
    // 날짜가 부모인 Date 로부터 생성이 되었는가로 narrwoing
}
function 함수(x) {
    if (x.wheel === "4개") {
        console.log("x는 Car타입임");
    }
}
// 논리적으로 이 타입인지 특정지을 수 있으면 narrowing으로 인정
