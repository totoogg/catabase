import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Cat } from '../../src/pages/Cat';
import { useNavigate, useSearchParams } from 'react-router';
import '@testing-library/jest-dom/vitest';

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('@/entities', () => ({
  CardId: vi.fn(() => <div data-testid="card-id" />),
  Close: vi.fn(({ className }) => (
    <div className={className} data-testid="close" />
  )),
  ToggleTheme: vi.fn(() => <div data-testid="toggle-theme" />),
}));

const mockNavigate = vi.fn();
const mockSearchParams = new URLSearchParams('?page=2');

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  vi.mocked(useSearchParams).mockReturnValue([mockSearchParams, vi.fn()]);
});

describe('Cat', () => {
  it('render', () => {
    const { container } = render(<Cat />);

    expect(screen.getByTestId('card-id')).toBeInTheDocument();
    expect(
      container.querySelector('button[class*="close"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('button[class*="toggle"]')
    ).toBeInTheDocument();
  });

  it('click wrapper', () => {
    render(<Cat />);

    fireEvent.click(screen.getByTestId('wrapper'));

    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });

  it('click close', () => {
    const { container } = render(<Cat />);

    fireEvent.click(
      container.querySelector('button[class*="close"]') as Element
    );

    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });

  it('click component', () => {
    render(<Cat />);

    const catElement = screen.getByTestId('cat');
    fireEvent.click(catElement);

    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });

  it('click content', () => {
    render(<Cat />);

    fireEvent.click(screen.getByTestId('content'));

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('use page from parameter', () => {
    const customSearchParams = new URLSearchParams('?page=5');
    vi.mocked(useSearchParams).mockReturnValue([customSearchParams, vi.fn()]);

    render(<Cat />);

    fireEvent.click(screen.getByTestId('wrapper'));

    expect(mockNavigate).toHaveBeenCalledWith('/?page=5');
  });

  it('if parameter absent', () => {
    const customSearchParams = new URLSearchParams('');
    vi.mocked(useSearchParams).mockReturnValue([customSearchParams, vi.fn()]);

    render(<Cat />);

    fireEvent.click(screen.getByTestId('wrapper'));

    expect(mockNavigate).toHaveBeenCalledWith('/?page=1');
  });
});
