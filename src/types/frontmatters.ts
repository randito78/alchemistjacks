import { ReadTimeResults } from 'reading-time';

export type BlogFrontmatter = {
  wordCount: number;
  readingTime: ReadTimeResults;
  slug: string;
  englishOnly?: boolean;
  title: string;
  description: string;
  banner: string;
  /** Optional left/right hero images (paths like `projects/foo.png`). Cards & OG use `banner`. */
  bannerSplit?: string[];
  publishedAt: string;
  lastUpdated?: string;
  tags: string;
  repost?: string;
};

/** MDX content under `src/contents/projects` (project write-ups). */
export type ContentType = 'projects';

export type PickFrontmatter<_T extends ContentType = ContentType> =
  BlogFrontmatter;

export type InjectedMeta = { views?: number; likes?: number };

export type BlogType = {
  code: string;
  frontmatter: BlogFrontmatter;
};

export type ProjectFrontmatter = {
  slug: string;
  title: string;
  publishedAt: string;
  lastUpdated?: string;
  description: string;
  category?: string;
  techs: string;
  banner: string;
  link?: string;
  github?: string;
  youtube?: string;
};

export type ProjectType = {
  code: string;
  frontmatter: ProjectFrontmatter;
};

export type FrontmatterWithTags = BlogFrontmatter;
export type FrontmatterWithDate = BlogFrontmatter | ProjectFrontmatter;
export type Frontmatter = ProjectFrontmatter | BlogFrontmatter;
