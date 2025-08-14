'use client';

import { Button, CardTypes } from '@/shared';
import { FC, useRef } from 'react';

interface DownloadProps {
  data: CardTypes[];
}

export const Download: FC<DownloadProps> = ({ data }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = async () => {
    const response = await fetch('/api/csv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    const blob = await response.blob();

    const url = URL.createObjectURL(blob);

    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download =
        data.length === 1
          ? `${data.length}_item.csv`
          : `${data.length}_items.csv`;
      linkRef.current.click();
    }
  };

  return (
    <a ref={linkRef}>
      <Button variant="filled" colorBtn="success" onClick={handleDownload}>
        Download
      </Button>
    </a>
  );
};
