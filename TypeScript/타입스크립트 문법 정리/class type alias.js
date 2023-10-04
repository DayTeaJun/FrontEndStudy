"use strict";
var Person2 = /** @class */ (function () {
    function Person2(a) {
        // return 타입지정 할 필요는 없음 (항상 객체로 리턴되기 때문)
        this.name = a;
    }
    // prototype 함수
    Person2.prototype.함수 = function (a) {
        console.log("굳" + a);
    };
    return Person2;
}());
var 사람1 = new Person2("kim");
var 사람2 = new Person2("jun");
사람1.함수("굳2");
// 해보기
var Car = /** @class */ (function () {
    function Car(a, b) {
        this.model = a;
        this.price = b;
    }
    Car.prototype.tax = function () {
        return this.price / 10;
    };
    return Car;
}());
var car1 = new Car("소나타", 3000);
console.log(car1);
console.log(car1.tax());
var Word = /** @class */ (function () {
    function Word() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        var numbers = [];
        var strings = [];
        a.forEach(function (i) {
            if (typeof i === "string") {
                strings.push(i);
            }
            else {
                numbers.push(i);
            }
        });
        this.num = numbers;
        this.str = strings;
    }
    return Word;
}());
var word1 = new Word(1, "123", "123", 4, 5);
console.log(word1.num);
console.log(word1.str);
