'use client';

import { useTransition } from 'react';
import { Loader } from '../Loader/Loader';
import { Link, useRouter } from '@/i18n/navigation';

export function CustomLink({
  href,
  children,
  replace,
  ...rest
}: Parameters<typeof Link>[0]) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <>
      {isPending && <Loader />}
      <Link
        href={href}
        onClick={(e) => {
          e.preventDefault();
          startTransition(() => {
            const url = href.toString();
            if (replace) {
              router.replace(url);
            } else {
              router.push(url);
            }
          });
        }}
        {...rest}
      >
        {children}
      </Link>
    </>
  );
}
