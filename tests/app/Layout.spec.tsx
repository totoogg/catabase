import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Layout } from '../../src/_app/layout/Layout';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { renderWithProviders } from '../test-utils';

const Child = () => {
  return <div data-testid="child" />;
};

beforeEach(() => {
  vi.mock('react-router-dom', async () => {
    const mod =
      await vi.importActual<typeof import('react-router')>('react-router');
    return {
      ...mod,
      useParams: () => ({
        catId: 1,
      }),
    };
  });
});

describe('Layout', () => {
  it('renders Layout', () => {
    const { container } = renderWithProviders(
      <MemoryRouter>
        <Layout>
          <Child />
        </Layout>
      </MemoryRouter>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(container.querySelector('div[class*="Layout"]')).toBeInTheDocument();
    expect(container.querySelector('div[class*="Header"]')).toBeInTheDocument();
    expect(container.querySelector('div[class*="Footer"]')).toBeInTheDocument();
  });
});
