import { getCards } from '../../../src/shared/api/api';
import { describe, it, expect, vi } from 'vitest';

describe('getCards', () => {
  it('get data', async () => {
    global.fetch = vi.fn().mockImplementation(() => ({
      status: 200,
      headers: new Map([['X-Total-Count', 10]]),
      json: () => Promise.resolve({ cards: [] }),
    }));

    const cards = await getCards({ search: 'test', page: 1, limit: 10 });

    expect(cards.res.cards).toEqual([]);
    expect(cards.status).toEqual(200);
  });

  it('get bad request', async () => {
    global.fetch = vi.fn().mockImplementation(() => ({
      status: 404,
    }));

    const cards = await getCards({ search: 'test', page: 1, limit: 10 });

    expect(cards).toEqual({ res: 'Invalid request', status: 404 });
  });

  it('get server error', async () => {
    global.fetch = vi.fn().mockImplementation(() => ({
      status: 500,
    }));

    const cards = await getCards({ search: 'test', page: 1, limit: 10 });

    expect(cards).toEqual({ res: 'Server error', status: 500 });
  });

  it('get error', async () => {
    global.fetch = vi.fn().mockRejectedValue('error');

    const cards = await getCards({ search: 'test', page: 1, limit: 10 });

    expect(cards).toEqual({
      status: -1,
      res: 'Network error. Could not send request',
    });
  });
});
