import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import * as React from 'react';

import { pickContentMeta } from '@/lib/contentMeta';
import { getContentMeta } from '@/lib/requests/content-meta';

import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';

import { contentMetaFlag } from '@/constants/env';

export default function StatisticsPage() {
  const { data: contentMeta } = useQuery({
    queryKey: ['contents'],
    queryFn: getContentMeta,
    enabled: contentMetaFlag,
  });

  const rawProjects = pickContentMeta(contentMeta, 'projects');
  const projects = rawProjects.map((row) => ({
    ...row,
    webViews: row.views - (row?.devtoViews || 0),
  }));
  const projectColumns: ColumnDef<(typeof projects)[number]>[] = [
    {
      accessorKey: 'slug',
      header: 'Slug',
      cell: ({ row }) => (
        <UnstyledLink
          className='font-medium'
          openNewTab
          href={`/projects/${row.original.slug}?ref=statistics`}
        >
          {row.original.slug}
        </UnstyledLink>
      ),
      footer: 'Total',
      sortDescFirst: true,
    },
    {
      accessorKey: 'views',
      header: 'Total Views',
      cell: ({ row }) => row.original.views.toLocaleString(),
      footer: ({ table }) =>
        table
          .getFilteredRowModel()
          .rows.reduce((sum, row) => sum + row.original.views, 0)
          .toLocaleString(),
      meta: {
        align: 'right',
      },
    },
    {
      accessorKey: 'webViews',
      header: 'Web Views',
      cell: ({ row }) => row.original.webViews.toLocaleString(),
      footer: ({ table }) =>
        table
          .getFilteredRowModel()
          .rows.reduce((sum, row) => sum + row.original.webViews, 0)
          .toLocaleString(),
      meta: {
        align: 'right',
      },
    },
    {
      accessorKey: 'devtoViews',
      header: 'dev.to',
      cell: ({ row }) =>
        row.original.devtoViews
          ? row.original.devtoViews.toLocaleString()
          : '-',
      footer: ({ table }) =>
        table
          .getFilteredRowModel()
          .rows.reduce((sum, row) => sum + (row.original.devtoViews ?? 0), 0)
          .toLocaleString(),
      meta: {
        align: 'right',
      },
    },
    {
      accessorKey: 'likes',
      header: 'Likes',
      cell: ({ row }) => row.original.likes.toLocaleString(),
      footer: ({ table }) =>
        table
          .getFilteredRowModel()
          .rows.reduce((sum, row) => sum + row.original.likes, 0)
          .toLocaleString(),
      meta: {
        align: 'right',
      },
    },
  ];

  const statCard = {
    title: 'Projects',
    count: projects.length,
    views: projects
      .reduce((sum, row) => sum + row.views, 0)
      .toLocaleString(),
    likes: projects
      .reduce((sum, row) => sum + row.likes, 0)
      .toLocaleString(),
  };

  return (
    <Layout>
      <Seo
        templateTitle='Statistics'
        description='Metadata statistics of project posts.'
      />

      <main>
        <section className=''>
          <div className='layout py-12'>
            <h1>Statistics</h1>

            <div className='mt-4 grid gap-6 sm:grid-cols-2'>
              <div
                className={clsx(
                  'space-y-2 text-center',
                  'rounded-md bg-gray-50 p-6 shadow-sm dark:bg-gray-800',
                  'border border-gray-300 dark:border-gray-600'
                )}
              >
                <h3>{statCard.title}</h3>
                <div className='space-y-1'>
                  <p className='text-gray-800 dark:text-gray-200'>
                    <span className='h4 font-semibold'>
                      {statCard.count ?? 0}
                    </span>{' '}
                    <span className='text-xs font-medium uppercase tracking-wider'>
                      posts
                    </span>
                  </p>
                  <p className='text-gray-800 dark:text-gray-200'>
                    <span className='h4 font-semibold'>{statCard.views}</span>{' '}
                    <span className='text-xs font-medium uppercase tracking-wider'>
                      views
                    </span>
                  </p>
                  <p className='text-gray-800 dark:text-gray-200'>
                    <span className='h4 font-semibold'>{statCard.likes}</span>{' '}
                    <span className='text-xs font-medium uppercase tracking-wider'>
                      likes
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <h2 className='h3 mt-8'>Projects</h2>
            {projects && (
              <Table
                withFilter
                withFooter
                className='mt-4'
                data={projects}
                columns={projectColumns}
              />
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
