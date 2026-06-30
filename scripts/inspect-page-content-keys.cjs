const fs = require('fs');
const https = require('https');

const slug = process.argv[2];

if (!slug) {
  console.error('Usage: node scripts/inspect-page-content-keys.cjs <page-slug>');
  process.exit(1);
}

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

const endpoint = new URL('/rest/v1/page_content?select=locale,section_key&page_slug=eq.' + encodeURIComponent(slug), supabaseUrl);
endpoint.searchParams.set('order', 'locale.asc,section_key.asc');

https
  .get(
    endpoint,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Accept: 'application/json',
      },
    },
    (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
          console.error(`Request failed with status ${res.statusCode}`);
          console.error(data);
          process.exit(1);
        }

        const rows = JSON.parse(data || '[]');
        const byLocale = new Map();

        for (const row of rows) {
          if (!byLocale.has(row.locale)) byLocale.set(row.locale, []);
          byLocale.get(row.locale).push(row.section_key);
        }

        for (const locale of ['en', 'nl']) {
          const keys = byLocale.get(locale) || [];
          console.log(`${locale} (${keys.length})`);
          for (const key of keys) {
            console.log(`  - ${key}`);
          }
        }
      });
    }
  )
  .on('error', (error) => {
    console.error(error);
    process.exit(1);
  });
