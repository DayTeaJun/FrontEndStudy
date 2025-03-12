"use client";

// 클라이언트 컴포넌트
import React from "react";
import { BounceLoader } from "react-spinners";

// 오류시 이동되는 컴포넌트
function Error() {
  return (
    <div className="flex flex-col items-center mt-12">
      <div>
        <BounceLoader />
      </div>
      <p className="font-bold mt-5">loading</p>
    </div>
  );
}

export default Error;
