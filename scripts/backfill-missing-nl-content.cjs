const fs = require('fs');
const https = require('https');

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
const serviceKey = getEnv('SUPABASE_SERVICE_ROLE_KEY') || getEnv('VITE_SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !serviceKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const requestJson = (url, method = 'GET', body = null) =>
  new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;

    const req = https.request(
      url,
      {
        method,
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
          ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
          Prefer: method === 'POST' ? 'resolution=merge-duplicates,return=minimal' : 'return=representation',
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            if (!data) {
              resolve([]);
              return;
            }

            try {
              resolve(JSON.parse(data));
            } catch {
              resolve([]);
            }
            return;
          }

          reject(new Error(`Request failed with status ${res.statusCode}: ${data}`));
        });
      }
    );

    req.on('error', reject);

    if (payload) {
      req.write(payload);
    }

    req.end();
  });

const buildRowKey = (row) => `${row.page_slug}::${row.section_key}`;

const main = async () => {
  const allRows = await requestJson(
    `${supabaseUrl}/rest/v1/page_content?select=page_slug,section_key,locale,content_type,content_value`
  );

  const englishByKey = new Map();
  const dutchKeys = new Set();

  for (const row of allRows) {
    const key = buildRowKey(row);

    if (row.locale === 'en' && !englishByKey.has(key)) {
      englishByKey.set(key, row);
    }

    if (row.locale === 'nl') {
      dutchKeys.add(key);
    }
  }

  const missingDutchRows = [];

  for (const [key, englishRow] of englishByKey.entries()) {
    if (!dutchKeys.has(key)) {
      missingDutchRows.push({
        page_slug: englishRow.page_slug,
        section_key: englishRow.section_key,
        locale: 'nl',
        content_type: englishRow.content_type || 'text',
        content_value: englishRow.content_value || '',
      });
    }
  }

  if (missingDutchRows.length === 0) {
    console.log('No missing Dutch rows found.');
    return;
  }

  await requestJson(
    `${supabaseUrl}/rest/v1/page_content?on_conflict=page_slug,section_key,locale`,
    'POST',
    missingDutchRows
  );

  console.log(`Created ${missingDutchRows.length} missing Dutch rows.`);
};

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
