import { FC, useEffect, useState } from 'react';
import cls from './Main.module.css';
import { ICountry } from '@/types/types';
import { Table } from './Table';

interface GridRowProps {
  country: ICountry;
  selectedColumns: string[];
}

export const GridRow: FC<GridRowProps> = ({ country, selectedColumns }) => {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setHighlight(true);
    const timer = setTimeout(() => setHighlight(false), 3000);
    return () => clearTimeout(timer);
  }, [country]);

  return (
    <div className={cls['main-row']}>
      <div className={cls['main-data']}>
        <div className={highlight ? cls.highlight : ''}>{country.country}</div>
        <div className={highlight ? cls.highlight : ''}>
          {country.population}
        </div>
        <div className={highlight ? cls.highlight : ''}>{country.iso_code}</div>
      </div>

      <Table data={country.data} selectedColumns={selectedColumns} />
    </div>
  );
};
