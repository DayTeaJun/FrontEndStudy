import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

// 서버에 request, response를 하는 과정에 특정한 함수를 추가하거나, 쿠키를 세팅하는 등, 중간 단계를 거치고 싶은 인터셉트를 거치고 싶을때 사용하는 middleware를 사용
// request를 받고 response를 만들어나가는 과정
export const applyMiddlewareSupabaseClient = async (request: NextRequest) => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // If the cookie is updated, update the cookies for the request and response
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          // If the cookie is removed, update the cookies for the request and response
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  // 중간에 미리 호출을 함 -> 매번 호출할때마다 토큰을 받아오지 않고, 항상 최신의 유저상태를 받아옴
  // refreshing the auth token
  await supabase.auth.getUser();

  return response;
};

// 결과적으로 미들웨어에 아래 supabaseclient를 적용시킴
export async function middleware(request) {
  return await applyMiddlewareSupabaseClient(request);
}

// 어떤 request를 받을때는 미들웨어를 실행하지 않을지 설정
// 예) 정적 파일이나 이미지 리소스 요청(next image)은 middleware가 작동하지 않도록 의도적으로 제외
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

// 인증이 불필요하다면 인증이 필요한 곳에서만 조건을 좁히는 방법이 있음
// 아래와 같이 matcher를 통해 특정 경로에만 미들웨어를 적용할 수 있음
// export const config = {
//     matcher: ["/dashboard/:path*", "/api/secure/:path*"],
//   };
