import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

type PageSeoRecord = {
  canonical_url: string | null;
  robots: string | null;
};

const INTERNAL_ROUTE_PATTERNS = [
  /^\/admin(?:\/|$)/,
  /^\/login(?:\/|$)/,
  /^\/signup(?:\/|$)/,
  /^\/account(?:\/|$)/,
  /^\/clicks-dashboard(?:\/|$)/,
  /^\/booking-to-jira(?:\/|$)/,
];

const ROUTE_ALIASES: Record<string, string> = {
  '/': 'home',
  '/fun-diving-nusa-lembongan': 'fun-diving',
  '/courses/dsd': 'discover-scuba',
  '/courses/dsd-deluxe': 'discover-scuba-deluxe',
  '/dive-sites/chumphon-pinnacles': 'dive-sites/chumphon-pinnacle',
  '/dive-sites/japanese-garden': 'dive-sites/japanese-gardens',
  '/dive-sites/htms-sattukut': 'dive-sites/htms-sattakut',
  '/dive-sites/htms-sattukut-wreck': 'dive-sites/htms-sattakut',
  '/dive-sites/twins-pinnacle': 'dive-sites/twins',
  '/dive-sites/southwest-pinnacle': 'dive-sites/south-west-pinnacle',
  '/dive-sites/ao-leuk': 'dive-sites/aow-leuk',
  '/dive-sites/aow-luek': 'dive-sites/aow-leuk',
  '/dive-sites/tanote': 'dive-sites/tanote-bay',
  '/marine-life/whaleshark': 'marine-life/whale-shark',
  '/marine-life/hawksbill-sea-turtle': 'marine-life/hawksbill-turtle',
};

const normalizePath = (pathname: string) => {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed || '/';
};

const getPageSlug = (pathname: string) => {
  const normalized = normalizePath(pathname);
  return ROUTE_ALIASES[normalized] || normalized.replace(/^\//, '');
};

const isInternalRoute = (pathname: string) => {
  const normalized = normalizePath(pathname);
  return INTERNAL_ROUTE_PATTERNS.some((pattern) => pattern.test(normalized));
};

const getSiteOrigin = () => {
  const configuredDomain = (import.meta.env.VITE_SITE_DOMAIN || '')
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/\/+$/, '');

  if (configuredDomain) {
    return `https://${configuredDomain}`;
  }

  return window.location.origin;
};

const upsertMeta = (name: string, content: string) => {
  let meta = document.head.querySelector(`meta[name="${name}"][data-route-seo="true"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    meta.dataset.routeSeo = 'true';
    document.head.appendChild(meta);
  }

  meta.content = content;
};

const upsertCanonical = (href: string) => {
  let link = document.head.querySelector('link[rel="canonical"][data-route-seo="true"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    link.dataset.routeSeo = 'true';
    document.head.appendChild(link);
  }

  link.href = href;
};

const buildDefaultCanonical = (pathname: string) => {
  const origin = getSiteOrigin();
  return pathname === '/' ? origin : `${origin}${pathname}`;
};

const applySeo = (robots: string, canonicalUrl: string) => {
  upsertMeta('robots', robots);
  upsertMeta('googlebot', robots);
  upsertCanonical(canonicalUrl);
};

const RouteSEO = () => {
  const location = useLocation();

  useEffect(() => {
    let active = true;

    const pathname = normalizePath(location.pathname);
    const defaultRobots = isInternalRoute(pathname) ? 'noindex, nofollow' : 'index, follow';
    const defaultCanonical = buildDefaultCanonical(pathname);

    applySeo(defaultRobots, defaultCanonical);

    const pageSlug = getPageSlug(pathname);
    if (!pageSlug) {
      return () => {
        active = false;
      };
    }

    const loadSeoOverride = async () => {
      try {
        // @ts-expect-error page_seo exists after migrations are applied in Supabase.
        const { data, error } = await supabase
          .from('page_seo')
          .select('canonical_url, robots')
          .eq('page_slug', pageSlug)
          .maybeSingle<PageSeoRecord>();

        if (!active || error || !data) {
          return;
        }

        const robots = (data.robots || defaultRobots).trim() || defaultRobots;
        const canonicalUrl = (data.canonical_url || '').trim() || defaultCanonical;
        applySeo(robots, canonicalUrl);
      } catch {
        // Keep the route defaults when SEO metadata is missing or unreachable.
      }
    };

    void loadSeoOverride();

    return () => {
      active = false;
    };
  }, [location.pathname]);

  return null;
};

export default RouteSEO;