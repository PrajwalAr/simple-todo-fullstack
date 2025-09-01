import { z } from 'zod'

// User schemas
export const signupSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required'),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
})

// Todo schemas
export const todoCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  status: z.enum(['PENDING', 'COMPLETED', 'CANCELLED']).default('PENDING'),
})

export const todoUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  status: z.enum(['PENDING', 'COMPLETED', 'CANCELLED']).optional(),
  comment: z.string().optional(),
})

// Parameter schemas
export const idParamSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
})

// Header schemas
export const authHeaderSchema = z.object({
  token: z.string().min(1, 'Token is required, unauthorized'),
})

// Utility function for handling validation errors
export const handleValidationError = (error: z.ZodError) => {
  const errors = error.issues.map((err: z.ZodIssue) => ({
    field: err.path.join('.'),
    message: err.message,
  }))
  return { success: false, errors }
}
