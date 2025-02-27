import { NextRequest, NextResponse } from "next/server";

const COOKIE_COUNTER = "cookie-counter";

// middleware 사용자가 로그인 등 인증 및 권한이 필요한 경우 아래 middleware에 거쳐 접근하게 됨
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 브라우저 쿠키에 cookie-counter 키와 값 들을 저장
  if (request.cookies.get(COOKIE_COUNTER)?.value) {
    // cookie-counter request
    const prev = request.cookies.get(COOKIE_COUNTER)?.value;

    // cookie-counter response
    response.cookies.set(COOKIE_COUNTER, `${Number(prev) + 1}`);
  } else {
    // 초기 cookie-counter가 없을경우 1 세팅
    response.cookies.set(COOKIE_COUNTER, "1");
  }

  return response;
}

// matcher 에 따른 경로에 위 미들웨어를 통과할 수 있도록 설정 (모든 경로 : :/path*)
export const config = {
  matcher: ["/", "/todo-no-ris", "/api/:path*"],
};
