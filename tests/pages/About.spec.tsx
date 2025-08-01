import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import { About } from '../../src/pages/About/ui/About';
import '@testing-library/jest-dom/vitest';

describe('About', () => {
  it('renders About', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText('About the author')).toBeInTheDocument();
    expect(screen.getByText('RS School React')).toBeInTheDocument();
    expect(screen.getByText('Return to home page')).toBeInTheDocument();
  });

  it('link to home page', () => {
    const { container } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const link = container.querySelector('a[class*="link"]');

    expect(link).toHaveAttribute('href', '/');
  });

  it('button text', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const button = screen.getByText('Return to home page');

    expect(button).toHaveTextContent('Return to home page');
  });
});
