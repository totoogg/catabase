import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Close } from '../../src/features/Close/ui/Close';
import '@testing-library/jest-dom/vitest';

describe('Close', () => {
  it('render Close', () => {
    const { container } = render(<Close />);

    const button = container.querySelector('button');

    expect(button).not.toHaveClass('undefined');

    const lines = container.querySelectorAll('span[class*="line"]');

    expect(lines).toHaveLength(2);
  });

  it('render line', () => {
    const { container } = render(<Close />);

    const lines = container.querySelectorAll('span[class*="line"]');

    expect(lines).toHaveLength(2);
  });
});
