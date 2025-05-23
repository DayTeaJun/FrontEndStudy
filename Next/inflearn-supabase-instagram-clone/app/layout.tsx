import type { Metadata } from "next";
import "./globals.css";

import { MaterialTailwindThemeProvider } from "@/components/material-tailwind-theme-provider";
import ReactQueryClientProvider from "@/config/ReactQueryClientProvider";
import RecoilProvider from "@/config/RecoilProvider";
import MainLayout from "@/components/layouts/MainLayout";
import AuthPage from "@/components/auth";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import AuthProvider from "@/config/AuthProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session);

  return (
    <html lang="en">
      <head>
        {/* font-awesome 라이브러리 (간단한 아이콘 ui)*/}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <RecoilProvider>
          <ReactQueryClientProvider>
            <MaterialTailwindThemeProvider>
              <AuthProvider accessToken={session?.access_token}>
                {session?.user ? (
                  <MainLayout>{children}</MainLayout>
                ) : (
                  <AuthPage />
                )}
              </AuthProvider>
            </MaterialTailwindThemeProvider>
          </ReactQueryClientProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
