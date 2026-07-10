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
    page_title: 'Pro Level Courses & Instructor Specialties',
    page_subtitle:
      'Professional training programs and instructor specialty courses available on Koh Tao. Click a course to view details or enquire.',
    card_description: 'Professional development and instructor-level specialty training.',
    view_button: 'View',
    enquire_button: 'Enquire',
    footer_title: 'Enquire / Book a Pro Course',
    footer_body: "Complete the form below and we'll reply with availability and pricing.",
    footer_cta: 'Go to booking page',
    courses_list:
      'PADI Divemaster Course|/courses/divemaster\nPADI Instructor Course|/courses/instructor\nEFR Instructor Course\nPADI MSDT Program|/courses/msdt-program\nIDC Staff Instructor\nPADI IDC Schedule\nInstructor Specialties\nAWARE Fish ID\nBoat Instructor\nDeep Instructor\nDPV Instructor\nEmergency O2 Provider\nEquipment Instructor\nNight Diving Instructor\nNitrox Instructor\nSearch & Recovery\nSelf Reliant Instructor\nSidemount Instructor\nUnderwater Naturalist\nUnderwater Navigator\nWreck Instructor\nMSDT Instructor Specialty courses Koh Tao - Sidemount',
  },
  nl: {
    page_title: 'Pro Level Cursussen & Instructor-specialties',
    page_subtitle:
      'Professionele trainingsprogramma\'s en instructor-specialtycursussen op Koh Tao. Klik op een cursus voor details of informatie.',
    card_description: 'Professionele ontwikkeling en specialtytraining op instructeursniveau.',
    view_button: 'Bekijken',
    enquire_button: 'Informatie',
    footer_title: 'Informatie / Boek een pro-cursus',
    footer_body: 'Vul het formulier in en wij reageren met beschikbaarheid en prijzen.',
    footer_cta: 'Naar boekingspagina',
    courses_list:
      'PADI Divemaster-cursus|/courses/divemaster\nPADI Instructor-cursus|/courses/instructor\nEFR Instructor-cursus\nPADI MSDT-programma|/courses/msdt-program\nIDC Staff Instructor\nPADI IDC-schema\nInstructor-specialties\nAWARE Fish ID\nBoot Instructor\nDeep Instructor\nDPV Instructor\nEmergency O2 Provider\nEquipment Instructor\nNight Diving Instructor\nNitrox Instructor\nSearch & Recovery\nSelf Reliant Instructor\nSidemount Instructor\nUnderwater Naturalist\nUnderwater Navigator\nWreck Instructor\nMSDT Instructor Specialty-cursussen Koh Tao - Sidemount',
  },
};

const rows = [];
for (const [locale, fields] of Object.entries(content)) {
  for (const [sectionKey, contentValue] of Object.entries(fields)) {
    rows.push({
      page_slug: 'pro-level-courses',
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
        console.log(`Upserted ${rows.length} pro-level-courses rows.`);
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
