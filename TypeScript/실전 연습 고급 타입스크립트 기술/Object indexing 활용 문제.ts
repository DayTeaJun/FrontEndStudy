import { Equal, Expect } from "../../helper";

export const fakeDataDefaults = {
  foo: "bar",
  bar: 123,
  baz: true,
};

// 단순히 fakeDataDefaults 이면 value space이기 때문에 type space로 변환하기 위해서 typeof 를 붙여야함
// "bar" 의 타입을 추론할려면 object indexing을 이용
export type FooType = (typeof fakeDataDefaults)["foo"];
export type BarType = typeof fakeDataDefaults.bar;

// 아래처럼 따로 빼서 사용하는게 편하긴함
type FakeDataType = typeof fakeDataDefaults;
export type BazType = FakeDataType["baz"];

type tests = [
  Expect<Equal<FooType, string>>,
  Expect<Equal<BarType, number>>,
  Expect<Equal<BazType, boolean>>
];
