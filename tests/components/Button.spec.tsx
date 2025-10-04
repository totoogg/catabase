import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../src/components/Button/Button';
import '@testing-library/jest-dom/vitest';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Button', () => {
  it('render', () => {
    render(<Button />);

    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('renders button', () => {
    render(<Button>Click Me</Button>);

    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('renders button with class', () => {
    render(<Button className="custom-class">Custom Button</Button>);

    expect(screen.getByText('Custom Button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('calls onClick', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click Me</Button>);

    fireEvent.click(screen.getByText('Click Me'));

    expect(onClick).toHaveBeenCalled();
  });
});
