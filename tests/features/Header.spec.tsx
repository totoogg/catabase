import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { Header } from '../../src/features/Header/Header';
import { ControlledForm } from '../../src/features/ControlledForm/ControlledForm';
import { UncontrolledForm } from '../../src/features/UncontrolledForm/UncontrolledForm';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';
import { act } from 'react';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

vi.mock('../../src/features/ControlledForm/ControlledForm', () => ({
  ControlledForm: vi.fn(() => (
    <div data-testid="controlled-form">Controlled Form Mock</div>
  )),
}));

vi.mock('../../src/features/UncontrolledForm/UncontrolledForm', () => ({
  UncontrolledForm: vi.fn(() => (
    <div data-testid="uncontrolled-form">Uncontrolled Form Mock</div>
  )),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Header', () => {
  it('renders header', () => {
    renderWithProviders(<Header />, {
      preloadedState: {
        data: {
          countries: ['USA', 'Canada', 'Brazil'],
          data: [],
        },
      },
    });

    expect(screen.getByText('Uncontrolled Form')).toBeInTheDocument();
    expect(screen.getByText('Controlled Form')).toBeInTheDocument();
  });

  it('opens uncontrolled form', () => {
    renderWithProviders(<Header />, {
      preloadedState: {
        data: {
          countries: ['USA', 'Canada', 'Brazil'],
          data: [],
        },
      },
    });

    fireEvent.click(screen.getByText('Uncontrolled Form'));

    expect(screen.getByTestId('uncontrolled-form')).toBeInTheDocument();
    expect(ControlledForm).not.toHaveBeenCalled();
  });

  it('opens controlled form', async () => {
    renderWithProviders(<Header />, {
      preloadedState: {
        data: {
          countries: ['USA', 'Canada', 'Brazil'],
          data: [],
        },
      },
    });

    fireEvent.click(screen.getByText('Controlled Form'));

    await whenStable();

    expect(screen.getByTestId('controlled-form')).toBeInTheDocument();
    expect(UncontrolledForm).not.toHaveBeenCalled();
  });

  it('closes modal', async () => {
    renderWithProviders(<Header />, {
      preloadedState: {
        data: {
          countries: ['USA', 'Canada', 'Brazil'],
          data: [],
        },
      },
    });

    fireEvent.click(screen.getByText('Uncontrolled Form'));
    expect(screen.getByTestId('uncontrolled-form')).toBeInTheDocument();

    await act(async () => {
      const closeFn = (UncontrolledForm as Mock).mock.calls[0][0].close;
      closeFn();
    });

    await whenStable();

    expect(screen.queryByTestId('uncontrolled-form')).not.toBeInTheDocument();
  });

  it('does not show modal', () => {
    renderWithProviders(<Header />, {
      preloadedState: {
        data: {
          countries: ['USA', 'Canada', 'Brazil'],
          data: [],
        },
      },
    });

    expect(screen.queryByTestId('controlled-form')).not.toBeInTheDocument();
    expect(screen.queryByTestId('uncontrolled-form')).not.toBeInTheDocument();
    expect(ControlledForm).not.toHaveBeenCalled();
    expect(UncontrolledForm).not.toHaveBeenCalled();
  });

  it('toggles between modals', async () => {
    renderWithProviders(<Header />, {
      preloadedState: {
        data: {
          countries: ['USA', 'Canada', 'Brazil'],
          data: [],
        },
      },
    });

    fireEvent.click(screen.getByText('Controlled Form'));
    expect(screen.getByTestId('controlled-form')).toBeInTheDocument();
    expect(screen.queryByTestId('uncontrolled-form')).not.toBeInTheDocument();

    await act(async () => {
      const closeControlled = (ControlledForm as Mock).mock.calls[0][0].close;
      closeControlled();
    });

    await whenStable();

    expect(screen.queryByTestId('controlled-form')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Uncontrolled Form'));
    expect(screen.getByTestId('uncontrolled-form')).toBeInTheDocument();
    expect(screen.queryByTestId('controlled-form')).not.toBeInTheDocument();
  });
});
