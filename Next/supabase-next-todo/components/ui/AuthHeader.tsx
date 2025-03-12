"use client";
import { createSupabaseBrowserClient } from "@/lib/client/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { FcGoogle, FcTodoList } from "react-icons/fc";

interface AuthHeaderProps {
  user?: User | null;
}

function AuthHeader({ user }: AuthHeaderProps) {
  const isLoggedIn = !!user?.email;
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };

  const handleGoogleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <header className="h-[50px] bg-white">
      <section className="px-6 h-full">
        <div className="flex h-full justify-between items-center">
          <div
            onClick={goToHome}
            className="flex items-center cursor-pointer gap-2"
          >
            TODO <FcTodoList size={30} />
          </div>

          {isLoggedIn ? (
            <div
              onClick={handleLogout}
              className="flex items-center gap-2 cursor-pointer"
            >
              Logout
              <AiOutlineLogout size={30} />
            </div>
          ) : (
            <div
              onClick={handleGoogleLogin}
              className="flex items-center gap-2 cursor-pointer"
            >
              Login
              <FcGoogle size={30} />
            </div>
          )}
        </div>
      </section>
    </header>
  );
}

export default AuthHeader;
