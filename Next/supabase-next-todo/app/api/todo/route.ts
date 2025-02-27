import { createServerSideClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export const GET = async () => {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_no_ris")
    .select("*")
    .is("deleted_at", null)
    .order("id", {
      ascending: false,
    });

  return NextResponse.json({ ...result });
};
