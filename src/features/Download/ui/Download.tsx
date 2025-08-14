'use client';

import { Button, CardTypes } from '@/shared';
import { FC, useCallback, useRef, useEffect } from 'react';

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
  const linkRef = useRef<HTMLAnchorElement>(null);
  const currentUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (currentUrlRef.current) {
        URL.revokeObjectURL(currentUrlRef.current);
      }
    };
  }, []);

  const download = useCallback((selectedItems: CardTypes[]) => {
    const csvContent = [
      CSV_HEADERS,
      ...selectedItems.map((item) =>
        [
          `"${item.name.replace(/"/g, '""')}"`,
          `"${item.breed.replace(/"/g, '""')}"`,
          item.age,
          item.weight,
          item.dailyFood,
          item.lastVetVisit,
          item.adoptionDate,
          `"${item.medicalRecords.join(', ').replace(/"/g, '""')}"`,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const fileName =
      selectedItems.length === 1
        ? `${selectedItems.length}_item.csv`
        : `${selectedItems.length}_items.csv`;

    if (currentUrlRef.current) {
      URL.revokeObjectURL(currentUrlRef.current);
    }

    const url = URL.createObjectURL(blob);
    currentUrlRef.current = url;

    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = fileName;
      linkRef.current.click();
    }
  }, []);

  return (
    <>
      <Button
        variant="filled"
        colorBtn="success"
        onClick={() => download(data)}
      >
        Download
      </Button>
      <a ref={linkRef} aria-hidden="true" className="sr-only" />
    </>
  );
};
