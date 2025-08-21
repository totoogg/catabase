import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { ControlledForm } from '../../src/features/ControlledForm/ControlledForm';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';
import { act } from 'react';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

beforeEach(() => {
  vi.clearAllMocks();
});

const mockClose = vi.fn();

describe('ControlledForm', () => {
  it('renders form', () => {
    renderWithProviders(<ControlledForm close={mockClose} />, {
      preloadedState: {
        data: {
          countries: ['USA', 'Canada', 'Brazil'],
          data: [],
        },
      },
    });

    expect(screen.getByText('Controlled Form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Age')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Female')).toBeInTheDocument();
    expect(
      screen.getByLabelText('I accept Terms and Conditions agreement*')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('File*')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Country')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('validates username', async () => {
    renderWithProviders(<ControlledForm close={mockClose} />, {
      preloadedState: {
        data: {
          countries: ['USA', 'Canada', 'Brazil'],
          data: [],
        },
      },
    });

    const nameInput = screen.getByPlaceholderText('Name');

    fireEvent.change(nameInput, { target: { value: 'John' } });

    await whenStable();

    expect(
      screen.queryByText('The first letter must be capitalized')
    ).not.toBeInTheDocument();
  });

  it('validates email', async () => {
    renderWithProviders(<ControlledForm close={mockClose} />, {
      preloadedState: {
        data: {
          countries: ['USA', 'Canada', 'Brazil'],
          data: [],
        },
      },
    });

    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText('Invalid email format')).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Submit'));

    await whenStable();

    expect(screen.queryByText('Invalid email format')).not.toBeInTheDocument();
  });

  it('validates password', async () => {
    renderWithProviders(<ControlledForm close={mockClose} />, {
      preloadedState: {
        data: {
          countries: ['USA', 'Canada', 'Brazil'],
          data: [],
        },
      },
    });

    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(
      await screen.findByText(
        'Password must have 1 number, 1 uppercased letter, 1 lowercased letter and 1 special character'
      )
    ).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'Strong1!pass' } });
    fireEvent.click(screen.getByText('Submit'));

    await whenStable();

    expect(
      screen.queryByText(
        'Password must have 1 number, 1 uppercased letter, 1 lowercased letter and 1 special character'
      )
    ).not.toBeInTheDocument();
  });

  it('validates file', async () => {
    renderWithProviders(<ControlledForm close={mockClose} />, {
      preloadedState: {
        data: {
          countries: ['USA', 'Canada', 'Brazil'],
          data: [],
        },
      },
    });

    const fileInput = screen.getByLabelText('File*');
    const invalidFile = new File(['content'], 'test.txt', {
      type: 'text/plain',
    });
    fireEvent.change(fileInput, { target: { files: [invalidFile] } });
    fireEvent.click(screen.getByText('Submit'));

    expect(
      await screen.findByText('Unsupported format (png | jpeg)')
    ).toBeInTheDocument();

    const validFile = new File(['content'], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [validFile] } });
    fireEvent.click(screen.getByText('Submit'));

    await whenStable();

    expect(
      screen.queryByText('Unsupported format (png | jpeg)')
    ).not.toBeInTheDocument();
  });

  it('disables submit', async () => {
    renderWithProviders(<ControlledForm close={mockClose} />, {
      preloadedState: {
        data: {
          countries: ['USA', 'Canada', 'Brazil'],
          data: [],
        },
      },
    });

    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeDisabled();
  });
});
