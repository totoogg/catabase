import { ErrorBoundary } from '@/shared';
import Layout from './layout/Layout';
import Providers from './providers/Providers';
import { Component } from 'react';
import { ErrorPage } from '@/pages';

export class App extends Component {
  render() {
    return (
      <ErrorBoundary errorPage={<ErrorPage />}>
        <Providers>
          <Layout>a</Layout>
        </Providers>
      </ErrorBoundary>
    );
  }
}
