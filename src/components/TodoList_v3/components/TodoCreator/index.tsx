import React, { useState } from "react";

import styles from "./TodoCreator.module.scss";
import { addNewTodo } from "../../api/addNewTodo";
import { Todo } from "../../types";
import Spinner from "../../shared/Spinner";

type Status = "idle" | "loading" | "success" | "error";

const TodoCreator: React.FC<{
  onCreate: React.Dispatch<React.SetStateAction<Todo[]>>;
}> = ({ onCreate }) => {
  const [status, setStatus] = useState<Status>("idle");

  const handleKeyUpWhenCreate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value.trim();
    if (e.key === "Enter" && inputValue) {
      setStatus("loading");
      addNewTodo(inputValue).then((todo) => {
        if (todo) {
          onCreate((prev) => [...prev, todo]);
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
