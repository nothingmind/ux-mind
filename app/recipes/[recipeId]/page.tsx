import { NotFound } from '@/components/layout/Not-found';
import { RecipeDetails } from '@/components/recipes/Recipe/Details';

import { getRecipe } from '@/lib/getRecipe';

export default async function Recipe({ params }: { params: { recipeId: string } }) {
  const recipe = await getRecipe(params.recipeId);

  return (
    <div className='flex flex-col flex-1 items-center justify-center min-h-full'>
      {recipe ? <RecipeDetails recipe={recipe} /> : <NotFound status='404' />}
    </div>
  );
}
