'use client';

import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { FC, MouseEvent } from 'react';

interface WrapperProps {
  className?: string;
  children: React.ReactNode;
}

export const Wrapper: FC<WrapperProps> = ({ children, className }) => {
  const navigation = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (e: MouseEvent) => {
    const classes = (e.target as HTMLElement).className;
    if (
      classes.includes('wrapper') ||
      classes.includes('close') ||
      classes.includes('line') ||
      classes.includes('Cat')
    ) {
      navigation.push(`/?${searchParams.toString()}`);
    }
  };

  return (
    <div className={className} data-testid="cat" onClick={handleClick}>
      {children}
    </div>
  );
};
