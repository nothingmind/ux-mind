import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' })
});

export const signUpSchema = z
  .object({
    firstName: z.string().min(4, { message: 'First name is required' }),
    lastName: z.string().min(4, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Email is required' }),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .regex(new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,}$'), {
        message: 'Minimum 8 characters, at least 1 letter and 1 number'
      }),
    confirmPassword: z.string().min(1, { message: 'Confirm is required' })
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: 'custom',
        message: 'The passwords did not match'
      });
    }
  });
