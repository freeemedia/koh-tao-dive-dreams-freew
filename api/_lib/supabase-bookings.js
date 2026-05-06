function cleanProvider(value) {
  return String(value || '').trim().toLowerCase();
}

export function getDbProvider() {
  const provider = cleanProvider(process.env.DB_PROVIDER || 'wordpress');
  return provider || 'wordpress';
}

export function isSupabaseProvider() {
  return getDbProvider() === 'supabase';
}

function getSupabaseConfig() {
  const url = (
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    ''
  ).trim().replace(/\/$/, '');

  const apiKey = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_URL_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    ''
  ).trim();

  const table = (process.env.SUPABASE_BOOKINGS_TABLE || 'bookings').trim() || 'bookings';

  if (!url || !apiKey) {
    throw new Error('Missing SUPABASE_URL or Supabase API key (SUPABASE_SERVICE_ROLE_KEY preferred)');
  }

  return { url, apiKey, table };
}

async function supabaseRequest(path, options = {}) {
  const { url, apiKey } = getSupabaseConfig();
  const endpoint = `${url}/rest/v1/${path}`;
  const response = await fetch(endpoint, {
    method: options.method || 'GET',
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text || null;
  }

  if (!response.ok) {
    const message = (data && (data.message || data.error_description || data.error)) || text || `Supabase request failed (${response.status})`;
    throw new Error(String(message));
  }

  return data;
}

export async function listSupabaseBookings() {
  const { table } = getSupabaseConfig();
  const query = `${encodeURIComponent(table)}?select=*&order=created_at.desc.nullslast`;
  const rows = await supabaseRequest(query);
  return Array.isArray(rows) ? rows : [];
}

export async function insertSupabaseBooking(payload) {
  const { table } = getSupabaseConfig();
  const query = `${encodeURIComponent(table)}?select=*`;
  const rows = await supabaseRequest(query, {
    method: 'POST',
    headers: {
      Prefer: 'return=representation',
    },
    body: payload,
  });

  if (!Array.isArray(rows) || !rows[0]) {
    throw new Error('Supabase insert did not return a row');
  }

  return rows[0];
}

export async function updateSupabaseBookingById(id, updates) {
  const { table } = getSupabaseConfig();
  const safeId = encodeURIComponent(String(id));
  const query = `${encodeURIComponent(table)}?id=eq.${safeId}&select=*`;
  const rows = await supabaseRequest(query, {
    method: 'PATCH',
    headers: {
      Prefer: 'return=representation',
    },
    body: updates,
  });

  if (!Array.isArray(rows) || !rows[0]) {
    throw new Error('Booking not found for update');
  }

  return rows[0];
}

export async function deleteSupabaseBookingById(id) {
  const { table } = getSupabaseConfig();
  const safeId = encodeURIComponent(String(id));
  const query = `${encodeURIComponent(table)}?id=eq.${safeId}`;
  await supabaseRequest(query, {
    method: 'DELETE',
    headers: {
      Prefer: 'return=minimal',
    },
  });

  return { deleted: id };
}
