/** Vercel API origin for production sites (Hostinger frontend has no /api routes). */
export const PRODUCTION_API_BASE = 'https://api.divinginasia.com';

const PRODUCTION_HOSTS = new Set([
  'www.divinginasia.com',
  'divinginasia.com',
  'admin.divinginasia.com',
]);

export function resolveApiBaseUrl() {
  const rawBase = (
    (import.meta.env.VITE_API_BASE_URL as string | undefined)
    || (import.meta.env.VITE_API_URL as string | undefined)
    || ''
  ).trim();

  const runtimeFallback = (() => {
    if (typeof window === 'undefined') return '';
    const host = window.location.hostname.toLowerCase();
    if (PRODUCTION_HOSTS.has(host)) return PRODUCTION_API_BASE;
    return '';
  })();

  return (rawBase || runtimeFallback).replace(/\/+$/, '');
}

export function getApiBaseUrl() {
  return resolveApiBaseUrl();
}

export function apiUrl(path: string) {
  const base = resolveApiBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return base ? `${base}${normalizedPath}` : normalizedPath;
}
