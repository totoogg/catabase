import { Button, Input } from '@/components';
import cls from './Header.module.css';
import { FC, useState, KeyboardEvent, memo, useCallback } from 'react';

interface SearchProps {
  onChange: (value: string) => void;
}

export const Search: FC<SearchProps> = memo(({ onChange }) => {
  const [search, setSearch] = useState<string>('');

  const onHandleSearch = useCallback(() => {
    onChange(search);
  }, [onChange, search]);

  const getValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
  }, []);

  const typeEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onHandleSearch();
      }
    },
    [onHandleSearch]
  );

  return (
    <div className={cls.search}>
      <Input
        value={search}
        onChange={getValue}
        onKeyUp={typeEnter}
        placeholder="Search..."
      />
      <Button onClick={onHandleSearch} variant="filled">
        Search
      </Button>
    </div>
  );
});

Search.displayName = 'Search';
