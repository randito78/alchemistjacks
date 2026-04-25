import clsx from 'clsx';
import * as React from 'react';

type AccentType = React.ComponentPropsWithoutRef<'span'>;

export default function Accent({ children, className }: AccentType) {
  return (
    <span
      className={clsx(
        className,
        'transition-colors',
        'bg-gradient-to-br from-primary-200/45 via-primary-300/40 to-primary-500/35',
        'dark:from-primary-200 dark:via-primary-300 dark:to-primary-500 dark:bg-clip-text dark:text-transparent'
      )}
    >
      {children}
    </span>
  );
}
