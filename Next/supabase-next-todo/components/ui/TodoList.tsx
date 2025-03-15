"use client";

import React, { useState } from "react";
import { CiShare2 } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { useCopyToClipboard } from "usehooks-ts";
import TodoListItem from "./TodoListItem";
import { TodoDto } from "@/app/todo-no-ris/hooks/useTodosController";

interface TodoListProps {
  sharedUserFullName: string;
  ownerUserId: string;
  loading?: boolean;
  todoListData?: TodoDto[];
  isReadOnly?: boolean;
  onUpdate?: (id: number, updatedContent: string) => void;
  onCreate?: () => void;
  onDelete?: (id: number) => void;
  onSearch?: (terms: string) => void;
}
function TodoList({
  sharedUserFullName,
  ownerUserId,
  loading = false,
  todoListData = [],
  isReadOnly = false,
  onUpdate = (id, updatedContent) => {},
  onCreate = () => {},
  onDelete = (id) => {},
  onSearch = (terms) => {},
}: TodoListProps) {
  const [userSearchInput, setUserSearchInput] = useState("");
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = () => {
    const shareLink = `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME}/share/${ownerUserId}`;

    copy(shareLink)
      .then(() => {
        window.alert(`공유 링크 복사 \n${shareLink}`);
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  const handleSearchEnd = () => {
    onSearch(userSearchInput);
    setUserSearchInput("");
  };

  return (
    <section className="min-h-[70vh] bg-sky-400">
      <div className=" mx-auto max-w-[800px] w-full p-4">
        <article className="flex flex-row justify-between w-full items-center">
          <p className="font-bold text-[32px]">
            <p>{sharedUserFullName || ""}</p>
            Things to do:
          </p>
          {ownerUserId && (
            <div
              onClick={() => handleCopy()}
              className="font-bold text-[20px] flex items-center cursor-pointer gap-2"
            >
              Share
              <CiShare2 size={18} />
            </div>
          )}
        </article>
        {!isReadOnly && (
          <article className="flex flex-col sm:flex-row gap-4 mt-8">
            <div className="flex flex-1 h-[60px]">
              <input
                value={userSearchInput}
                onChange={(e) => setUserSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchEnd();
                }}
                className="p-4 flex-1 bg-yellow-300 border border-black rounded-l-2xl font-bold"
                type="text"
              />
              <div
                onClickCapture={() => handleSearchEnd()}
                className="w-[60px] flex justify-center items-center bg-black rounded-r-2xl cursor-pointer"
              >
                <IoSearchOutline size={40} color="#fff" />
              </div>
            </div>
            <div
              onClick={onCreate}
              className="h-[60px] w-[200px] flex justify-center items-center bg-sky-700 border-black rounded-2xl font-bold cursor-pointer text-[20px]"
            >
              New Task
            </div>
          </article>
        )}

        <div className="h-[2px] my-10 bg-black"></div>
        {todoListData?.length >= 1 ? (
          <ul className="flex flex-col gap-4">
            {todoListData?.map((todo) => {
              return (
                <TodoListItem
                  todo={todo}
                  key={todo?.id}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              );
            })}
          </ul>
        ) : (
          <div>{loading ? "Loading..." : "Empty"}</div>
        )}
      </div>
    </section>
  );
}

export default TodoList;
