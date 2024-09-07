import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { TodoDto } from "./api/types";
// import { addTask, getTasks } from "./__mock__";
import { Todo } from "./types";
import { getAllTodos } from "./api/getAllTodos";
import { mockGetAllTodos } from "./__mock__";

const TodoList = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);

  useEffect(() => {
    // getAllTodos().then(({ todos }) => setTasks(todos));
    mockGetAllTodos().then((todos) => setTasks(todos));
  }, []);

  const handleDeleteButtonClick = (id: Todo["id"]) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEditButtonClick = (id: Todo["id"]) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, isEditing: true } : task))
    );
  };

  const handleKeyUpWhenEdit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: Todo["id"]
  ) => {
    const inputValue = e.currentTarget.value;

    if (e.key === "Enter") {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, title: inputValue, isEditing: undefined }
            : task
        )
      );
    }
  };

  return (
    <div>
      {/* <input placeholder="Создать новую задачу" onKeyUp={handleKeyUp} /> */}
      <div>
        {tasks.map((task) =>
          !task.isEditing ? (
            <div key={task.id}>
              {task.todo}
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
              onKeyUp={(e) => handleKeyUpWhenEdit(e, task.id)}
              defaultValue={task.todo}
            />
          )
        )}
      </div>
    </div>
  );
};

export default TodoList;
