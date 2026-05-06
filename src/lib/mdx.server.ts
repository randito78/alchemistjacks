import { execSync } from 'child_process';
import { format } from 'date-fns';
import { promises, readFileSync, statSync } from 'fs';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import { join, relative } from 'path';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { sortByDate } from '@/lib/mdx.client';

import {
  ContentType,
  Frontmatter,
  PickFrontmatter,
} from '@/types/frontmatters';

/**
 * Date of the first commit touching `absolutePath` (YYYY-MM-DD), or file mtime if git is unavailable or file is untracked.
 */
export function getFirstGitCommitDateForFile(absolutePath: string): string {
  const rel = relative(process.cwd(), absolutePath);
  try {
    const date = execSync(
      `git log --reverse --format=%cs -1 -- ${JSON.stringify(rel)}`,
      {
        cwd: process.cwd(),
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }
    ).trim();
    if (date) return date;
  } catch {
    // not a git repo, shallow clone, or file not yet tracked
  }
  return format(statSync(absolutePath).mtime, 'yyyy-MM-dd');
}

function withProjectPublishedAt<T extends ContentType>(
  type: T,
  absolutePath: string,
  data: Record<string, unknown>
): Record<string, unknown> {
  if (type !== 'projects') {
    return data;
  }
  const createdOn = data.createdOn;
  if (typeof createdOn !== 'string' || !createdOn) {
    throw new Error(
      `Project frontmatter must include createdOn: ${absolutePath}`
    );
  }
  return {
    ...data,
    publishedAt: getFirstGitCommitDateForFile(absolutePath),
  };
}

export async function getFileSlugArray(type: ContentType) {
  return getFileList(join(process.cwd(), 'src', 'contents', type)).then(
    (paths) =>
      paths.map((path) =>
        path
          .replace(join(process.cwd(), 'src', 'contents', type) + '/', '')
          .replace('.mdx', '')
          .split('/')
      )
  );
}

export async function getFileBySlug(type: ContentType, slug: string) {
  const source = slug
    ? readFileSync(
        join(process.cwd(), 'src', 'contents', type, `${slug}.mdx`),
        'utf8'
      )
    : readFileSync(
        join(process.cwd(), 'src', 'contents', `${type}.mdx`),
        'utf8'
      );

  const { code, frontmatter } = await bundleMDX({
    source,
    mdxOptions(options) {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        () =>
          rehypePrettyCode({
            theme: 'css-variables',
          }),
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['hash-anchor'],
            },
          },
        ],
      ];

      return options;
    },
  });

  const absolutePath = slug
    ? join(process.cwd(), 'src', 'contents', type, `${slug}.mdx`)
    : join(process.cwd(), 'src', 'contents', `${type}.mdx`);

  return {
    code,
    frontmatter: {
      wordCount: source.split(/\s+/gu).length,
      readingTime: readingTime(source),
      slug: slug || null,
      ...withProjectPublishedAt(type, absolutePath, {
        ...(frontmatter as Record<string, unknown>),
      }),
    },
  };
}

const getFileList = async (dirName: string) => {
  let files: string[] = [];
  const items = await promises.readdir(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...(await getFileList(`${dirName}/${item.name}`))];
    } else {
      files.push(`${dirName}/${item.name}`);
    }
  }

  return files;
};

export async function getAllFilesFrontmatter<T extends ContentType>(type: T) {
  const files = await getFileList(join(process.cwd(), 'src', 'contents', type));

  return files.reduce((allPosts: Array<PickFrontmatter<T>>, absolutePath) => {
    const source = readFileSync(absolutePath, 'utf8');
    const { data } = matter(source);
    const merged = withProjectPublishedAt(type, absolutePath, {
      ...(data as Record<string, unknown>),
    });

    const res = [
      {
        ...(merged as PickFrontmatter<T>),
        slug: absolutePath
          .replace(join(process.cwd(), 'src', 'contents', type) + '/', '')
          .replace('.mdx', ''),
        readingTime: readingTime(source),
      },
      ...allPosts,
    ];
    return res;
  }, []);
}

export async function getRecommendations(currSlug: string) {
  const frontmatters = await getAllFilesFrontmatter('projects');

  const currentFm = frontmatters.find((fm) => fm.slug === currSlug);

  const otherFms = frontmatters
    .filter((fm) => !fm.slug.startsWith('id-') && fm.slug !== currSlug)
    .sort(() => Math.random() - 0.5);

  const currentTags = (currentFm?.tags ?? '').split(',').filter(Boolean);
  const _recommendations = otherFms.filter((op) =>
    (op.tags ?? '').split(',').some((p) => currentTags.includes(p))
  );
  const recommendations = sortByDate(_recommendations);

  const threeRecommendations =
    recommendations.length >= 3
      ? recommendations
      : [
          ...recommendations,
          ...otherFms.filter(
            (fm) => !recommendations.some((r) => r.slug === fm.slug)
          ),
        ];

  return threeRecommendations.slice(0, 3);
}

/**
 * Get and order frontmatters by specified array
 */
export function getFeatured<T extends Frontmatter>(
  contents: Array<T>,
  features: string[]
) {
  return features
    .map((feat) => contents.find((content) => content.slug === feat))
    .filter((item): item is T => item != null);
}
