import { Dropdown } from '../shared/Dropdown';
import { Search } from '../shared/Search';

export function Header() {
  return (
    <header className='sticky justify-end top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
      <div className='flex'>
        <Search />
        <Dropdown />
      </div>
    </header>
  );
}
