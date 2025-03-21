import { Metadata } from "next";
import Link from "next/link";

// seo 작업을 위한 metadata
// title : 페이지 제목
// description : 페이지 설명\
// static metadata : 페이지의 고정된 정보
export const metadata: Metadata = {
  title: "Next.js Practice",
  description: "Next.js 연습정리",
};

// dynamic metadata : 페이지의 동적인 정보 (동적 라우팅)
// 페이지가 렌더링 될 때마다 변경되는 정보

export default function Home() {
  return (
    <main>
      home
      {/* a 태그 대신 사용하는 이유, 클라이언트 사이드 라우팅 동작해서 nextjs 가 판단하여 사이트안에 어떤 링크가 있는지 수집하기 용이하여 사용 권장 */}
      {/* 클라이언트 사이드 라우팅 : 새로고침 없이 빠르게 페이지 전환, 필요한 데이터만 DOM 업데이트 */}
      {/* 해당 링크에 대한 페이지 데이터를 미리로드 */}
      <Link href="/dashboard">Dashboard</Link>
    </main>
  );
}
