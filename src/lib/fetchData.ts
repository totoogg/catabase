import { countriesWithRegions } from '@/const/countries';
import { ICountry, IData } from '@/types/types';

let dataCache: ICountry[] = [];

export const fetchData = async (): Promise<ICountry[]> => {
  if (dataCache.length > 0) {
    return dataCache;
  }

  try {
    const responses = await Promise.all(
      countriesWithRegions.map(async (el) => {
        const response = await fetch(
          `https://perfomance-nu.vercel.app/${el.country}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data for ${el.country}`);
        }
        return response.json();
      })
    );

    const result = countriesWithRegions.map((el, index) => ({
      ...el,
      population: responses[index].data.at(-1)?.population || 'N/A',
      iso_code: responses[index].iso_code || 'N/A',
      data: responses[index].data
        .sort((a: IData, b: IData) => Number(b.year) - Number(a.year))
        .map((element: IData) => ({
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
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
