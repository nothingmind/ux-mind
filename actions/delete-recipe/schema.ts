import { z } from 'zod';

export const deleteRecipeSchema = z.object({
  id: z.string()
});
