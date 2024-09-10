import { TodoDto } from "./api/types";

export type Todo = TodoDto & { isEditing?: boolean };

export type Status = "idle" | "loading" | "success" | "error";
