'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@/components/ui/input';

import { QUERY_NAME } from '@/lib/global';

export const Search = () => {
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const { replace } = useRouter();

  const debounced = useDebouncedCallback((searchInput: string) => {
    const params = new URLSearchParams(searchParams);

    if (searchInput) {
      params.set(QUERY_NAME, searchInput);
    } else {
      params.delete(QUERY_NAME);
    }

    replace(`${pathname}?${params.toString()}`);
  });

  return (
    <div>
      <Input
        defaultValue={searchParams.get(QUERY_NAME)?.toString()}
        placeholder='Search by title...'
        onChange={(e) => debounced(e.target.value)}
      />
    </div>
  );
};
