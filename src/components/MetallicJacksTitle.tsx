import clsx from 'clsx';
import * as React from 'react';

/**
 * Metallic gold byline — multi-stop gradient (specular highlight → body → shadow).
 */
export const goldMetallicClassName = clsx(
  'inline-block bg-clip-text text-transparent',
  'bg-[linear-gradient(168deg,#fffef5_0%,#ffe066_18%,#e6b800_38%,#b8860b_58%,#7a5c0e_82%,#3d2a05_100%)]',
  'dark:bg-[linear-gradient(168deg,#fff8e7_0%,#f0c850_22%,#c9a012_48%,#8b6914_72%,#4a3206_100%)]',
  'transition-colors'
);

/** Nickel — used for “Jack's” in the hero title. */
export const nickelMetallicClassName = clsx(
  'inline bg-gradient-to-br bg-clip-text text-transparent',
  'from-slate-500 via-slate-300 to-slate-700',
  'dark:from-slate-400 dark:via-slate-200 dark:to-slate-600',
  'transition-colors'
);

/**
 * “Jack's” in nickel (hero h1).
 */
export default function MetallicJacksTitle({
  className,
}: {
  className?: string;
}) {
  return (
    <span className={clsx(nickelMetallicClassName, className)}>{"Jack's"}</span>
  );
}
