import axios from 'axios';
import type { Todo, UpdateTodoPayload } from '@/interfaces/todo.interfaces';
import type { TodoCreateFormValues } from '@/validation/todo.validation';
import { useState, useEffect, useCallback } from 'react';

// API Calls
export async function getTodos(): Promise<Todo[]> {
  const { data } = await axios.get<Todo[]>('http://localhost:3000/api/todos');
  return data;
}

export async function createTodo(todo: TodoCreateFormValues) {
  const { data } = await axios.post<Todo>(
    'http://localhost:3000/api/todos',
    todo
  );
  return data;
}

export async function updateTodo(todo: UpdateTodoPayload) {
  const { data } = await axios.put<Todo>(
    'http://localhost:3000/api/todo/' + todo.id,
    todo
  );
  return data;
}

export async function deleteTodo(id: string) {
  const { data } = await axios.delete<Todo>(
    'http://localhost:3000/api/todo/' + id
  );
  return data;
}

// Hooks
export function useGetTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = useCallback(async () => {
    const todos = await getTodos();
    setTodos(todos);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Note: This custom refetch implementation differs from React Query in several ways:
  // 1. No automatic caching or stale-while-revalidate behavior
  // 2. No automatic retries or error handling built-in
  // 3. No background updates or polling capabilities
  // 4. Each component instance has its own state (unlike React Query's shared cache)
  // 5. Manual refetch is required for data updates (no automatic invalidation)
  return { todos, refetch: fetchTodos };
}

export function useUpdateTodo() {
  const update = useCallback(async (todo: UpdateTodoPayload): Promise<Todo> => {
    const updatedTodo = await updateTodo(todo);
    return updatedTodo;
  }, []);

  return { updateTodo: update };
}

export function useDeleteTodo() {
  const deleteTodoFn = useCallback(async (id: string): Promise<void> => {
    await deleteTodo(id);
  }, []);

  return { deleteTodo: deleteTodoFn };
}
