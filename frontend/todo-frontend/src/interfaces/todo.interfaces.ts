export interface Todo {
  id: string;
  title: string;
  description: string;
  comment: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface UpdateTodoPayload {
  id: string;
  title?: string;
  description?: string;
  status?: string;
}
