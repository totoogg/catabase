import { FC, ReactNode } from 'react';
import { setupStore } from '../store';
import { Provider } from 'react-redux';
import { ThemeProvide } from './theme/themeProvide';

interface ProvidersProps {
  children?: ReactNode;
}

const store = setupStore();

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvide>{children}</ThemeProvide>
    </Provider>
  );
};

Providers.displayName = 'Providers';
