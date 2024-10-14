import { RecipesList } from '@/components/recipes/RecipesList';
import { getAllRecipes } from '@/lib/getRecipe';

export default async function Recipes() {
  const allRecipe = await getAllRecipes();

  return (
    <main className='flex flex-col flex-1 items-center justify-center'>
      <RecipesList recipes={allRecipe} />
    </main>
  );
}
