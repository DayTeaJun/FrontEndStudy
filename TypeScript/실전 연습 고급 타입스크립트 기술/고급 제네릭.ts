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
