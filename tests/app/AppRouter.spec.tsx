import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AppRouter } from '../../src/app/routers/AppRouter';
import { createMemoryRouter, RouterProvider } from 'react-router';
import '@testing-library/jest-dom';

describe('AppRouter', () => {
  it('shows error page', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '*',
          element: <AppRouter />,
          errorElement: <div>Error Page</div>,
        },
      ],
      { initialEntries: ['/unknown-route'] }
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText('Error Page')).toBeInTheDocument();
    });
  });
});
