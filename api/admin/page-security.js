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
  return buildWpUrl('/wp-json/ktd/v1/page-security');
};

export default async function handler(req, res) {
  try {
    // Validate admin authentication
    const adminToken = getAdminAuthToken(req);
    if (!adminToken || !isAdminAuthed(adminToken)) {
      return res.status(401).json({ error: 'Not authenticated. Please provide valid admin token.' });
    }

    const wpUrl = buildWpEndpoint();

    // GET - Fetch security settings by page_slug
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
          // Return default security settings if not found
          return res.status(200).json({
            is_secured: false,
            require_auth: false,
            require_admin: false,
            allowed_roles: [],
            ip_whitelist: '',
            rate_limit_enabled: true,
            rate_limit_requests: 100,
            rate_limit_window: 60,
            csrf_protection: true,
            xss_protection: true,
            content_security_policy: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
          });
        }
        throw new Error(`WordPress API error: ${response.status}`);
      }

      const data = await response.json();
      return res.status(200).json(data);
    }

    // PUT - Update security settings by page_slug
    if (req.method === 'PUT') {
      const body = req.body || {};
      const { page_slug } = body;

      if (!page_slug) {
        return res.status(400).json({ error: 'Missing required field: page_slug' });
      }

      const response = await fetch(wpUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.WP_BOOKING_API_KEY || ''}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`);
      }

      const data = await response.json();
      return res.status(200).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Page security API error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
