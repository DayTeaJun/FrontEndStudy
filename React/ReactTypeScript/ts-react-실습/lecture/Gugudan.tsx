// 함수형 컴포넌트
// jsx 사용시 필수
import * as React from "react";
import { useState, useRef } from "react";

// <> === React.Fragment
const Gugudan = () => {
  // 타입스크립트가 스스로 타입 추론을 하지 못한다면 제네릭을 추가하여 사용
  const [first, setFirst] = useState<number>(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  // 제네릭 사용
  const inputEl = useRef<HTMLInputElement>(null);

  // 함수를 분리하는 경우 타입 추론이 정확히 안됨
  // 그래서 해당 e에 대한 타입을 직접 적어줘야 함
  const onSubmitFrom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputEl.current;
    if (parseInt(value) === first * second) {
      setResult("정답");
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue("");

      // input이 존재하는 경우에 사용
      if (input) {
        // 위에서 제네릭을 사용하여 타입추론이 됨 (안하면 null로 취급)
        input.focus();
      }
      // 또는 input!.focus() 로 사용해도 됨. 근데 에러가 날 수 있으므로 왠만하면 if문으로
    } else {
      setResult("땡");
      setValue("");
      if (input) {
        input.focus();
      }
    }
  };

  return (
    <>
      <div>
        {first} 곱하기 {second}는?
      </div>
      <form onSubmit={onSubmitFrom}>
        <input
          ref={inputEl}
          type="number"
          value={value}
          // e타입이 알아서 추론됨(아래처럼 같이 사용((e) => setConstantValue(e.target.value))할 경우, 매개변수가 타입추론이 됨)
          // (parameter) e: React.ChangeEvent<HTMLInputElement>
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      <div>{result}</div>
    </>
  );
};

export default Gugudan;
