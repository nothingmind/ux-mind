'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/recipes/Form';

import { Icons } from '@/components/shared/Icons';

import { convertToArray } from '@/lib/formatters';

export const createRecipeSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  imageUrl: z.string(),
  ingredients: z.string(),
  instructions: z.string(),
  cookTime: z.string().optional(),
  tags: z.string().optional()
});

const createTaskResponseSchema = z.object({
  success: z.boolean(),
  message: z.string()
});

export const CreateRecipeForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  return (
    <Form
      props={{
        resolver: zodResolver(createRecipeSchema)
      }}
      onSubmit={async (data) => {
        setLoading(true);

        const response = await fetch('/api/recipes', {
          method: 'POST',
          body: JSON.stringify({
            title: data.title.trim(),
            description: data.description,
            imageUrl: data.imageUrl,
            ingredients: convertToArray(data.ingredients),
            instructions: data.instructions,
            cookTime: data.cookTime,
            tags: convertToArray(data?.tags)
          })
        });

        const json = createTaskResponseSchema.parse(await response.json());

        setLoading(false);

        if (json.success) {
          router.refresh();
          router.push('/recipes');
          toast.success(json.message);
        } else {
          toast.error(json.message);
        }
      }}>
      <Button
        disabled={loading}
        type='submit'>
        {loading ? (
          <div className='flex items-center gap-2'>
            <Icons.spinner className='size-4 animate-spin' />
            <span>Loading...</span>
          </div>
        ) : (
          'Create 🍝'
        )}
      </Button>
    </Form>
  );
};
