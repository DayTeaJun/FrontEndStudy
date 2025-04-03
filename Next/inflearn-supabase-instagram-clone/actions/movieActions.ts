"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function searchMovies({ search, page, pageSize }) {
  const supabase = await createServerSupabaseClient();

  // count 전체 데이터 개수 값
  const { data, count, error } = await supabase
    .from("movie")
    .select("*")
    .like("title", `%${search}%`)
    .range((page - 1) * pageSize, page * pageSize - 1); // 만약 현재 페이지가 2 이면 12 ~ 23 번째까지 데이터를 불러옴

  if (error) {
    console.error(error);

    return {
      data: [],
      count: 0,
      page: null, // 다음 페이지가 없다는 것을 알림
      pageSize: null,
      error,
    };
  }

  // 만약 전체 데이터 갯수가 23개면, 현재 페이지 2, 페이지의 데이터 개수 12개 일때, 23 > 24 가 되어 false가 됨
  const hasNextPage = count && count > page * pageSize;

  return {
    data,
    page,
    pageSize,
    hasNextPage,
  };
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
