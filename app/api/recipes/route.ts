import { NextRequest } from 'next/server';
import { z } from 'zod';

import { db } from '@/lib/db';
import { createClient } from '@/lib/supabase/server';

const createRecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.string(),
  cookTime: z.string(),
  tags: z.array(z.string())
  // userId: z.string()
});

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  try {
    const json = await request.json();

    // const body = createRecipeSchema.parse({ ...json, userId: user?.id });

    const body = createRecipeSchema.parse(json);

    await db.recipe.create({
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        ingredients: body.ingredients,
        instructions: body.instructions,
        cookTime: body.cookTime,
        tags: body.tags
        // userId: body.userId
      }
    });

    return Response.json({
      success: true,
      message: 'A new recipe was successfully created'
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      success: false,
      message: 'Error occured while create a recipe!'
    });
  }
}
