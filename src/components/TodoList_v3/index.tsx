import React, { useEffect, useState } from "react";
import { Status, Todo } from "./types";
import { getAllTodos } from "./api/getAllTodos";
import Spinner from "./shared/Spinner";
import styles from "./TodoList.module.scss";
import TodoCreator from "./components/TodoCreator";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    setStatus("loading");
    getAllTodos().then(({ todos }) => {
      setTodos(todos);
      setStatus("idle");
    });
  }, []);

  const handleDeleteButtonClick = (id: Todo["id"]) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEditButtonClick = (id: Todo["id"]) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, isEditing: true } : todo))
    );
  };

  const handleKeyUpWhenEdit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: Todo["id"]
  ) => {
    const inputValue = e.currentTarget.value.trim();

    if (e.key === "Enter" && inputValue) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? { ...todo, todo: inputValue, isEditing: undefined }
            : todo
        )
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <TodoCreator onCreate={setTodos} />
      <div>
        {status === "loading" ? (
          <Spinner />
        ) : (
          todos.map((todo) =>
            !todo.isEditing ? (
              <div key={todo.id} className={styles.todo}>
                {todo.todo}
                <button onClick={() => handleEditButtonClick(todo.id)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteButtonClick(todo.id)}>
                  Delete
                </button>
              </div>
            ) : (
              <input
                key={todo.id}
                onKeyUp={(e) => handleKeyUpWhenEdit(e, todo.id)}
                defaultValue={todo.todo}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default TodoList;
