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

// Exclude<T, U>는 제네릭 타입 T와 U이 겹치는 타입을 제외한 타입을 반환함.
// Union 타입에서 제외시킬 특정 요소를 넘기게 되면 일부 요소들로 새로운 타입이 생성.
type NonKeyDownEvents = Exclude<Event, { type: "keydown" }>;

type tests = [
  Expect<
    Equal<
      NonKeyDownEvents,
      | { type: "click"; event: MouseEvent }
      | { type: "focus"; event: FocusEvent }
    >
  >
];
