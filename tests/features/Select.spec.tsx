import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Select } from '../../src/features';
import { useAppDispatch, useAppSelector } from '../../src/shared';
import { addChoose, removeChoose, selectChoose } from '../../src/entities';
import '@testing-library/jest-dom/vitest';

vi.mock('@/shared', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../src/entities')>();
  return {
    ...mod,
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn(),
  };
});

vi.mock('@/entities', () => ({
  addChoose: vi.fn(),
  removeChoose: vi.fn(),
  selectChoose: vi.fn(),
}));

vi.mock('@/shared/assets/icons/heart.svg', () => ({
  default: () => <svg data-testid="heart-icon">Heart</svg>,
}));

const mockDispatch = vi.fn();
const mockData = {
  id: '1',
  name: 'Test Cat',
  url: 'https://example.com/cat1.jpg',
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
});

describe('Select', () => {
  it('show icon', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === selectChoose) return {};
      return undefined;
    });

    render(<Select data={mockData} />);

    expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
  });

  it('call addChoose', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === selectChoose) return {};
      return undefined;
    });

    render(<Select data={mockData} />);

    fireEvent.click(screen.getByTestId('heart-icon'));

    expect(mockDispatch).toHaveBeenCalled();
    expect(addChoose).toHaveBeenCalledWith(mockData);
    expect(removeChoose).not.toHaveBeenCalled();
  });

  it('call removeChoose', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === selectChoose) return { [mockData.id]: mockData };
      return undefined;
    });

    render(<Select data={mockData} />);

    fireEvent.click(screen.getByTestId('heart-icon'));

    expect(mockDispatch).toHaveBeenCalled();
    expect(removeChoose).toHaveBeenCalledWith(mockData);
    expect(addChoose).not.toHaveBeenCalled();
  });
});
