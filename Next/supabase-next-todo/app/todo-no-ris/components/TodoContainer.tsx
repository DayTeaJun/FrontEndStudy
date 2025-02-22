"use client";

import React, { useEffect } from "react";
import useTodosController from "../hooks/useTodosController";
import TodoList from "@/components/ui/TodoList";

function TodoContainer() {
  // useEffect(() => {
  //   getTodos();
  //   getTodosById(4);
  //   getTodosBySearch("여기");
  //   createTodos("next.js에서 todo를 생성함");
  //   updateTodos(6, "todo 업데이트함");
  //   deleteTodoSoft(7);
  //   deleteTodoHard(7);
  // }, []);

  const { loading, todos } = useTodosController();
  console.log(loading, todos);

  return (
    <div>
      <TodoList sharedUserFullName={"유저"} ownerUserId={123} />
    </div>
  );
}

export default TodoContainer;
