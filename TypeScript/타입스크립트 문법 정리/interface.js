"use strict";
var 네모 = { color: "red", width: 100 }; // 타입 지정은 자동으로 됨
var 학생 = { name: "kim" };
var 선생 = { name: "kim", age: 20 };
var 선생2 = { name: "kim", age: 20 };
var 개냥이 = { name: "kim" }; // 사용할 때 에러가 남 (&은 합치는게 아니라 왼쪽 오른쪽 둘 다 만족하는 타입이기 때문)
var 상품 = {
    brand: "Samsung",
    serialNumber: 1360,
    model: ["TV", "phone"],
};
var 장바구니 = [
    { product: "청소기", price: 7000 },
    { product: "삼다수", price: 800 },
];
var 장바구니2 = { product: "청소기", price: 7000, card: false };
var MathPM = {
    plus: function (a, b) {
        return a + b;
    },
    minus: function (a, b) {
        return a - b;
    },
};
