import { FC } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router';
import { ErrorPage, ErrorPageBoundary, Main } from '@/pages';
import { Layout } from '../layout/Layout';
import { ErrorBoundary } from '@/shared';

export const AppRouter: FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<ErrorPage />}>
        <Route
          index
          element={
            <ErrorBoundary errorPage={<ErrorPageBoundary />}>
              <Layout>
                <Main />
              </Layout>
            </ErrorBoundary>
          }
        />
        <Route path="about" element={<div>about</div>} />
        <Route path="cats/:catId" element={<div>CatsID</div>} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
