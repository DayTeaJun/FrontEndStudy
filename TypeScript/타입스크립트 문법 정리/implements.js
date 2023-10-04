"use strict";
// interface는 object 타입지정할 때 쓴다.
// 다른 용도로는 class 타입을 확인하고 싶을 때도 interface 문법을 사용할 수 있다.
// 이때, implements 키워드를 필요로 한다.
var Car22 = /** @class */ (function () {
    function Car22(a) {
        this.price = 1000;
        this.model = a;
    }
    return Car22;
}());
var 붕붕이2 = new Car22("morning");
// implements 쓰고 interface 사용시 -> 이 class가 이 interface에 있는 속성을 다 들고 있는지 확인이 가능하다.
// 다 가지고 있다면 에러가 없고 빠진 속성이 있다면 에러로 알려준다.
var Car33 = /** @class */ (function () {
    function Car33(a) {
        this.price = 1000;
        this.model = a;
    }
    return Car33;
}());
var 붕붕이3 = new Car33("morning");
// implements는 interface CarType2에 있던 model: string 이 반영되는게 아님
// tax() 함수 또한 number타입이 전혀 반영되지 않는다.
var Car44 = /** @class */ (function () {
    function Car44() {
    }
    Car44.prototype.tax = function (a) {
        ///a 파라미터는 any 타입됨
        return a * 0.1;
    };
    return Car44;
}());
// 결론은 implements는 class의 타입을 체크하는 용도지 할당하는게 아님
