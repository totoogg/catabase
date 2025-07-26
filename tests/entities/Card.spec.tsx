import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from '../../src/entities/Card/ui/Card';
import '@testing-library/jest-dom';

describe('Card', () => {
  it('renders Card', () => {
    const data = {
      name: 'Fluffy',
      breed: 'Persian',
      age: 3,
      weight: '4.5 kg',
      dailyFood: '250 g',
      lastVetVisit: '2023-05-15',
      imageUrl: 'test.jpg',
      characteristics: {},
      owner: {},
      id: '1',
    };

    render(<Card card={data} />);

    expect(screen.getByText('Fluffy')).toBeInTheDocument();
    expect(screen.getByText('Persian')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4.5 kg')).toBeInTheDocument();
    expect(screen.getByText('250 g')).toBeInTheDocument();
    expect(screen.getByText('2023-05-15')).toBeInTheDocument();
  });
});
