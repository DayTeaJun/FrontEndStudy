"use client";

import { useState } from "react";
import Person from "./Person";
import { useRecoilState } from "recoil";
import { selectedIndexState } from "@/utils/recoil/atoms";

export default function ChatPeopleList() {
  const [selectedIndex, setSelectedIndex] = useRecoilState<null | number>(
    selectedIndexState
  );

  return (
    <div className="h-screen min-w-60 flex flex-col bg-gray-50">
      <Person
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
      ></Person>
    </div>
  );
}
