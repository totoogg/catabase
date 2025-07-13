import { ErrorBoundary } from '@/shared';
import Layout from './layout/Layout';
import Providers from './providers/Providers';
import { Component } from 'react';
import { ErrorPageBoundary, Main } from '@/pages';

export class App extends Component {
  render() {
    return (
      <ErrorBoundary errorPage={<ErrorPageBoundary />}>
        <Providers>
          <Layout>
            <Main />
          </Layout>
        </Providers>
      </ErrorBoundary>
    );
  }
}
