'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { LOCAL_SEARCH } from '@/shared/consts/localStorage';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useGetLocalData() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    const local = localStorage.getItem(LOCAL_SEARCH) ?? '';
    const searchParams = new URLSearchParams(params);

    const page = searchParams.get('page');
    const query = searchParams.get('query');

    if (query !== null && local !== query) {
      localStorage.setItem(LOCAL_SEARCH, query);
      setValue(query);
    } else {
      localStorage.setItem(LOCAL_SEARCH, local);
      searchParams.set('query', local);
      setValue(local);
    }

    searchParams.set('page', page || '1');

    router.push(`${pathname}?${searchParams.toString()}`);
  }, [params, pathname, router]);

  return { value, setValue };
}
