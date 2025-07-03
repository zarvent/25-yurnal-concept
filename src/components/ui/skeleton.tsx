import clsx from 'clsx';
import React from 'react';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('bg-neutral-light animate-shimmer', className)}
      {...props}
    />
  );
}
