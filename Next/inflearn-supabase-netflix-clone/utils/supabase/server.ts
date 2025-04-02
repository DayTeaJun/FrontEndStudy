"use server";

import { Database } from "@/types_db";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

// 서버 컴포넌트에서만 사용
export const createServerSupabaseClient = async (
  cookieStore: ReturnType<typeof cookies> = cookies(),
  // createServerSupabaseClient에서 기본적으로 어드민 api 사용 못하게 설정
  admin: boolean = false
) => {
  // Database type 명시 자동 타입 지원 (types_db.ts)
  return createServerClient<Database>(
    // supabase 프로젝트 연동
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // admin 유무에 따라 anon key 또는 service role key 연동
    admin
      ? process.env.NEXT_SUPABASE_SERVICE_ROLE!
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // 유저 인증 관련 설정
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};

// 어드민 api 사용하도록 별도 함수 설정
export const createServerSupabaseAdminClient = async (
  cookieStore: ReturnType<typeof cookies> = cookies()
) => {
  return createServerSupabaseClient(cookieStore, true);
};
