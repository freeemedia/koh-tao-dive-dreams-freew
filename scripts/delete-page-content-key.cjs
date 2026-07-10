const fs = require('fs');
const https = require('https');

const [pageSlug, locale, sectionKey] = process.argv.slice(2);

if (!pageSlug || !locale || !sectionKey) {
  console.error('Usage: node scripts/delete-page-content-key.cjs <page-slug> <locale> <section-key>');
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

const endpoint = new URL('/rest/v1/page_content', supabaseUrl);
endpoint.searchParams.set('page_slug', `eq.${pageSlug}`);
endpoint.searchParams.set('locale', `eq.${locale}`);
endpoint.searchParams.set('section_key', `eq.${sectionKey}`);

const req = https.request(
  endpoint,
  {
    method: 'DELETE',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Prefer: 'return=representation',
    },
  },
  (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
        const rows = JSON.parse(data || '[]');
        console.log(`Deleted ${rows.length} row(s).`);
        return;
      }
      console.error(`Request failed with status ${res.statusCode}`);
      console.error(data);
      process.exit(1);
    });
  }
);

req.on('error', (error) => {
  console.error(error);
  process.exit(1);
});

req.end();
