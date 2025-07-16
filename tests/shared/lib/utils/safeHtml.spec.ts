import { escapeHtml } from '../../../../src/shared/lib/utils/safeHtml';

describe('escapeHtml', () => {
  it('escape HTML characters', () => {
    const input = '<script>alert("XSS")</script>';
    const expectedOutput =
      '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;';

    expect(escapeHtml(input)).toBe(expectedOutput);
  });

  it('not escape HTML characters', () => {
    const input = '123';
    const expectedOutput = '123';

    expect(escapeHtml(input)).toBe(expectedOutput);
  });
});
