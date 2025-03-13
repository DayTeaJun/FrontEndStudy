"use client";

import useHydrate from "@/hooks/useHydrate";
import { createSupabaseBrowserClient } from "@/lib/client/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import React, { useCallback, useEffect, useState } from "react";

function AuthUi() {
  const [user, setUser] = useState();
  const supabase = createSupabaseBrowserClient();
  const isMount = useHydrate();

  const getUserInfo = useCallback(async () => {
    const result = await supabase.auth.getUser();
    console.log(result);
    if (result?.data?.user) setUser(result?.data?.user);
  }, [supabase]);

  const handleLogout = async () => {
    supabase.auth.signOut();
    // 페이지 새로고침
    window.location.reload();
  };

  // 아래 Auth 컴포넌트 UI 아닌, 로그인 함수를 따로 만들어서 사용 가능
  const handleGoolgeLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
      },
    });
  };

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
      },
    });
  };

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  // 서버사이드 렌더링으로, 마크업을 먼저 불러오기 때문에 ui가 깨지는 것을 가리기 위해, useEffect으로 (첫 렌더링 시 false -> true 변화하는 과정) 서버와 클라이언트가 렌더링이 끝난 뒤 보여주도록 함
  if (!isMount) return null;

  return (
    <section className="w-full p-10">
      <div>{user ? `로그인 된 ${user?.email}` : "로그아웃"}</div>
      <>
        {user && (
          <button
            onClick={handleLogout}
            type="button"
            className="border-2 border-black"
          >
            로그아웃
          </button>
        )}
      </>
      <div className="mx-auto max-w-[500px]">
        <Auth
          // 로그인 끝난 후 페이지 이동
          redirectTo={process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO}
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
