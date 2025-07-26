import { render, screen, act, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Pagination } from '../../src/widgets/Pagination/ui/Pagination';
import '@testing-library/jest-dom';

interface TotalPagesEvent extends Event {
  pages: number;
}

vi.mock('@/features', () => ({
  ButtonPage: ({ index }: { index: number }) => (
    <button data-testid={`page-button-${index}`}>{index}</button>
  ),
}));

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

afterEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => null);

  window.dispatchEvent(new Event('totalPages'));
});

describe('Pagination', () => {
  it('does not render', () => {
    const { container } = render(<Pagination />);

    expect(container.firstChild).toBeNull();
  });

  it('renders 3 pages', async () => {
    render(<Pagination />);

    act(() => {
      const event = new Event('totalPages') as TotalPagesEvent;
      event.pages = 3;
      window.dispatchEvent(event);
    });

    await waitFor(() => {
      expect(screen.getByTestId('page-button-1')).toBeInTheDocument();
      expect(screen.getByTestId('page-button-2')).toBeInTheDocument();
      expect(screen.getByTestId('page-button-3')).toBeInTheDocument();
    });
    expect(screen.queryByTestId('page-button-4')).not.toBeInTheDocument();
  });

  it('updates page count when new search', async () => {
    render(<Pagination />);

    act(() => {
      const event = new Event('totalPages') as TotalPagesEvent;
      event.pages = 2;
      window.dispatchEvent(event);
    });

    expect(screen.getByTestId('page-button-1')).toBeInTheDocument();
    expect(screen.getByTestId('page-button-2')).toBeInTheDocument();

    act(() => {
      const event = new Event('totalPages') as TotalPagesEvent;
      event.pages = 4;
      window.dispatchEvent(event);
    });

    await waitFor(() => {
      expect(screen.getByTestId('page-button-1')).toBeInTheDocument();
      expect(screen.getByTestId('page-button-2')).toBeInTheDocument();
      expect(screen.getByTestId('page-button-3')).toBeInTheDocument();
      expect(screen.getByTestId('page-button-4')).toBeInTheDocument();
    });
  });
});
