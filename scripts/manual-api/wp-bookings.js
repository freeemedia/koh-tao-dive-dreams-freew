export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const wpBase = process.env.WP_BASE_URL || 'https://lightsalmon-dinosaur-377714.hostingersite.com';
  const wpApiKey = (process.env.WP_BOOKING_API_KEY || '').trim();
  const perPage = req.query?.per_page || '15';

  const url = `${wpBase}/wp-json/ktd/v1/bookings?per_page=${perPage}`;
  const headers = { 'Content-Type': 'application/json' };
  if (wpApiKey) headers['x-ktd-api-key'] = wpApiKey;

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      return res.status(response.status).json({ error: `WP returned ${response.status}` });
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
