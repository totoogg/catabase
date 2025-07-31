import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router';
import { Cat } from '../../src/pages/Cat/ui/Cat';

const mockNavigate = vi.fn();

beforeEach(() => {
  vi.mock('@/features', () => ({
    Close: ({ className }: { className: string }) => (
      <button className={`${className} close`} data-testid="close-button" />
    ),
  }));
  vi.mock('@/entities', () => ({
    CardId: () => <div data-testid="card-id" />,
  }));
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

describe('Cat', () => {
  it('render Cat', () => {
    render(
      <MemoryRouter>
        <Cat />
      </MemoryRouter>
    );

    expect(screen.getByTestId('close-button')).toBeInTheDocument();
    expect(screen.getByTestId('card-id')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '' })).toHaveClass('close');
  });

  it('wrapper click', () => {
    const { container } = render(
      <MemoryRouter>
        <Cat />
      </MemoryRouter>
    );

    const wrapper = container.querySelector(
      'div[class*="wrapper"]'
    ) as HTMLElement;
    fireEvent.click(wrapper);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('close button click', () => {
    render(
      <MemoryRouter>
        <Cat />
      </MemoryRouter>
    );

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
