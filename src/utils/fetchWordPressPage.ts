/**
 * Fetch page content from WordPress REST API
 * Attempts multiple WordPress endpoints and falls back gracefully
 */

export interface WordPressPage {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  status: string;
}

const WP_SITES = [
  'https://admin.divinginasia.com',
  'https://www.divinginasia.com',
];

export async function fetchWordPressPage(slug: string): Promise<WordPressPage | null> {
  for (const siteUrl of WP_SITES) {
    try {
      const url = `${siteUrl}/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&_fields=id,title,content,excerpt,slug,status`;
      const response = await fetch(url, { method: 'GET' });

      if (!response.ok) continue;

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data[0];
      }
    } catch (err) {
      console.warn(`Failed to fetch page "${slug}" from ${siteUrl}:`, err);
      continue;
    }
  }

  return null;
}

export async function getPageContent(slug: string): Promise<string> {
  const page = await fetchWordPressPage(slug);
  return page?.content?.rendered || '';
}

export async function getPageTitle(slug: string): Promise<string> {
  const page = await fetchWordPressPage(slug);
  return page?.title?.rendered || '';
}
