"use client";

import { useEffect, useState } from "react";
import Person from "./Person";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "@/actions/chatActions";
import {
  presenceState,
  selectedUserIdState,
  selectedUserIndexState,
} from "@/utils/recoil/atoms";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";

export default function ChatPeopleList({ loggedInUser }) {
  const [selectedUserId, setSelectedUserId] = useRecoilState<null | number>(
    selectedUserIdState
  );

  const [selectedUserIndex, setSelectedUserIndex] = useRecoilState(
    selectedUserIndexState
  );

  const [presence, setPresence] = useRecoilState(presenceState);

  const getAllUsersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const allUsers = await getAllUser();

      return allUsers.filter((user) => user.id !== loggedInUser.id);
    },
  });

  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    const channel = supabase.channel("online_users", {
      // presence 사용시 config 추가해야함
      config: {
        presence: {
          key: loggedInUser.id, // 익명유저가 아닌, 실제로 로그인한 유저에 대해 tracking을 하기위해 key를 설정함
        },
      },
    });

    // presence는 현재 온라인인 유저를 파악하기 위함
    channel.on(
      "presence",
      {
        event: "sync", //join, leave 등이 있는데, 여기서는 입장 퇴장 등의 알림을 필요할때만 사용하고, 상시에는 sync 를 사용하여 현재 채널에 접속한 사용자 목록을 가져옴
      },
      () => {
        const newState = channel.presenceState();

        // newState의 값을 그대로 쓰면 변경될 우려가 있어 deep copy를 해줌
        const newStateObj = JSON.parse(JSON.stringify(newState));

        setPresence(newStateObj);
      }
    );

    channel.subscribe(async (status) => {
      if (status !== "SUBSCRIBED") {
        return;
      }
      // 구독 성공시, 현재 사용자의 presence 상태를 tracking하여 전송
      const newPresenceStatus = await channel.track({
        // 내가 tracking할 대상을 지정
        // 유저가 마지막으로 접속했던 시간을 traking함
        onlineAt: new Date().toISOString(),
      });
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="h-screen min-w-60 flex flex-col bg-gray-50">
      {getAllUsersQuery.data?.map((user, index) => {
        return (
          <Person
            key={user.id}
            onClick={() => {
              setSelectedUserId(user.id);
              setSelectedUserIndex(index);
            }}
            index={index}
            isActive={selectedUserId === user.id}
            name={user.email?.split("@")[0]}
            userId={user.id}
            onlineAt={presence?.[user.id]?.[0]?.onlineAt} // presence에 tracking된 유저의 onlineAt을 가져옴
            onChatScreen={false}
          ></Person>
        );
      })}

      {/* <Person
        onClick={() => setSelectedIndex(0)}
        index={0}
        isActive={selectedIndex === 0}
        name={"John Doe"}
        userId={"1234"}
        onlineAt={new Date().toISOString()}
        onChatScreen={false}
      ></Person>

      <Person
        onClick={() => setSelectedIndex(1)}
        index={1}
        isActive={selectedIndex === 1}
        name={"Jun"}
        userId={"124"}
        onlineAt={new Date().toISOString()}
        onChatScreen={false}
      ></Person> */}
    </div>
  );
}
