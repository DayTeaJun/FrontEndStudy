"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

// queryClient안에서 값들을 관리해주는 store
// store에 저장된 쿼리키들을 접근하기 위해 export 하여 각 페이지에서 사용하여 키 값을 통해 데이터를 관리
export const queryClient = new QueryClient();

function ReactQueryProvider({ children }) {
  return (
    // queryClient 안에 모든 request, response를 기록하도록 설정
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryProvider;
