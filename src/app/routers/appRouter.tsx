import { FC } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router';
import { Main } from '@/pages';
import { Layout } from '../layout/Layout';

export const AppRouter: FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<div>2</div>}>
        <Route
          index
          element={
            <Layout>
              <Main />
            </Layout>
          }
        />
        <Route path="about" element={<div>about</div>} />
        <Route path="cats/:catId" element={<div>1</div>} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
