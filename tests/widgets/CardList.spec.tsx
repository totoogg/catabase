import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CardList } from '../../src/widgets/CardList/ui/CardList';
import * as api from '../../src/shared/api/api';
import { LOCAL_SEARCH } from '../../src/shared/consts/localStorage';
import { act } from 'react';

interface LocalStorageChangedEvent extends Event {
  newValue: string;
}

const mockCards = [
  { id: '1', title: 'Card 1', description: 'Desc 1' },
  { id: '2', title: 'Card 2', description: 'Desc 2' },
];

describe('CardList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('loading data before show', async () => {
    vi.spyOn(api, 'getCards').mockResolvedValue({
      status: 200,
      res: mockCards,
    });

    localStorage.setItem(LOCAL_SEARCH, 'initial');

    const { container } = render(<CardList />);

    expect(
      container.querySelector('div[class*="skeleton"]')
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(container.querySelectorAll('div[class*="card"]')).toHaveLength(4);
    });
  });

  it('update data', async () => {
    const getCards = vi
      .spyOn(api, 'getCards')
      .mockResolvedValueOnce({ status: 200, res: [] })
      .mockResolvedValueOnce({ status: 200, res: mockCards });

    const { container } = render(<CardList />);

    await waitFor(() => {
      expect(
        screen.getByText('No cat with the name "" found')
      ).toBeInTheDocument();
    });

    localStorage.setItem(LOCAL_SEARCH, 'new search');

    act(() => {
      const event = new Event(
        'localStorageChanged'
      ) as LocalStorageChangedEvent;
      event.newValue = 'new search';
      window.dispatchEvent(event);
    });

    expect(getCards).toHaveBeenCalledWith({ search: 'new search' });

    expect(
      container.querySelector('div[class*="skeleton"]')
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(container.querySelectorAll('div[class*="card"]')).toHaveLength(4);
    });
  });

  it('show loader', () => {
    vi.spyOn(api, 'getCards').mockImplementation(() => new Promise(() => {}));

    const { container } = render(<CardList />);

    expect(
      container.querySelector('div[class*="skeleton"]')
    ).toBeInTheDocument();
  });

  it('show error', async () => {
    vi.spyOn(api, 'getCards').mockResolvedValue({
      status: 500,
      res: 'Server error',
    });

    render(<CardList />);

    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });
  });

  it('show empty', async () => {
    vi.spyOn(api, 'getCards').mockResolvedValue({
      status: 200,
      res: [],
    });

    localStorage.setItem(LOCAL_SEARCH, 'empty');

    render(<CardList />);

    await waitFor(() => {
      expect(
        screen.getByText('No cat with the name "empty" found')
      ).toBeInTheDocument();
    });
  });

  it('show results', async () => {
    vi.spyOn(api, 'getCards').mockResolvedValue({
      status: 200,
      res: mockCards,
    });

    const { container } = render(<CardList />);

    await waitFor(() => {
      expect(container.querySelectorAll('div[class*="card"]')).toHaveLength(4);
    });
  });
});
