import { buildWpUrl } from '../helpers.js';

// Helper to extract admin token from request headers
const getAdminAuthToken = (req) => {
  return req.headers['x-admin-login-token'] || req.query.token;
};

// Helper to validate admin authentication
const isAdminAuthed = (token) => {
  const validTokens = process.env.ADMIN_BOOKINGS_VIEW_TOKEN || '';
  const validPasswords = process.env.ADMIN_PASSWORD || '';
  
  // Check against valid tokens (comma-separated list)
  if (validTokens && validTokens.split(',').some(t => t.trim() === token)) {
    return true;
  }
  
  // Check against valid passwords (comma-separated list)
  if (validPasswords && validPasswords.split(',').some(p => p.trim() === token)) {
    return true;
  }
  
  return false;
};

// Helper to construct WordPress endpoint with fallback
const buildWpEndpoint = () => {
  return buildWpUrl('/wp-json/ktd/v1/page-seo');
};

export default async function handler(req, res) {
  try {
    // Validate admin authentication
    const adminToken = getAdminAuthToken(req);
    if (!adminToken || !isAdminAuthed(adminToken)) {
      return res.status(401).json({ error: 'Not authenticated. Please provide valid admin token.' });
    }

    const wpUrl = buildWpEndpoint();

    // GET - Fetch single SEO metadata by page_slug
    if (req.method === 'GET') {
      const { slug } = req.query;
      
      if (!slug) {
        return res.status(400).json({ error: 'Missing required query parameter: slug' });
      }

      const response = await fetch(`${wpUrl}?page_slug=${encodeURIComponent(slug)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.WP_BOOKING_API_KEY || ''}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          // Return default SEO data if not found
          return res.status(200).json({
            meta_title: '',
            meta_description: '',
            meta_keywords: '',
            canonical_url: '',
            robots: 'index, follow',
            og_title: '',
            og_description: '',
            og_image: '',
            og_type: 'website',
            twitter_card: 'summary_large_image',
            twitter_title: '',
            twitter_description: '',
            twitter_image: '',
            schema_type: 'WebPage',
            schema_json: null,
          });
        }
        throw new Error(`WordPress API error: ${response.status}`);
      }

      const data = await response.json();
      return res.status(200).json(data);
    }

    // PUT - Update SEO metadata by page_slug
    if (req.method === 'PUT') {
      const { page_slug, meta_title, meta_description, meta_keywords, canonical_url, robots, og_title, og_description, og_image, og_type, twitter_card, twitter_title, twitter_description, twitter_image, schema_type, schema_json } = req.body;

      if (!page_slug) {
        return res.status(400).json({ error: 'Missing required field: page_slug' });
      }

      const response = await fetch(wpUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.WP_BOOKING_API_KEY || ''}`,
        },
        body: JSON.stringify({
          page_slug,
          meta_title,
          meta_description,
          meta_keywords,
          canonical_url,
          robots,
          og_title,
          og_description,
          og_image,
          og_type,
          twitter_card,
          twitter_title,
          twitter_description,
          twitter_image,
          schema_type,
          schema_json: schema_json ? (typeof schema_json === 'string' ? schema_json : JSON.stringify(schema_json)) : null,
        }),
      });

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`);
      }

      const data = await response.json();
      return res.status(200).json(data);
    }

    // POST - Create new SEO metadata
    if (req.method === 'POST') {
      const { page_slug, meta_title, meta_description, meta_keywords, canonical_url, robots, og_title, og_description, og_image, og_type, twitter_card, twitter_title, twitter_description, twitter_image, schema_type, schema_json } = req.body;

      if (!page_slug) {
        return res.status(400).json({ error: 'Missing required field: page_slug' });
      }

      const response = await fetch(wpUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.WP_BOOKING_API_KEY || ''}`,
        },
        body: JSON.stringify({
          page_slug,
          meta_title,
          meta_description,
          meta_keywords,
          canonical_url,
          robots,
          og_title,
          og_description,
          og_image,
          og_type,
          twitter_card,
          twitter_title,
          twitter_description,
          twitter_image,
          schema_type,
          schema_json: schema_json ? (typeof schema_json === 'string' ? schema_json : JSON.stringify(schema_json)) : null,
        }),
      });

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`);
      }

      const data = await response.json();
      return res.status(201).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('SEO metadata API error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
