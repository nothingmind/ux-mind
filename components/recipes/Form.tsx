/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from '../shared/Upload';

import { createRecipeSchema } from './ControlForm';

type FormData = z.infer<typeof createRecipeSchema>;

export const Form = ({
  props,
  onSubmit,
  children
}: {
  props: any;
  onSubmit: (data: FormData) => Promise<void>;
  children: React.ReactNode;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(createRecipeSchema)
  });

  const setImageUrlForm = (url: string) => {
    setValue('imageUrl', url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Create a new recipe</CardTitle>
          <CardDescription>Write your recipe here. Click the button bellow once your done...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-y-6'>
            <div className='grid gap-2'>
              <Label>Recipe name</Label>
              <Input
                id='title'
                {...register('title')}
              />
              {errors?.title && <p className='px-1 text-xs text-red-600'>{errors.title.message}</p>}
            </div>
            <Upload setImageUrlForm={setImageUrlForm} />
            <div className='grid gap-2'>
              <Label>Description</Label>
              <Textarea
                id='description'
                {...register('description')}
              />
              {errors?.description && (
                <p className='px-1 text-xs text-red-600'>{errors.description.message}</p>
              )}
            </div>
            <div className='grid gap-2'>
              <Label>Ingridients *</Label>
              <Textarea
                id='ingredients'
                {...register('ingredients')}
              />
              {errors?.ingredients && (
                <p className='px-1 text-xs text-red-600'>{errors.ingredients.message}</p>
              )}
            </div>
            <div className='grid gap-2'>
              <Label>Instructions *</Label>
              <Textarea
                id='inctructions'
                {...register('instructions')}
              />
              {errors?.instructions && (
                <p className='px-1 text-xs text-red-600'>{errors.instructions.message}</p>
              )}
            </div>
            <div className='grid gap-2'>
              <Label>Cook time</Label>
              <Input
                id='cook_time'
                {...register('cookTime')}
              />
              {errors?.cookTime && <p className='px-1 text-xs text-red-600'>{errors.cookTime.message}</p>}
            </div>
            <div className='grid gap-2'>
              <Label>Tags *</Label>
              <Textarea
                id='tags'
                {...register('tags')}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>{children}</CardFooter>
      </Card>
    </form>
  );
};
