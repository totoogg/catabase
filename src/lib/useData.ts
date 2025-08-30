import { countriesWithRegions } from '@/const/countries';
import { useState, useEffect } from 'react';

interface IData {
  year: string | undefined;
  population: string | undefined;
  co2: string | undefined;
  co2_per_capita: string | undefined;
  methane: string | undefined;
  oil_co2: string | undefined;
  temperature_change_from_co2: string | undefined;
}

interface ICountry {
  country: string;
  region: string;
  iso_code: string | undefined;
  data: IData[];
}

let dataCache: ICountry[] = [];

export function useData() {
  const [data, setData] = useState<ICountry[]>([]);

  useEffect(() => {
    if (dataCache.length > 0) {
      setData(dataCache);
      return;
    }

    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          countriesWithRegions.map((el) =>
            fetch(`https://perfomance-nu.vercel.app/${el.country}`)
          )
        );

        if (!responses.every((response) => response.ok)) {
          throw new Error('Failed to fetch data');
        }

        const jsonData = await Promise.all(
          responses.map((response) => response.json())
        );

        const result = countriesWithRegions.map((el, index) => ({
          ...el,
          iso_code: jsonData[index]['iso_code'] || 'N/A',
          data: jsonData[index].data.map((element: IData) => ({
            year: element.year || 'N/A',
            population: element.population || 'N/A',
            co2: element.co2 || 'N/A',
            co2_per_capita: element.co2_per_capita || 'N/A',
            methane: element.methane || 'N/A',
            oil_co2: element.oil_co2 || 'N/A',
            temperature_change_from_co2:
              element.temperature_change_from_co2 || 'N/A',
          })),
        }));

        dataCache = result;

        setData(result);
      } catch {
        console.error('Fetch error');
      }
    };

    fetchData();
  }, []);

  return data;
}
