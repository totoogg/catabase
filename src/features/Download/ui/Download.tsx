import { Button, CardTypes } from '@/shared';
import { FC } from 'react';
import { saveAs } from 'file-saver';

interface IProps {
  data: CardTypes[];
}

export const Download: FC<IProps> = ({ data }) => {
  const downloadSelectedItems = (selectedItems: CardTypes[]) => {
    const csvContent = [
      [
        'Name',
        'Breed',
        'Age',
        'Weight',
        'Daily Food',
        'Last Visit',
        'Adoption Date',
        'Medical Records',
      ].join(','),
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

    saveAs(blob, fileName);
  };

  return (
    <Button
      variant="filled"
      colorBtn="success"
      onClick={() => downloadSelectedItems(data)}
    >
      Download
    </Button>
  );
};
