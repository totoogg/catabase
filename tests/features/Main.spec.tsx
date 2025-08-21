import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { Main } from '../../src/features/Main/Main';
import { Card } from '../../src/components/Card/Card';
import type { Mock } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';

vi.mock('@/components/Card/Card', () => ({
  Card: vi.fn(({ data, last }) => (
    <div data-testid="card">
      {data.username} - {last ? 'Last' : 'Not Last'}
    </div>
  )) as Mock,
}));

const mockData = [
  {
    username: 'John',
    age: '25',
    email: 'john@example.com',
    password: 'Strong1!pass',
    confirmPassword: 'Strong1!pass',
    gender: 'Male',
    accept: 'true',
    file: 'data:image/png;base64,abc123',
    country: 'USA',
  },
  {
    username: 'Jane',
    age: '30',
    email: 'jane@example.com',
    password: 'Strong2!pass',
    confirmPassword: 'Strong2!pass',
    gender: 'Female',
    accept: 'true',
    file: 'data:image/png;base64,xyz789',
    country: 'Canada',
  },
];

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Main', () => {
  it('render empty', () => {
    renderWithProviders(<Main />, {
      preloadedState: {
        data: {
          countries: ['USA', 'Canada', 'Brazil'],
          data: [],
        },
      },
    });

    expect(
      screen.getByText(
        'Empty. Please fill out and submit an Uncontrolled Form or Controlled Form.'
      )
    ).toBeInTheDocument();
    expect(Card).not.toHaveBeenCalled();
  });

  it('render cards', () => {
    renderWithProviders(<Main />, {
      preloadedState: {
        data: {
          countries: ['USA', 'Canada', 'Brazil'],
          data: mockData,
        },
      },
    });

    expect(
      screen.queryByText(
        'Empty. Please fill out and submit an Uncontrolled Form or Controlled Form.'
      )
    ).not.toBeInTheDocument();
    expect(screen.getAllByTestId('card')).toHaveLength(2);
    expect(screen.getByText('John - Not Last')).toBeInTheDocument();
    expect(screen.getByText('Jane - Last')).toBeInTheDocument();
    expect(Card).toHaveBeenCalledTimes(2);
  });
});
