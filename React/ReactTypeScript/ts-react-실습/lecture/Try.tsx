import * as React from "react";
import { FunctionComponent } from "react";
import { TryInfo } from "./types";

// props 타입 정해주기
// 함수형 컴포넌트 타입
const Try: FunctionComponent<{ tryInfo: TryInfo }> = ({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
};

export default Try;
