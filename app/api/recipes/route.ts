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
});

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  try {
    const json = await request.json();
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
      }
    });

    return Response.json({
      success: true,
      message: 'A new recipe was successfully created'
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: 'Error occured while create a recipe!'
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const data = await db.recipe.findMany();

    return Response.json({
      result: data,
      success: true,
      message: 'Successfully'
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      message: 'Error'
    });
  }
}
