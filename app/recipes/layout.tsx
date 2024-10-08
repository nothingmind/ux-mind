import { Header } from '@/components/layout/Header';

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className='flex flex-col gap-5'>
      <Header />
      <main className='flex justify-center px-5 pb-10'>{children}</main>
    </div>
  );
}
