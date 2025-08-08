import { Button, CardTypes } from '@/shared';
import { FC, useCallback } from 'react';

interface IProps {
  data: CardTypes[];
}

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

export const Download: FC<IProps> = ({ data }) => {
  const download = useCallback((selectedItems: CardTypes[]) => {
    const csvContent = [
      CSV_HEADERS,
      ...selectedItems.map((item) =>
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

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const fileName =
      selectedItems.length === 1
        ? `${selectedItems.length}_item.csv`
        : `${selectedItems.length}_items.csv`;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return (
    <Button variant="filled" colorBtn="success" onClick={() => download(data)}>
      Download
    </Button>
  );
};
