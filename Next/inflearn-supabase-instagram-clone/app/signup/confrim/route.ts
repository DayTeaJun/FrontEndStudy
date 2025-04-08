import { createServerSupabaseClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// route.ts 파일은 해당 폴더 주소 signup/confirm로 접근했을 때 실행되는 api endpoint
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  // 정상적으로 code 값이 넘어왔을 때
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createServerSupabaseClient();

    // code 값으로 세션을 획득
    await supabase.auth.exchangeCodeForSession(code);
  }

  // code 값이 없거나 세션을 획득한 후에 redirect
  // 최종적으로 이전에 설정해둔 localhost:3000/ 으로 리다이렉트
  return NextResponse.redirect(requestUrl.origin);
}
