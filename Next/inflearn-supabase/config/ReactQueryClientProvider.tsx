"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// query 에 관련된 모든 요청을 캐시하고 관리하는 queryClient
export const queryClient = new QueryClient({});

export default function ReactQueryClientProvider({
  children,
}: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
