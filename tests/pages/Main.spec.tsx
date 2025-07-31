import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Main } from '../../src/pages/Main/ui/Main';
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

describe('Main', () => {
  it('renders Main', () => {
    const { container } = render(<Main />);

    expect(container.querySelector('div[class*="Main"]')).toBeInTheDocument();
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
