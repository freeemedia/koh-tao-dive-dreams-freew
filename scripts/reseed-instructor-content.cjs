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
    hero_title: 'PADI Open Water Scuba Instructor',
    hero_subtitle:
      'Train to become a PADI Instructor and teach divers worldwide. The Instructor Development Course (IDC) prepares candidates to lead courses and certify students.',
    cta_primary: 'Enquire About Instructor',
    section_overview_title: 'Program Overview',
    section_overview_body:
      'The Instructor pathway trains experienced divers to teach and certify new divers. The IDC includes teaching presentations, student evaluations and practical teaching experience with support from experienced staff instructors.',
    section_prereq_title: 'Prerequisites',
    section_prereq_body:
      'Prerequisite: PADI Divemaster (or equivalent), current EFR, and a minimum number of logged dives as required by PADI. Candidates must complete Instructor exams and assessments.',
    section_learn_title: "What you'll learn",
    section_learn_items:
      'Teaching and presentation skills\nCourse management and student evaluation\nRisk management and leadership\nMarketing and business development for instructors',
    section_inclusions_title: 'Inclusions',
    section_inclusions_items:
      'IDC materials and PADI registration\nPractical teaching sessions and mentoring\nExam preparation and exam fees (where applicable)',
    faq_title: 'FAQ',
    faq_1_q: 'How do I enrol in the IDC on Koh Tao?',
    faq_1_a:
      'Contact us for course dates, schedule options and the application process. We can guide you step-by-step from prerequisites to enrollment.',
    faq_2_q: 'Can I work as a PADI Instructor right after completing IDC?',
    faq_2_a:
      'Yes. After completing the IDC and passing the Instructor Examination (IE), you earn the PADI Open Water Scuba Instructor certification and can teach professionally.',
    faq_3_q: 'Can I continue professional training after the IDC?',
    faq_3_a:
      'Absolutely. After instructor certification, you can continue with pro-level development such as MSDT and beyond, depending on your experience and goals.',
    faq_4_q: 'Why choose Koh Tao for an IDC?',
    faq_4_a:
      'Koh Tao combines excellent dive sites, experienced instructors, affordable living costs and a strong dive community, making it one of the best places to build a dive career.',
    sidebar_title: 'Course Details',
    sidebar_badge: 'Pro Level',
    sidebar_subtitle: 'IDC · Instructor Examination · Practical Teaching',
    price_thb: '68900',
    sidebar_note: 'Contact us for a tailored Instructor pathway and exam dates.',
    sidebar_cta: 'Enquire / Apply',
    next_steps_title: 'Next steps',
    next_steps_body:
      "Send your diving resume and preferred start dates. We'll guide you through IDC prerequisites, schedules and placement opportunities.",
    contact_cta: 'Get in touch to book/enquire',
    contact_hint: 'Or use the form below to send a booking request directly.',
    bottom_cta: 'Send Booking Request',
  },
  nl: {
    hero_title: 'PADI Open Water Scuba Instructor',
    hero_subtitle:
      'Train om PADI-instructeur te worden en duikers wereldwijd op te leiden. De Instructor Development Course (IDC) bereidt je voor om cursussen te leiden en cursisten te certificeren.',
    cta_primary: 'Informatie over Instructor',
    section_overview_title: 'Programmaoverzicht',
    section_overview_body:
      'Het Instructor-traject leidt ervaren duikers op om nieuwe duikers op te leiden en te certificeren. De IDC omvat lespresentaties, studentbeoordelingen en praktijkervaring in lesgeven, met begeleiding van ervaren stafinstructeurs.',
    section_prereq_title: 'Toelatingseisen',
    section_prereq_body:
      'Vereisten: PADI Divemaster (of gelijkwaardig), geldige EFR en een minimumaantal gelogde duiken volgens PADI-richtlijnen. Kandidaten moeten de Instructor-examens en beoordelingen succesvol afronden.',
    section_learn_title: 'Wat je leert',
    section_learn_items:
      'Didactische en presentatievaardigheden\nCursusmanagement en studentbeoordeling\nRisicobeheer en leiderschap\nMarketing en zakelijke ontwikkeling voor instructeurs',
    section_inclusions_title: 'Inbegrepen',
    section_inclusions_items:
      'IDC-materialen en PADI-registratie\nPraktijklessen en mentoring\nExamenvoorbereiding en examenkosten (waar van toepassing)',
    faq_title: 'FAQ',
    faq_1_q: 'Hoe schrijf ik me in voor de IDC op Koh Tao?',
    faq_1_a:
      'Neem contact met ons op voor cursusdata, planning en het aanmeldproces. We begeleiden je stap voor stap van vereisten tot inschrijving.',
    faq_2_q: 'Kan ik direct na de IDC als PADI-instructeur werken?',
    faq_2_a:
      'Ja. Na afronding van de IDC en het behalen van het Instructor Examination (IE) ontvang je de PADI Open Water Scuba Instructor-certificering en kun je professioneel lesgeven.',
    faq_3_q: 'Kan ik na de IDC doorgaan met professionele training?',
    faq_3_a:
      'Absoluut. Na je instructeurscertificering kun je verder doorgroeien met pro-level trajecten zoals MSDT en meer, afhankelijk van je ervaring en doelen.',
    faq_4_q: 'Waarom Koh Tao kiezen voor een IDC?',
    faq_4_a:
      'Koh Tao combineert uitstekende duiklocaties, ervaren instructeurs, lagere kosten van levensonderhoud en een sterke duikcommunity. Daardoor is het een van de beste plekken om een duikcarriere op te bouwen.',
    sidebar_title: 'Cursusdetails',
    sidebar_badge: 'Pro Niveau',
    sidebar_subtitle: 'IDC · Instructor Examination · Praktijkles',
    price_thb: '68900',
    sidebar_note: 'Neem contact op voor een persoonlijk Instructor-traject en examendata.',
    sidebar_cta: 'Informatie / Aanmelden',
    next_steps_title: 'Volgende stappen',
    next_steps_body:
      'Stuur je duik-cv en gewenste startdata. Wij begeleiden je door IDC-vereisten, planning en doorgroeimogelijkheden.',
    contact_cta: 'Neem contact op voor boeking/informatie',
    contact_hint: 'Of gebruik onderstaand formulier om direct een boekingsaanvraag te sturen.',
    bottom_cta: 'Stuur boekingsaanvraag',
  },
};

const rows = [];
for (const [locale, fields] of Object.entries(content)) {
  for (const [sectionKey, contentValue] of Object.entries(fields)) {
    rows.push({
      page_slug: 'instructor',
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
        console.log(`Upserted ${rows.length} instructor rows.`);
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
