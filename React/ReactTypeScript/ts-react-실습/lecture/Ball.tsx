import * as React from "react";
import { FC } from "react";

// 리액트 함수 컴포넌트 타입 FC<{ props 제네릭 자리 }>
// 번외 : FC 사용 지양? https://shape-coding.tistory.com/entry/TypeScript-ReactFC%EC%97%90-%EC%82%AC%EC%9A%A9%EC%97%90-%EB%8C%80%ED%95%B4-%EC%83%9D%EA%B0%81%ED%95%B4%EB%B3%B4%EA%B8%B0
// children이 있는 타입을 사용한다면 PropsWithChildren<P> 사용 : https://solo5star.tistory.com/38
const Ball: FC<{ number: number }> = ({ number }) => {
  let background;
  if (number <= 10) {
    background = "red";
  } else if (number <= 20) {
    background = "orange";
  } else if (number <= 30) {
    background = "yellow";
  } else if (number <= 40) {
    background = "blue";
  } else {
    background = "green";
  }
  return (
    <div className="ball" style={{ background }}>
      {number}
    </div>
  );
};

export default Ball;
