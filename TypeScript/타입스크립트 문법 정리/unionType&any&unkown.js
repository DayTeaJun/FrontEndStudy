"use strict";
// union type 타입 2개 이상 합친 새로운 타입
var 회원 = 123;
회원 = true;
회원 = "kim";
var 회원들2 = [1, "2", 3];
var 회원들3 = 1234; // 이것과 위는 다름 괄호로 안묶어주면 1234 또는 ['kim'] 이 가능하다는 것
var 오브젝트 = { a: "123" };
오브젝트 = { a: 123 };
// any타입은 타입실드 해제 문법 (일반 자바스크립트 변수처럼 해주는 것)
var 애니; // 이 변수에는 모든 타입을 들어갈 수 있게해줌
애니 = 123;
애니 = [];
// any랑 유사하지만, any보다 안전하게 모든 자료형 허용해준다.
var 언노운;
var 변수1 = 애니; // any타입은 string이라는 실드를 해제하고 들어가지만
var 변수2 = 언노운; // unknown은 실드를 해제하지 못함 (안정성이 있다)
// 타입스크립트는 간단한 수학연산도 타입이 맞아야함
언노운 - 1; // unknown타입은 뺄샘을 못하게함 (any, number, bigint 만 가능)
var 나이2;
나이2 + 1; // 타입이 맞지만 안됨 (타입스크립트는 엄격하게 적용함)
// string 타입 + 1 가능
// number 타입 + 1 가능
// string | number 타입 + 1 불가능 -> 왜냐 string | number 라는 타입임 (string 타입도 number 타입도 아님)
var 나이3 = 1;
나이3 - 1; // 변수가 1이지만, 숫자와 관련된 타입만 연산하도록 함
// 해보기
var user = "kim";
var age = undefined;
age = 123;
var married = false;
var 철수 = [user, age, married];
var 학교 = {
    score: [100, 97, 84],
    teacher: "Phil",
    friend: "John",
};
학교.score[4] = false;
학교.friend = ["Lee", 학교.teacher];
