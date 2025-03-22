"use client";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { createTodo, getTodos } from "../actions/todo-actions";
import { queryClient } from "../config/ReactQueryProvider";

function TodosPage() {
  const [todoInput, setTodoInput] = useState("");

  const todosQuery = useQuery({
    // 브라우저에서 캐싱을 하기위한 아래 키 값을 통해 데이터를 관리
    queryKey: ["todos"],
    queryFn: () => getTodos(),
  });

  const createTodoMutation = useMutation({
    mutationFn: async () => {
      if (todoInput === "") throw new Error("Todo 입력해");
      // await 를 넣어서 비동기 처리를 해줘야함
      // createTodo 내부적으로 try catch 를 사용하고 있기 때문에 에러를 던지면 catch 로 넘어감
      return await createTodo(todoInput);
    },

    onSuccess: (TODOS) => {
      console.log("TODOS", TODOS);
      // todosQuery.refetch();

      // TODOS 키를 가진 쿼리를 다시 호출하여 데이터를 갱신
      queryClient.invalidateQueries(["todos"]);
    },

    onError: (error: any) => {
      alert(error.message);
    },
  });

  return (
    <div>
      <h1>Todos</h1>

      {/* TODO 생성 */}
      <input
        type="text"
        placeholder="Enter Todo"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />

      {/* mutate 호출 -> mutationFn 실행 */}
      <button type="button" onClick={() => createTodoMutation.mutate()}>
        {createTodoMutation.isLoading ? "생성중..." : "Create Todo"}
      </button>

      {/* TODO 보여주는 부분 */}
      {todosQuery.isLoading && <div>Loading...</div>}
      {todosQuery.data &&
        todosQuery.data.map((todo, index) => <p key={index}>{todo}</p>)}
    </div>
  );
}

export default TodosPage;
