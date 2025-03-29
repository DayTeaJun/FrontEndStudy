"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

function handleError(error) {
  console.error("Error uploading file:", error.message);
  return error;
}

export async function uploadFile(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const file = formData.get("file") as File;

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .upload(file.name, file, { upsert: true }); // upsert: true는 같은 이름의 파일이 있을 경우 덮어쓰기를 의미함.

  if (error) {
    handleError(error);
  }

  return data;
}

export async function searchFiles(search: string = "") {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    // search는 검색어
    .list(undefined, {
      search: search,
    });

  if (error) {
    handleError(error);
  }

  return data;
}

export async function deleteFile(fileName: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    // 한번에 여러 파일 제거할 수 있지만, 하나만 제거하도록 설정
    .remove([fileName]);

  if (error) {
    handleError(error);
  }

  return data;
}
