"use client";

import { Button, Input } from "@material-tailwind/react";
import Todo from "components/todo";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { createTodo, getTodos } from "actions/todo-actions";

export default function UI() {
  const [searchInput, setSearchInput] = useState("");

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos({ searchInput }),
  });

  console.log(todosQuery.data);

  const createTodoMutation = useMutation({
    mutationFn: () =>
      createTodo({
        title: "new todo",
        completed: false,
      }),

    onSuccess: () => {
      todosQuery.refetch();
    },
  });

  return (
    <div className="w-2/3 mx-auto flex flex-col items-center py-10 gap-2">
      <h1 className="text-xl">TODO LIST</h1>
      <Input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        label="Search TODO"
        placeholder="Search TODO"
        icon={<i className="fas fa-search" />}
      />

      {todosQuery.isPending && <p>Loading...</p>}
      {todosQuery.data &&
        todosQuery.data.map((todo) => <Todo key={todo.id} todo={todo} />)}

      <Button
        onClick={() => createTodoMutation.mutate()}
        loading={createTodoMutation.isPending}
      >
        <i className="fas fa-plus mr-2"></i>
        Add TODO
      </Button>
    </div>
  );
}
