import dynamic from 'next/dynamic';

const About = dynamic(() =>
  import('../../../_pages/About/ui/About').then((mod) => mod.About)
);

export default function Page() {
  return <About />;
}
