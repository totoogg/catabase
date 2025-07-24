import { FC } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router';
import { Cat, ErrorPage, ErrorPageBoundary, Main } from '@/pages';
import { Layout } from '../layout/Layout';
import { ErrorBoundary } from '@/shared';

export const AppRouter: FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<ErrorPage />}>
        <Route
          path="/"
          element={
            <ErrorBoundary errorPage={<ErrorPageBoundary />}>
              <Layout>
                <Main />
              </Layout>
            </ErrorBoundary>
          }
        >
          <Route path="cats/:catId" element={<Cat />} />
        </Route>
        <Route path="about" element={<div>about</div>} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
