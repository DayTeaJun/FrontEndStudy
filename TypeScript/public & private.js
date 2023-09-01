"use strict";
var User3 = /** @class */ (function () {
    // 이 클래스로 생성되는 모든 객체들은 name속성을 가지게 함
    function User3(a) {
        // name = 'kim' 아래와 위는 같음 (public 키워드가 숨겨져 있음(생략가능))
        // private는 자식들이 수정할 수 없게함
        // 수정하면 안되는 내용을 private로 함(클래스 안에서만 사용할 때)
        this.familyName = "kim";
        // constructor는 파리미터 입력가능
        // private로 수정하지 않는 내용을 사용할 때 (this.familyName)
        this.name = this.familyName + a;
    }
    User3.prototype.함수 = function () {
        // 함수에도 public 키워드 사용가능(생략가능)
    };
    // 자식들이 familyName을 바꾸고 싶으면 class 안에 familyName 변경 함수 제작하고 사용하면 됨
    User3.prototype.이름변경함수 = function (a) {
        this.familyName = a;
    };
    return User3;
}());
var 유저1 = new User3("민수");
// 유저1.name = "kim";
유저1.familyName; // familyName는 private이라서 수정 권한이 없음
console.log(유저1); // {familyName: 'kim', name: 'kim민수'}
유저1.이름변경함수("박");
console.log(유저1); // {familyName: '박', name: 'kim민수'}
var Person3 = /** @class */ (function () {
    // public 키워드쓰면 this. 생략가능
    // constructor 안의 파라미터는 자식의 name 속성에 기입해달라는 내용
    // 파리미터 여러개 사용가능
    function Person3(name, name2) {
        this.name = name;
        // this.name = name 과 같음
    }
    return Person3;
}());
var 자식 = new Person3("kim");
console.log(자식); // Person3 {name: 'kim'}
