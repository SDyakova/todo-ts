import { TodoDto } from "./api/types";

export type Todo = TodoDto & { isEditing?: boolean };
