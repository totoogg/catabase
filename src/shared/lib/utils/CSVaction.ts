'use server';

import { CardTypes } from '../../types/cardApiTypes';

const CSV_HEADERS = [
  'Name',
  'Breed',
  'Age',
  'Weight',
  'Daily Food',
  'Last Visit',
  'Adoption Date',
  'Medical Records',
].join(',');

export async function CSVaction(data: CardTypes[]) {
  const csvContent = [
    CSV_HEADERS,
    ...data.map((item) =>
      [
        item.name,
        item.breed,
        item.age,
        item.weight,
        item.dailyFood,
        item.lastVetVisit,
        item.adoptionDate,
        item.medicalRecords.join(', '),
      ].join(',')
    ),
  ].join('\n');

  const fileName =
    data.length === 1 ? `${data.length}_item.csv` : `${data.length}_items.csv`;

  return { csvContent, fileName };
}
