"use client";

import { Button } from "@material-tailwind/react";
import Person from "./Person";
import Message from "./Message";
import { useRecoilValue } from "recoil";
import { selectedUserIdState } from "@/utils/recoil/atoms";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/actions/chatActions";

export default function ChatScreen() {
  const selectedUserId = useRecoilValue(selectedUserIdState);
  const selectedUserQuery = useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: () => getUserById(selectedUserId),
  });

  return selectedUserQuery !== null ? (
    <div className="w-full h-screen flex flex-col">
      {/* Active 유저 영역 */}

      <Person
        index={0}
        isActive={false}
        name={selectedUserQuery.data?.email?.split("@")[0]}
        userId={selectedUserQuery.data?.id}
        onlineAt={new Date().toISOString()}
        onChatScreen={true}
      ></Person>

      {/* 채팅 영역 */}
      <div className="flex-1 flex flex-col w-full p-4 gap-3">
        <Message isFromMe={true} message={"안녕하세요."} />
        <Message isFromMe={false} message={"반갑습니다."} />

        <Message isFromMe={true} message={"안녕하세요."} />
        <Message isFromMe={false} message={"반갑습니다."} />
        <Message isFromMe={false} message={"반갑습니다."} />
      </div>

      {/* 채팅창 영역 */}
      <div className="flex">
        <input
          type="text"
          className="p-3 w-full border-2 border-light-blue-600"
          placeholder="메세지를 입력하세요."
        />
        <button className="min-w-20 p-3 bg-light-blue-700 text-white text-sm">
          <span>전송</span>
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full"></div>
  );
}
