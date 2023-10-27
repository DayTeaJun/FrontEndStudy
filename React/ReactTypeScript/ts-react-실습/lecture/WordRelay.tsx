import * as React from "react";
import { useState, useCallback, useRef } from "react";

const WrodRelay = () => {
  const [word, setWord] = useState("하루차");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputEl = useRef<HTMLInputElement>(null);

  // 제네릭을 받아서 타입 추론이 좋아졌지만 가독성이 좋진 않다.
  const onSubmitForm = useCallback<(e: React.FormEvent) => void>((e) => {
    e.preventDefault();
    const input = inputEl.current;
    if (word[word.length - 1] === value[0]) {
      setResult("굳");
      setWord(value);
      setValue("");
      if (input) {
        input.focus();
      }
    } else {
      setResult("ㄴㄴ");
      setResult("");
      if (input) {
        input.focus();
      }
    }
  }, []);

  // 제네릭을 쓰지 않아도 됨
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          value={value}
          // useCallback은 타입추론을 방해하고, useCallback의 제네릭자리에 타입을 적어서 타입추론을 할 수 있음
          // onChange={useCallback<(e :React.ChangeEvent<HTMLInputElement>) => void>((e) => setValue(e.currentTarget.value), [])}
          // 근데 가독성 별로라서 함수를 빼놓는게 좋다
          onChange={onChange}
        />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

export default WrodRelay;
