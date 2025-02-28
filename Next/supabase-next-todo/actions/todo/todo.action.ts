"use server";

import { createServerSideClient } from "@/lib/supabase";

export const getTodoAction = async () => {
    const supabase = await createServerSideClient()
    const result = await supabase
    .from("todos_no_ris")
    .select("*")
    .is("deleted_at", null)
    .order("id", {
      ascending: false,
    });

    console.log(result.data)

  return result.data;
};
