import { db } from './db';

export const getRecipe = async (recipeId: string) =>
  await db.recipe.findUnique({
    where: {
      id: recipeId
    },
    select: {
      id: true,
      title: true,
      imageUrl: true,
      description: true,
      ingredients: true,
      instructions: true,
      tags: true,
      cookTime: true,
      created_at: true
    }
  });
