"use client";
import {
  createTodos,
  deleteTodoHard,
  deleteTodoSoft,
  getTodos,
  getTodosById,
  getTodosBySearch,
  updateTodos,
} from "@/apis/todos-no-ris";
import React, { useEffect } from "react";

function TodoContainer() {
  useEffect(() => {
    getTodos();
    getTodosById(4);
    getTodosBySearch("여기");
    // createTodos("next.js에서 todo를 생성함");
    updateTodos(6, "todo 업데이트함");
    deleteTodoSoft(7);
    // deleteTodoHard(7);
  }, []);

  return <div>TodoContainer</div>;
}

export default TodoContainer;
