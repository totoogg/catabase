import { Selector } from '@/components';
import cls from './Header.module.css';
import { FC, memo, useCallback } from 'react';

const sort = [
  'Country name Z-A',
  'Country name A-Z',
  'Population ↑',
  'Population ↓',
];

interface SortProps {
  onChange: (value: string) => void;
}

export const Sort: FC<SortProps> = memo(({ onChange }) => {
  const handleSelect = useCallback(
    (option: string) => {
      if (option === 'Country name Z-A') {
        onChange('nameCountryUp');
      } else if (option === 'Country name A-Z') {
        onChange('nameCountryDown');
      } else if (option === 'Population ↑') {
        onChange('populationUp');
      } else if (option === 'Population ↓') {
        onChange('populationDown');
      }
    },
    [onChange]
  );

  return (
    <div className={cls.sort}>
      Sort:
      <Selector
        options={sort}
        label={'Select sort'}
        onChange={handleSelect}
        className="selectSort"
      />
    </div>
  );
});

Sort.displayName = 'Sort';
