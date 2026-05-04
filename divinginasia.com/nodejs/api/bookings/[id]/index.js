const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const sbHeaders = (extra = {}) => ({
  'Content-Type': 'application/json',
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
  ...extra,
});

export default async function handler(req, res) {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/booking_inquiries?id=eq.${encodeURIComponent(id)}`,
    { method: 'DELETE', headers: sbHeaders() }
  );

  return res.status(r.ok ? 200 : r.status).json({ success: r.ok });
}
