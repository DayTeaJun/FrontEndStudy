import { pingAction } from "@/actions/ping/ping.action";
import { sleep } from "@/lib/utils";
import React from "react";
import ClientComponentTest from "./components/ClientComponentTest";
import { getTodoAction } from "@/actions/todo/todo.action";

const page = async () => {
  console.log("ssr start");

  const result = await getTodoAction();
  await sleep(1500);

  console.log("ssr end");

  return (
    <div>
      page {JSON.stringify(result)}
      <ClientComponentTest />
    </div>
  );
};

export default page;
