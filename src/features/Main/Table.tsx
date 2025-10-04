import { FC, memo, useEffect, useState } from 'react';
import cls from './Main.module.css';
import { IData } from '@/types/types';

interface TableProps {
  data: IData[];
  selectedColumns: string[];
}

export const Table: FC<TableProps> = memo(({ data, selectedColumns }) => {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setHighlight(true);
    const timer = setTimeout(() => setHighlight(false), 3000);
    return () => clearTimeout(timer);
  }, [selectedColumns]);

  return (
    <table className={cls['nested-wrapper']}>
      <thead>
        <tr>
          {selectedColumns.map((col) => (
            <th className={cls['nested-header']} key={col}>
              {col.replace('_', ' ')}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.year}>
            {selectedColumns.map((col) => (
              <td
                className={[
                  cls['nested-row'],
                  highlight ? cls.highlight : '',
                ].join(' ')}
                key={col}
              >
                {(item as never)?.[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});

Table.displayName = 'Table';
