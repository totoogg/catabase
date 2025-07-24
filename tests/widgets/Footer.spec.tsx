import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from '../../src/widgets/Footer/ui/Footer';
import { ErrorBoundary } from '../../src/shared/ui/ErrorBoundary/ErrorBoundary';
import { ErrorPageBoundary } from '../../src/pages/ErrorPageBoundary/ui/ErrorPageBoundary';
import userEvent from '@testing-library/user-event';

describe('Footer', () => {
  it('renders Footer', () => {
    render(<Footer />);

    expect(screen.getByText('Error')).toBeInTheDocument();
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

      await userEvent.click(screen.getByText('Error'));
    } catch (e) {
      expect(e).instanceOf(Error);
      await waitFor(() => {
        expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
      });
    }
  });
});
