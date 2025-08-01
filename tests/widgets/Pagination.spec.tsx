import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Pagination } from '../../src/widgets/Pagination/ui/Pagination';
import * as sharedModule from '../../src/shared';
import * as featuresModule from '../../src/features';
import { renderWithProviders } from '../test-utils';

vi.mock('@/features', async (importOriginal) => {
  const mod = await importOriginal<typeof featuresModule>();
  return {
    ...mod,
    ButtonPage: vi.fn(({ index }) => <button>{index}</button>),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => null);
});

describe('Pagination', () => {
  it('do not render', () => {
    vi.spyOn(sharedModule, 'useAppSelector').mockReturnValue(0);

    const { container } = renderWithProviders(<Pagination />);

    expect(container).toBeEmptyDOMElement();

    vi.spyOn(sharedModule, 'useAppSelector').mockReturnValue(1);

    renderWithProviders(<Pagination />, { container });

    expect(container).toBeEmptyDOMElement();
  });

  it('correct render', () => {
    const count = 5;
    vi.spyOn(sharedModule, 'useAppSelector').mockReturnValue(count);

    renderWithProviders(<Pagination />);

    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(count);
    expect(featuresModule.ButtonPage).toHaveBeenCalledTimes(count);

    buttons.forEach((button, index) => {
      expect(button).toHaveTextContent((index + 1).toString());
    });
  });
});
