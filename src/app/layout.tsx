import { Providers } from '@/_app/providers/Providers';
import type { Metadata } from 'next';
import { StrictMode } from 'react';
import '../index.css';
import { Layout } from '@/_app/layout/Layout';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'My App is a Gallery',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <StrictMode>
            <Providers>
              <Layout>{children}</Layout>
            </Providers>
          </StrictMode>
        </div>
      </body>
    </html>
  );
}
