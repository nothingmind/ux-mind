'use client';

import { RecipesList } from '@/components/recipes/RecipesList';

import { useState, useEffect } from 'react';

// import { db } from '@/lib/db';

export default function Recipes() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/recipes', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setData(data?.result);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <main className='flex flex-col flex-1 items-center justify-center'>
      <RecipesList recipes={data} />
    </main>
  );
}
