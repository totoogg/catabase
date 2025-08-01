import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CardList } from '../../src/widgets/CardList/ui/CardList';
import { LOCAL_SEARCH } from '../../src/shared/consts/localStorage';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../test-utils';

beforeEach(() => {
  vi.mock('react-router', async () => {
    const mod =
      await vi.importActual<typeof import('react-router')>('react-router');
    return {
      ...mod,
      useSearchParams: () => [new Map([['page', '1']]), vi.fn()],
    };
  });
  vi.spyOn(console, 'error').mockImplementation(() => null);
});

afterEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe('CardList', () => {
  it('show loader', () => {
    const { container } = renderWithProviders(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );

    expect(
      container.querySelector('div[class*="skeleton"]')
    ).toBeInTheDocument();
  });

  it('show empty', async () => {
    localStorage.setItem(LOCAL_SEARCH, 'empty');

    renderWithProviders(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText('No cat with the name "empty" found')
      ).toBeInTheDocument();
    });
  });

  it('show results', async () => {
    const { container } = renderWithProviders(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(container.querySelectorAll('div[class*="card"]')).toHaveLength(0);
    });
  });
});
