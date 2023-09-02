"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// class extends 복사
var User4 = /** @class */ (function () {
    function User4() {
        this.x = 10;
    }
    return User4;
}());
// User4 클래스를 복사
var NewUser = /** @class */ (function (_super) {
    __extends(NewUser, _super);
    function NewUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NewUser;
}(User4));
var 사람임 = new NewUser();
console.log(사람임); // {x:10}
// private, protected class 안에서만 사용가능
var User5 = /** @class */ (function () {
    function User5() {
        this.x = 10;
    }
    return User5;
}());
var NewUser2 = /** @class */ (function (_super) {
    __extends(NewUser2, _super);
    function NewUser2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // protected 라면 class 안에서 extends된 class 안에서도 사용가능
    NewUser2.prototype.doThis = function () {
        this.x = 20;
    };
    return NewUser2;
}(User5));
// protected는 extends된 class는 사용가능,
var 사람임2 = new NewUser2();
// private와 마찬가지로 자식들은 사용불가능
사람임2.x;
var User6 = /** @class */ (function () {
    function User6() {
        this.y = 20;
    }
    // static 키워드는 부모 class에 직접 부여되고 자식에겐 물려주지 않음(extends 는 잘따라온다)
    User6.x = 10;
    return User6;
}());
var 자식2 = new User6();
// static 자식은 사용 불가능
console.log(자식2.x);
// 부모는 사용 가능
console.log(User6.x); // 10
var User7 = /** @class */ (function () {
    function User7() {
    }
    // public / protected / private + static 붙일 수 있음
    User7.x = 10;
    return User7;
}());
var User8 = /** @class */ (function () {
    function User8() {
        this.intro = User8.skill + "전문가";
    }
    // construct보다 간편하게 사용
    // skill = "js"; // 이것을 못물려 받게 하고 싶을때 (this.skill 하지 않고)
    // 자식에게 skill 물려주지 않음
    User8.skill = "js"; // static을 사용할려면 무조건 부모로 사용
    return User8;
}());
var 철2수 = new User8();
console.log(철2수);
// static으로 만든 변수 변경가능
User8.skill = "ts";
var 철3수 = new User8();
console.log(철3수);
