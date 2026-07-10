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

const content = {
  en: {
    hero_title: 'PADI Divemaster Course',
    hero_subtitle:
      'Begin your professional diving career. Learn leadership, supervision, and dive management skills.',
    course_overview:
      'The Divemaster program develops your dive leadership skills including supervising dive activities, assisting instructors, and guiding certified divers.',
    price_thb: '41000',
    price_usd: '1190',
    price_eur: '1090',
    duration: '2-4 weeks',
  },
  nl: {
    hero_title: 'PADI Divemaster-cursus',
    hero_subtitle:
      'Begin je professionele duikcarriere. Leer leiderschaps-, supervisie- en duikbeheervaardigheden.',
    course_overview:
      'Het Divemaster-programma ontwikkelt je duikleiderschapsvaardigheden, waaronder het superviseren van duikactiviteiten, assisteren van instructeurs en begeleiden van gecertificeerde duikers.',
    price_thb: '41000',
    price_usd: '1190',
    price_eur: '1090',
    duration: '2-4 weken',
  },
};

const rows = [];
for (const [locale, fields] of Object.entries(content)) {
  for (const [sectionKey, contentValue] of Object.entries(fields)) {
    rows.push({
      page_slug: 'divemaster',
      locale,
      section_key: sectionKey,
      content_type: 'text',
      content_value: contentValue,
    });
  }
}

const body = JSON.stringify(rows);
const endpoint = new URL('/rest/v1/page_content?on_conflict=page_slug,section_key,locale', supabaseUrl);

const req = https.request(
  endpoint,
  {
    method: 'POST',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=representation',
      'Content-Length': Buffer.byteLength(body),
    },
  },
  (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
        console.log(`Upserted ${rows.length} divemaster rows.`);
        console.log(data.slice(0, 300));
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

req.write(body);
req.end();
