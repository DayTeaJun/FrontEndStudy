import * as React from "react";
import { useRef, useState, useCallback } from "react";

const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
  }
  return array;
};

interface TryInfo {
  try: string;
  result: string;
}

const NumberBaseball = () => {
  const [answer, setAnswer] = useState(getNumbers());
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  // useState에서 빈배열 사용하는 경우 타이핑 문제가 일어남
  // 그래서 타입지정을 위한 제네릭 사용
  const [tries, setTries] = useState<TryInfo[]>([]);
  // 기본 값이 null 이기때문에 제네릭 사용으로 타입 지정
  const inputEl = useRef<HTMLInputElement>(null);

  // useCallback으로 나누어 따로 사용하는 경우
  const onSubmitForm = useCallback<(e: React.FormEvent) => void>((e) => {
    e.preventDefault();
    const input = inputEl.current;
    if (value === answer.join("")) {
      setTries((t) => [
        ...t,
        {
          try: value,
          result: "홈런!",
        },
      ]);
      setResult("홈런!");
      alert("게임을 다시 실행합니다.");
      setValue("");
      setAnswer(getNumbers());
      setTries([]);
      if (input) {
        input.focus();
      }
    } else {
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다.`);
        alert("게임을 다시 시작합니다");
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
        if (input) {
          input.focus();
        }
      } else {
        console.log("답은", answer.join(""));
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            console.log("strike", answerArray[i], answer[i]);
            strike += 1;
            // includes 는 ex2016년 기능으로 tsconfig에 추가
          } else if (answer.includes(answerArray[i])) {
            console.log("ball", answerArray[i], answer.indexOf(answerArray[i]));
            ball += 1;
          }
        }
        setTries((t) => [
          ...t,
          {
            try: value,
            result: `${strike} 스트라이크, ${ball} 볼 입니다.`,
          },
        ]);
        setValue("");
        if (input) {
          input.focus();
        }
      }
    }
  }, []);

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          maxLength={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      <button>입력!</button>
      <div>시도 : {tries.length}</div>
      <ul>
        {tries.map((v, i) => (
          <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v} />
        ))}
      </ul>
    </>
  );
};
