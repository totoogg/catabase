import { Selector } from '@/components';
import { FC, memo, useCallback } from 'react';
import cls from './Header.module.css';

const sort = [
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Oceania',
  'Middle East',
  'Antarctica',
];

interface SortRegionProps {
  onChange: (value: string) => void;
}

export const SortRegion: FC<SortRegionProps> = memo(({ onChange }) => {
  const handleSelect = useCallback(
    (option: string) => {
      onChange(option);
    },
    [onChange]
  );

  return (
    <div className={cls.sort}>
      Region:
      <Selector
        options={sort}
        label={'Select region'}
        onChange={handleSelect}
        className="selectRegion"
      />
    </div>
  );
});

SortRegion.displayName = 'SortRegion';
