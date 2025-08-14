'use client';

import { LOCAL_SEARCH } from '@/shared/consts/localStorage';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useGetLocalData() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    const local = localStorage.getItem(LOCAL_SEARCH) ?? '';
    setValue(local);
    const searchParams = new URLSearchParams(params);

    const page = searchParams.get('page');

    searchParams.set('query', local);
    searchParams.set('page', page || '1');

    router.push(`${pathname}?${searchParams.toString()}`);
  }, []);

  return { value, setValue };
}
