import { type Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { PAGES } from '@/lib/pages';

export const metadata: Metadata = {
  title: 'Root page'
};

export default function RootPage() {
  return (
    <div className='grid h-screen place-items-center'>
      <div className='grid gap-4 text-center'>
        <h3 className='text-3xl font-semibold'>Hello everyone!👋</h3>
        <p className='text-base'>To use the application you need to sign in.</p>
        <p className='text-base'>It will take a couple of minutes.</p>
        <Button asChild>
          <Link href={PAGES.SIGN_IN}>Go to the sign in page 🤗</Link>
        </Button>
      </div>
    </div>
  );
}
