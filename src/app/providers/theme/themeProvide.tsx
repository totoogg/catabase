import { ThemeContext } from '@/shared';
import { FC, useMemo, useState } from 'react';

interface IThemeProvider {
  children: React.ReactNode;
}

export const ThemeProvide: FC<IThemeProvider> = ({ children }) => {
  const [theme, setTheme] = useState<string>('light');

  const defaultValue = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={defaultValue}>
      {children}
    </ThemeContext.Provider>
  );
};
