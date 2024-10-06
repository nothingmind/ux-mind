import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

import { Header } from '@/components/layout/Header';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

const outfit = Outfit({ subsets: ['latin'] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={outfit.className}>
        <Header />
        {children}
        <Toaster
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
