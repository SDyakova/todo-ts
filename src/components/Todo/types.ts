export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

export type ExtendedTask = Task & { isEditing?: boolean };
