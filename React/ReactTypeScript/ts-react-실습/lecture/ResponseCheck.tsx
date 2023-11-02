import * as React from "react";
import { useState, useRef, useCallback } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요.");
  // 빈 배열이 useState이고 타입 지정 안되있을 경우, 타입이 never이 되므로, 제네릭으로 타입 지정을 해줘야 함.
  const [result, setResult] = useState<number[]>([]);
  // 타입스크립트가 useRef를 기본으로 RefObject로 취급하기 때문에 readonly로 생각하고, 이것을 MutableRefObject로 변경하면 readonly가 없어진다.
  // * 참고로 (number | null) 은 하나의 타입으로 취급되어 T로 취급, 이전에는 T 또는 null 이라는 2개 중 하나를 취급하여 기본값이 된 것
  const timeout = useRef<number | null>(null);
  const startTime = useRef(0);
  const endTime = useRef(0);

  const onClickScreen = useCallback(() => {
    if (state === "waiting") {
      // setTimeout을 타입스크립트가 node.js에서 동작한다고 생각하기 때문에, setTimeout을 window를 붙혀 명시적으로 웹에서 동작한다고 알려야한다.

      // current가 지금 readonly 여서 변경이 불가능
      // useRef는 3가지 종류가 있음 (오버로딩)
      // 현재 타입스크립트가 지금 ref를 null이라고 생각해 RefObject로 취급해서 readonly로 생각하고, 이것을 MutableRefObject로 변경하면 readonly가 없어진다.
      timeout.current = window.setTimeout(() => {
        setState("now");
        setMessage("지금 클릭");
        startTime.current = new Date().getTime();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === "ready") {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      setState("waiting");
      setMessage("너무 성급해, 초록색이 된 후에 클릭");
    } else if (state === "now") {
      endTime.current = new Date().getTime();
      setState("waiting");
    }
  }, [state]);

  const onReset = useCallback(() => {
    setResult([]);
  }, []);

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheck;
