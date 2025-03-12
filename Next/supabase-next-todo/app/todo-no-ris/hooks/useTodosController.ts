import {
  createTodos,
  deleteTodoSoft,
  getTodos,
  getTodosBySearch,
  updateTodos,
} from "@/apis/todos-no-ris";
import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";

export type TodoDto = Database["public"]["Tables"]["todos_no_ris"]["Row"];

const useTodosController = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<TodoDto[]>([]);

  const onGetTodos = async () => {
    setLoading(true);
    try {
      const resultTodos = await getTodos();
      if (resultTodos) {
        setTodos(resultTodos);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetTodos();
  }, []);

  const onCreateEmptyTodos = async () => {
    await createTodos("");
    await onGetTodos();
  };

  const onUpdateTodos = async (id: number, content: string) => {
    await updateTodos(id, content);
    await onGetTodos();
  };

  const onDeleteTodos = async (id: number) => {
    await deleteTodoSoft(id);
    await onGetTodos();
  };

  const onSearchTodos = async (terms: string) => {
    if (terms) {
      const todoResult = await getTodosBySearch(terms);
      if (todoResult) {
        setTodos(todoResult);
      }
    } else {
      await onGetTodos();
    }
  };

  return {
    loading,
    todos,
    onCreateEmptyTodos,
    onDeleteTodos,
    onSearchTodos,
    onUpdateTodos,
  };
};

export default useTodosController;
