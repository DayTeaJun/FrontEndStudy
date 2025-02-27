import { NextRequest, NextResponse } from "next/server";

// middleware 사용자가 로그인 등 인증 및 권한이 필요한 경우 아래 middleware에 거쳐 접근하게 됨
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  console.log("middleware 통과함");

  return response;
}

// matcher 에 따른 경로에 위 미들웨어를 통과할 수 있도록 설정 (모든 경로 : :/path*)
export const config = {
  matcher: ["/", "/todo-no-ris", "/api/:path*"],
};
