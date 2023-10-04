"use strict";
// type이 아직 하나로 확정되지 않았을 경우 type Narrowing 사용
function 함수7(x) {
    if (typeof x === "string") {
        // type을 하나로 정함
        return x + "1";
    }
    else {
        return x + 1;
    }
}
함수7(123);
function 함수8(x) {
    var array = [];
    if (typeof x === "number") {
        array[0] = x;
    }
    else {
        // if문 사용시 else문까지 써야 확실히 됨
    }
    // '속성명 in 오브젝트자료' 및 '인스턴스 instanceof 부모' 도 Narrowing으로 판정 가능
    // assertion 문법 타입을 덮어씌움
}
function 함수9(x) {
    var array = [];
    // assertion 문법 타입을 덮어씌움 (narrowing과 비슷)
    array[0] = x; // 변수를 number로 덮어씌움
    return array;
}
console.log(함수9(123));
// 옛날 as 문법 <number>이름 // 이제는 안씀
// as 문법의 용도
// 1. Narrowing 할 때 사용
// * 타입이 여러가지 중 하나로 확정할 때 사용
// let 이름 :string = 'kim'
// 이름 as number; 은 불가능 (타입을 a에서 b로 변경하는게 안됨)
// 2. 무슨 타입이 들어올지 100% 확실할 때 사용
// (디버깅 용이나 비상용으로 사용 자주 사용하지 않기)
