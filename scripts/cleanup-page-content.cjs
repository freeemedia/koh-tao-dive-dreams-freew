const fs = require('fs');
const https = require('https');

const APPLY = process.argv.includes('--apply');

const readEnvFile = () => {
  for (const name of ['.env.local', '.env']) {
    try {
      return fs.readFileSync(name, 'utf8');
    } catch {
      // try next
    }
  }
  return '';
};

const envText = readEnvFile();

const getEnv = (name) => {
  const pattern = new RegExp(`^${name}=(.*)$`, 'm');
  const value = (envText.match(pattern) || [])[1] || process.env[name] || '';
  return String(value).replace(/^"|"$/g, '').trim();
};

const supabaseUrl = getEnv('SUPABASE_URL') || getEnv('VITE_SUPABASE_URL');
const serviceKey =
  getEnv('SUPABASE_SERVICE_ROLE_KEY') ||
  getEnv('VITE_SUPABASE_SERVICE_ROLE_KEY') ||
  getEnv('VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY');

if (!supabaseUrl || !serviceKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const request = (url, { method = 'GET', body = '', headers = {} } = {}) =>
  new Promise((resolve, reject) => {
    const endpoint = new URL(url, supabaseUrl);

    const req = https.request(
      endpoint,
      {
        method,
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          ...headers,
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({ status: res.statusCode || 0, data });
        });
      }
    );

    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });

const isObviousTestRow = (row) => {
  const sectionKey = String(row.section_key || '').trim().toLowerCase();
  const value = String(row.content_value || '').trim().toLowerCase();

  if (/^test([_-]|$)/.test(sectionKey)) return true;
  if (/^(test|twst|asdf|qwe|zzz)$/.test(value)) return true;
  return false;
};

const getKey = (row) => `${row.page_slug}::${row.section_key}::${row.locale}`;

const chunk = (items, size) => {
  const out = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
};

const main = async () => {
  const selectPath =
    '/rest/v1/page_content?select=id,page_slug,section_key,locale,updated_at,content_value&order=page_slug.asc,section_key.asc,locale.asc,updated_at.desc';

  const res = await request(selectPath, { headers: { Accept: 'application/json' } });

  if (res.status < 200 || res.status >= 300) {
    console.error(`Failed to load rows: ${res.status}`);
    console.error(res.data);
    process.exit(1);
  }

  const rows = JSON.parse(res.data || '[]');

  const keepers = new Set();
  const duplicateIds = [];

  for (const row of rows) {
    const key = getKey(row);
    if (!keepers.has(key)) {
      keepers.add(key);
      continue;
    }
    duplicateIds.push(row.id);
  }

  const obviousTestIds = rows.filter(isObviousTestRow).map((row) => row.id);
  const idsToDelete = Array.from(new Set([...duplicateIds, ...obviousTestIds])).filter(Boolean);

  console.log(`Total rows scanned: ${rows.length}`);
  console.log(`Duplicate rows: ${duplicateIds.length}`);
  console.log(`Obvious test rows: ${obviousTestIds.length}`);
  console.log(`Total rows marked for deletion: ${idsToDelete.length}`);

  if (!APPLY) {
    console.log('Dry run only. Re-run with --apply to execute deletes.');
    return;
  }

  if (!idsToDelete.length) {
    console.log('No rows to delete.');
    return;
  }

  let deleted = 0;
  for (const ids of chunk(idsToDelete, 100)) {
    const idFilter = ids.join(',');
    const deletePath = `/rest/v1/page_content?id=in.(${idFilter})`;
    const del = await request(deletePath, {
      method: 'DELETE',
      headers: { Prefer: 'return=minimal' },
    });

    if (del.status < 200 || del.status >= 300) {
      console.error(`Delete failed: ${del.status}`);
      console.error(del.data);
      process.exit(1);
    }

    deleted += ids.length;
  }

  console.log(`Deleted rows: ${deleted}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
