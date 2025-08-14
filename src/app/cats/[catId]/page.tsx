import { getCards } from '@/shared';
import dynamic from 'next/dynamic';

const Cat = dynamic(() => import('../../../_pages/Cat/ui/Cat'));
const Main = dynamic(() => import('../../../_pages/Main/ui/Main'));

export default async function Page({
  params,
}: {
  params: Promise<{ catId: string }>;
}) {
  const { catId } = await params;

  await getCards({});

  console.log(catId);

  return (
    <>
      <Cat />
      <Main />
    </>
  );
}
