import { ChangeEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { TaskDto } from "./types";
import { getTasks } from "./__mock__";
import { Task } from "./types";

const Todo_2 = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const newTaskFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTasks().then((tasks) => setTasks(tasks));
  }, []);

  const handleKeyUpWhenCreate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;

    if (e.key === "Enter") {
      setTasks((prev) => [
        ...prev,
        { id: uuidv4(), title: inputValue, isChecked: false },
      ]);

      const newTaskField = newTaskFieldRef.current;

      if (newTaskField) {
        newTaskField.value = "";
      }
    }
  };

  const handleEditButtonClick = (id: Task["id"]) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, isEditing: true } : task))
    );
  };

  const handleKeyUpWhenEdit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: Task["id"]
  ) => {
    const inputValue = e.currentTarget;

    if (e.key === "Enter") {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, title: inputValue.value, isEditing: false }
            : task
        )
      );
    }
  };

  const handleDeleteButtonClick = (id: Task["id"]) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div>
      <input
        ref={newTaskFieldRef}
        placeholder="Введите новую задачу"
        onKeyUp={handleKeyUpWhenCreate}
      />
      <div>
        {tasks.map((task) =>
          !task.isEditing ? (
            <div key={task.id}>
              {task.title}
              <button onClick={() => handleEditButtonClick(task.id)}>
                Edit
              </button>
              <button onClick={() => handleDeleteButtonClick(task.id)}>
                Delete
              </button>
            </div>
          ) : (
            <input
              key={task.id}
              defaultValue={task.title}
              onKeyUp={(e) => handleKeyUpWhenEdit(e, task.id)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Todo_2;
