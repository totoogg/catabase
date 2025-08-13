import dynamic from 'next/dynamic';

const Main = dynamic(() => import('../_pages/Main/ui/Main'));

export function generateStaticParams() {
  return [{ slug: [''] }];
}

export default function Page() {
  return <Main />;
}
