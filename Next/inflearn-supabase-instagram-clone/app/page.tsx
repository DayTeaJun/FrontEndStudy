import LogoutButton from "@/components/logout-button";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export const metadata = {
  title: "Instagram",
  description: "Instagram clone",
};

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center gap-2">
      <h1 className="font-bold text-xl">
        welcome to {session?.user?.email?.split("@")?.[0]}
      </h1>
      <LogoutButton />
    </main>
  );
}
