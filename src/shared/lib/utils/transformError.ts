import { getTranslations } from 'next-intl/server';

export async function transformError(status: string) {
  const t = await getTranslations('Error');
  const statusNumber = Number(status);

  if (statusNumber > 499) {
    return t('ServerError');
  }

  if (statusNumber > 399) {
    return t('InvalidRequest');
  }

  return t('NetworkError');
}
