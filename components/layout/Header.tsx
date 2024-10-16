import { Dropdown } from '../shared/Dropdown';

export function Header() {
  return (
    <header className='sticky justify-end top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-10'>
      <div className='flex'>
        <Dropdown />
      </div>
    </header>
  );
}
