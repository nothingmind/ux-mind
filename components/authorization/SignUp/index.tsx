'use client';

import { useState, useTransition } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { supabase } from '@/lib/supabase/client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Icons } from '@/components/shared/Icons';

import { signUpSchema } from '../auth.schema';

type FormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const [loading, setLoading] = useState(false);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  async function onSubmit(data: FormData) {
    setLoading(true);

    toast.promise(
      supabase.auth.signUp({
        email: data.email,
        password: data.password
      }),
      {
        loading: 'Loading...',
        success: (dt) => {
          if (dt && dt.error) throw dt;

          setLoading(false);

          startTransition(() => {
            router.push(`/`);
            router.refresh();
          });

          return 'Successfully signed up';
        },
        error: (dt) => {
          setLoading(false);

          console.error(dt.error.message);

          return dt.error;
        }
      }
    );
  }
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid gap-10'>
        <div className='grid gap-1'>
          <Label
            htmlFor='email'
            className='mb-1.5'>
            Username
          </Label>
          <Input
            id='email'
            placeholder='Enter your email'
            type='text'
            autoCapitalize='none'
            autoCorrect='off'
            {...register('email')}
          />
          {errors?.email && <p className='px-1 text-xs text-red-600'>{errors.email.message}</p>}
        </div>
        <div className='grid gap-1'>
          <Label
            htmlFor='password'
            className='mb-1.5'>
            Password
          </Label>
          <Input
            id='password'
            placeholder='Enter your password'
            type='password'
            autoCapitalize='none'
            {...register('password')}
          />
          {errors?.password && <p className='px-1 text-xs text-red-600'>{errors.password.message}</p>}
        </div>
        <div className='grid gap-1'>
          <Label
            htmlFor='confirm-password'
            className='mb-1.5'>
            Confirm password
          </Label>
          <Input
            id='confirm-password'
            placeholder='Repeat your password'
            type='password'
            autoCapitalize='none'
            autoCorrect='off'
            {...register('confirmPassword')}
          />
          {errors?.confirmPassword && (
            <p className='px-1 text-xs text-red-600'>{errors.confirmPassword.message}</p>
          )}
        </div>
        <Button disabled={loading || isPending}>
          {loading || isPending ? (
            <div className='flex items-center gap-2'>
              <Icons.spinner className='size-4 animate-spin' />
              <span>Loading...</span>
            </div>
          ) : (
            'Sign up'
          )}
        </Button>
      </div>
    </form>
  );
}
