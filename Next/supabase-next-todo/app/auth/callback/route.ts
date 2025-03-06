import { createServerSideClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const overrideOrigin = process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME;

  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (code) {
    const supabase = await createServerSideClient();

    // 토큰 교환함수
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) return NextResponse.redirect(`${overrideOrigin}`);

    return NextResponse.redirect(`${overrideOrigin}${next}`);
  }

  return NextResponse.redirect(`${overrideOrigin}`);
}
