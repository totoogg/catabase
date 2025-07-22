import { Button, escapeHtml, LOCAL_SEARCH } from '@/shared';
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
  const [value, setValue] = useState<string>('');

  const classes = [cls.block, props.className].join(' ');

  useEffect(() => {
    const local = localStorage.getItem(LOCAL_SEARCH) ?? '';
    setValue(local);
  }, []);

  const saveLocal = () => {
    const event = new Event('localStorageChanged') as LocalStorageChangedEvent;
    event.newValue = value.trim();
    localStorage.setItem(LOCAL_SEARCH, event.newValue);
    window.dispatchEvent(event);
  };

  const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = escapeHtml(e.target.value);
    setValue(value);
  };

  const typeEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveLocal();
    }
  };

  return (
    <div className={classes}>
      <Input
        value={value}
        placeholder="Search..."
        onKeyUp={typeEnter}
        onChange={getValue}
      />
      <Button className={cls.btn} variant="filled" onClick={saveLocal}>
        Search
      </Button>
    </div>
  );
});

Search.displayName = 'Search';
