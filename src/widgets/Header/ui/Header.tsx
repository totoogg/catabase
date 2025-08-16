import cls from './Header.module.css';
import { ResetCache, Search, ToggleLang, ToggleTheme } from '@/features';

export const Header = () => {
  return (
    <div className={cls.Header}>
      <div className="wrapper">
        <div className={cls.content}>
          <Search />
          <ToggleTheme />
          <ResetCache />
          <ToggleLang />
        </div>
      </div>
    </div>
  );
};

Header.displayName = 'Header';
