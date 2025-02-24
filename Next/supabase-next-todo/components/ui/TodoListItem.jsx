"use client";

import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiCircleCheck, CiEdit } from "react-icons/ci";

function TodoListItem({ todo, onDelete, onUpdate }) {
  const [isEdit, setIsEdit] = useState(false);
  const [userInput, setUserInput] = useState(todo?.content ?? "");

  const onStartEdit = () => {
    setIsEdit(true);
  };

  // 수정 끝
  const onFinishEdit = () => {
    onUpdate(todo.id, userInput);
    setIsEdit(false);
  };

  // 삭제버튼 클릭
  const onClickDelete = () => {
    onDelete(todo.id);
  };

  return (
    <li className="min-h-[60px] bg-purple-500 border-black rounded-2xl font-bold group">
      <article className="min-h-[60px] p-4 flex flex-col gap-4 sm:flex-row gap-4">
        {isEdit ? (
          <input
            className="flex-1 text-[18px]"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            type="text"
          />
        ) : (
          <div
            onClick={onStartEdit}
            className="flex-1 text-[18px] cursor-pointer"
          >
            {todo?.content}
          </div>
        )}
        {/* 위 li에서 감싼 group에서 호버시 하위 요소들에서 group 된 요소들의 hover가 작동하게됨 */}
        <div className="w-fit hidden group-hover:flex self-end">
          {isEdit ? (
            <div
              onClick={onFinishEdit}
              className="cursor-pointer bg-green-400 border border-black rounded-2xl w-[45px] h-[45px] flex justify-center items-center"
            >
              <CiCircleCheck size={30} />
            </div>
          ) : (
            <div
              className="cursor-pointer bg-green-400 border border-black rounded-2xl w-[45px] h-[45px] flex justify-center items-center"
              onClick={onStartEdit}
            >
              <CiEdit size={30} />
            </div>
          )}

          <button
            className="cursor-pointer bg-rose-600 border border-black rounded-2xl w-[45px] h-[45px] flex justify-center items-center"
            type="button"
            onClick={onClickDelete}
          >
            <AiOutlineDelete size={30} />
          </button>
        </div>
      </article>
    </li>
  );
}

export default TodoListItem;
