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

const pages = {
  'things-to-do': {
    en: {
      title: 'Things to do on Koh Tao',
      subtitle: 'Discover adventure, relaxation, and island culture - there is more than just diving!',
      activities_title: 'Popular activities',
      activities_list:
        'Take a snorkeling tour to hidden bays\nJoin a Thai cooking class\nRent a kayak or paddleboard\nExplore the island hiking trails\nRelax with a beach massage\nJoin a yoga or fitness class\nEnjoy sunset views from a rooftop bar\nVisit local art galleries and markets',
      cta_fun_diving: 'Go fun diving',
      cta_beaches: 'Discover beaches',
      cta_viewpoints: 'Viewpoints',
      note: 'Koh Tao is more than just diving - there is plenty to explore on land and at sea.',
      ideas_title: 'Need more ideas?',
      ideas_list:
        'Take a day trip to Koh Nang Yuan for snorkeling and iconic views\nTry rock climbing or bouldering for land-based adventure\nTaste street food at the Sairee night market',
      more_inspiration: 'For more inspiration, check out our',
      activity_guide: 'activity guide',
    },
    nl: {
      title: 'Wat te doen op Koh Tao',
      subtitle: 'Ontdek avontuur, ontspanning en eilandcultuur - er is meer dan alleen duiken!',
      activities_title: 'Populaire activiteiten',
      activities_list:
        'Maak een snorkeltour naar verborgen baaien\nVolg een Thaise kookles\nHuur een kajak of paddleboard\nVerken de wandelroutes op het eiland\nOntspan met een massage op het strand\nDoe mee aan een yoga- of fitnessles\nGeniet van de zonsondergang bij een rooftop bar\nBezoek lokale kunstgaleries en markten',
      cta_fun_diving: 'Ga fun diven',
      cta_beaches: 'Ontdek stranden',
      cta_viewpoints: 'Uitzichtpunten',
      note: 'Koh Tao is meer dan alleen duiken - er is genoeg te ontdekken op land en zee.',
      ideas_title: 'Meer ideeen nodig?',
      ideas_list:
        'Maak een dagtrip naar Koh Nang Yuan voor snorkelen en iconische uitzichten\nProbeer rotsklimmen of boulderen voor avontuur op het land\nProef streetfood op de avondmarkt in Sairee',
      more_inspiration: 'Voor meer inspiratie, bekijk onze',
      activity_guide: 'gids met activiteiten',
    },
  },
  'koh-tao-info': {
    en: {
      title: 'About Koh Tao',
      description:
        'Koh Tao, which means "Turtle Island", is a small paradise in the Gulf of Thailand known for crystal-clear water, colorful coral reefs, and a laid-back island vibe. It is one of the best diving destinations in the world and offers activities for every type of traveler.',
      facts_list:
        'Location: 70 km off the east coast of Southern Thailand\nFamous for: diving, snorkeling, beautiful beaches, and marine life\nBest travel season: February to October\nPopular areas: Sairee Beach, Chalok Baan Kao, Mae Haad',
      highlights_title: 'Island highlights',
      highlights_list:
        'World-class dive sites and dive schools\nBeautiful viewpoints and hiking routes\nRelaxed nightlife and beach bars\nFresh seafood and Thai cuisine\nFriendly local community',
    },
    nl: {
      title: 'Over Koh Tao',
      description:
        'Koh Tao, wat "Schildpadeiland" betekent, is een klein paradijs in de Golf van Thailand dat bekendstaat om kristalhelder water, kleurrijke koraalriffen en een ontspannen eilandsfeer. Het is een van de beste duikbestemmingen ter wereld en biedt activiteiten voor ieder type reiziger.',
      facts_list:
        'Locatie: 70 km uit de oostkust van Zuid-Thailand\nBeroemd om: duiken, snorkelen, mooie stranden en zeeleven\nBeste reistijd: februari t/m oktober\nPopulaire gebieden: Sairee Beach, Chalok Baan Kao, Mae Haad',
      highlights_title: 'Hoogtepunten van het eiland',
      highlights_list:
        'Duiklocaties en duikscholen van wereldklasse\nPrachtige uitzichtpunten en wandelroutes\nOntspannen uitgaansleven en strandbars\nVerse seafood en Thaise keuken\nVriendelijke lokale gemeenschap',
    },
  },
};

const rows = [];

for (const [pageSlug, locales] of Object.entries(pages)) {
  for (const [locale, content] of Object.entries(locales)) {
    for (const [sectionKey, contentValue] of Object.entries(content)) {
      rows.push({
        page_slug: pageSlug,
        locale,
        section_key: sectionKey,
        content_type: 'text',
        content_value: contentValue,
      });
    }
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
        console.log(`Upserted ${rows.length} rows.`);
        console.log(data.slice(0, 500));
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
