import { z } from 'zod';

export const todoCreateSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
});

export const todoUpdateSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters')
    .optional(),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  status: z.enum(['PENDING', 'COMPLETED', 'CANCELLED']).optional(),
  comment: z
    .string()
    .max(200, 'Comment must be less than 200 characters')
    .optional(),
});

export type TodoCreateFormValues = z.infer<typeof todoCreateSchema>;
export type TodoUpdateFormValues = z.infer<typeof todoUpdateSchema>;
