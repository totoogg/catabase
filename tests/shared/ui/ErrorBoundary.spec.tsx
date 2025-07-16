import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorBoundary } from '../../../src/shared/ui/ErrorBoundary/ErrorBoundary';

const Child = () => {
  throw new Error();
};

describe('Error Boundary', () => {
  it(`show feedback when child makes a error`, () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);
    vi.spyOn(console, 'log').mockImplementation(() => null);

    const { getByText } = render(
      <ErrorBoundary errorPage={<>Something went wrong!</>}>
        <Child />
      </ErrorBoundary>
    );

    const errorMessage = getByText('Something went wrong!');

    expect(errorMessage).toBeDefined();
  });
});
