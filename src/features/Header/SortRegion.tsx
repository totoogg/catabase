import { Selector } from '@/components';
import { FC } from 'react';
import cls from './Header.module.css';

const sort = [
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Oceania',
  'Middle East',
  'Global',
  'Antarctica',
];

interface SortRegionProps {
  onChange: (value: string) => void;
}

export const SortRegion: FC<SortRegionProps> = ({ onChange }) => {
  const handleSelect = (option: string) => {
    onChange(option);
  };

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
};
