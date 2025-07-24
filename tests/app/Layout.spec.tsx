import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Layout } from '../../src/app/layout/Layout';

const Child = () => {
  return <div data-testid="child" />;
};

describe('Layout', () => {
  it('renders Layout', () => {
    const { container } = render(
      <Layout>
        <Child />
      </Layout>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(container.querySelector('div[class*="Layout"]')).toBeInTheDocument();
    expect(container.querySelector('div[class*="Header"]')).toBeInTheDocument();
    expect(container.querySelector('div[class*="Footer"]')).toBeInTheDocument();
  });
});
