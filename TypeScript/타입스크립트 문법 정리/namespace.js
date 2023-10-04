"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 옛날 import가 없을 때 충돌을 방지하고자 object안에 넣어서 숨김
var 변수 = "kim";
var 차 = { wheel: 4, model: "BMW" };
var 자전거 = { wheel: 2, model: "bing" };
var ObjFc = function (a) {
    console.log(a);
};
ObjFc({ a: "굳" });
var dog2 = "bark";
var dog3 = { name: "paw" };
