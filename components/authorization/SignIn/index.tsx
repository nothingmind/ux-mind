'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

import { supabase } from '@/lib/supabase/client';
import { PAGES } from '@/lib/pages';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/shared/Password';

import { Icons } from '@/components/shared/Icons';

import { signInSchema } from '@/actions/authorization/schema';
import { signInWithOAuth } from '@/actions/authorization';

import GoogleIcon from '@/public/icons/google.svg';

type FormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const [loading, setLoading] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema)
  });

  async function onSubmit(data: FormData) {
    setLoading(true);

    toast.promise(
      supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      }),
      {
        loading: 'Loading...',
        success: (dt) => {
          if (dt && dt.error) throw dt;

          setLoading(false);

          startTransition(() => {
            router.push(`/recipes`);
            router.refresh();
          });

          return 'Successfully signed in';
        },
        error: (dt) => {
          setLoading(false);

          return dt.error.message;
        }
      }
    );
  }

  const handleSignInWithGoogle = () => signInWithOAuth();

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid gap-8'>
        <div className='grid gap-2'>
          <Label
            htmlFor='email'
            className='mb-1.5'>
            Email
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
        <div className='grid gap-2'>
          <div className='flex items-center justify-between mb-1.5'>
            <Label htmlFor='password'>Password</Label>
            <Link
              href={PAGES.FORGOT_PASSWORD}
              className='text-sm text-neutral-500 underline'>
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id='password'
            placeholder='Enter your password'
            autoCapitalize='none'
            autoCorrect='off'
            {...register('password')}
          />
          {errors?.password && <p className='px-1 text-xs text-red-600'>{errors.password.message}</p>}
        </div>
        <div className='grid'>
          <Button
            disabled={loading || isPending}
            className='mb-4'>
            {loading || isPending ? (
              <div className='flex items-center gap-2'>
                <Icons.spinner className='size-4 animate-spin' />
                <span>Loading...</span>
              </div>
            ) : (
              'Sign in'
            )}
          </Button>
        </div>
      </form>
      <Button
        variant='outline'
        className='flex w-full items-center justify-center gap-x-4 px-2'
        onClick={handleSignInWithGoogle}>
        <div className='flex items-center gap-2'>
          <Image
            src={GoogleIcon}
            alt='Google icon'
            className=' h-5 w-5'
          />
          <span>Sign in with Google</span>
        </div>
      </Button>
    </div>
  );
}
