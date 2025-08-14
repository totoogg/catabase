import SkeletonLoading from '@/widgets/CardList/ui/SkeletonLoading';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Cat = dynamic(() => import('../../../../../_pages/Cat/ui/Cat'));
const Main = dynamic(() => import('../../../../../_pages/Main/ui/Main'));

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ catId: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { catId } = await params;

  const { page = '1', query = '' } = await searchParams;

  return (
    <>
      <Cat id={catId} />
      <Suspense fallback={<SkeletonLoading />}>
        <Main query={query} page={page} />
      </Suspense>
    </>
  );
}
