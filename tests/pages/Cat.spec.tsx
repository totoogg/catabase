import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Cat } from '../../src/_pages/Cat';
import { useNavigate, useSearchParams } from 'react-router';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
  useSearchParams: vi.fn(),
  useParams: vi.fn(() => ({ catId: 1 })),
}));

vi.mock(import('../../src/shared'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    CardId: vi.fn(() => <div data-testid="card-id" />),
    Close: vi.fn(({ className }) => (
      <div className={className} data-testid="close" />
    )),
    ToggleTheme: vi.fn(() => <div data-testid="toggle-theme" />),
  };
});

const mockNavigate = vi.fn();
const mockSearchParams = new URLSearchParams('?page=2');

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, vi.fn()]);
});

describe('Cat', () => {
  it('render', () => {
    const { container } = renderWithProviders(<Cat />, {
      preloadedState: { choose: { choose: {} } },
    });

    expect(
      container.querySelector('button[class*="close"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('button[class*="toggle"]')
    ).toBeInTheDocument();
  });

  it('click wrapper', () => {
    renderWithProviders(<Cat />, {
      preloadedState: { choose: { choose: {} } },
    });

    fireEvent.click(screen.getByTestId('wrapper'));

    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });

  it('click close', () => {
    const { container } = renderWithProviders(<Cat />, {
      preloadedState: { choose: { choose: {} } },
    });

    fireEvent.click(
      container.querySelector('button[class*="close"]') as Element
    );

    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });

  it('click component', () => {
    renderWithProviders(<Cat />, {
      preloadedState: { choose: { choose: {} } },
    });

    const catElement = screen.getByTestId('cat');
    fireEvent.click(catElement);

    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });

  it('click content', () => {
    renderWithProviders(<Cat />, {
      preloadedState: { choose: { choose: {} } },
    });
    fireEvent.click(screen.getByTestId('content'));

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('use page from parameter', () => {
    const customSearchParams = new URLSearchParams('?page=5');
    vi.mocked(useSearchParams).mockReturnValue([customSearchParams, vi.fn()]);

    renderWithProviders(<Cat />, {
      preloadedState: { choose: { choose: {} } },
    });

    fireEvent.click(screen.getByTestId('wrapper'));

    expect(mockNavigate).toHaveBeenCalledWith('/?page=5');
  });

  it('if parameter absent', () => {
    const customSearchParams = new URLSearchParams('');
    vi.mocked(useSearchParams).mockReturnValue([customSearchParams, vi.fn()]);

    renderWithProviders(<Cat />, {
      preloadedState: { choose: { choose: {} } },
    });

    fireEvent.click(screen.getByTestId('wrapper'));

    expect(mockNavigate).toHaveBeenCalledWith('/?page=1');
  });
});
