import { RecipesList } from '@/components/recipes/Recipe/List';

// import { getAllRecipes } from '@/lib/getRecipe';

import { Prisma } from '@prisma/client';

import { Search } from '@/components/shared/Search';
import { RecipesFilters } from '@/components/recipes/Filters';

import { db } from '@/lib/db';

export default async function Recipes({ searchParams }) {
  const buildQuery = () => {
    let query: Prisma.RecipeWhereInput = {};

    if (searchParams.query) {
      query = {
        title: {
          contains: searchParams.query
        }
      };
    }

    if (searchParams.ing) {
      query = {
        ...query,
        ingredients: {
          hasSome: searchParams.ing.split(',')
        }
      };
    }

    if (searchParams.tag) {
      query = {
        ...query,
        tags: {
          hasSome: searchParams.tag.split(',')
        }
      };
    }

    return Object.keys(query).length ? query : undefined;
  };

  const filters = await db.recipe.findMany({
    select: {
      ingredients: true,
      tags: true
    }
  });

  const allRecipe = await db.recipe.findMany({
    where: buildQuery()
  });

  // const allRecipe = await getAllRecipes(buildQuery());

  const tags = filters.flatMap((item) => item.tags);
  const ingredients = filters.flatMap((item) => item.ingredients);

  return (
    <>
      <div className='w-full'>
        <RecipesFilters
          searchParams={searchParams}
          tags={tags}
          ingredients={ingredients}
        />
      </div>
      <main className='flex gap-4 mx-auto py-8 w-full'>
        <div>
          <Search />
          <div className='p-2'>
            <RecipesList recipes={allRecipe} />
          </div>
        </div>
      </main>
    </>
  );
}
