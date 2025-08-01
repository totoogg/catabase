import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Download } from '../../src/features';
import { saveAs } from 'file-saver';
import { renderWithProviders } from '../test-utils';
import '@testing-library/jest-dom/vitest';

vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}));

vi.mock('@/shared', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../src/shared')>();
  return {
    ...mod,
  };
});

const mockData = [
  {
    id: '1',
    name: 'Whiskers',
    breed: 'Siamese',
    age: 3,
    weight: 4.5,
    dailyFood: 200,
    lastVetVisit: '2023-05-15',
    adoptionDate: '2021-02-10',
    medicalRecords: ['Vaccinated', 'Neutered'],
  },
  {
    id: '2',
    name: 'Fluffy',
    breed: 'Persian',
    age: 5,
    weight: 5.2,
    dailyFood: 180,
    lastVetVisit: '2023-06-20',
    adoptionDate: '2020-11-03',
    medicalRecords: ['Vaccinated', 'Dental check'],
  },
];

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Download', () => {
  it('show download', () => {
    renderWithProviders(<Download data={mockData} />);

    expect(screen.getByText('Download')).toBeInTheDocument();
    expect(screen.getByText('Download')).toHaveTextContent('Download');
  });

  it('call saveAs', () => {
    renderWithProviders(<Download data={mockData} />);
    fireEvent.click(screen.getByText('Download'));

    expect(saveAs).toHaveBeenCalledTimes(1);

    const [blob, filename] = vi.mocked(saveAs).mock.calls[0];

    expect(filename).toBe('2_items.csv');

    const reader = new FileReader();
    reader.onload = () => {
      expect(reader.result).toBe(
        'Name,Breed,Age,Weight,Daily Food,Last Visit,Adoption Date,Medical Records\n' +
          'Whiskers,Siamese,3,4.5,200,2023-05-15,2021-02-10,Vaccinated, Neutered\n' +
          'Fluffy,Persian,5,5.2,180,2023-06-20,2020-11-03,Vaccinated, Dental check'
      );
    };
    reader.readAsText(blob as Blob);
  });

  it('show empty field', () => {
    const dataWithEmptyFields = [
      {
        ...mockData[0],
        medicalRecords: [],
        breed: undefined,
        age: undefined,
      },
    ];

    renderWithProviders(<Download data={dataWithEmptyFields} />);
    fireEvent.click(screen.getByText('Download'));

    const [blob] = vi.mocked(saveAs).mock.calls[0];

    const reader = new FileReader();
    reader.onload = () => {
      expect(reader.result).toContain(
        'Whiskers,,,4.5,200,2023-05-15,2021-02-10,'
      );
    };
    reader.readAsText(blob as Blob);
  });

  it('correct value', () => {
    const dataWithCommas = [
      {
        ...mockData[0],
        name: 'Whiskers, Jr.',
        medicalRecords: ['Vaccinated, booster', 'Neutered, 2022'],
      },
    ];

    renderWithProviders(<Download data={dataWithCommas} />);
    fireEvent.click(screen.getByText('Download'));

    const [blob] = vi.mocked(saveAs).mock.calls[0];

    const reader = new FileReader();
    reader.onload = () => {
      expect(reader.result).toContain(
        '"Whiskers, Jr.",Siamese,3,4.5,200,2023-05-15,2021-02-10,"Vaccinated, booster, Neutered, 2022"'
      );
    };
    reader.readAsText(blob as Blob);
  });

  it('correct transform spec signals', () => {
    const dataWithSpecialChars = [
      {
        ...mockData[0],
        name: 'Whiskers "The Great"',
        medicalRecords: ['Vaccinated (2023)', 'Neutered'],
      },
    ];

    renderWithProviders(<Download data={dataWithSpecialChars} />);
    fireEvent.click(screen.getByText('Download'));

    const [blob] = vi.mocked(saveAs).mock.calls[0];

    const reader = new FileReader();
    reader.onload = () => {
      expect(reader.result).toContain(
        '"Whiskers ""The Great""",Siamese,3,4.5,200,2023-05-15,2021-02-10,"Vaccinated (2023), Neutered"'
      );
    };
    reader.readAsText(blob as Blob);
  });
});
