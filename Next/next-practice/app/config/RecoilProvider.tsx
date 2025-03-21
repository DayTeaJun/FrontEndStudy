"use client";

import { RecoilRoot } from "recoil";

// layout에서 사용할 recoil provider
// recoil은 전역 상태 관리 라이브러리
// 클라이언트에서 상태관리하기 때문에 layout(서버 컴포넌트)에 직접 설정을 못함
export default function RecoilProvider({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
