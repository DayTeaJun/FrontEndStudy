"use client";

import { useState } from "react";
import Person from "./Person";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "@/actions/chatActions";
import {
  selectedUserIdState,
  selectedUserIndexState,
} from "@/utils/recoil/atoms";

export default function ChatPeopleList({ loggedInUser }) {
  const [selectedUserId, setSelectedUserId] = useRecoilState<null | number>(
    selectedUserIdState
  );

  const [selectedUserIndex, setSelectedUserIndex] = useRecoilState(
    selectedUserIndexState
  );

  const getAllUsersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const allUsers = await getAllUser();

      return allUsers.filter((user) => user.id !== loggedInUser.id);
    },
  });

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
            onlineAt={new Date().toISOString()}
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
