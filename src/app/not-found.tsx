import { ErrorPage } from '@/_pages';
import { headers } from 'next/headers';

export default async function NotFound() {
  const headersList = await headers();
  const fullUrl = headersList.get('link')?.split('; ')[0].slice(1, -1);
  const local = fullUrl?.split('/')[3].slice(0, 2);

  return (
    <html lang={local}>
      <body>
        <ErrorPage />
      </body>
    </html>
  );
}
