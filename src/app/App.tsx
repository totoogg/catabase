import { Providers } from './providers/Providers';
import { memo } from 'react';
import { AppRouter } from './routers/appRouter';

export const App = memo(() => {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
});

App.displayName = 'App';
