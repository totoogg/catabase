import { Button, Input } from '@/components';
import cls from './Header.module.css';

export const Search = () => {
  return (
    <div className={cls.search}>
      <Input placeholder="Search..." />
      <Button variant="filled">Search</Button>
    </div>
  );
};
