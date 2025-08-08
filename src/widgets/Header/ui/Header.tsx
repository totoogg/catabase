import cls from './Header.module.css';
import { Search, ToggleTheme } from '@/features';

export const Header = () => {
  return (
    <div className={cls.Header}>
      <div className="wrapper">
        <div className={cls.content}>
          <Search />
          <ToggleTheme />
        </div>
      </div>
    </div>
  );
};

Header.displayName = 'Header';
