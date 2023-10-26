// jsx 사용시 필수
import * as React from "react";
import { useState, useRef } from "react";

// <> === React.Fragment
const Gugudan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputEl = useRef(null);

  const onSubmitFrom = (e) => {
    e.preventDefault();
    const input = inputEl.current;
    if (parseInt(value) === first * second) {
      setResult("정답");
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue("");
      if (input) {
        input.focus();
      } else {
        setResult("땡");
        setValue("");
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
          //   아래는 한번에 추론이 된다 e타입이 (parameter) e: React.ChangeEvent<HTMLInputElement>
          onChange={(e) => setConstantValue(e.target.value)}
        />
      </form>
    </>
  );
};
