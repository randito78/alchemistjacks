export const SITE_URL = 'https://alchemistjacks.com';

/**
 * Public URL path for a post/project banner stored under `public/images/`.
 * Frontmatter `banner` may be a filename (`hero.jpg`), `images/foo.jpg`,
 * `public/images/foo.jpg`, or `@public/images/foo.jpg`.
 */
export function getBannerSrc(banner: string): string {
  let name = banner.trim();
  if (!name) return '/images/';

  if (name.startsWith('@')) {
    name = name.slice(1);
  }
  name = name.replace(/^\/+/, '');

  const stripPrefixes = ['public/images/', 'images/'];
  for (const prefix of stripPrefixes) {
    if (name.startsWith(prefix)) {
      name = name.slice(prefix.length);
      break;
    }
  }

  return `/images/${name}`;
}

/** Absolute banner URL for Open Graph APIs and meta tags. */
export function getOgBannerAbsoluteUrl(banner: string): string {
  const path = getBannerSrc(banner);
  return `${SITE_URL}${path}`;
}

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

type OpenGraphType = {
  siteName: string;
  description: string;
  templateTitle?: string;
  banner?: string;
  isBlog?: boolean;
  tags?: string;
};
export function openGraph({
  siteName,
  templateTitle,
  description,
  banner,
  isBlog = false,
  tags,
}: OpenGraphType): string {
  if (isBlog) {
    const ogTemplateTitle = templateTitle
      ? encodeURIComponent(templateTitle.trim())
      : undefined;
    const ogTags = tags ? encodeURIComponent(tags.trim()) : undefined;
    const ogBanner = banner ? encodeURIComponent(banner.trim()) : undefined;

    return `https://og.clarence.link/api/blog?templateTitle=${ogTemplateTitle}&banner=${ogBanner}&tags=${ogTags}`;
  }

  const qs = new URLSearchParams({
    siteName: siteName.trim(),
    description: description.trim(),
  });
  if (templateTitle?.trim()) {
    qs.set('templateTitle', templateTitle.trim());
  }

  return `${SITE_URL}/api/og?${qs.toString()}`;
}

/**
 * Remove `id-` prefix
 */
export const cleanBlogPrefix = (slug: string) => {
  if (slug.slice(0, 3) === 'id-') {
    return slug.slice(3);
  } else {
    return slug;
  }
};

/**
 * Access session storage on browser
 */
export function getFromSessionStorage(key: string) {
  if (typeof window === 'undefined') return null;
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function getFromLocalStorage(key: string) {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
