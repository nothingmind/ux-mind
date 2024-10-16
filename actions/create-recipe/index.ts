// 'use server';

// import { redirect } from 'next/navigation';
// import { flattenValidationErrors } from 'next-safe-action';

// import { isAuthSafeAction } from '@/lib/safe-action';
// import { db } from '@/lib/db';

// import { createRecipeSchema } from './schema';
// import { Bucket, RoutePath } from '@/enums';
// import { encodedRedirect } from '@/utils';
// import { createClient } from '@/lib/supabase/server';

// export const createRecipe = isAuthSafeAction
//   .schema(createRecipeSchema, {
//     handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors
//   })
//   .action(async ({ parsedInput, ctx }) => {
//     const { imageUrl, tags, ingredients, instructions, ...rest } = parsedInput;
//     const {
//       user: { user }
//     } = ctx;

//     const supabase = createClient();

//     try {
//       await db.recipe.create({
//         data: {
//           ...rest,
//           tags: tags?.split(',').map((tag) => tag.trim()),
//           ingredients: ingredients.split(',').map((ing) => ing.trim()),
//           instructions: instructions,
//           imageUrl: `${process.env.STORAGE_ENDPOINT}/${imageUrl}`,
//           userId: user.id
//         }
//       });
//     } catch (err) {
//       // eslint-disable-next-line no-console
//       console.error(err);

//       const fileName = imageUrl.split('recipes/').pop();

//       await supabase.storage.from(Bucket.RECIPES).remove([`${user?.id}/${fileName}`]);

//       return encodedRedirect('error', RoutePath.CreateRecipe, "Couldn't create a recipe");
//     }

//     return redirect(RoutePath.Recipes);
//   });
