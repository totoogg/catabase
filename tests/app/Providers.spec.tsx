import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Providers } from '../../src/app/providers/Providers';
import '@testing-library/jest-dom';

const Child = () => {
  return <div data-testid="child" />;
};

describe('Providers', () => {
  it('renders Providers', () => {
    render(
      <Providers>
        <Child />
      </Providers>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
