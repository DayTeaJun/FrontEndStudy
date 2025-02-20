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
