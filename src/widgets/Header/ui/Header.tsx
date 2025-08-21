import cls from './Header.module.css';
import { ResetCache, Search, ToggleTheme } from '@/features';

export const Header = () => {
  return (
    <div className={cls.Header}>
      <div className="wrapper">
        <div className={cls.content}>
          <Search />
          <ToggleTheme />
          <ResetCache />
        </div>
      </div>
    </div>
  );
};

Header.displayName = 'Header';
