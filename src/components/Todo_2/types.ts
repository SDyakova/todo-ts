export interface TaskDto {
  id: string;
  title: string;
  isChecked: boolean;
}

export type Task = TaskDto & { isEditing?: boolean };
