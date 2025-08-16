'use client';

import { Button, LOCAL_SEARCH, useGetLocalData } from '@/shared';
import { Input } from '@/shared/ui/Input/Input';
import { FC, KeyboardEvent, useEffect, useState } from 'react';
import cls from './Search.module.css';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';

interface SearchProps {
  className?: string;
}

export const Search: FC<SearchProps> = (props) => {
  const [error, setError] = useState('');
  const { setValue, value } = useGetLocalData();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('');

  const classes = [cls.block, props.className].join(' ');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const saveLocal = () => {
    if (value !== undefined) {
      const query = value.trim();

      localStorage.setItem(LOCAL_SEARCH, query);
      const searchParams = new URLSearchParams(params);
      searchParams.set('query', query);
      searchParams.set('page', '1');

      router.push(`${pathname}?${searchParams.toString()}`);
    }
  };

  const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^\p{L}\d\s]/gu, '');

    if (inputValue !== filteredValue) {
      setError(t('Error.search'));
    } else {
      setError('');
    }

    setValue(filteredValue);
  };

  const typeEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveLocal();
    }
  };

  return (
    <div className={classes}>
      <Input
        pattern="/[^\p{L}\d\s]/gu"
        value={value ?? ''}
        placeholder={t('Input.placeholder')}
        onKeyUp={typeEnter}
        onChange={getValue}
      />
      <Button className={cls.btn} variant="filled" onClick={saveLocal}>
        {t('Buttons.search')}
      </Button>
      {error && <div className={cls.error}>{error}</div>}
    </div>
  );
};

Search.displayName = 'Search';
