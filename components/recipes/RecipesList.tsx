'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { PAGES } from '@/lib/pages';

export const RecipesList: React.FC = ({ recipes }) => {
  if (!recipes.length) {
    return (
      <div className='flex flex-col flex-1 gap-4 justify-center items-center'>
        There are no recipes
        <Link href={PAGES.RECIPE_ADD}>
          <Button>Create Recipe</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='flex flex-col flex-1 gap-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            className='max-w-72 w-full'>
            <div className='w-full h-40 relative'>
              <Image
                src={recipe.imageUrl}
                alt={recipe.title}
                fill
                className='object-cover rounded-t-lg'
              />
            </div>

            <div className='p-4'>
              <h2 className='text-lg font-semibold'>{recipe.title}</h2>

              <p className='text-sm text-gray-500 truncate'>{recipe.description}</p>

              <Link href={`${PAGES.RECIPES}/${recipe.id}`}>
                <Button className='mt-4'>Read Recipe</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
