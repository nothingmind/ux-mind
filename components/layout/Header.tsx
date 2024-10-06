import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { PAGES } from '@/constants/pages';
import { createClient } from '@/lib/supabase/server';

import { Signout } from '../authorization/SignOut';

const NavList = [
  {
    id: 1,
    name: 'Home',
    pathname: PAGES.HOME
  },
  {
    id: 2,
    name: 'Recipes',
    pathname: PAGES.RECIPES
  },
  {
    id: 3,
    name: 'About',
    pathname: PAGES.ABOUT
  }
];

export async function Header() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <header className='sticky justify-between top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
      <Link href={PAGES.HOME}>Foodlees</Link>
      <nav className='mr-96'>
        {NavList.map(({ id, name, pathname }) => (
          <Link
            key={id}
            href={pathname}
            className='mr-10'>
            {name}
          </Link>
        ))}
      </nav>
      <div>
        {user !== null ? (
          <Signout />
        ) : (
          <>
            <Button
              asChild
              className='mr-2'>
              <Link href={PAGES.SIGN_IN}>Sign in</Link>
            </Button>
            <Button
              asChild
              variant='outline'>
              <Link href={PAGES.SIGN_UP}>Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
