import { ErrorBoundary } from '@/shared';
import { Providers } from './providers/Providers';
import { memo } from 'react';
import { ErrorPageBoundary } from '@/pages';
import { AppRouter } from './routers/appRouter';

export const App = memo(() => {
  return (
    <ErrorBoundary errorPage={<ErrorPageBoundary />}>
      <Providers>
        <AppRouter />
      </Providers>
    </ErrorBoundary>
  );
});

App.displayName = 'App';
