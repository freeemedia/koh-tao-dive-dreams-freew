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
    return res.status(500).json({ error: 'Server misconfigured: missing Supabase credentials' });
  }

  if (req.method === 'GET') {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/booking_inquiries?select=*&order=created_at.desc`,
      { headers: sbHeaders() }
    );
    const data = await r.json();
    return res.status(r.ok ? 200 : r.status).json(data);
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    const record = {
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      course_title: body.course_title || body.item_title || '',
      preferred_date: body.preferred_date || null,
      experience_level: body.experience_level || null,
      message: body.message || null,
      status: 'pending',
      deposit_amount: body.deposit_amount ? String(body.deposit_amount) : null,
      deposit_currency: body.deposit_currency || null,
      payment_choice: body.payment_choice || null,
    };
    const r = await fetch(`${SUPABASE_URL}/rest/v1/booking_inquiries`, {
      method: 'POST',
      headers: sbHeaders({ 'Prefer': 'return=representation' }),
      body: JSON.stringify(record),
    });
    const data = await r.json();
    return res.status(r.ok ? 201 : r.status).json(Array.isArray(data) ? data[0] : data);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
