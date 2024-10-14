'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { flattenValidationErrors } from 'next-safe-action';

import { createClient } from '@/lib/supabase/server';
import { safeAction } from '@/lib/safe-action';

import { signInSchema, signUpSchema } from './schema';

import { PAGES } from '@/lib/pages';

export const signIn = safeAction
  .schema(signInSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      redirect(PAGES.ERROR);
    }

    revalidatePath('/', 'layout');
    redirect(PAGES.HOME);
  });

export const signUp = safeAction
  .schema(signUpSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: { email, password, firstName, lastName } }) => {
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName
        }
      }
    });

    if (error) {
      redirect(PAGES.ERROR);
    }

    revalidatePath('/', 'layout');
    redirect(PAGES.HOME);
  });

export const signOut = safeAction.action(async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect(PAGES.ERROR);
  }

  redirect(PAGES.SIGN_IN);
});
