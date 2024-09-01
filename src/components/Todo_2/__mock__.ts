import { TaskDto } from "./types";

export const mockTasks: TaskDto[] = [
  { id: "id1", title: "Task1", isChecked: false },
  { id: "id2", title: "Task2", isChecked: false },
  { id: "id3", title: "Task3", isChecked: false },
];

export const getTasks = (): Promise<TaskDto[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTasks), 1000);
  });
};
