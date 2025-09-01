import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
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
  todoCreateSchema,
  type TodoCreateFormValues,
} from '@/validation/todo.validation';
import { createTodo } from '@/apis/todos.api';
import { useGetTodos } from '@/apis/todos.api';

interface TodoCreateFormProps {
  onSuccess?: () => void;
}

export function TodoCreateForm({ onSuccess }: TodoCreateFormProps) {
  const [loading, setLoading] = useState(false);
  const { refetch } = useGetTodos();

  const form = useForm<TodoCreateFormValues>({
    resolver: zodResolver(todoCreateSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (data: TodoCreateFormValues) => {
    setLoading(true);
    try {
      await createTodo(data);
      form.reset();
      await refetch();
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create todo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create New Todo</h2>
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
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={loading}
            >
              Clear
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Todo'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
