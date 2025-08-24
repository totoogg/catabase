'use server';

import { getTranslations } from 'next-intl/server';
import { CardTypes } from '../../types/cardApiTypes';

export async function CSVaction(data: CardTypes[]) {
  const t = await getTranslations('Data');

  const CSV_HEADERS = [
    t('name'),
    t('breed'),
    t('age'),
    t('weight'),
    t('dailyFood'),
    t('lastVetVisit'),
    t('adoptionDate'),
    t('medicalRecords'),
  ].join(',');

  const csvContent = [
    CSV_HEADERS,
    ...data.map((item) =>
      [
        item.name,
        item.breed,
        item.age,
        item.weight,
        item.dailyFood,
        item.lastVetVisit,
        item.adoptionDate,
        item.medicalRecords.join(', '),
      ].join(',')
    ),
  ].join('\n');

  const fileName =
    data.length === 1 ? t('downloadOne') : `${data.length}${t('downloadMany')}`;

  return { csvContent, fileName };
}
