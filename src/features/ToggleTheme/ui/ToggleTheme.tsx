'use client';

import { Button, ThemeContext } from '@/shared';
import cls from './ToggleTheme.module.css';
import { useCallback, useContext } from 'react';

export const ToggleTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = useCallback(() => {
    if (setTheme) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  }, [setTheme, theme]);

  return (
    <Button
      className={[cls.toggle, theme === 'light' ? cls.moon : cls.sun].join(' ')}
      onClick={toggleTheme}
    ></Button>
  );
};
