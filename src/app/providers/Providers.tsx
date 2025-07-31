import { FC, ReactNode } from 'react';
import { setupStore } from '../store';
import { Provider } from 'react-redux';

interface ProvidersProps {
  children?: ReactNode;
}

const store = setupStore();

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

Providers.displayName = 'Providers';
