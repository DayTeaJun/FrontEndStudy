// 제네릭과 타입 제한
// 들어오는 타입파라미터에 따라 타입을 제한
type GreetingType<TGreeting> = TGreeting extends "goodbye"
  ? "hello"
  : "goodbye";

// "hello" | "goodbye" 로 타입 제한
function youSayGoodbyeISayHello<TArg extends "hello" | "goodbye">(
  greeting: TArg
) {
  // 위에서 만든 타입으로 아래 return 타입값을 제한함
  // as를 사용할 때 끝에부분만하면 "goodbye" 만 묶임 전체 괄호로 묶어야함
  return (greeting === "goodbye" ? "hello" : "goodbye") as GreetingType<TArg>;
}

it("Should return goodbye when hello is passed in", () => {
  const result = youSayGoodbyeISayHello("hello");

  type test = [Expect<Equal<typeof result, "goodbye">>];

  expect(result).toEqual("goodbye");
});

it("Should return hello when goodbye is passed in", () => {
  const result = youSayGoodbyeISayHello("goodbye");

  type test = [Expect<Equal<typeof result, "hello">>];

  expect(result).toEqual("hello");
});

// Curry : 커링은 하나 이상의 매개변수를 갖는 함수를 부분적으로 나누어 각각 단일 매개변수를 갖는 함수로 설정하는 기법

// non-curried : 함수 실행 시 파라미터가 모자라도 문제 없이 실행이 가능함
// ? 함수 정의 : func(a, b, c)
// ? 함수 실행 : func(a)
// ? 실행 결과 : func(a, undefined, undefined)

// curried : 함수가 인수를 전부 받을 때까지 실행을 보류함.
// ? 함수 정의 : func(a, b, c)
// ? 함수 실행 : func(a)
// ? 실행 결과 : func(a)상태에서 b 함수 입력 대기
export const curryFunction =
  // 함수가 실행이 될때 맨앞의 T만 받기 때문에,
  // 아래처럼 하면 맨앞의 T만 추론이 된다.
  // const result = curryFunction(1)(2)(3); 중
  // const result = curryFunction(1) 이 먼저 실행되므로,
  // <T, U, V>(t: T) =>
  // (u: U) =>
  // (v: V) =>
  // 각각의 타입을 추론할려면 각각의 화살표 함수앞에 타입인자를 선언하여 타입인자를 받도록 한다.

    <T>(t: T) =>
    <U>(u: U) =>
    <V>(v: V) => {
      return {
        t,
        u,
        v,
      };
    };

it("Should return an object which matches the types of each input", () => {
  const result = curryFunction(1)(2)(3);

  expect(result).toEqual({
    t: 1,
    u: 2,
    v: 3,
  });

  type test = [
    Expect<Equal<typeof result, { t: number; u: number; v: number }>>
  ];
});
