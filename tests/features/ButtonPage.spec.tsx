import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import { ButtonPage } from '../../src/features/ButtonPage/ui/ButtonPage';
import '@testing-library/jest-dom';

const mockSetParams = vi.fn();

beforeEach(() => {
  vi.mock('react-router', async () => {
    const mod =
      await vi.importActual<typeof import('react-router')>('react-router');
    return {
      ...mod,
      useSearchParams: vi.fn().mockImplementation(() => {
        const params = new URLSearchParams('page=1');
        return [params, mockSetParams];
      }),
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
  mockSetParams.mockClear();
});

describe('ButtonPage', () => {
  it('render ButtonPage', () => {
    render(
      <MemoryRouter>
        <ButtonPage index={5} />
      </MemoryRouter>
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('updates search params', () => {
    render(
      <MemoryRouter>
        <ButtonPage index={3} />
      </MemoryRouter>
    );

    const button = screen.getByText('3');

    fireEvent.click(button);

    expect(mockSetParams).toHaveBeenCalledTimes(1);

    const updater = mockSetParams.mock.calls[0][0];
    const prevParams = new URLSearchParams('page=1');
    const newParams = updater(prevParams);

    expect(newParams.get('page')).toBe('3');
  });
});
