"use client";

import React from "react";

interface Props {
  todo: {
    content: string | null;
    created_at: string;
    deleted_at: string | null;
    id: number;
    updated_at: string | null;
  };
}

function TodoListItemReadOnly({ todo }: Props) {
  return (
    <li className="min-h-[60px] bg-purple-500 border-black rounded-2xl font-bold group">
      <article className="min-h-[60px] p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 text-[18px] cursor-pointer">{todo?.content}</div>
      </article>
    </li>
  );
}

export default TodoListItemReadOnly;
