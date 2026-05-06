/**
 * Admin endpoint for page content management
 * Proxies to WordPress REST API or local storage
 */

const getAdminAuthToken = (req) => {
  return req.headers['x-admin-login-token'] || req.query?.admin_token;
};

const isAdminAuthed = (req) => {
  const token = getAdminAuthToken(req);
  const adminToken = process.env.ADMIN_BOOKINGS_VIEW_TOKEN || process.env.VITE_ADMIN_BOOKINGS_VIEW_TOKEN;
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  return token && (token === adminToken || token === adminPassword);
};

const buildWpUrl = () => {
  let wpUrl = (process.env.WP_BOOKING_URL || '').trim().replace(/\/$/, '');
  if (!wpUrl || /admin\.divinginasia\.com$/i.test(wpUrl)) {
    wpUrl = 'https://lightsalmon-dinosaur-377714.hostingersite.com';
  }
  return wpUrl;
};

const getWpHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.WP_BOOKING_API_KEY || ''}`,
  'cache-control': 'no-cache',
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-login-token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // All admin endpoints require authentication
  if (!isAdminAuthed(req)) {
    return res.status(401).json({ error: 'Unauthorized: missing or invalid admin token' });
  }

  const wpUrl = buildWpUrl();
  const wpHeaders = getWpHeaders();

  try {
    if (req.method === 'GET') {
      // GET /api/admin/page-content
      // If 'listSlugs' param: return list of all available page slugs
      // If 'slug' param: return content rows for that slug
      const { slug, locale = 'en', listSlugs } = req.query;

      if (listSlugs === 'true') {
        // Return list of all page slugs available in WordPress
        try {
          const response = await fetch(`${wpUrl}/wp-json/ktd/v1/page-slugs`, {
            headers: wpHeaders,
            cache: 'no-store',
          });

          if (!response.ok) {
            // Fallback: return empty list if endpoint doesn't exist
            return res.status(200).json([]);
          }

          const slugs = await response.json();
          return res.status(200).json(Array.isArray(slugs) ? slugs : []);
        } catch (err) {
          // Fallback: return empty list
          return res.status(200).json([]);
        }
      }

      if (!slug) {
        return res.status(400).json({ error: 'slug parameter or listSlugs=true required' });
      }

      const params = new URLSearchParams({ slug, locale, nocache: String(Date.now()) });
      const response = await fetch(
        `${wpUrl}/wp-json/ktd/v1/page-content?${params.toString()}`,
        { headers: wpHeaders, cache: 'no-store' }
      );

      if (!response.ok) {
        throw new Error(`WordPress returned ${response.status}`);
      }

      const data = await response.json();
      return res.status(200).json(Array.isArray(data) ? data : []);
    }

    if (req.method === 'POST') {
      // POST /api/admin/page-content
      // Create/upsert page content row(s)
      // Body: { page_slug, section_key, locale, content_value, content_type }
      // or array of the above
      
      const body = req.body;
      if (!body || typeof body !== 'object') {
        return res.status(400).json({ error: 'Invalid request body' });
      }

      const rows = Array.isArray(body) ? body : [body];

      // Validate required fields
      for (const row of rows) {
        if (!row.page_slug || !row.section_key || !row.locale) {
          return res.status(400).json({ error: 'Missing required fields: page_slug, section_key, locale' });
        }
      }

      // Send to WordPress endpoint
      const response = await fetch(`${wpUrl}/wp-json/ktd/v1/page-content`, {
        method: 'POST',
        headers: wpHeaders,
        body: JSON.stringify(rows),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(`WordPress returned ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      return res.status(201).json(result);
    }

    if (req.method === 'PUT') {
      // PUT /api/admin/page-content/:id
      // Update a single page content row
      const { id } = req.query;
      const body = req.body;

      if (!id || !body) {
        return res.status(400).json({ error: 'Missing id or body' });
      }

      const response = await fetch(`${wpUrl}/wp-json/ktd/v1/page-content/${id}`, {
        method: 'PUT',
        headers: wpHeaders,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(`WordPress returned ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      return res.status(200).json(result);
    }

    if (req.method === 'DELETE') {
      // DELETE /api/admin/page-content/:id
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Missing id' });
      }

      const response = await fetch(`${wpUrl}/wp-json/ktd/v1/page-content/${id}`, {
        method: 'DELETE',
        headers: wpHeaders,
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(`WordPress returned ${response.status}: ${errorText}`);
      }

      return res.status(204).end();
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[admin/page-content]', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
