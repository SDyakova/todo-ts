import React, { useEffect, useState } from "react";
import { getAllTodos } from "./components/api/getAllTodos";
import { TodoDto } from "./types";

const TodoList_v4 = () => {
  const [todos, setTodos] = useState<TodoDto[]>([]);

  useEffect(() => {
    getAllTodos().then((data) => setTodos([...data.todos]));
  }, []);
  return (
    <div>
      {todos.map((todo) => (
        <div>
          <div key={todo.id}>
            {todo.todo}
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList_v4;
