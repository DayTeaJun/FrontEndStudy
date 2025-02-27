import { NextResponse } from "next/server";

// /api/ping 경로 접근시 아래 url get 요청이 들어옴 (기존적으로 GET, 다른 예제(put, del, patch 등)도 사용 가능)
// route handler
export const GET = async () => {
  return NextResponse.json({ message: "pong" });
};
