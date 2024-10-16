'use server';

import { redirect } from 'next/navigation';
import { flattenValidationErrors } from 'next-safe-action';

import { isAuthSafeAction } from '@/lib/safe-action';
import { db } from '@/lib/db';

import { deleteRecipeSchema } from './schema';

import { PAGES } from '@/lib/pages';
// import { encodedRedirect } from '@/utils';

export const deleteRecipe = isAuthSafeAction
  .schema(deleteRecipeSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: { id } }) => {
    try {
      await db.recipe.delete({
        where: { id }
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);

      // return encodedRedirect('error', RoutePath.CreateRecipe, "Couldn't create a recipe");
    }

    return redirect(PAGES.RECIPES);
  });
