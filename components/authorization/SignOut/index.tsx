import { Button } from '@/components/ui/button';

import { signout } from '@/app/(auth)/actions';

export const Signout = () => (
  <form action={signout}>
    <Button
      size='sm'
      variant='destructive'
      className='rounded-sm w-full'
      type='submit'>
      Logout
    </Button>
  </form>
);
