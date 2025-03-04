"use client";

import useHydrate from "@/hooks/useHydrate";
import { createSupabaseBrowserClient } from "@/lib/client/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import React from "react";

function AuthUi() {
  const supabase = createSupabaseBrowserClient();
  const isMount = useHydrate();

  // 서버사이드 렌더링으로, 마크업을 먼저 불러오기 때문에 ui가 깨지는 것을 가리기 위해, useEffect으로 (첫 렌더링 시 false -> true 변화하는 과정) 서버와 클라이언트가 렌더링이 끝난 뒤 보여주도록 함
  if (!isMount) return null;

  return (
    <section className="w-full">
      <div className="mx-auto max-w-[500px]">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
          }}
          onlyThirdPartyProviders
          providers={["google", "github"]}
        />
      </div>
    </section>
  );
}

export default AuthUi;
