"use client";

import { createBrowserClient } from "@supabase/ssr";

// supabase sdk 를 사용하기 위한 초기 세팅
export const createBrowserSupabaseClient = () =>
  createBrowserClient(
    // 미리 설정한 supabase 프로젝트 연동
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // 누구나 접근할 수 있는 anonynous key 연동
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
