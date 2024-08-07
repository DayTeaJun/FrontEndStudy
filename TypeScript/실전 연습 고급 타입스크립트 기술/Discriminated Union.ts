// Discriminated Union
type A =
  | {
      type: "a"; // 구성 요소를 구분해주는 필드 존재
      a: string; // 같은 형태를 가져도 되지만
    }
  | {
      type: "b";
      b: string;
    }
  | {
      type: "c";
      c: string;
      d: string;
      // d라는 필드처럼 구분지을 수 있는 필드 존재 및 나머지 데이터가 같지 않을 때, 사용
    };

type B = "a" | "b" | "c";

// 여러 값들에 미리 이름을 정의하여 열거해 두고 사용하는 타입
enum C {
  a = "a",
  b = "b",
  c = "c",
}
// enum 예시 추가
// 열거형, 반드시 문자 or 숫자만 가능
// 앞의 갚을 따름
enum Direction {
  Up = 1,
  Down, // 2
  Left, // 3
  Right, // 4
}

// 앞에 암것도 없으면 0부터 ㄱㄱ
enum Direction2 {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}

enum Example3 {
  A = getUserInfo(),
  B, // 오류! 앞에 나온 A가 계산된 멤버이므로 초기화가 필요합니다.
}

// Discriminated Union 활용 예시
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
type Shape = Square | Rectangle;

function area(shape: Shape) {
  if (shape.kind === "square") {
    return shape.size * shape.size;
  } else {
    return shape.width * shape.height;
  }
}

import { Equal, Expect } from "../../helper";

export type Event =
  | {
      // type 구분자를 통해 각각의 이벤트를 구분하여 특정요소 뽑아내기
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

// 유틸리티 타입인 Extract 사용
// type:click 이라는 구성요소만 뽑아올 수 있음
type ClickEvent = Extract<Event, { type: "click" }>;

type tests = [Expect<Equal<ClickEvent, { type: "click"; event: MouseEvent }>>];
