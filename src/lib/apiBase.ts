const normalizeApiBase = (value: string) => value.trim().replace(/\/+$/, '');

export function getApiBaseUrl(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const apiBaseRaw = (
    (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
    (import.meta.env.VITE_API_URL as string | undefined) ||
    ''
  ).trim();

  const runtimeFallbackApiBase = (() => {
    const host = window.location.hostname.toLowerCase();
    if (host === 'divinginasia.com' || host === 'www.divinginasia.com' || host === 'fuckoff.divinginasia.com') {
      return 'https://api.divinginasia.com';
    }
    return '';
  })();

  return normalizeApiBase(apiBaseRaw || runtimeFallbackApiBase);
}
