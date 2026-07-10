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
const serviceKey =
  getEnv('SUPABASE_SERVICE_ROLE_KEY') ||
  getEnv('VITE_SUPABASE_SERVICE_ROLE_KEY') ||
  getEnv('VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY');

if (!supabaseUrl || !serviceKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const slugs = [
  'things-to-do',
  'koh-tao-info',
  'sail-rock',
  'shark-island',
  'htms-sattakut',
  'japanese-gardens',
  'mango-bay',
  'twins-pinnacle',
  'chumphon-pinnacle',
  'south-west-pinnacle',
  'instructor',
  'msdt-program',
  'pro-level-courses',
  'divemaster',
  'viewpoints-koh-tao',
  'food-drink',
  'how-to-get-here',
  'medical-services',
  'weather-koh-tao',
  'koh-tao-dive-sites',
  'nudibranchs',
  'green-sea-turtle',
  'blacktip-reef-shark',
  'hawksbill-sea-turtle',
  'marine-life-page',
  'advanced',
  'scuba-diver',
  'discover-scuba',
  'rescue',
];

const endpoint = new URL('/rest/v1/page_content?select=page_slug,locale,section_key', supabaseUrl);
endpoint.searchParams.set('page_slug', `in.(${slugs.join(',')})`);
endpoint.searchParams.set('order', 'page_slug.asc,locale.asc,section_key.asc');

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
        const counts = new Map();

        for (const row of rows) {
          const key = `${row.page_slug}|${row.locale}`;
          if (!counts.has(key)) counts.set(key, new Set());
          counts.get(key).add(row.section_key);
        }

        for (const slug of slugs) {
          const en = counts.get(`${slug}|en`)?.size || 0;
          const nl = counts.get(`${slug}|nl`)?.size || 0;
          console.log(`${slug}: en=${en}, nl=${nl}`);
        }
      });
    }
  )
  .on('error', (error) => {
    console.error(error);
    process.exit(1);
  });
