import { ReactNode } from 'react';

interface NotFoundProps {
  status?: ReactNode;
  title?: ReactNode;
}

export const NotFound = ({ status, title = 'Something went wrong' }: NotFoundProps) => (
  <div className='flex h-full w-full flex-col items-center justify-center p-5'>
    {!!status && <p className='mb-2 text-center text-4xl font-semibold text-primary lg:text-5xl'>{status}</p>}
    {!!title && <p className='mb-8 text-center text-3xl lg:text-4xl'>{title}</p>}
  </div>
);
