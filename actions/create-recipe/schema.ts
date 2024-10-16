import { z } from 'zod';

export const createRecipeSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  imageUrl: z.string(),
  ingredients: z.string(),
  instructions: z.string(),
  cookTime: z.string().optional(),
  tags: z.string().optional()
});
