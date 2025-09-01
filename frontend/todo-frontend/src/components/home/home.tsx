import { useGetTodos, useUpdateTodo, useDeleteTodo } from '@/apis/todos.api';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router';
import { IconLogout } from '@tabler/icons-react';
import { TodoCreateForm } from '../todo/TodoCreateForm';
import { TodoEditForm } from '../todo/TodoEditForm';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  IconBrandAsana,
  IconEdit,
  IconCircleCheckFilled,
  IconTrash,
} from '@tabler/icons-react';
import type { Todo } from '@/interfaces/todo.interfaces';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

function TodoCard({
  todo,
  refetchTodos,
}: {
  todo: Todo;
  refetchTodos: () => void;
}) {
  const { updateTodo } = useUpdateTodo();
  const { deleteTodo } = useDeleteTodo();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      refetchTodos();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <Card>
      <div className="flex flex-row gap-2">
        <CardHeader className="w-3/4">
          <CardTitle>{todo.title}</CardTitle>
          <CardDescription>{todo.description}</CardDescription>
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600"
          >
            {todo.status}
          </Badge>
        </CardHeader>
        <CardHeader className="w-1/4">
          <Button
            className=" text-white cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            <IconEdit /> Edit
          </Button>
          <Button
            className="bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
            onClick={() =>
              updateTodo({
                id: todo.id,
                status: 'COMPLETED',
              }).then(() => {
                refetchTodos();
              })
            }
          >
            <IconCircleCheckFilled /> Done
          </Button>
          <Button
            className="bg-red-500 text-white cursor-pointer hover:bg-red-600"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <IconTrash /> Delete
          </Button>
        </CardHeader>
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
              <p className="mb-4">
                Are you sure you want to delete "{todo.title}"?
              </p>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
              <TodoEditForm
                todo={todo}
                onSuccess={() => {
                  refetchTodos();
                  setIsEditing(false);
                }}
                onCancel={() => setIsEditing(false)}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export function Home() {
  const { todos, refetch: refetchTodos } = useGetTodos();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="w-full max-w-3xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-blue-600/75 dark:text-sky-400/75">
              Welcome to Todo App
            </CardTitle>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <IconLogout size={16} />
              Logout
            </Button>
          </div>
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400 items-center">
            <IconBrandAsana className="inline-block mr-2" />
            Add, edit, and delete your tasks here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <TodoCreateForm onSuccess={refetchTodos} />
          {todos.map((todo) => (
            <TodoCard todo={todo} refetchTodos={refetchTodos} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
