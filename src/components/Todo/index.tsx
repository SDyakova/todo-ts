import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ExtendedTask } from "./types";
import { getTasks } from "./__mock__";

const Todo: React.FC = () => {
  const [tasks, setTasks] = useState<ExtendedTask[]>([]);
  const [inputValue, setInputValue] = useState();

  const newTaskFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTasks().then((tasks) => setTasks(tasks));
  }, []);

  const handleEditClick = (id: ExtendedTask["id"]) => {
    setTasks((prev) =>
      prev.map((task) => (task.id == id ? { ...task, isEditing: true } : task))
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: ExtendedTask["id"]
  ) => {
    const inputValue = e.currentTarget.value;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: inputValue } : task
      )
    );
  };

  const handleDeleteClick = (id: ExtendedTask["id"]) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleKeyUpWhenCreate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputValue = e.currentTarget.value;
      setTasks((prev) => [
        ...prev,
        {
          id: uuidv4(),
          title: inputValue,
          isCompleted: false,
        },
      ]);
      const newTaskField = newTaskFieldRef.current;
      if (newTaskField) {
        newTaskField.value = "";
      }
    }
  };

  const handleKeyUpWhenEdit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: ExtendedTask["id"]
  ) => {
    const inputValue = e.currentTarget.value;
    if (e.key === "Enter") {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, title: inputValue, isEditing: false }
            : task
        )
      );
    }
  };

  return (
    <div>
      <input ref={newTaskFieldRef} onKeyUp={handleKeyUpWhenCreate}></input>
      <div>
        {tasks.map((task) =>
          task.isEditing ? (
            <input
              key={task.id}
              value={task.title}
              onChange={(e) => handleInputChange(e, task.id)}
              onKeyUp={(e) => handleKeyUpWhenEdit(e, task.id)}
            />
          ) : (
            <div key={task.id}>
              {task.title}
              <button onClick={() => handleEditClick(task.id)}>Edit</button>
              <button onClick={() => handleDeleteClick(task.id)}>Delete</button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Todo;
