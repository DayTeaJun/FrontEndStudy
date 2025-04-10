"use client";

import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { Button } from "@material-tailwind/react";

function LogoutButton() {
  const supabase = createBrowserSupabaseClient();

  return (
    <Button
      onClick={async () => {
        supabase.auth.signOut();
      }}
      color="red"
    >
      로그아웃
    </Button>
  );
}

export default LogoutButton;
