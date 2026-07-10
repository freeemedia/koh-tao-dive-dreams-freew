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
  'viewpoints-koh-tao': {
    en: {
      title: 'Viewpoints on Koh Tao',
      subtitle: 'Breathtaking panoramas and unforgettable photo moments.',
      section_title: 'Island viewpoints',
      points_list:
        'John-Suwan Viewpoint:|Panoramic views over Chalok Baan Kao and Shark Bay.\nFraggle Rock:|Views over Sairee Beach and the west coast.\nLove Koh Tao Viewpoint:|Perfect for sunrise and photos.\nMango Viewpoint:|Wide views over the north of the island.',
      note: 'Most viewpoints require a short hike. Bring water, sun protection, and a camera!',
      cta_hiking_activities: 'Hiking & activities',
      cta_discover_beaches: 'Discover beaches',
      hiking_tips_title: 'Hiking tips',
      hiking_tips_list:
        'Start early for sunrise and cooler temperatures\nWear sturdy shoes and bring enough water\nTrails can be steep and slippery after rain\nBest light for photography: early morning and sunset',
    },
    nl: {
      title: 'Uitzichtpunten op Koh Tao',
      subtitle: "Adembenemende panorama's en onvergetelijke fotomomenten.",
      section_title: 'Uitzichtpunten op het eiland',
      points_list:
        "John-Suwan Viewpoint:|Panoramisch uitzicht over Chalok Baan Kao en Shark Bay.\nFraggle Rock:|Uitzicht over Sairee Beach en de westkust.\nLove Koh Tao Viewpoint:|Perfect voor zonsopkomst en foto's.\nMango Viewpoint:|Weids uitzicht over het noorden van het eiland.",
      note: 'Voor de meeste uitzichtpunten is een korte wandeling nodig. Neem water, zonbescherming en een camera mee!',
      cta_hiking_activities: 'Wandelen & activiteiten',
      cta_discover_beaches: 'Ontdek stranden',
      hiking_tips_title: 'Wandeltips',
      hiking_tips_list:
        'Begin vroeg voor zonsopkomst en koelere temperaturen\nDraag stevige schoenen en neem voldoende water mee\nPaden kunnen steil en glad zijn na regen\nBeste licht voor fotografie: vroeg in de ochtend en bij zonsondergang',
    },
  },
  'food-drink': {
    en: {
      title: 'Food & drinks on Koh Tao',
      subtitle: 'Discover delicious Thai dishes, fresh seafood, and sunset beach bars.',
      highlights_title: 'Culinary highlights',
      highlights_list:
        'Wide range of Thai and international restaurants\nFresh seafood available at many beachfront spots\nStreet food stalls for quick and affordable meals\nMany vegetarian and vegan options\nBeach bars and cafes for sunset drinks',
      intro:
        'Try local favorites like Pad Thai, Som Tam, and freshly grilled fish. On Koh Tao you will find everything from simple beach shacks to upscale restaurants.',
      cta_more_activities: 'More activities',
      cta_find_stay: 'Find accommodation',
      tip: 'Tip: tap water is not drinkable - buy bottled water or refill at water stations.',
      taste_title: 'Must-try dishes',
      tastes_list:
        'Pad Thai - stir-fried rice noodles with shrimp or chicken\nSom Tam - spicy green papaya salad\nFresh grilled fish with lime and chili\nMango sticky rice for dessert',
    },
    nl: {
      title: 'Eten & drinken op Koh Tao',
      subtitle: 'Ontdek heerlijke Thaise gerechten, verse seafood en strandbars bij zonsondergang.',
      highlights_title: 'Culinaire highlights',
      highlights_list:
        'Groot aanbod aan Thaise en internationale restaurants\nVerse seafood bij veel plekken aan het strand\nStreetfood-kraampjes voor snelle en betaalbare maaltijden\nVeel vegetarische en vegan opties\nStrandbars en cafes voor drankjes bij zonsondergang',
      intro:
        'Probeer lokale favorieten zoals Pad Thai, Som Tam en vers gegrilde vis. Op Koh Tao vind je alles: van eenvoudige strandtentjes tot luxe restaurants.',
      cta_more_activities: 'Meer activiteiten',
      cta_find_stay: 'Zoek verblijf',
      tip: 'Tip: kraanwater is niet drinkbaar - koop flessenwater of vul bij waterpunten.',
      taste_title: 'Aanraders om te proeven',
      tastes_list:
        'Pad Thai - gebakken rijstnoedels met garnalen of kip\nSom Tam - pittige groene papajasalade\nVerse gegrilde vis met limoen en chili\nMango sticky rice als dessert',
    },
  },
  'how-to-get-here': {
    en: {
      title: 'How to get to Koh Tao',
      subtitle: 'Different routes to reach this island paradise.',
      options_title: 'Travel options',
      options_list:
        'By ferry:|Koh Tao is only accessible by boat. Ferries depart from Chumphon, Surat Thani, Koh Samui, and Koh Phangan. Popular operators include Lomprayah, Songserm, and Seatran.\nBy train:|Take a train from Bangkok to Chumphon and transfer to the ferry there.\nBy bus:|Buses from Bangkok and other cities connect to ferry terminals in Chumphon and Surat Thani.\nBy plane:|Fly to Koh Samui, Chumphon, or Surat Thani and then take a ferry to Koh Tao.',
      cta_book_stay: 'Book accommodation',
      cta_visa_info: 'Visa information',
      tip: 'Tip: book ferry tickets early during high season. Most ferries arrive at Mae Haad Pier.',
      ferry_title: 'Ferry options',
      ferry_options_list:
        'Speed boat:|1-1.5 hours, more expensive but faster\nNight ferry:|Cheaper option, arrival in the morning\nDay ferry:|Standard option with scenic views\n|Check operator websites for schedules and discounts',
    },
    nl: {
      title: 'Hoe kom je op Koh Tao',
      subtitle: 'Verschillende routes om dit eilandparadijs te bereiken.',
      options_title: 'Reisopties',
      options_list:
        'Met de ferry:|Koh Tao is alleen per boot bereikbaar. Ferries vertrekken vanaf Chumphon, Surat Thani, Koh Samui en Koh Phangan. Bekende aanbieders zijn Lomprayah, Songserm en Seatran.\nMet de trein:|Reis met de trein van Bangkok naar Chumphon en stap daar over op de ferry.\nMet de bus:|Bussen vanuit Bangkok en andere steden sluiten aan op ferryterminals in Chumphon en Surat Thani.\nMet het vliegtuig:|Vlieg naar Koh Samui, Chumphon of Surat Thani en neem daarna de ferry naar Koh Tao.',
      cta_book_stay: 'Boek verblijf',
      cta_visa_info: 'Visuminformatie',
      tip: 'Tip: boek ferrytickets in het hoogseizoen op tijd. De meeste ferries komen aan bij Mae Haad Pier.',
      ferry_title: 'Ferry-opties',
      ferry_options_list:
        "Speedboot:|1-1,5 uur, duurder maar sneller\nNachtferry:|Goedkopere optie, aankomst in de ochtend\nDagferry:|Standaardoptie met mooie uitzichten\n|Bekijk websites van operators voor schema's en kortingen",
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
