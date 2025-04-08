import LogoutButton from "@/components/logout-button";

export const metadata = {
  title: "Instagram",
  description: "Instagram clone",
};

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center gap-2">
      <h1 className="font-bold text-xl">welcome to {"jun. hi"}</h1>
      <LogoutButton />
    </main>
  );
}
