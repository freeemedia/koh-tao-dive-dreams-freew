import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function buildSlugVariants(slug) {
  const clean = String(slug || '').trim();
  const normalized = clean.replace(/^\/+/, '');
  const variants = [
    clean,
    normalized,
    `/${normalized}`,
    `/courses/${normalized}`,
  ].filter(Boolean);
  return [...new Set(variants)];
}

function normalizeRows(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.map((row) => ({
    section_key: row?.section_key,
    content_value: row?.content_value ?? null,
    updated_at: row?.updated_at ?? null,
    content_type: row?.content_type ?? null,
  }));
}

function applyContentFixes(rows, slug, locale) {
  if (!Array.isArray(rows) || !rows.length) return rows || [];

  const normalizedSlug = String(slug || '').replace(/^\/+/, '').toLowerCase();
  const normalizedLocale = String(locale || '').toLowerCase();

  if (normalizedSlug === 'fun-diving' && normalizedLocale.startsWith('en')) {
    return rows.map((row) => {
      if (row?.section_key === 'fun_diving_hero_subtitle') {
        return {
          ...row,
          content_value:
            "Experience the best of Koh Tao's underwater world with our professionally guided fun dive trips. Discover colorful coral reefs, encounter extraordinary marine life, and create unforgettable memories.",
        };
      }

      if (row?.section_key === 'fun_diving_hero_title') {
        return {
          ...row,
          content_value: 'Fun Diving Koh Tao',
        };
      }

      return row;
    });
  }

  return rows;
}

async function fetchFromWordPress(slug, locale) {
  const canonicalWpUrl = 'https://lightsalmon-dinosaur-377714.hostingersite.com';
  let wpUrl = (process.env.WP_BOOKING_URL || '').trim().replace(/\/$/, '');
  if (!wpUrl || /admin\.divinginasia\.com$/i.test(wpUrl)) {
    wpUrl = canonicalWpUrl;
  }
  if (!wpUrl) return null;

  const variants = buildSlugVariants(slug);
  const combined = [];

  for (const variant of variants) {
    const params = new URLSearchParams({ slug: variant, locale, nocache: String(Date.now()) });
    const response = await fetch(`${wpUrl}/wp-json/ktd/v1/page-content?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`WordPress page-content failed (${response.status}): ${text || 'unknown error'}`);
    }

    const data = await response.json().catch(() => []);
    if (Array.isArray(data) && data.length) {
      combined.push(...data);
    }
  }

  return normalizeRows(combined);
}

async function fetchFromSupabase(slug, locale) {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const normalizedSlug = String(slug || '').replace(/^\/+/, '');
  const orFilter = [
    `page_slug.eq.${normalizedSlug}`,
    `page_slug.eq./${normalizedSlug}`,
    `page_slug.eq./courses/${normalizedSlug}`,
    `page_slug.eq.${slug}`,
  ].join(',');

  const { data, error } = await supabase
    .from('page_content')
    .select('section_key, content_value, updated_at, content_type')
    .eq('locale', locale)
    .or(orFilter);

  if (error) {
    throw new Error(error.message || 'Supabase page-content query failed');
  }

  return normalizeRows(data);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const slug = String(req.query?.slug || '').trim();
  const locale = String(req.query?.locale || 'en').trim() || 'en';

  if (!slug) {
    return res.status(400).json({ error: 'Missing slug query parameter' });
  }

  try {
    const wpRows = await fetchFromWordPress(slug, locale);
    if (wpRows && wpRows.length) {
      return res.status(200).json({ rows: applyContentFixes(wpRows, slug, locale), source: 'wordpress' });
    }

    const sbRows = await fetchFromSupabase(slug, locale);
    return res.status(200).json({ rows: applyContentFixes(sbRows || [], slug, locale), source: 'supabase' });
  } catch (wpOrSbError) {
    try {
      const sbRows = await fetchFromSupabase(slug, locale);
      return res.status(200).json({ rows: applyContentFixes(sbRows || [], slug, locale), source: 'supabase-fallback' });
    } catch (sbError) {
      return res.status(500).json({
        error: 'Failed to load page content',
        details: wpOrSbError instanceof Error ? wpOrSbError.message : 'unknown error',
        fallback: sbError instanceof Error ? sbError.message : 'unknown error',
      });
    }
  }
}
