import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
        if (!supabase) throw new Error('Supabase not configured');

        // Fetch all rows matching the page slug (handles both short and canonical slugs)
        const { data: rows, error } = await supabase
          .from('page_content')
          .select('section_key, content_value, updated_at')
          .eq('locale', locale)
          .or(`page_slug.eq.${pageSlug},page_slug.eq./${pageSlug},page_slug.eq./courses/${pageSlug}`);

        if (error) throw error;

        if (mergeRowsAndSet(rows as PageContentRow[])) return;

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

const WP_BASE = import.meta.env.VITE_WP_BASE_URL || 'https://www.divinginasia.com';
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
        const wpUrl = `${WP_BASE}/wp-json/ktd/v1/page-content?slug=${encodeURIComponent(pageSlug)}&locale=${encodeURIComponent(locale)}&_=${Date.now()}`;
        const res = await fetch(wpUrl, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
          },
        });
        if (res.ok) {
          const rows: PageContentRow[] = await res.json();
          if (mergeRowsAndSet(rows)) return;
        }
        // Fallback: use built-in fallback content
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

    const handleVisibilityChange = () => {
      refreshContent();
    };

    const handleWindowFocus = () => {
      refreshContent();
    };

    void fetchContent(true);

    const intervalId = window.setInterval(refreshContent, CONTENT_REFRESH_INTERVAL_MS);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [pageSlug, locale, fallbackContent]);

  return { content, isLoading };
}
