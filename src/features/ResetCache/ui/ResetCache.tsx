'use client';

import { Button } from '@/shared';
import { useTranslations } from 'next-intl';

export const ResetCache = () => {
  const t = useTranslations('Buttons');

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
      {t('resetCache')}
    </Button>
  );
};
