import { Task } from "../types";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Task1",
    isCompleted: false,
  },
  {
    id: "2",
    title: "Task2",
    isCompleted: false,
  },
  {
    id: "3",
    title: "Task3",
    isCompleted: false,
  },
];

export const getTasks = (): Promise<Task[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTasks), 1000);
  });
};
