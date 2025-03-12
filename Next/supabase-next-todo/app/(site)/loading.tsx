"use client";
// 클라이언트 로딩
import React from "react";

import { DotLoader } from "react-spinners";

// 로딩시 이동되는 컴포넌트
function Loading() {
  return (
    <div className="flex flex-col items-center mt-12">
      <div>
        <DotLoader />
      </div>
      <p className="font-bold mt-5">loading...</p>
    </div>
  );
}

export default Loading;
