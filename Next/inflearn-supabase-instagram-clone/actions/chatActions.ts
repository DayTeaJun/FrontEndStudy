"use server";

import { createServerSupabaseAdminClient } from "@/utils/supabase/server";

export async function getAllUser() {
  // admin api 접근해서 모든 유저들의 정보를 가져옴
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return data.users;
}

// 특정 유저를 가져오는 함수
export async function getUserById(userId: string) {
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return data.user;
}
