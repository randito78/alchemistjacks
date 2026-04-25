import clsx from 'clsx';
import * as React from 'react';

import BannerImage from '@/components/images/BannerImage';
import UnstyledLink from '@/components/links/UnstyledLink';
import TechIcons, { TechListType } from '@/components/TechIcons';

import { ProjectFrontmatter } from '@/types/frontmatters';

type ProjectCardProps = {
  project: ProjectFrontmatter;
} & React.ComponentPropsWithoutRef<'li'>;

function externalProjectUrl(project: ProjectFrontmatter) {
  const raw = project.link ?? project.github;
  if (!raw || raw.startsWith('/')) return undefined;
  return raw;
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const href = externalProjectUrl(project);

  const innerClassName =
    'flex h-full flex-col items-start rounded-md p-4 focus:outline-none focus-visible:ring focus-visible:ring-primary-300';

  const inner = (
    <>
      <h4>{project.title}</h4>
      <p className='mb-auto text-sm text-gray-700 dark:text-gray-300'>
        {project.description}
      </p>
      <div className='mt-2'>
        <TechIcons techs={project.techs.split(',') as Array<TechListType>} />
      </div>

      <BannerImage
        banner={project.banner}
        alt={project.title}
        aspectClassName='aspect-[1440/792]'
        className='pointer-events-none mt-3 w-full rounded-sm'
        sizes='(max-width: 768px) 100vw, 480px'
      />

      {href ? (
        <p className='animated-underline mt-2 inline-block font-medium'>
          See more →
        </p>
      ) : null}
    </>
  );

  return (
    <li
      className={clsx(
        'project-card rounded-md md:w-full',
        'border dark:border-gray-600',
        'scale-100 hover:scale-[1.02] active:scale-[0.97] motion-safe:transform-gpu',
        'transition duration-100',
        'motion-reduce:hover:scale-100',
        'animate-shadow',
        className
      )}
    >
      {href ? (
        <UnstyledLink href={href} className={innerClassName}>
          {inner}
        </UnstyledLink>
      ) : (
        <div className={innerClassName}>{inner}</div>
      )}
    </li>
  );
}
