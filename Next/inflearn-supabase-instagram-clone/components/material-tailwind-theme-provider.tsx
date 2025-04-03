"use client";

import { ThemeProvider } from "@material-tailwind/react";

// 아래 라이브러리는 클라이언트 컴포넌트에서 동작함.
// 따라서 서버사이드에서는 사용할 수 없음.
// 서버사이드 렌더링인 layout에서 바로 직접 사용하면 에러가 나기때문에, 이 파일을 만들어서 사용함.

export const MaterialTailwindThemeProvider = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
