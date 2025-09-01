import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  todoUpdateSchema,
  type TodoUpdateFormValues,
} from '@/validation/todo.validation';
import { updateTodo } from '@/apis/todos.api';
import { useState } from 'react';
import type { Todo } from '@/interfaces/todo.interfaces';

interface TodoEditFormProps {
  todo: Todo;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function TodoEditForm({ todo, onSuccess, onCancel }: TodoEditFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<TodoUpdateFormValues>({
    resolver: zodResolver(todoUpdateSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description || '',
      status: todo.status as 'PENDING' | 'COMPLETED' | 'CANCELLED',
      comment: todo.comment || '',
    },
  });

  const onSubmit = async (data: TodoUpdateFormValues) => {
    setLoading(true);
    try {
      await updateTodo({ id: todo.id, ...data });
      onSuccess?.();
    } catch (error) {
      console.error('Failed to update todo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Edit Todo</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter task title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter task description (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <select className="w-full p-2 border rounded-md" {...field}>
                    <option value="PENDING">Pending</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Input placeholder="Enter comment (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Todo'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
