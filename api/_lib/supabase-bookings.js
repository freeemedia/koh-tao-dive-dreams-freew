function cleanProvider(value) {
  return String(value || '').trim().toLowerCase();
}

function parseTableRef(tableRef, defaultSchema) {
  const raw = String(tableRef || '').trim();
  if (!raw) return { schema: defaultSchema, table: 'bookings' };

  const parts = raw.split('.').map((p) => p.trim()).filter(Boolean);
  if (parts.length === 2) {
    return { schema: parts[0], table: parts[1] };
  }

  return { schema: defaultSchema, table: raw };
}

export function getDbProvider() {
  const provider = cleanProvider(process.env.DB_PROVIDER || 'hostinger');
  const allowSupabase = cleanProvider(process.env.ALLOW_SUPABASE_BOOKINGS) === 'true';
  const allowWordPress = cleanProvider(process.env.ALLOW_WORDPRESS_BOOKINGS) === 'true';

  // Safety guard: prevent accidental writes to Supabase for bookings unless explicitly enabled.
  if (provider === 'supabase' && !allowSupabase) {
    return 'hostinger';
  }

  // Safety guard: keep bookings on MySQL unless WordPress is explicitly opted in.
  if ((provider === 'wordpress' || provider === 'wp') && !allowWordPress) {
    return 'hostinger';
  }

  return provider || 'hostinger';
}

export function isSupabaseProvider() {
  return getDbProvider() === 'supabase';
}

export function isMySqlProvider() {
  const provider = getDbProvider();
  return provider === 'mysql' || provider === 'hostinger';
}

export function isWordPressProvider() {
  const provider = getDbProvider();
  return provider === 'wordpress' || provider === 'wp';
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

  const schema = 'public';
  const parsed = parseTableRef(process.env.SUPABASE_BOOKINGS_TABLE || 'bookings', schema);

  if (!url || !apiKey) {
    throw new Error('Missing SUPABASE_URL or Supabase API key (SUPABASE_SERVICE_ROLE_KEY preferred)');
  }

  return {
    url,
    apiKey,
    schema: parsed.schema,
    table: parsed.table,
  };
}

async function supabaseRequest(path, options = {}) {
  const { url, apiKey, schema } = getSupabaseConfig();
  const endpoint = `${url}/rest/v1/${path}`;
  const response = await fetch(endpoint, {
    method: options.method || 'GET',
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Accept-Profile': schema,
      'Content-Profile': schema,
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
  const query = `${table}?select=*&order=created_at.desc.nullslast`;
  const rows = await supabaseRequest(query);
  return Array.isArray(rows) ? rows : [];
}

export async function getSupabaseBookingById(id) {
  const { table } = getSupabaseConfig();
  const safeId = encodeURIComponent(String(id));
  const query = `${table}?id=eq.${safeId}&select=*&limit=1`;
  const rows = await supabaseRequest(query);

  if (!Array.isArray(rows) || !rows[0]) {
    throw new Error('Booking not found');
  }

  return rows[0];
}

export async function insertSupabaseBooking(payload) {
  const { table } = getSupabaseConfig();
  const query = `${table}?select=*`;
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
  const query = `${table}?id=eq.${safeId}&select=*`;
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
  const query = `${table}?id=eq.${safeId}`;
  await supabaseRequest(query, {
    method: 'DELETE',
    headers: {
      Prefer: 'return=minimal',
    },
  });

  return { deleted: id };
}
