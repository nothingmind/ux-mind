import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { PAGES } from '@/lib/pages';

export const NoRecipes = () => (
  <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
    <p className='text-center text-lg'>The recipe list is empty.</p>
    <Link href={PAGES.RECIPE_ADD}>
      <Button>Create Recipe</Button>
    </Link>
  </div>
);
