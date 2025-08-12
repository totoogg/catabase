import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Providers } from '../../src/_app/providers/Providers';
import { Main } from '../../src/_pages/Main/ui/Main';
import '@testing-library/jest-dom';

beforeEach(() => {
  vi.mock('react-router', async () => {
    const mod =
      await vi.importActual<typeof import('react-router')>('react-router');
    return {
      ...mod,
      useSearchParams: () => [new Map([['page', '1']])],
    };
  });
});

describe('Providers', () => {
  it('renders Providers', () => {
    const { container } = render(
      <Providers>
        <Main />
      </Providers>
    );

    expect(container.querySelectorAll('div[class*="skeleton"]')).toHaveLength(
      90
    );
    expect(
      container.querySelectorAll('div[class*="skeletonContent"]')
    ).toHaveLength(10);
    expect(container.querySelector('div[class*="Main"]')).toBeInTheDocument();
    expect(
      container.querySelector('div[class*="wrapper"]')
    ).toBeInTheDocument();
  });
});
