import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AppRouter } from '../../src/app/routers/AppRouter';
import { createMemoryRouter, RouterProvider } from 'react-router';
import '@testing-library/jest-dom';

describe('AppRouter', () => {
  it('shows error page', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);
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
