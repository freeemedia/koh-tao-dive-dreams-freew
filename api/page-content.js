const WP_CANONICAL_URL = 'https://admin.divinginasia.com';
const PAGE_CONTENT_PATH = '/wp-json/ktd/v1/page-content';
const MAX_SLUG_LENGTH = 200;
const REQUEST_TIMEOUT_MS = 10_000;

const CONTENT_OVERIDES = {
  'fun-diving': {
    predicate: (locale) => locale.startsWith('en'),
    sections: {
      fun_diving_hero_subtitle:
        "Experience the best of Koh Tao's underwater world with our professionally guided fun dive trips. Discover colorful coral reefs, encounter extraordinary marine life, and create unforgettable memories.",
      fun_diving_hero_title: 'Fun Diving Koh Tao',
    },
  },
};

function buildSlugVariants(slug) {
  if (typeof slug !== 'string') return [];
  const clean = slug.trim().replace(/^[#/]+/, '');
  if (!clean) return [];
  const normalized = clean.replace(/^\/+/, '');
  return [...new Set([clean, normalized, `/${normalized}`, `/courses/${normalized}`].filter(Boolean))];
}

function normalizeRows(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.map((row) => ({
    section_key: row?.section_key ?? null,
    content_value: row?.content_value ?? null,
    updated_at: row?.updated_at ?? null,
    content_type: row?.content_type ?? null,
  }));
}

function applyContentFixes(rows, slug, locale) {
  if (!Array.isArray(rows) || !rows.length) return rows || [];

  const normalizedSlug = String(slug || '')
    .replace(/^\/+/, '')
    .toLowerCase();
  const normalizedLocale = String(locale || '').toLowerCase();

  const overrideConfig = CONTENT_OVERIDES[normalizedSlug];
  if (!overrideConfig || !overrideConfig.predicate(normalizedLocale)) {
    return rows;
  }

  const sectionOverrides = overrideConfig.sections;
  return rows.map((row) => {
    if (row?.section_key && sectionOverrides[row.section_key]) {
      return { ...row, content_value: sectionOverrides[row.section_key] };
    }
    return row;
  });
}

function dedupeRows(rows) {
  if (!Array.isArray(rows) || rows.length <= 1) return rows || [];
  const seen = new Set();
  return rows.filter((row) => {
    if (!row?.section_key) return true;
    if (seen.has(row.section_key)) return false;
    seen.add(row.section_key);
    return true;
  });
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout ?? REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchFromWordPress(slug, locale) {
  const wpBase = String(process.env.WP_BOOKING_URL || '')
    .trim()
    .replace(/\/$/, '') || WP_CANONICAL_URL;
  if (!wpBase) return [];

  const variants = buildSlugVariants(slug);
  if (!variants.length) return [];

  const combined = [];

  for (const variant of variants) {
    try {
      const params = new URLSearchParams({
        slug: variant,
        locale: String(locale || ''),
        nocache: String(Date.now()),
      });
      const response = await fetchWithTimeout(
        `${wpBase}${PAGE_CONTENT_PATH}?${params.toString()}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache',
          },
          cache: 'no-store',
        }
      );

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        continue;
      }

      const data = await response.json().catch(() => []);
      if (Array.isArray(data) && data.length) {
        combined.push(...data);
      }
    } catch {
      continue;
    }
  }

  return dedupeRows(normalizeRows(combined));
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawSlug = String(req.query?.slug || '').trim().replace(/^#/, '');
  const locale = String(req.query?.locale || 'en').trim() || 'en';

  if (!rawSlug || rawSlug.length > MAX_SLUG_LENGTH) {
    return res.status(400).json({ error: 'Missing or invalid slug query parameter' });
  }

  try {
    const wpRows = await fetchFromWordPress(rawSlug, locale);
    if (!wpRows.length) {
      return res.status(404).json({
        error: 'No page content found in WordPress',
        rows: [],
        source: 'wordpress',
      });
    }

    return res.status(200).json({
      rows: applyContentFixes(wpRows, rawSlug, locale),
      source: 'wordpress',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to load page content from WordPress',
      details: error instanceof Error ? error.message : 'unknown error',
    });
  }
}
