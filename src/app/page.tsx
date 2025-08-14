import { getCards } from '@/shared';
import dynamic from 'next/dynamic';

const Main = dynamic(() => import('../_pages/Main/ui/Main'));

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page = '1', query = '' } = await searchParams;

  const result = await getCards({ page: parseInt(page), search: query });

  return (
    <Main count={result.pages ?? 1} data={result.res} status={result.status} />
  );
}
