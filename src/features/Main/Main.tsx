import { FC, memo, use, useDeferredValue, useMemo } from 'react';
import cls from './Main.module.css';
import { filterData } from '@/lib/filterData';
import { fetchData } from '@/lib/fetchData';
import { Loader } from '@/components';
import { GridWrapper } from './GridWrapper';
import { GridHeader } from './GridHeader';
import { GridRow } from './GridRow';

interface MainProps {
  selectedYear: string;
  regionFilter: string;
  searchQuery: string;
  sortConfig: string;
  selectedColumns: string[];
}

const userPromiseData = fetchData();

export const Main: FC<MainProps> = memo(
  ({
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

    const originData = use(userPromiseData);

    const data = useMemo(
      () =>
        filterData(
          originData,
          deferredRegionFilter,
          deferredSearchQuery,
          deferredSortConfig,
          deferredSelectedYear
        ),
      [
        deferredRegionFilter,
        deferredSearchQuery,
        deferredSelectedYear,
        deferredSortConfig,
        originData,
      ]
    );

    const isProcessing = useMemo(
      () =>
        deferredRegionFilter !== regionFilter ||
        deferredSearchQuery !== searchQuery ||
        deferredSortConfig !== sortConfig ||
        deferredSelectedYear !== selectedYear,
      [
        deferredRegionFilter,
        deferredSearchQuery,
        deferredSelectedYear,
        deferredSortConfig,
        regionFilter,
        searchQuery,
        selectedYear,
        sortConfig,
      ]
    );

    return (
      <main className={cls.main}>
        {isProcessing && <Loader />}

        {data.length > 0 ? (
          <GridWrapper>
            <GridHeader />

            {data.map((country) => (
              <GridRow
                key={country.country}
                country={country}
                selectedColumns={selectedColumns}
              />
            ))}
          </GridWrapper>
        ) : (
          <p className={cls.empty}>No records found</p>
        )}
      </main>
    );
  }
);

Main.displayName = 'Main';
