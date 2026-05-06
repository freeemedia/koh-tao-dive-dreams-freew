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
  return buildWpUrl('/wp-json/ktd/v1/page-metadata');
};

export default async function handler(req, res) {
  try {
    // Validate admin authentication
    const adminToken = getAdminAuthToken(req);
    if (!adminToken || !isAdminAuthed(adminToken)) {
      return res.status(401).json({ error: 'Not authenticated. Please provide valid admin token.' });
    }

    const wpUrl = buildWpEndpoint();

    // GET - Fetch all page metadata
    if (req.method === 'GET') {
      const response = await fetch(wpUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.WP_BOOKING_API_KEY || ''}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          // Return empty array if no metadata found
          return res.status(200).json([]);
        }
        throw new Error(`WordPress API error: ${response.status}`);
      }

      const data = await response.json();
      return res.status(200).json(Array.isArray(data) ? data : []);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Page metadata API error:', error);
    return res.status(200).json([]); // Return empty array on error to prevent breaking UI
  }
}
