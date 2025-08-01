import { transformError } from '../../../../src/shared/lib/utils/transformError';
import { describe, it, expect } from 'vitest';

describe('transformError', () => {
  it('transformError for 404', () => {
    const expectedOutput = 'Invalid request';

    expect(transformError(404)).toBe(expectedOutput);
  });

  it('transformError for 500', () => {
    const expectedOutput = 'Server error';

    expect(transformError(500)).toBe(expectedOutput);
  });

  it('transformError for -1', () => {
    const expectedOutput = 'Network error. Could not send request';

    expect(transformError(-1)).toBe(expectedOutput);
  });
});
