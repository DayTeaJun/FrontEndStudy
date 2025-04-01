"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function searchMovies(search = "") {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("movie")
    .select("*")
    .like("title", `%${search}%`);

  if (error) {
    console.error(error);
    // 강의에선 외부에 try catch문이 없으나, try catch문을 외부에서 잡아주도록 수정해야함(에러 전달하기 위함)
    throw error;
  }

  return data;
}

export async function getMovie(id: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("movie")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  // maybeSingle 는 접근할때 하나를 가져오는데 null 일 수도 있다는 것을 알려서 에러가 나지 않도록함

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}
