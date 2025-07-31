import { FC, ReactNode } from 'react';

interface ProvidersProps {
  children?: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return <div>{children}</div>;
};

Providers.displayName = 'Providers';
