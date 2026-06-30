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

const page = {
  en: {
    hero_title: 'PADI Master Scuba Diver Trainer (MSDT) Program',
    hero_subtitle:
      'The PADI MSDT Program is designed for instructors who want to take their teaching career to the next level. This program provides you with the skills, experience, and certifications to teach a wide range of PADI specialty courses, making you more employable and confident as a dive professional.',
    why_title: 'Why Become an MSDT?',
    why_items:
      'Teach at least five PADI Specialty courses\nGain hands-on experience through team teaching and mentorship\nIncrease your employability and earning potential\nStand out to dive centers and resorts worldwide\nEnhance your confidence and teaching skills',
    overview_title: 'Program Overview',
    overview_items:
      'Choose five PADI Specialty Instructor ratings (e.g., Deep, Wreck, Nitrox, Night, Sidemount, etc.)\nParticipate in hands-on workshops and real-world teaching scenarios\nTeam teach with experienced Course Directors and Staff Instructors\nReceive guidance on course standards, logistics, and student management\nLog at least 25 certifications to qualify for the MSDT rating',
    prereq_title: 'Prerequisites',
    prereq_items:
      'PADI Open Water Scuba Instructor (OWSI) certification\nCurrent EFR Instructor\nMinimum 25 PADI student certifications (to apply for MSDT rating)\nMinimum age: 18 years',
    included_title: 'What\'s Included',
    included_items:
      'Five PADI Specialty Instructor courses\nTeam teaching and mentorship\nAll required training materials\nGuidance on application process\nAccess to experienced Course Directors',
    enroll_title: 'How to Enroll',
    enroll_body:
      'Ready to become a PADI Master Scuba Diver Trainer? Contact us for course dates, pricing, and to discuss your specialty choices.',
    enroll_cta: 'Enquire / Book Now',
  },
  nl: {
    hero_title: 'PADI Master Scuba Diver Trainer (MSDT) Programma',
    hero_subtitle:
      'Het PADI MSDT-programma is ontwikkeld voor instructeurs die hun lescarriere naar een hoger niveau willen brengen. Dit programma geeft je de vaardigheden, ervaring en certificeringen om een breed aanbod aan PADI-specialtycursussen te geven.',
    why_title: 'Waarom MSDT worden?',
    why_items:
      'Geef minimaal vijf PADI Specialty-cursussen\nDoe praktijkervaring op via team teaching en mentoring\nVergroot je inzetbaarheid en verdienpotentieel\nVal op bij duikcentra en resorts wereldwijd\nVersterk je zelfvertrouwen en lesvaardigheden',
    overview_title: 'Programmaoverzicht',
    overview_items:
      'Kies vijf PADI Specialty Instructor-ratings (bijv. Deep, Wreck, Nitrox, Night, Sidemount)\nVolg praktijkworkshops en realistische lessituaties\nWerk in teamverband met ervaren Course Directors en Staff Instructors\nOntvang begeleiding over standards, logistiek en studentmanagement\nLog minimaal 25 certificeringen om in aanmerking te komen voor de MSDT-rating',
    prereq_title: 'Toelatingseisen',
    prereq_items:
      'PADI Open Water Scuba Instructor (OWSI)-certificering\nGeldige EFR Instructor-status\nMinimaal 25 PADI-studentcertificeringen (voor MSDT-aanvraag)\nMinimumleeftijd: 18 jaar',
    included_title: 'Wat is inbegrepen',
    included_items:
      'Vijf PADI Specialty Instructor-cursussen\nTeam teaching en mentoring\nAlle benodigde trainingsmaterialen\nBegeleiding bij het aanvraagproces\nToegang tot ervaren Course Directors',
    enroll_title: 'Hoe schrijf je je in',
    enroll_body:
      'Klaar om PADI Master Scuba Diver Trainer te worden? Neem contact op voor cursusdata, prijzen en advies over je specialty-keuzes.',
    enroll_cta: 'Informatie / Boek nu',
  },
};

const rows = [];
for (const [locale, fields] of Object.entries(page)) {
  for (const [sectionKey, contentValue] of Object.entries(fields)) {
    rows.push({
      page_slug: 'msdt-program',
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
        console.log(`Upserted ${rows.length} msdt-program rows.`);
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
