import { TodoDto } from "../../types";

interface TodosResponse {
  todos: TodoDto[];
  total: number;
  skip: number;
  limit: number;
}

export const getAllTodos = async (): Promise<TodosResponse> => {
  try {
    const response = await fetch("https://dummyjson.com/todos");
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
