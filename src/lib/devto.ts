import axios from 'axios';

export async function getViewsFromDevto() {
  try {
    const res = await axios.get<DevtoArticle[]>(
      'https://dev.to/api/articles/me',
      {
        headers: {
          'api-key': process.env.DEVTO_KEY as string,
        },
      }
    );

    return res.data
      .filter(
        (d) =>
          d.canonical_url.includes('alchemistjacks.com/projects/') ||
          d.canonical_url.includes('alchemistjacks.com/blog/') ||
          d.canonical_url.includes('theodorusclarence.com/projects/') ||
          d.canonical_url.includes('theodorusclarence.com/blog/')
      )
      .map((d) => {
        const match = d.canonical_url.match(
          /(?:alchemistjacks|theodorusclarence)\.com\/(?:blog|projects)\/([^/?#]+)/
        );
        return {
          slug: match?.[1] ?? '',
          views: d.page_views_count,
        };
      })
      .filter((d) => d.slug.length > 0);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

export async function getArticleViewsFromDevto(contentSlug: string) {
  try {
    const _devto = await getViewsFromDevto();
    const key = contentSlug.replace(/^b_|^p_/, '');
    const devto = _devto?.find((i) => i.slug === key);

    return devto?.views;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

interface DevtoArticle {
  canonical_url: string;
  page_views_count: number;
}
