//
import { TodoDto } from "./api/types";

export const mockTasks: TodoDto[] = [
  {
    id: 111,
    todo: "Task1",
    completed: false,
    userId: 24,
  },
  {
    id: 222,
    todo: "Task2",
    completed: false,
    userId: 24,
  },
  {
    id: 333,
    todo: "Task3",
    completed: false,
    userId: 24,
  },
];

export const mockGetAllTodos = (): Promise<TodoDto[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTasks), 1000);
  });
};
