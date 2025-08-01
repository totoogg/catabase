import { ErrorPage } from '../../src/pages/ErrorPage/ui/ErrorPage';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom/vitest';

const mockNavigate = vi.fn();

beforeEach(() => {
  vi.mock('react-router', async () => {
    const mod =
      await vi.importActual<typeof import('react-router')>('react-router');
    return {
      ...mod,
      useNavigate: () => mockNavigate,
    };
  });
});

afterEach(() => {
  mockNavigate.mockReset();
});

describe('ErrorPage', () => {
  it('renders ErrorPage', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(screen.getByText('404 NotFound')).toBeInTheDocument();
    expect(
      screen.getByText('Sorry, an unexpected error has occurred.')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Home page' })
    ).toBeInTheDocument();
  });

  it('navigates to home page', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    const homeButton = screen.getByRole('button', { name: 'Home page' });
    fireEvent.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/?page=1');
  });
});
