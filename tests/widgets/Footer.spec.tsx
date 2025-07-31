import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from '../../src/widgets/Footer/ui/Footer';
import { ErrorBoundary } from '../../src/shared/ui/ErrorBoundary/ErrorBoundary';
import { ErrorPageBoundary } from '../../src/pages/ErrorPageBoundary/ui/ErrorPageBoundary';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';

describe('Footer', () => {
  it('renders Footer', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('click on button', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);
    vi.spyOn(console, 'log').mockImplementation(() => null);
    try {
      render(
        <ErrorBoundary errorPage={<ErrorPageBoundary />}>
          <Footer />
        </ErrorBoundary>
      );

      await userEvent.click(screen.getByText('About'));
    } catch (e) {
      expect(e).instanceOf(Error);
      await waitFor(() => {
        expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
      });
    }
  });
});
