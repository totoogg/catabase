import { memo } from 'react';
import cls from './Header.module.css';
import { Search } from '@/features';

export const Header = memo(() => {
  return (
    <div className={cls.Header}>
      <div className="wrapper">
        <Search />
      </div>
    </div>
  );
});

Header.displayName = 'Header';
