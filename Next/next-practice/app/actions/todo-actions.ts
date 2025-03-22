"use server";

const TODOS: string[] = ["go to market"];

export const getTodos = async () => {
  return TODOS;
};

export const createTodo = async (data: string) => {
  // sleep 1 (로딩 상태 구현을 위한 임의 코드)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  TODOS.push(data);

  return TODOS;
};
