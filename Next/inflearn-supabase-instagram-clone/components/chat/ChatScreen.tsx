"use client";

import { Button, Spinner } from "@material-tailwind/react";
import Person from "./Person";
import Message from "./Message";
import { useRecoilValue } from "recoil";
import {
  presenceState,
  selectedUserIdState,
  selectedUserIndexState,
} from "@/utils/recoil/atoms";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserById } from "@/actions/chatActions";
import { useEffect, useRef, useState } from "react";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

// 기존 rls 비활성화 -> 활성화로 바꿔주면서 server action -> browser에서 db를 접근 가능하도록 변경함 (rls를 활성화하면서 안전하게 클라이언트에서 데이터를 접근하도록 수정하였기 때문, server action 의 사용 의도는 클라이언트에서 server action에 포함된 로직은 전혀 보지 못하기 때문)
export async function sendMessage({
  message,
  chatUserId, // 상대방 id
}) {
  const supabase = createBrowserSupabaseClient(); // admin은 현재 로그인한 유저를 알 수 없어서 serverSupabaseClient를 사용해야 함

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) {
    throw new Error("User not authenticated");
  }

  const { data, error: sendMessageError } = await supabase
    .from("message")
    .insert({
      message,
      receiver: chatUserId, // 상대방 id
      // sender: session.user.id, // 현재 로그인한 유저의 id
      // 기존 server action -> browser 로 옮기고, supabase table의 sender 의 기본 값을 auth.uid() 로 받아서 더이상 보낼 필요 없게 만듦
    });

  if (sendMessageError) {
    throw new Error(sendMessageError.message);
  }

  return data;
}

export async function getAllMessages({ chatUserId }) {
  const supabase = createBrowserSupabaseClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) {
    throw new Error("User not authenticated");
  }

  const { data, error: getAllMessagesError } = await supabase
    .from("message")
    .select("*")
    // 메시지 수신자가 나 또는 상대방인 모든 메세지
    // .or(`receiver.eq.${chatUserId},receiver.eq.${session.user.id}`)
    // 메시지 발신자가 나 또는 상대방인 모든 메세지
    // .or(`sender.eq.${chatUserId},sender.eq.${session.user.id}`)
    // 즉, 상대방과 나의 모든 메세지

    // -> 강의에서는 위처럼 or를 사용했지만, 이렇게하면 다른 유저의 메시지가 섞여서 나올 가능성이 있음, supabase의 or 같은 메서드는 조건들을 나열하여 하나의 where절을 만들어줌
    // 즉, 아래와 같은 쿼리문을 만들어줌
    // SELECT * FROM message
    // WHERE
    //   receiver = A OR receiver = B OR sender = A OR sender = B
    // -> 그래서 아래와 같이 수정한다. 내부에 and를 사용하여 상대방이 발신자고 내가 수신자거나, 내가 발신자고 상대방이 수신자일 때를 조건으로 넣어준다.
    .or(
      `and(sender.eq.${session.user.id},receiver.eq.${chatUserId}),and(sender.eq.${chatUserId},receiver.eq.${session.user.id})`
    )

    // 오름차순, 오래된 시간 -> 최근 시간 순으로 정렬
    .order("created_at", { ascending: true });

  if (getAllMessagesError) {
    return [];
  }

  return data;
}

export default function ChatScreen() {
  const selectedUserId = useRecoilValue(selectedUserIdState);
  const selectedUserIndex = useRecoilValue(selectedUserIndexState);
  const [message, setMessage] = useState<string>("");
  const supabase = createBrowserSupabaseClient();
  const presence = useRecoilValue(presenceState);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [getAllMessagesQuery.data]);

  return selectedUserQuery.data !== null ? (
    <div className="w-full h-screen flex flex-col">
      {/* Active 유저 영역 */}
      <Person
        index={selectedUserIndex}
        isActive={false}
        name={selectedUserQuery.data?.email?.split("@")[0]}
        userId={selectedUserQuery.data?.id}
        onlineAt={presence?.[selectedUserId]?.[0]?.onlineAt}
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
        <div ref={messageEndRef}></div>
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
