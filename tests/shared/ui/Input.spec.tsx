import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '../../../src/shared/ui/input/Input';
import userEvent from '@testing-library/user-event';

describe('Input', () => {
  it('renders input', () => {
    render(<Input placeholder="input" />);

    expect(screen.getByPlaceholderText('input')).toBeInTheDocument();
  });

  it('typing text in input', async () => {
    const handleTyping = vi.fn();

    render(<Input placeholder="input" onChange={handleTyping} />);

    const input = screen.getByPlaceholderText('input');

    await userEvent.type(input, 'cat');

    expect(handleTyping).toHaveBeenCalledTimes(3);
    expect(input).toHaveValue('cat');
  });
});
