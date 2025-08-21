import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { UncontrolledForm } from '../../src/features/UncontrolledForm/UncontrolledForm';
import '@testing-library/jest-dom/vitest';
import { renderWithProviders } from '../test-utils';
import { act } from 'react';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

const mockClose = vi.fn();

describe('UncontrolledForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form elements correctly', () => {
    renderWithProviders(<UncontrolledForm close={mockClose} />, {
      preloadedState: {
        data: {
          countries: ['USA', 'Canada', 'Brazil'],
          data: [],
        },
      },
    });

    expect(screen.getByText('Uncontrolled Form')).toBeInTheDocument();
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

  it('displays validation errors when submitting empty form', async () => {
    renderWithProviders(<UncontrolledForm close={mockClose} />, {
      preloadedState: {
        data: {
          countries: ['USA', 'Canada', 'Brazil'],
          data: [],
        },
      },
    });

    fireEvent.click(screen.getByText('Submit'));

    await whenStable();

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Age is required')).toBeInTheDocument();
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
    expect(await screen.findByText('Confirm password')).toBeInTheDocument();
    expect(await screen.findByText('Gender is required')).toBeInTheDocument();
    expect(
      await screen.findByText('You must accept Terms and Conditions agreement')
    ).toBeInTheDocument();
    expect(await screen.findByText('File is required')).toBeInTheDocument();
    expect(await screen.findByText('Country is required')).toBeInTheDocument();
  });

  it('validates name field correctly', async () => {
    renderWithProviders(<UncontrolledForm close={mockClose} />, {
      preloadedState: {
        data: {
          countries: ['USA', 'Canada', 'Brazil'],
          data: [],
        },
      },
    });

    const nameInput = screen.getByPlaceholderText('Name');
    fireEvent.change(nameInput, { target: { value: 'john' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(
      await screen.findByText('The first letter must be capitalized')
    ).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.click(screen.getByText('Submit'));

    await whenStable();

    expect(
      screen.queryByText('The first letter must be capitalized')
    ).not.toBeInTheDocument();
  });

  it('validates email format', async () => {
    renderWithProviders(<UncontrolledForm close={mockClose} />, {
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

  it('validates password requirements', async () => {
    renderWithProviders(<UncontrolledForm close={mockClose} />, {
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

  it('validates file input', async () => {
    renderWithProviders(<UncontrolledForm close={mockClose} />, {
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
});
