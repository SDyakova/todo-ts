import { TodoDto } from "./types";

export const addNewTodo = async (
  todo: TodoDto["todo"]
): Promise<TodoDto | null> => {
  try {
    const response = await fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo,
        completed: false,
        userId: Number(process.env.REACT_APP_TODOS_USER_ID),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return null;
  }
};
