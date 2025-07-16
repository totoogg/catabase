import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ErrorBoundary } from '../../src/shared/ui/errorBoundary/errorBoundary';

const Child = () => {
  throw new Error();
};

describe('Error Boundary', () => {
  it(`show feedback when child makes a error`, () => {
    const { getByText } = render(
      <ErrorBoundary errorPage={<>Something went wrong!</>}>
        <Child />
      </ErrorBoundary>
    );

    const errorMessage = getByText('Something went wrong!');

    expect(errorMessage).toBeDefined();
  });
});
