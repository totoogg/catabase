import { Button, escapeHtml, LOCAL_SEARCH, useGetLocalData } from '@/shared';
import { Input } from '@/shared/ui/Input/Input';
import { FC, KeyboardEvent, memo, useEffect, useState } from 'react';
import cls from './Search.module.css';

interface SearchProps {
  className?: string;
}

interface LocalStorageChangedEvent extends Event {
  newValue: string;
}

export const Search: FC<SearchProps> = memo((props) => {
  const [error, setError] = useState('');
  const { setValue, value } = useGetLocalData();

  const classes = [cls.block, props.className].join(' ');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const saveLocal = () => {
    const event = new Event('localStorageChanged') as LocalStorageChangedEvent;
    event.newValue = escapeHtml(value.trim());
    localStorage.setItem(LOCAL_SEARCH, event.newValue);
    window.dispatchEvent(event);
  };

  const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^\p{L}\d\s]/gu, '');

    if (inputValue !== filteredValue) {
      setError('Only letters, numbers and spaces are allowed!');
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
        value={value}
        placeholder="Search..."
        onKeyUp={typeEnter}
        onChange={getValue}
      />
      <Button className={cls.btn} variant="filled" onClick={saveLocal}>
        Search
      </Button>
      {error && <div className={cls.error}>{error}</div>}
    </div>
  );
});

Search.displayName = 'Search';
