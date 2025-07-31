import cls from './Header.module.css';
import { Search } from '@/features';

export const Header = () => {
  return (
    <div className={cls.Header}>
      <div className="wrapper">
        <Search />
      </div>
    </div>
  );
};

Header.displayName = 'Header';
