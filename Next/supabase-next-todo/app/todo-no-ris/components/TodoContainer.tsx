"use client";
import { getTodos, getTodosById, getTodosBySearch } from "@/apis/todos-no-ris";
import React, { useEffect } from "react";

function TodoContainer() {
  useEffect(() => {
    getTodos();
    getTodosById(4);
    getTodosBySearch("여기");
  }, []);

  return <div>TodoContainer</div>;
}

export default TodoContainer;
