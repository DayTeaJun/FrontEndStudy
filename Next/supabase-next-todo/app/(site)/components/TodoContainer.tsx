"use client";

import React, { useEffect } from "react";
import useTodosController from "../hooks/useTodosController";
import TodoList from "@/components/ui/TodoList";

function TodoContainer() {
  const {
    loading,
    todos,
    onCreateEmptyTodos,
    onDeleteTodos,
    onSearchTodos,
    onUpdateTodos,
  } = useTodosController();

  return (
    <div>
      <TodoList
        sharedUserFullName={"유저"}
        ownerUserId={123}
        loading={loading}
        todoListData={todos}
        isReadOnly={false}
        onUpdate={onUpdateTodos}
        onCreate={onCreateEmptyTodos}
        onDelete={onDeleteTodos}
        onSearch={onSearchTodos}
      />
    </div>
  );
}

export default TodoContainer;
