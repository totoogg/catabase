import { Providers } from '@/_app/providers/Providers';
import type { Metadata } from 'next';
import { StrictMode } from 'react';
import '../index.css';

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
            <Providers>{children}</Providers>
          </StrictMode>
        </div>
      </body>
    </html>
  );
}
