import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../../../src/shared/ui/button/Button';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('renders the button with the correct text', () => {
    render(<Button onClick={() => {}}>Click Me</Button>);

    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', async () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick} />);

    await userEvent.click(screen.getByText('Button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
