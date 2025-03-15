import { getProfileById } from "@/actions/auth/user.action";
import { permanentRedirect } from "next/navigation";
import React from "react";
import TodoContainer from "./components/TodoContainer";

interface SharePageProps {
  params: { user_id: string };
  searchParams: {};
}

const page = async (props: SharePageProps) => {
  const userId = props?.params?.user_id;

  // 임의로 아이디(userId)를 검색하여 접속하였을때, 아래 profile 데이터가 null 로 나옴
  const profile = await getProfileById({ serverComponent: true, userId });

  const userName = profile?.full_name;

  if (!profile) {
    permanentRedirect("/");
  }

  return (
    <div>
      <TodoContainer sharedUserFullName={userName ?? ""} ownerUserId={userId} />
    </div>
  );
};

export default page;
