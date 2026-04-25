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
  logo?: string;
  banner?: string;
  isBlog?: boolean;
  tags?: string;
};
export function openGraph({
  siteName,
  templateTitle,
  description,
  banner,
  logo,
  isBlog = false,
  tags,
}: OpenGraphType): string {
  const ogSiteName = encodeURIComponent(siteName.trim());
  const ogTemplateTitle = templateTitle
    ? encodeURIComponent(templateTitle.trim())
    : undefined;
  const ogDesc = encodeURIComponent(description.trim());

  if (isBlog) {
    const ogTags = tags ? encodeURIComponent(tags.trim()) : undefined;
    const ogBanner = banner ? encodeURIComponent(banner.trim()) : undefined;

    return `https://og.clarence.link/api/blog?templateTitle=${ogTemplateTitle}&banner=${ogBanner}&tags=${ogTags}`;
  }

  const logoPart =
    logo && logo.length > 0
      ? `&logo=${encodeURIComponent(logo)}`
      : '';

  return `https://og.clarence.link/api/gradient?siteName=${ogSiteName}&description=${ogDesc}${logoPart}${
    ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''
  }`;
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
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

export function getFromLocalStorage(key: string) {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}
