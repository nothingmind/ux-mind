'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { CircleArrowLeft, Pencil, X } from 'lucide-react';
import Link from 'next/link';
import { PAGES } from '@/lib/pages';
import { deleteRecipe } from '@/actions/delete-recipe';

export const RecipeDetails = ({ recipe }: { recipe: any }) => {
  console.log('Recipe Details', recipe);
  const { id, title, description, imageUrl, ingredients, instructions, cookTime, tags } = recipe;

  return (
    <div className='max-w-[550px]'>
      <div className='flex w-full justify-between my-6'>
        <Button asChild>
          <Link href={PAGES.RECIPES}>
            <CircleArrowLeft className='mr-2 h-4 w-4' /> Back
          </Link>
        </Button>
        <div>
          <Button
            variant='outline'
            className='mr-3'>
            <Pencil className='mr-2 h-4 w-4' />
            Edit
          </Button>
          <Button
            variant='destructive'
            onClick={() => deleteRecipe({ id })}>
            <X className='mr-2 h-4 w-4' />
            Delete
          </Button>
        </div>
      </div>

      <div className='flex w-full  flex-col gap-2 px-4 sm:px-0'>
        <h3 className='text-2xl font-bold'>Recipe: {title}</h3>
        <Image
          src={imageUrl}
          alt='none'
          width={0}
          height={0}
          className='w-full h-auto'
          priority
          unoptimized
        />
        <p className='text-base'>{description}</p>
        <div className='font-bold'>
          All ingredients:
          {ingredients.map((ingredient: string, id: string) => {
            return (
              <h3
                key={id}
                className='font-normal'>
                🍕 {ingredient}
              </h3>
            );
          })}
        </div>
        <div className='font-bold'>
          Insctuctions:
          <p className='font-normal'>{instructions}</p>
        </div>
        <div className='font-bold'>
          Tags:
          {tags.map((tag: string, id: string) => {
            return (
              <h3
                key={id}
                className='font-normal'>
                {tag}
              </h3>
            );
          })}
        </div>
        <h3 className='font-bold'>
          Cook time: <span className='font-normal'>{cookTime} 🕔</span>
        </h3>
      </div>
    </div>
  );
};
