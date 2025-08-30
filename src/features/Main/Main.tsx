import { FC, use, useDeferredValue, useEffect, useState } from 'react';
import cls from './Main.module.css';
import { filterData } from '@/lib/filterData';
import { fetchData } from '@/lib/fetchData';
import { Loader } from '@/components';

interface MainProps {
  selectedYear: string;
  regionFilter: string;
  searchQuery: string;
  sortConfig: string;
  selectedColumns: string[];
}

const userPromiseData = fetchData();

export const Main: FC<MainProps> = ({
  regionFilter,
  searchQuery,
  selectedColumns,
  selectedYear,
  sortConfig,
}) => {
  const deferredRegionFilter = useDeferredValue(regionFilter);
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const deferredSortConfig = useDeferredValue(sortConfig);
  const deferredSelectedYear = useDeferredValue(selectedYear);
  const [highlight, setHighlight] = useState(false);

  const originData = use(userPromiseData);

  const data = filterData(
    originData,
    deferredRegionFilter,
    deferredSearchQuery,
    deferredSortConfig,
    deferredSelectedYear
  );

  const isProcessing =
    deferredRegionFilter !== regionFilter ||
    deferredSearchQuery !== searchQuery ||
    deferredSortConfig !== sortConfig ||
    deferredSelectedYear !== selectedYear;

  useEffect(() => {
    if (selectedYear) {
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedYear]);

  return (
    <main className={cls.main}>
      {isProcessing && <Loader />}
      <div className={cls['grid-wrapper']}>
        <div className={cls['main-header']}>
          <div>Country</div>
          <div>Population</div>
          <div>ISO Code</div>
        </div>

        {data.map((order) => (
          <div key={order.country} className={cls['main-row']}>
            <div className={cls['main-data']}>
              <div className={highlight ? 'highlight' : ''}>
                {order.country}
              </div>
              <div className={highlight ? 'highlight' : ''}>
                {order.population}
              </div>
              <div className={highlight ? 'highlight' : ''}>
                {order.iso_code}
              </div>
            </div>

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
                {order.data.map((item) => (
                  <tr key={item.year}>
                    {selectedColumns.map((col) => (
                      <td
                        className={[
                          cls['nested-row'],
                          highlight ? 'highlight' : '',
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
          </div>
        ))}
      </div>
    </main>
  );
};
