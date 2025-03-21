import { NextResponse } from "next/server";

const DB = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

// route.ts 파일은 Http api 를 구현하는 파일
// 서버에서 실행되는 코드로, 클라이언트에서 직접 접근할 수 없음
// 웹에서 접근이 불가능하여 보안이 필요한 코드를 작성할 때 사용 (DB 접속 등)

export async function GET(request: Request) {
  // URLSearchParams : URL의 query string을 다루기 위한 인터페이스
  const searchParams = new URL(request.url).searchParams;
  // URLSearchParams.get() : 특정 key에 대한 값을 가져옴
  const name = searchParams.get("name") as string;

  // NextResponse.json() : JSON 형식의 응답을 반환
  // DB.filter() : DB 배열에서 name이 일치하는 요소만 필터링하여 반환
  return NextResponse.json({
    users: DB.filter((user) => user.name.includes(name)),
  });
}
