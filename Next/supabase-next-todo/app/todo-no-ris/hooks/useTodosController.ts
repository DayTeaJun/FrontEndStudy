import { getTodos } from "@/apis/todos-no-ris";
import { Database } from "@/database.types";
import { useEffect, useState } from "react";

type TodoDto = Database["public"]["Tables"]["todos_no_ris"]["Row"];

const useTodosController = () => {
  const [loading, setLoading] = useState(false);
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

  return { loading, todos };
};

export default useTodosController;
