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

// Discriminated Union 의 indexing 문제
import { Equal, Expect } from "../../helper";

export type Event =
  | {
      type: "click";
      event: MouseEvent;
    }
  | {
      type: "focus";
      event: FocusEvent;
    }
  | {
      type: "keydown";
      event: KeyboardEvent;
    };

// Discriminated Union은 결국 공통된 Union 값으로 구성되어 있기 때문에, Union에 구분자를 index하여 구분자들의 값을 찾을 수 있음
// 각각의 구분자들을 Union으로 묶은 타입이 됨
type EventType = Event["type"];

// 반대로 이벤트로 묶는다면 event 값들이 추론이 됨
type EventType2 = Event["event"];

type tests = [Expect<Equal<EventType, "click" | "focus" | "keydown">>];
