import z from 'zod';

export function validateForm(isLogin: boolean) {
  return z.object({
    ...(isLogin
      ? {}
      : {
          username: z
            .string()
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must not exceed 20 characters')
            .regex(
              /^[a-zA-Z0-9_]+$/,
              'Username can only contain letters, numbers, and underscores'
            ),
        }),
    email: z.string().email('Please enter a valid email address'),
    password: z.string(),
  });
}
