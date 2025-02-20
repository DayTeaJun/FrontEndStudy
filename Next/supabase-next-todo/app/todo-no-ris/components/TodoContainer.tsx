"use client";
import { getTodos } from "@/apis/todos-no-ris";
import React, { useEffect } from "react";

function TodoContainer() {
  useEffect(() => {
    getTodos();
  }, []);

  return <div>TodoContainer</div>;
}

export default TodoContainer;
