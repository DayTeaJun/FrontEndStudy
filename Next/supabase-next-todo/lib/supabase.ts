// 서버 클라이언트 설정

import { Database } from "@/database.types";
import { createServerClient } from "@supabase/ssr";
import { getCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// nextjs 서버
// RouterHandler, RSC, Middleware, ServerActions
// RSC는 쿠키 조작 안됨, 나머지는 되는데 조작방식이 다름

// ServerActions, RouterHandler
export const createServerSideClient = async (serverComponent = false) => {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABSE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // options - cookie option
        get: (key) => cookieStore.get(key)?.value,
        set: (key, value, options) => {
          if (serverComponent) return;
          cookieStore.set(key, value, options);
        },
        remove: (key, options) => {
          if (serverComponent) return;
          cookieStore.set(key, "", options);
        },
      },
    }
  );
};

// react serv component RSC
export const createServerSideClientRSC = async () => {
  return createServerSideClient(true);
};

// Middleware
export const createServerSideMiddleware = async (
  req: NextRequest,
  res: NextResponse
) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABSE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => getCookie(key, { req, res }),
        set: (key, value, options) => {
          setCookie(key, value, { req, res, ...options });
        },
        remove: (key, options) => {
          setCookie(key, "", { req, res, ...options });
        },
      },
    }
  );
};
