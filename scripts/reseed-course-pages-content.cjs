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
  console.error('Missing SUPABASE_URL or SERVICE_ROLE_KEY');
  process.exit(1);
}

const pages = {
  advanced: {
    en: {
      hero_title: 'PADI Advanced Open Water Course',
      hero_subtitle:
        'Expand your skills with five Adventure Dives including deep and navigation. Perfect for exploring deeper dive sites.',
      course_overview:
        'The PADI Advanced Open Water course improves your underwater skills through hands-on dives. Includes Deep, Navigation, Peak Performance Buoyancy, and two electives like Night or Wreck diving.',
      price_thb: '10500',
      price_usd: '300',
      price_eur: '275',
      duration: '2 days',
      section_1_title: "What you'll do",
      section_1_content:
        '5 adventure dives (can be done over 2-3 days)\nPractice deep dive techniques and navigation\nImprove buoyancy and comfort underwater\nChoose electives: Night, Wreck, Fish ID, Photography, etc.',
      section_2_title: 'Prerequisites',
      section_2_content: 'Open Water Diver certification (or equivalent) and minimum age of 12.',
      section_3_title: 'Inclusions',
      section_3_content:
        'Course materials & PADI certification\nAll equipment rental\nBoat fees where applicable\nProfessional instruction',
      faq_1_question: 'Do I need to take a test?',
      faq_1_answer: 'No exam required! The Advanced course is all about experience and practice.',
      faq_2_question: 'Can I choose my Adventure Dives?',
      faq_2_answer:
        'Deep and Navigation are required. You choose 3 electives from options like Night, Wreck, Peak Performance Buoyancy, Fish ID, and more.',
    },
    nl: {
      hero_title: 'PADI Advanced Open Water-cursus',
      hero_subtitle:
        'Breid je vaardigheden uit met vijf Adventure Dives, waaronder diepduiken en navigatie. Perfect voor het verkennen van diepere duiklocaties.',
      course_overview:
        'De PADI Advanced Open Water-cursus verbetert je onderwatervaardigheden door middel van praktijkduiken. Inclusief Deep, Navigation, Peak Performance Buoyancy en twee keuzevakken zoals Night of Wreck diving.',
      price_thb: '10500',
      price_usd: '300',
      price_eur: '275',
      duration: '2 dagen',
      section_1_title: 'Wat je doet',
      section_1_content:
        '5 adventureduiken (kan in 2-3 dagen)\nOefenen van diepduiktechnieken en navigatie\nVerbeteren van drijfvermogen en comfort onder water\nKies keuzevakken: Night, Wreck, Fish ID, Fotografie, etc.',
      section_2_title: 'Vereisten',
      section_2_content: 'Open Water Diver-brevet (of gelijkwaardig) en minimumleeftijd van 12 jaar.',
      section_3_title: 'Inbegrepen',
      section_3_content:
        'Lesmateriaal en PADI-certificering\nHuur van alle uitrusting\nBootkosten waar van toepassing\nProfessionele instructie',
      faq_1_question: 'Moet ik een test doen?',
      faq_1_answer: 'Geen examen vereist! De Advanced-cursus draait helemaal om ervaring en praktijk.',
      faq_2_question: 'Kan ik mijn Adventure Dives kiezen?',
      faq_2_answer:
        'Deep en Navigation zijn verplicht. Je kiest 3 keuzevakken uit opties zoals Night, Wreck, Peak Performance Buoyancy, Fish ID, en meer.',
    },
  },
  'scuba-diver': {
    en: {
      hero_title: 'PADI Scuba Diver Course',
      hero_subtitle:
        'Experience the underwater world with confidence. The PADI Scuba Diver course is perfect for those who want to try scuba diving before committing to full certification.',
      course_overview:
        "The PADI Scuba Diver course introduces you to the underwater world in a fun and relaxed way. You'll learn basic scuba diving skills and explore shallow reefs, giving you the confidence to continue your diving journey. This course serves as an introduction to scuba diving and can lead to full Open Water certification.",
      price_thb: '8500',
      duration: '2-3 days',
      section_1_title: "What you'll learn",
      section_1_content:
        'Basic scuba diving theory and physics\nProper use of scuba equipment\nFundamental diving skills and safety procedures\nUnderwater communication and buddy system\nShallow water exploration and reef appreciation\nEnvironmental awareness and marine conservation',
      section_2_title: 'Course structure',
      section_2_content:
        "The course includes classroom sessions, confined water training, and open water dives. You'll complete 2 open water dives in waters no deeper than 12 meters (40 feet), making it accessible for most people.",
      section_3_title: 'Why choose Scuba Diver?',
      section_3_content:
        'Shorter commitment than full Open Water course\nPerfect introduction to scuba diving\nCan be upgraded to Open Water certification\nFun and relaxed learning environment\nExplore beautiful Koh Tao reefs',
    },
    nl: {
      hero_title: 'PADI Scuba Diver-cursus',
      hero_subtitle:
        'Ontdek de onderwaterwereld met vertrouwen. De PADI Scuba Diver-cursus is perfect voor wie duiken wil proberen voordat je voor volledige certificering gaat.',
      course_overview:
        'De PADI Scuba Diver-cursus laat je op een leuke en ontspannen manier kennismaken met de onderwaterwereld. Je leert basisvaardigheden voor duiken en verkent ondiepe riffen, zodat je met vertrouwen verder kunt in je duikavontuur. Deze cursus is een introductie tot duiken en kan worden opgewaardeerd naar volledige Open Water-certificering.',
      price_thb: '8500',
      duration: '2-3 dagen',
      section_1_title: 'Wat je leert',
      section_1_content:
        'Basis duiktheorie en -fysica\nCorrect gebruik van duikuitrusting\nFundamentele duikvaardigheden en veiligheidsprocedures\nOnderwatercommunicatie en buddy-systeem\nVerkenning van ondiep water en rifbewustzijn\nMilieubewustzijn en mariene natuurbescherming',
      section_2_title: 'Cursusopbouw',
      section_2_content:
        'De cursus bestaat uit theorielessen, training in beschut water en buitenwaterduiken. Je maakt 2 buitenwaterduiken in water tot maximaal 12 meter (40 voet), waardoor de cursus voor de meeste mensen toegankelijk is.',
      section_3_title: 'Waarom kiezen voor Scuba Diver?',
      section_3_content:
        'Kortere cursus dan de volledige Open Water-cursus\nPerfecte introductie tot duiken\nOp te waarderen naar Open Water-certificering\nLeuke en ontspannen leeromgeving\nVerken de prachtige riffen van Koh Tao',
    },
  },
  'discover-scuba': {
    en: {
      hero_title: 'Discover Scuba Diving (DSD)',
      hero_subtitle:
        'Explore the thrill of breathing underwater with no certification required. This beginner program is the perfect first dive experience on Koh Tao.',
      course_overview:
        'Discover Scuba Diving is designed for non-certified divers who want to safely experience real scuba diving with a professional instructor. You start with a simple briefing and essential skills in confined water, then continue to shallow open water for your first dive.',
      price_thb: '2500',
      price_usd: '72',
      price_eur: '66',
      duration: '1 day',
      section_1_title: 'How it works',
      section_1_content:
        'Step 1: Briefing and skills in confined water\nStep 2: First open water dive with close supervision',
      section_2_title: 'What is included',
      section_2_content:
        'Certified scuba dive professional\nUse of all scuba equipment\nMaximum 4 guests per instructor group\nOption to add extra dives',
      faq_1_question: 'What is Discover Scuba Diving (DSD)?',
      faq_1_answer:
        'DSD is a beginner experience that allows non-certified divers to try scuba diving in a controlled and supervised environment before committing to a full course.',
      faq_2_question: 'Do I need a certification to join DSD?',
      faq_2_answer: 'No. DSD is specifically designed for first-time divers and beginners.',
      faq_3_question: 'What can I expect on the day?',
      faq_3_answer:
        'You will receive a short orientation, safety briefing and basic skills coaching before going for your first open water dive with your instructor.',
      faq_4_question: 'What is the DSD Deluxe option?',
      faq_4_answer:
        'Deluxe is an extended experience with extra dives and more underwater time, ideal if you want a deeper introduction before starting Open Water.',
    },
    nl: {
      hero_title: 'Discover Scuba Diving (DSD)',
      hero_subtitle:
        'Ervaar hoe het is om onder water te ademen, zonder brevet nodig. Dit beginnersprogramma is de perfecte eerste duikervaring op Koh Tao.',
      course_overview:
        'Discover Scuba Diving is gemaakt voor niet-gecertificeerde duikers die veilig willen kennismaken met echt duiken onder begeleiding van een professionele instructeur. Je start met een korte briefing en basisvaardigheden in beschut water, daarna ga je naar ondiep open water.',
      price_thb: '2500',
      price_usd: '72',
      price_eur: '66',
      duration: '1 dag',
      section_1_title: 'Hoe werkt het?',
      section_1_content:
        'Stap 1: Briefing en basisvaardigheden in beschut water\nStap 2: Eerste buitenwaterduik onder directe begeleiding',
      section_2_title: 'Wat is inbegrepen?',
      section_2_content:
        'Gecertificeerde duikprofessional\nGebruik van alle duikuitrusting\nMaximaal 4 deelnemers per instructeursgroep\nMogelijkheid om extra duiken toe te voegen',
      faq_1_question: 'Wat is Discover Scuba Diving (DSD)?',
      faq_1_answer:
        'DSD is een beginnerservaring waarmee niet-gecertificeerde duikers in een gecontroleerde, veilige omgeving kunnen kennismaken met duiken voordat ze een volledige cursus volgen.',
      faq_2_question: 'Heb ik een brevet nodig om mee te doen?',
      faq_2_answer:
        'Nee. DSD is juist bedoeld voor beginners en mensen die nog nooit hebben gedoken.',
      faq_3_question: 'Wat kan ik op de dag zelf verwachten?',
      faq_3_answer:
        'Je krijgt een korte uitleg, veiligheidsbriefing en oefent basisvaardigheden voordat je je eerste buitenwaterduik maakt met je instructeur.',
      faq_4_question: 'Wat is de DSD Deluxe-optie?',
      faq_4_answer:
        'Deluxe is een uitgebreidere ervaring met extra duiken en meer tijd onder water, ideaal als je daarna mogelijk verder wilt met Open Water.',
    },
  },
  rescue: {
    en: {
      hero_title: 'PADI Rescue Diver',
      hero_subtitle:
        'Develop the skills and confidence to manage dive emergencies and assist others. The Rescue Diver course is an important step for all serious divers.',
      course_overview:
        'The Rescue Diver course teaches you to prevent and manage diving emergencies, perform rescues and work confidently as part of a dive team.',
      main:
        'The Rescue Diver course teaches you to prevent and manage diving emergencies, perform rescues and work confidently as part of a dive team.',
      price_thb: '10000',
      price_usd: '290',
      price_eur: '265',
      duration: '3 days',
      section_1_title: 'Skills covered',
      section_1_content:
        'Self-rescue and diver stress recognition\nRescue scenarios and techniques\nEmergency management and equipment\nRescue breathing and casualty care',
      section_2_title: 'Structure and prerequisites',
      section_2_content:
        'Duration: Typically 3 days including pool and open water sessions. Prerequisite: EFR (or equivalent) and Open Water certification.',
      section_3_title: 'Inclusions',
      section_3_content:
        'Course materials and certification\nRescue skills training in pool and open water\nAll equipment rental',
      faq_1_question: 'Is Rescue difficult?',
      faq_1_answer:
        'The course is challenging but instructors support you step-by-step. Good fitness and comfort in the water help.',
    },
    nl: {
      hero_title: 'PADI Rescue Diver',
      hero_subtitle:
        'Ontwikkel de vaardigheden en het vertrouwen om duiknoodsituaties te beheersen en anderen te helpen. De Rescue Diver-cursus is een belangrijke stap voor serieuze duikers.',
      course_overview:
        'De Rescue Diver-cursus leert je duiknoodsituaties te voorkomen en te beheersen, reddingen uit te voeren en met vertrouwen als onderdeel van een duikteam te werken.',
      main:
        'De Rescue Diver-cursus leert je duiknoodsituaties te voorkomen en te beheersen, reddingen uit te voeren en met vertrouwen als onderdeel van een duikteam te werken.',
      price_thb: '10000',
      price_usd: '290',
      price_eur: '265',
      duration: '3 dagen',
      section_1_title: 'Behandelde vaardigheden',
      section_1_content:
        "Zelfredding en herkennen van duikerstress\nReddingsscenario's en technieken\nNoodmanagement en uitrusting\nReddingsbeademing en slachtofferzorg",
      section_2_title: 'Opbouw en vereisten vooraf',
      section_2_content:
        'Duur: meestal 3 dagen met zwembad- en buitenwatersessies. Vereist: EFR (of gelijkwaardig) en een Open Water-brevet.',
      section_3_title: 'Inbegrepen',
      section_3_content:
        'Lesmateriaal en certificering\nReddingsvaardigheidstraining in zwembad en buitenwater\nHuur van alle uitrusting',
      faq_1_question: 'Is Rescue moeilijk?',
      faq_1_answer:
        'De cursus is uitdagend, maar instructeurs begeleiden je stap voor stap. Een goede conditie en comfort in het water helpen.',
    },
  },
};

const rows = [];
for (const [pageSlug, locales] of Object.entries(pages)) {
  for (const [locale, entries] of Object.entries(locales)) {
    for (const [sectionKey, contentValue] of Object.entries(entries)) {
      rows.push({
        page_slug: pageSlug,
        locale,
        section_key: sectionKey,
        content_type: 'text',
        content_value: contentValue,
        updated_by: 'seed-script',
      });
    }
  }
}

const upsert = (batch) =>
  new Promise((resolve, reject) => {
    const body = JSON.stringify(batch);
    const url = new URL(`${supabaseUrl}/rest/v1/page_content`);
    url.searchParams.set('on_conflict', 'page_slug,section_key,locale');

    const req = https.request(
      url,
      {
        method: 'POST',
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates',
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve();
            return;
          }
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        });
      }
    );

    req.on('error', reject);
    req.write(body);
    req.end();
  });

(async () => {
  const batchSize = 50;
  let total = 0;

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    await upsert(batch);
    total += batch.length;
  }

  console.log(`Upserted ${total} rows.`);
})();
