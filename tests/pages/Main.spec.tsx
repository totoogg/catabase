import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Main } from '../../src/pages/Main/ui/Main';

describe('Main', () => {
  it('renders Main', () => {
    const { container } = render(<Main />);

    expect(container.querySelector('div[class*="Main"]')).toBeInTheDocument();
  });
});
