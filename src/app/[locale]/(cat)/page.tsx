import SkeletonLoading from '@/widgets/CardList/ui/SkeletonLoading';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Main = dynamic(() =>
  import('../../../_pages/Main/ui/Main').then((mod) => mod.Main)
);

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page = '1', query = '' } = await searchParams;

  return (
    <Suspense fallback={<SkeletonLoading />}>
      <Main query={query} page={page} />
    </Suspense>
  );
}
