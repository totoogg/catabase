import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CardList } from '../../src/widgets/CardList/ui/CardList';
import * as api from '../../src/shared/api/api';
import { LOCAL_SEARCH } from '../../src/shared/consts/localStorage';
import { act } from 'react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';

interface LocalStorageChangedEvent extends Event {
  newValue: string;
}

beforeEach(() => {});

const data = {
  name: 'Fluffy',
  breed: 'Persian',
  age: 3,
  weight: '4.5 kg',
  dailyFood: '250 g',
  lastVetVisit: '2023-05-15',
  imageUrl: 'test.jpg',
  characteristics: {},
  owner: {},
  id: '1',
};

const mockCards = [
  { ...data, id: '1', name: 'Card 1', breed: 'Desc 1' },
  { ...data, id: '2', name: 'Card 2', breed: 'Desc 2' },
];

beforeEach(() => {
  vi.mock('react-router', async () => {
    const mod =
      await vi.importActual<typeof import('react-router')>('react-router');
    return {
      ...mod,
      useSearchParams: () => [new Map([['page', '1']])],
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe('CardList', () => {
  it('loading data before show', async () => {
    vi.spyOn(api, 'getCards').mockResolvedValue({
      response: {} as Response,
      status: 200,
      res: mockCards,
    });

    localStorage.setItem(LOCAL_SEARCH, 'initial');

    const { container } = render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );

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
      .mockResolvedValueOnce({ response: {} as Response, status: 200, res: [] })
      .mockResolvedValueOnce({
        response: {} as Response,
        status: 200,
        res: mockCards,
      });

    const { container } = render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Card 2')).toBeInTheDocument();
    });

    localStorage.setItem(LOCAL_SEARCH, 'new search');

    act(() => {
      const event = new Event(
        'localStorageChanged'
      ) as LocalStorageChangedEvent;
      event.newValue = 'new search';
      window.dispatchEvent(event);
    });

    expect(getCards).toHaveBeenCalledWith({
      search: 'new search',
      page: 1,
    });

    expect(
      container.querySelector('div[class*="skeleton"]')
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(container.querySelectorAll('div[class*="card"]')).toHaveLength(4);
    });
  });

  it('show loader', () => {
    vi.spyOn(api, 'getCards').mockImplementation(() => new Promise(() => {}));

    const { container } = render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );

    expect(
      container.querySelector('div[class*="skeleton"]')
    ).toBeInTheDocument();
  });

  it('show error', async () => {
    vi.spyOn(api, 'getCards').mockResolvedValue({
      status: 500,
      res: 'Server error',
    });

    render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });
  });

  it('show empty', async () => {
    vi.spyOn(api, 'getCards').mockResolvedValue({
      response: {} as Response,
      status: 200,
      res: [],
    });

    localStorage.setItem(LOCAL_SEARCH, 'empty');

    render(
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
    vi.spyOn(api, 'getCards').mockResolvedValue({
      response: {} as Response,
      status: 200,
      res: mockCards,
    });

    const { container } = render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(container.querySelectorAll('div[class*="card"]')).toHaveLength(4);
    });
  });
});
