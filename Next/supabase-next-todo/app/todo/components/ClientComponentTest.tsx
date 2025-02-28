"use client";

import { pingAction } from "@/actions/ping/ping.action";
import { getTodoAction } from "@/actions/todo/todo.action";
import React from "react";

function ClientComponentTest() {
  const handleClick = async () => {
    const result = await getTodoAction();

    // use client로 클라이언트 (브라우저)에서 콘솔이 찍힘
    // 클라이언트 컴포넌트에서 부르면 서버측에서 post 요청을 받아서 클라이언트에 데이터를 받게됨
    console.log(result);
  };

  return (
    <div>
      ClientComponentTest
      <button onClick={handleClick}>Test server actions</button>
    </div>
  );
}

export default ClientComponentTest;
