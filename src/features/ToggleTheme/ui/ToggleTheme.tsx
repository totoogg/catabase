import { Button, ThemeContext } from '@/shared';
import cls from './ToggleTheme.module.css';
import { useCallback, useContext } from 'react';
import Sun from '@/shared/assets/icons/sun.svg';
import Moon from '@/shared/assets/icons/moon.svg';

export const ToggleTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = useCallback(() => {
    if (setTheme) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  }, [setTheme, theme]);

  return (
    <Button className={cls.toggle} onClick={toggleTheme}>
      {theme === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};
