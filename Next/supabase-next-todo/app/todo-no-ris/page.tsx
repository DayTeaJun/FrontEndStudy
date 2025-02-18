import { sleep } from "@/lib/utils";
import React from "react";
import TodoContainer from "./components/TodoContainer";

// 서버 클라이언트
const page = async () => {
  console.log("api 호출 중 로딩 보이도록");
  await sleep(1500);
  console.log("api 로딩 완료 후 페이지 보이도록");
  return (
    <div>
      page
      <TodoContainer />
    </div>
  );
};

export default page;
