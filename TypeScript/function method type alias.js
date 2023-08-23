"use strict";
// 화살표함수에서 파리미터는 string에 리턴값은 number인 type alias
// 함수 type alias를 부착하려면 함수표현식 사용
var 함수12 = function () {
    return 10;
};
var PlusOne = function (a) {
    return a + 1;
};
var 회원정보 = {
    name: "kim",
    PlusOne: PlusOne,
    changeName: function () {
        return 10;
    },
};
var 에러냐 = function () {
    return 10;
};
var cutZero = function (a) {
    if (a[0] === "0") {
        var newA = a.replace(/^0/, "");
        return newA;
    }
};
var remove = function (a) {
    var newA = a.replace(/-/g, "");
    // replaceAll 안되는 이유 -> 컴파일러 설정 파일(tsconfig.json)에서 "lib" 옵션을 "es2021" 또는 그 이후 버전으로 변경 해야함
    return parseInt(newA);
};
function removeDash(x) {
    var result = x.replace(/-/g, "");
    return parseFloat(result);
}
var combine = function (a, b, c) {
    console.log(c(b(a)));
};
combine("010-1111-2222", cutZero, remove);
