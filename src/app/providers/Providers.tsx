import { FC, memo, ReactNode } from 'react';

interface ProvidersProps {
  children?: ReactNode;
}

export const Providers: FC<ProvidersProps> = memo(({ children }) => {
  return <div>{children}</div>;
});

Providers.displayName = 'Providers';
