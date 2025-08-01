import '@testing-library/jest-dom/vitest';
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { CardId } from '../../src/entities';
import {
  selectErrorDetail,
  selectIsLoader,
  useAppSelector,
} from '../../src/shared';
import { MemoryRouter, Route, Routes } from 'react-router';
import { renderWithProviders } from '../test-utils';
import '@testing-library/jest-dom';

vi.mock('@/shared', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../src/shared')>();
  return {
    ...mod,
    useAppSelector: vi.fn(),
    transformDataForCard: vi.fn((data) => [
      { name: 'Breed', value: data.breed },
      { name: 'Age', value: data.age },
    ]),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('CardId', () => {
  it('show skeleton', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === selectIsLoader) return true;
      return undefined;
    });

    const { container } = renderWithProviders(
      <MemoryRouter initialEntries={[`/cats/${1}`]}>
        <Routes>
          <Route path="/cats/:catId" element={<CardId />} />
        </Routes>
      </MemoryRouter>
    );
    expect(container.querySelector('div[class*="skeleton')).toBeInTheDocument();
  });

  it('show error', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === selectErrorDetail) return 'Test Error';
      return undefined;
    });

    renderWithProviders(
      <MemoryRouter initialEntries={[`/cats/${1}`]}>
        <Routes>
          <Route path="/cats/:catId" element={<CardId />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('empty data', async () => {
    vi.mocked(useAppSelector).mockReturnValue(false);
    const { container } = renderWithProviders(
      <MemoryRouter initialEntries={[`/cats/${2}`]}>
        <Routes>
          <Route path="/cats/:catId" element={<CardId />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  it('show parameter catID', async () => {
    vi.mocked(useAppSelector).mockReturnValue(false);
    renderWithProviders(
      <MemoryRouter initialEntries={[`/cats/${2}`]}>
        <Routes>
          <Route path="/cats/:catId" element={<CardId />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByAltText('Test Cat')).not.toBeInTheDocument();
    });
  });
});
