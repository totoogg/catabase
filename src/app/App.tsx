import { ErrorBoundary } from '@/shared';
import { Layout } from './layout/Layout';
import { Providers } from './providers/Providers';
import { memo } from 'react';
import { ErrorPageBoundary, Main } from '@/pages';

export const App = memo(() => {
  return (
    <ErrorBoundary errorPage={<ErrorPageBoundary />}>
      <Providers>
        <Layout>
          <Main />
        </Layout>
      </Providers>
    </ErrorBoundary>
  );
});

App.displayName = 'App';
