// 서버에서 작동되는 모듈
"use server";

export const pingAction = async () => {
  console.log("ping action");
  return "pong";
};
