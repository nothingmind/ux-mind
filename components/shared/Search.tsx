import { Input } from '@/components/ui/input';

export const Search = () => {
  return (
    <div className='mr-5'>
      <Input
        type='search'
        placeholder='Search by title...'
        className='md:w-[100px] lg:w-[300px]'
      />
    </div>
  );
};
