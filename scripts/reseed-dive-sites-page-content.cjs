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
  'koh-tao-dive-sites': {
    en: {
      hero_title: 'Dive sites around Koh Tao',
      hero_text: 'Discover more than 25 incredible dive sites around Koh Tao, from shallow coral reefs to deep ocean pinnacles. Every site offers unique underwater experiences and rich marine life.',
      book_dive: 'Book your dive',
      overview_title: 'Best dive sites around Koh Tao',
      overview_text: 'Koh Tao has over 25 excellent dive sites with varied topography and abundant marine life. Each site is unique and offers something different for every diver level, with enough variety to keep experienced divers engaged for weeks.',
      stat1_title: '25+ sites',
      stat1_text: 'From shallow bays to deep pinnacles',
      stat2_title: 'Diverse marine life',
      stat2_text: 'Whale sharks, rays, and coral reefs',
      stat3_title: 'Artificial reefs',
      stat3_text: 'Wrecks and structures for unique dives',
      stat4_title: 'All levels',
      stat4_text: 'Sites for beginners through advanced divers',
      deep_title: 'Deep dive sites for advanced divers',
      deep_sites: "Sail Rock|/dive-sites/sail-rock|Koh Tao's flagship deep dive site with huge fish schools, whale sharks, and giant barracuda.|18-40m|Whale sharks,Giant barracuda,Malabar grouper,Sailfish|Gevorderd|40 minutes offshore\nChumphon Pinnacle|/dive-sites/chumphon-pinnacle|Granite pinnacle with excellent whale shark sightings and large schools of trevally.|15-30m|Whale sharks,Trevally schools,Eagle rays,Chevron barracuda|Gevorderd|30 minutes offshore\nSouth West Pinnacle|/dive-sites/south-west-pinnacle|Deep pinnacle known for whale sharks, Bryde's whales, and large pelagic fish.|15-35m|Whale sharks,Bryde's whales,Giant barracuda,Spanish mackerel|Gevorderd|30-40 minutes offshore",
      coral_title: 'Beautiful coral reef sites',
      coral_sites: 'Japanese Gardens||Varied coral reefs with colorful marine life and swim-throughs.|12-25m|Pink-tailed triggerfish,Ocellated eagle ray,Colorful coral,Marbled octopus|Gemiddeld|Near Koh Nang Yuan\nShark Island||Beautiful purple soft corals and gorgonians with abundant marine life.|8-20m|Sea fans,Whip corals,Blacktip reef sharks,Tropical fish|Beginner-Gemiddeld|South coast\nMango Bay||Shallow coral reefs ideal for relaxed diving with a healthy ecosystem.|5-18m|Colorful coral,Reef fish,Sea anemones|Beginner|Bay on west coast',
      artificial_title: 'Artificial dive sites',
      artificial_sites: 'HTMS Sattakut||Former WWII US Navy ship donated by the Thai Navy, now a thriving artificial reef.|18-30m|Wreck exploration,Marine life,Swim-throughs,Historic value|Gevorderd|Between the islands\nJunkyard Reef||Artificial steel structures with healthy coral growth and diverse marine life.|8-15m|Artificial structures,Healthy coral,Diverse fish species,Conservation project|Beginner-Gemiddeld|West coast\nBuoyancy World||Concrete blocks and pipes that create new ecosystems for marine life.|5-12m|Concrete structures,New coral growth,Small marine life,Educational|Beginner|Aow Leuk',
      shallow_title: 'Shallow dive sites for beginners',
      shallow_sites: 'Aow Leuk||Shallow bay with coral gardens and easy diving conditions.|3-10m|Coral gardens,Tropical fish,Easy entry,Training site|Beginner|West coast\nHin Ngam||Shallow reef with artificial structures and abundant marine life.|5-12m|Artificial reefs,Colorful fish,Safe diving,Photography|Beginner|West coast\nTanote Bay||East-coast dive site with macro opportunities and colorful reef life.|8-15m|Frogfish,Pipefish,Macro photography,Colorful reef|Gemiddeld|East coast',
      depth_label: 'Depth',
      booking_title: 'Discover Koh Tao\u2019s underwater world',
      booking_text: 'Ready to explore Koh Tao\u2019s amazing dive sites? Our experienced guides take you to the best spots for your level and interests.',
    },
    nl: {
      hero_title: 'Duiklocaties op Koh Tao',
      hero_text: 'Ontdek meer dan 25 geweldige duiklocaties rond Koh Tao, van ondiepe koraalriffen tot diepe oceaanpinnacles. Elke plek biedt unieke onderwaterervaringen en rijk zeeleven.',
      book_dive: 'Boek je duik',
      overview_title: 'Beste duiklocaties op Koh Tao',
      overview_text: 'Koh Tao heeft meer dan 25 uitstekende duiklocaties met gevarieerde topografie en een overvloed aan zeeleven. Elke plek is uniek en biedt duikers van elk niveau iets anders, met genoeg variatie om ook ervaren duikers wekenlang te boeien.',
      stat1_title: '25+ locaties',
      stat1_text: 'Van ondiepe baaien tot diepe pinnacles',
      stat2_title: 'Divers zeeleven',
      stat2_text: 'Walvishaaien, roggen en koraalriffen',
      stat3_title: 'Kunstmatige riffen',
      stat3_text: 'Wrakken en structuren voor unieke duiken',
      stat4_title: 'Alle niveaus',
      stat4_text: 'Locaties voor beginners tot gevorderde duikers',
      deep_title: 'Diepe duiklocaties voor gevorderde duikers',
      deep_sites: 'Sail Rock|/dive-sites/sail-rock|De belangrijkste diepe duiklocatie van Koh Tao met grote visscholen, walvishaaien en reuzenbarracuda.|18-40m|Walvishaaien,Reuzenbarracuda,Malabar grouper,Zeilvis|Gevorderd|40 minuten offshore\nChumphon Pinnacle|/dive-sites/chumphon-pinnacle|Granieten pinnacle met uitstekende kansen op walvishaaien en grote scholen trevally.|15-30m|Walvishaaien,Trevally-scholen,Adelaarsroggen,Chevron-barracuda|Gevorderd|30 minuten offshore\nSouth West Pinnacle|/dive-sites/south-west-pinnacle|Diepe pinnacle, bekend om walvishaaien, brydevinvissen en grote pelagische vis.|15-35m|Walvishaaien,Brydevinvissen,Reuzenbarracuda,Koningsmakreel|Gevorderd|30-40 minuten offshore',
      coral_title: 'Prachtige koraalrif-locaties',
      coral_sites: 'Japanese Gardens||Gevarieerde koraalriffen met kleurrijk zeeleven en swim-throughs.|12-25m|Pink-tailed triggerfish,Ocellated adelaarsrog,Kleurrijk koraal,Gemarmerde octopus|Gemiddeld|Bij Koh Nang Yuan\nShark Island||Prachtige paarse boomkoralen en gorgonen met veel zeeleven.|8-20m|Zeewaaiers,Zweepkoralen,Zwartpuntrifhaaien,Tropische vissen|Beginner-Gemiddeld|Zuidkust\nMango Bay||Ondiepe koraalriffen, ideaal voor ontspannen duiken met een gezond ecosysteem.|5-18m|Kleurrijk koraal,Rifvissen,Zeeanemonen|Beginner|Baai aan westkust',
      artificial_title: 'Kunstmatige duiklocaties',
      artificial_sites: 'HTMS Sattakut||Voormalig Amerikaans marineschip uit WOII, geschonken door de Thaise marine en nu een bloeiend kunstmatig rif.|18-30m|Wrakverkenning,Marien leven,Swim-throughs,Historische waarde|Gevorderd|Tussen de eilanden\nJunkyard Reef||Kunstmatige stalen structuren met gezond koraal en divers zeeleven.|8-15m|Kunstmatige structuren,Gezond koraal,Diverse vissoorten,Natuurproject|Beginner-Gemiddeld|Westkust\nBuoyancy World||Betonblokken en buizen die nieuwe ecosystemen voor zeeleven vormen.|5-12m|Betonstructuren,Nieuwe koraalgroei,Klein zeeleven,Educatief|Beginner|Aow Leuk',
      shallow_title: 'Ondiepe duiklocaties voor beginners',
      shallow_sites: 'Aow Leuk||Ondiepe baai met koraaltuinen en makkelijke duikomstandigheden.|3-10m|Koraaltuinen,Tropische vissen,Makkelijke toegang,Trainingslocatie|Beginner|Westkust\nHin Ngam||Ondiep rif met kunstmatige structuren en veel zeeleven.|5-12m|Kunstmatige riffen,Kleurrijke vissen,Veilig duiken,Fotografie|Beginner|Westkust\nTanote Bay||Duiklocatie aan de oostkant met macrokansen en kleurrijk rifleven.|8-15m|Hengelaarsvis,Pijpvis,Macrofotografie,Kleurrijk rif|Gemiddeld|Oostkust',
      depth_label: 'Diepte',
      booking_title: 'Ontdek de onderwaterwereld van Koh Tao',
      booking_text: 'Klaar om de geweldige duiklocaties van Koh Tao te ontdekken? Onze ervaren gidsen nemen je mee naar de beste plekken voor jouw niveau en interesses.',
    },
  },
};

const rows = [];
for (const [pageSlug, locales] of Object.entries(pages)) {
  for (const [locale, keys] of Object.entries(locales)) {
    for (const [sectionKey, contentValue] of Object.entries(keys)) {
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
    const options = {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates',
      },
    };
    // append on_conflict param
    url.searchParams.set('on_conflict', 'page_slug,section_key,locale');
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });

(async () => {
  const BATCH = 50;
  let total = 0;
  for (let i = 0; i < rows.length; i += BATCH) {
    await upsert(rows.slice(i, i + BATCH));
    total += Math.min(BATCH, rows.length - i);
  }
  console.log(`Upserted ${total} rows.`);
})();
