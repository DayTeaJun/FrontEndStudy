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

// 생성
export const createTodos = async (content: string) => {
  const supabase = createSupabaseBrowserClient();
  const result = await supabase
    .from("todos_no_ris")
    .insert({
      content: content,
    })
    .select(); // 결과물
  return result.data;
};

// 업데이트
export const updateTodos = async (id: number, content: string) => {
  const supabase = createSupabaseBrowserClient();
  const result = await supabase
    .from("todos_no_ris")
    .update({
      content: content,
      updated_at: new Date().toISOString(), // 업데이트 할때 업데이트 시간도 변경하도록 함
    })
    .eq("id", id) // 어떤 대상을 업데이트 할지 정할 수 있음
    .select(); // 업데이트 결과물
  return result.data;
};

// soft del (삭제 날짜만 업데이트)
export const deleteTodoSoft = async (id: number) => {
  const supabase = createSupabaseBrowserClient();
  const result = await supabase
    .from("todos_no_ris")
    .update({
      deleted_at: new Date().toISOString(),
      // 요구사항에 따라 다름 (업데이트 시간을 넣을지)
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();
  return result.data;
};

// hard del (삭제), 업무에서는 잘 사용하지 않는 방법이라고 함
export const deleteTodoHard = async (id: number) => {
  const supabase = createSupabaseBrowserClient();
  const result = await supabase
    .from("todos_no_ris")
    .delete() // 삭제
    .eq("id", id)
    .select();
  return result.data;
};
