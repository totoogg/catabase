import { Button, Input } from '@/components';
import cls from './Header.module.css';
import { FC, useState, KeyboardEvent } from 'react';

interface SearchProps {
  onChange: (value: string) => void;
}

export const Search: FC<SearchProps> = ({ onChange }) => {
  const [search, setSearch] = useState<string>('');

  const onHandleSearch = () => {
    onChange(search);
  };

  const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
  };

  const typeEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onHandleSearch();
    }
  };

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
};
