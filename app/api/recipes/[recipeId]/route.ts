import { NextRequest } from 'next/server';

import { db } from '@/lib/db';

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
