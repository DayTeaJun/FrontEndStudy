"use client";

import { Button, Spinner } from "@material-tailwind/react";
import Person from "./Person";
import Message from "./Message";
import { useRecoilValue } from "recoil";
import {
  selectedUserIdState,
  selectedUserIndexState,
} from "@/utils/recoil/atoms";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllMessages,
  getUserById,
  sendMessage,
} from "@/actions/chatActions";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export default function ChatScreen() {
  const selectedUserId = useRecoilValue(selectedUserIdState);
  const selectedUserIndex = useRecoilValue(selectedUserIndexState);
  const [message, setMessage] = useState<string>("");
  const supabase = createBrowserSupabaseClient();

  const selectedUserQuery = useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: () => getUserById(selectedUserId),
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      sendMessage({
        message,
        chatUserId: selectedUserId,
      });
    },

    onSuccess: () => {
      setMessage("");
      getAllMessagesQuery.refetch();
    },
  });

  const getAllMessagesQuery = useQuery({
    queryKey: ["messages", selectedUserId],
    queryFn: () =>
      getAllMessages({
        chatUserId: selectedUserId,
      }),
  });

  useEffect(() => {
    // supabase real-time 채널 생성
    const channel = supabase
      .channel("message_postgres_change")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "message" },
        // 위에 해당하는 이벤트가 아래 payload으로 들어옴
        (payload) => {
          if (payload.eventType === "INSERT" && !payload.errors) {
            getAllMessagesQuery.refetch();
          }
        }
      )
      .subscribe(); // 위 이벤트를 명시한 채널로 구독 시작

    return () => {
      channel.unsubscribe(); // 컴포넌트 언마운트 시 구독 해제, 즉 chatscreen이 화면상에서 사라지면 자동으로 구독 해제
    };
  }, []);

  return selectedUserQuery.data !== null ? (
    <div className="w-full h-screen flex flex-col">
      {/* Active 유저 영역 */}
      <Person
        index={selectedUserIndex}
        isActive={false}
        name={selectedUserQuery.data?.email?.split("@")[0]}
        userId={selectedUserQuery.data?.id}
        onlineAt={new Date().toISOString()}
        onChatScreen={true}
      ></Person>
      {/* 채팅 영역 */}
      <div className="flex-1 flex flex-col w-full p-4 gap-3 overflow-y-auto">
        {getAllMessagesQuery.data?.map((message) => (
          <Message
            key={message.id}
            isFromMe={message.receiver === selectedUserQuery.data?.id}
            message={message.message}
          />
        ))}
      </div>
      {/* 채팅창 영역 */}
      <div className="flex">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="p-3 w-full border-2 border-light-blue-600"
          placeholder="메세지를 입력하세요."
        />
        <button
          onClick={() => sendMessageMutation.mutate(message)}
          className="min-w-20 p-3 bg-light-blue-700 text-white text-sm"
        >
          {sendMessageMutation.isPending ? <Spinner /> : <span>전송</span>}
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full"></div>
  );
}
