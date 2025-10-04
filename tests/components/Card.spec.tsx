import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../../src/components/Card/Card';
import '@testing-library/jest-dom/vitest';

const mockData = {
  username: 'John',
  age: '25',
  email: 'john@example.com',
  password: 'Strong1!pass',
  confirmPassword: 'Strong1!pass',
  gender: 'Male',
  accept: 'true',
  file: 'data:image/png;base64,abc123',
  country: 'USA',
};

describe('Card', () => {
  it('render', () => {
    render(<Card data={mockData} />);

    expect(screen.getByText('Username:')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Age:')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Password:')).toBeInTheDocument();
    expect(screen.getAllByText('Strong1!pass')).toHaveLength(2);
    expect(screen.getByText('Confirm Password:')).toBeInTheDocument();
    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Accept:')).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
    expect(screen.getByText('Country:')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
  });

  it('render image', () => {
    render(<Card data={mockData} />);

    const image = screen.getByAltText('Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockData.file);
  });

  it('render fields', () => {
    render(<Card data={mockData} />);

    const values = screen.getAllByText(
      /John|25|john@example\.com|Strong1!pass|Male|true|USA/
    );
    values.forEach((value) => {
      expect(value).toHaveProperty('tagName', 'I');
    });
  });
});
