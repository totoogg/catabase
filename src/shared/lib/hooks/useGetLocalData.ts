import { LOCAL_SEARCH } from '@/shared/consts/localStorage';
import { useEffect, useState } from 'react';

export function useGetLocalData() {
  const [value, setValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    const local = localStorage.getItem(LOCAL_SEARCH) ?? '';
    setValue(local);
  }, []);

  return { value, setValue };
}
