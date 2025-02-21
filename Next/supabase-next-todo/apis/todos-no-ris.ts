"use client";

import { createSupabaseBrowserClient } from "@/lib/client/supabase";

export const getTodos = async () => {
  const supabase = createSupabaseBrowserClient();
  const result = await supabase
    .from("todos_no_ris")
    .select("*")
    .is("deleted_at", null);

  return result.data;
};

// 동일 id 조회
export const getTodosById = async (id: number) => {
  const supabase = createSupabaseBrowserClient();
  const result = await supabase
    .from("todos_no_ris")
    .select("*")
    .is("deleted_at", null)
    .eq("id", id);
  return result.data;
};

// 검색
export const getTodosBySearch = async (terms: string) => {
  const supabase = createSupabaseBrowserClient();
  const result = await supabase
    .from("todos_no_ris")
    .select("*")
    .is("deleted_at", null)
    .ilike("content", `%${terms}%`) // 대소문자 구별 없이 검색
    .order("id", { ascending: false }); // 최신 데이터 순서
  return result.data;
};
