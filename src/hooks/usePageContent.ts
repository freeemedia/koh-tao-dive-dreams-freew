import { useState, useEffect } from 'react';

interface PageContent {
  [key: string]: string;
}

interface UsePageContentOptions {
  pageSlug: string;
  locale: string;
  fallbackContent: PageContent;
}

interface PageContentRow {
  section_key: string;
  content_value: string | null;
  updated_at?: string | null;
}

interface PageContentApiResponse {
  rows?: PageContentRow[];
  source?: string;
}

const CONTENT_REFRESH_INTERVAL_MS = 15000;

export function usePageContent({ pageSlug, locale, fallbackContent }: UsePageContentOptions) {
  const [content, setContent] = useState<PageContent>(fallbackContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const mergeRowsAndSet = (rows: PageContentRow[] | null | undefined) => {
      if (rows && rows.length > 0) {
        const latestBySection = new Map<string, PageContentRow>();

        rows.forEach((row) => {
          const existing = latestBySection.get(row.section_key);

          if (!existing) {
            latestBySection.set(row.section_key, row);
            return;
          }

          const existingTs = Date.parse(existing.updated_at || '');
          const incomingTs = Date.parse(row.updated_at || '');

          const hasIncomingTs = Number.isFinite(incomingTs);
          const hasExistingTs = Number.isFinite(existingTs);

          if (!hasExistingTs && hasIncomingTs) {
            latestBySection.set(row.section_key, row);
            return;
          }

          if (hasIncomingTs && hasExistingTs && incomingTs > existingTs) {
            latestBySection.set(row.section_key, row);
            return;
          }

          if (!hasIncomingTs && !hasExistingTs) {
            latestBySection.set(row.section_key, row);
          }
        });

        const stripHtml = (str: string) => str.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').trim();

        const dbContent: PageContent = {};
        latestBySection.forEach((row) => {
          const val = row.content_value;
          if (val == null || val === '') return;
          dbContent[row.section_key] = val.includes('<') ? stripHtml(val) : val;
        });

        if (isMounted) {
          setContent({ ...fallbackContent, ...dbContent });
        }
        return true;
      }
      return false;
    };

    const fetchContent = async (showLoading = false) => {
      if (showLoading && isMounted) {
        setIsLoading(true);
      }

      try {
        const params = new URLSearchParams({ slug: pageSlug, locale });
        const base = import.meta.env.VITE_API_URL || '';
        const endpoint = `${base}/api/page-content?${params.toString()}`;
        const response = await fetch(endpoint, { cache: 'no-store' });
        if (!response.ok) {
          const text = await response.text().catch(() => '');
          throw new Error(`Page content API failed (${response.status}): ${text || 'unknown error'}`);
        }

        const payload = (await response.json().catch(() => ({}))) as PageContentApiResponse;
        const rows = Array.isArray(payload.rows) ? payload.rows : [];

        if (mergeRowsAndSet(rows)) return;

        if (isMounted) {
          setContent(fallbackContent);
        }
      } catch (err) {
        console.error('Failed to fetch page content:', err);
        if (isMounted) {
          setContent(fallbackContent);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    const refreshContent = () => {
      if (document.visibilityState === 'visible') {
        void fetchContent(false);
      }
    };

    void fetchContent(true);

    const intervalId = window.setInterval(refreshContent, CONTENT_REFRESH_INTERVAL_MS);
    document.addEventListener('visibilitychange', refreshContent);
    window.addEventListener('focus', refreshContent);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', refreshContent);
      window.removeEventListener('focus', refreshContent);
    };
  }, [pageSlug, locale, fallbackContent]);

  return { content, isLoading };
}
