import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import { CardId } from '../../src/entities/CardId/ui/CardId';
import * as api from '../../src/shared/api/api';
import '@testing-library/jest-dom';

beforeEach(() => {
  vi.mock('react-router', async () => {
    const mod =
      await vi.importActual<typeof import('react-router')>('react-router');
    return {
      ...mod,
      useParams: () => ({
        catId: '1',
      }),
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('CardId', () => {
  it('shows skeleton', () => {
    vi.spyOn(api, 'getCardById').mockResolvedValue({
      response: {} as Response,
      status: 200,
      res: [],
    });

    const { container } = render(
      <MemoryRouter>
        <CardId />
      </MemoryRouter>
    );

    const skeletons = container.querySelectorAll('div[class*="skeleton"]');

    expect(skeletons).toHaveLength(13);
  });

  it('shows error', async () => {
    vi.spyOn(api, 'getCardById').mockResolvedValue({
      response: {} as Response,
      res: 'Server error',
      status: 500,
    });

    render(
      <MemoryRouter>
        <CardId />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Server error')).toBeInTheDocument();
    });
  });

  it('renders null', async () => {
    vi.spyOn(api, 'getCardById').mockResolvedValue({
      response: {} as Response,
      res: null,
      status: 404,
    });

    const { container } = render(
      <MemoryRouter>
        <CardId />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });

  it('data error', async () => {
    vi.spyOn(api, 'getCardById').mockResolvedValue({
      response: {} as Response,
      res: 'Invalid ID',
      status: 400,
    });

    render(
      <MemoryRouter>
        <CardId />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Invalid ID')).toBeInTheDocument();
    });
  });
});
