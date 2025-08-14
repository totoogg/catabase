'use client';

import { Button } from '@/shared';

export const ResetCache = () => {
  const handleClick = async () => {
    const response = await fetch('/api/revalidate', {
      method: 'POST',
    });

    const data = await response.json();

    if (data.success) {
      window.location.reload();
    }
  };

  return (
    <Button onClick={handleClick} variant="filled" colorBtn="normal">
      Reset Cache
    </Button>
  );
};
