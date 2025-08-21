import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '../../src/widgets/Header/ui/Header';
import { LOCAL_SEARCH } from '../../src/shared/consts/localStorage';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../test-utils';

describe('Header', () => {
  it('renders Header', () => {
    renderWithProviders(<Header />);

    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('get data from localStorage', () => {
    localStorage.setItem(LOCAL_SEARCH, 'initial value');
    renderWithProviders(<Header />);

    expect(screen.getByDisplayValue('initial value')).toBeInTheDocument();
  });

  it('search by name', async () => {
    const spyOnFetch = vi.spyOn(window, 'dispatchEvent');
    renderWithProviders(<Header />);

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Search');

    await userEvent.clear(input);
    await userEvent.type(input, 'cat');
    await userEvent.click(button);

    expect(input).toHaveValue('cat');
    expect(spyOnFetch).toHaveBeenCalled();
  });
});
