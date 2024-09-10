import React, { useState } from "react";

import styles from "./TodoCreator.module.scss";
import { addNewTodo } from "../../api/addNewTodo";
import { Status, Todo } from "../../types";
import Spinner from "../../shared/Spinner";

interface TodoCreatorProps {
  onCreate: (arg: Todo) => void;
}

const TodoCreator: React.FC<TodoCreatorProps> = ({ onCreate }) => {
  const [status, setStatus] = useState<Status>("idle");

  const handleKeyUpWhenCreate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value.trim();
    if (e.key === "Enter" && inputValue) {
      setStatus("loading");
      addNewTodo(inputValue).then((todo) => {
        if (todo) {
          onCreate(todo);
          setStatus("idle");
        } else {
          setStatus("error");
        }
      });
      e.currentTarget.value = "";
    }
  };
  return (
    <div className={styles.wrapper}>
      <input
        className={`${styles.inner}${
          status === "error" ? " " + styles["inner--error"] : ""
        }`}
        placeholder="Создать новую задачу"
        onKeyUp={handleKeyUpWhenCreate}
      />
      {status === "loading" && <Spinner />}
    </div>
  );
};

export default TodoCreator;
