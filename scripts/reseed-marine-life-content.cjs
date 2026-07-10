const fs = require('fs');
const https = require('https');

const readEnvFile = () => {
  for (const name of ['.env.local', '.env']) {
    try { return fs.readFileSync(name, 'utf8'); } catch { /* try next */ }
  }
  return '';
};
const envText = readEnvFile();
const getEnv = (name) => {
  const m = envText.match(new RegExp(`^${name}=(.*)$`, 'm'));
  return String((m || [])[1] || process.env[name] || '').replace(/^"|"$/g, '').trim();
};
const supabaseUrl = getEnv('SUPABASE_URL') || getEnv('VITE_SUPABASE_URL');
const serviceKey = getEnv('SUPABASE_SERVICE_ROLE_KEY') || getEnv('VITE_SUPABASE_SERVICE_ROLE_KEY') || getEnv('VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY');
if (!supabaseUrl || !serviceKey) { console.error('Missing SUPABASE_URL or SERVICE_ROLE_KEY'); process.exit(1); }

const pages = {
  nudibranchs: {
    en: {
      description: 'Colorful sea slugs with incredible patterns and shapes, perfect for macro photography.',
      size: '1-15cm depending on species',
      habitat: 'Coral reefs, sandy flats, rocky zones',
      conservation_status: 'Not evaluated',
      diet: 'Sponges, hydroids, tunicates, other nudibranchs',
      behavior: 'Slow grazers that often feed on specialized prey; some display warning colors due to toxicity; hermaphroditic.',
      best_time: 'Year-round, especially after stronger currents',
      frequency: 'Common in suitable habitat with patient observation',
      detailed_description: 'Nudibranchs are living artworks found throughout Koh Tao\u2019s reefs. These shell-less mollusks show huge variation in color, pattern, and body shape. With hundreds of species, from fingertip size to nearly hand-sized, they remain endlessly fascinating for macro photographers and marine life enthusiasts. Their variety and photogenic behavior make them favorite subjects in underwater photography.',
      interesting_facts: 'Nudibranchs include hundreds of species with spectacular color variation\nMany species are toxic and advertise this with bright warning colors\nMost nudibranchs are hermaphrodites with both male and female organs\nThey often eat highly specialized prey - some sponges, others hydroids\nTheir shape and color make them ideal macro subjects\nNew species are still being discovered in tropical waters',
      photography_tips: 'Use macro lenses (30-60mm) to fill the frame with detail\nManual focus is essential for sharpness on tiny subjects\nUse a focus light to reveal detail clearly\nShoot close-ups of gills, rhinophores, and texture\nBe patient and wait for a clean position\nGood lighting brings out color and pattern beautifully',
    },
    nl: {
      description: 'Kleurrijke zeenaaktslakken met ongelooflijke patronen en vormen, perfect voor macrofotografie.',
      size: '1-15cm afhankelijk van soort',
      habitat: 'Koraalriffen, zandvlaktes, rotsachtige zones',
      conservation_status: 'Niet ge\u00ebvalueerd',
      diet: 'Sponzen, hydro\u00efdpoliepen, zakpijpen, andere naaktslakken',
      behavior: 'Langzame grazers die vaak gespecialiseerd voedsel eten; sommige tonen waarschuwingskleuren vanwege giftigheid; hermafrodiet.',
      best_time: 'Hele jaar, vooral na sterkere stroming',
      frequency: 'Veelvoorkomend in geschikt habitat bij geduldige observatie',
      detailed_description: 'Naaktslakken zijn levende kunstwerkjes die je overal op de riffen van Koh Tao kunt vinden. Deze schelploze weekdieren tonen een enorme variatie in kleur, patroon en lichaamsvorm. Met honderden soorten, van vingertopformaat tot bijna handgroot, blijven ze eindeloos boeiend voor macrofotografen en natuurliefhebbers. Juist door hun variatie en fotogenieke gedrag zijn ze geliefde onderwerpen in onderwaterfotografie.',
      interesting_facts: 'Naaktslakken bestaan in honderden soorten met spectaculaire kleurvariaties\nVeel soorten zijn giftig en waarschuwen daarvoor met felle kleuren\nDe meeste naaktslakken zijn hermafrodiet met zowel mannelijke als vrouwelijke organen\nZe eten vaak zeer specifieke prooien - sommige sponzen, andere hydro\u00efden\nDoor hun vorm en kleur zijn ze ideale macro-onderwerpen\nIn tropische wateren worden nog steeds nieuwe soorten ontdekt',
      photography_tips: 'Gebruik macrolenzen (30-60mm) om het frame met detail te vullen\nHandmatige focus is essentieel voor scherpte op kleine onderwerpen\nGebruik focuslicht om details goed uit te lichten\nFotografeer close-up voor kieuwen, voelsprieten en textuur\nWees geduldig en wacht op een goede positie\nGoede belichting laat kleuren en patronen echt uitkomen',
    },
  },
  'green-sea-turtle': {
    en: {
      description: 'Herbivorous sea turtles that graze on seagrass and algae, helping maintain healthy marine ecosystems.',
      size: 'Up to 1.5m (5ft), 150-200kg',
      habitat: 'Shallow coastal waters, seagrass beds, coral reefs',
      conservation_status: 'Endangered',
      diet: 'Seagrass, algae, marine plants',
      behavior: 'Spends most of its time grazing on seagrass beds and migrates long distances to nest. Juveniles make a dangerous journey from beach to sea.',
      best_time: 'Year-round, especially in shallow bays',
      frequency: 'Common in suitable habitats',
      detailed_description: 'The green sea turtle is one of the most common sea turtle species around Koh Tao and plays an important role in the health of seagrass beds and coral reefs. These calm herbivores spend their days grazing on seagrass and algae, keeping these habitats in balance. Adults are often seen in shallow bays and reef areas, while hatchlings are sometimes observed during their risky journey from nesting beaches to open sea. Conservation efforts in Thailand have helped protect these ancient ocean travelers, and encountering one in the wild is always special.',
      interesting_facts: 'Green sea turtles can live up to 80 years\nThey are named after their green body fat, not their shell\nFemales return to the beach where they hatched to lay eggs\nWhile resting, they can hold their breath for up to 7 hours\nHatchlings must reach the ocean within 72 hours to survive\nThey migrate thousands of kilometers between feeding and nesting areas',
      photography_tips: 'Approach slowly and avoid sudden movements\nShoot at water level for a stronger perspective\nInclude the turtle\u2019s habitat in your composition\nUse natural light and avoid flash\nBe patient and let the turtle come to you\nRespect their space and never chase them',
    },
    nl: {
      description: 'Plantenetende zeeschildpadden die op zeegras en algen grazen en zo gezonde mari\u00ebne ecosystemen helpen behouden.',
      size: 'Tot 1,5m (5ft), 150-200kg',
      habitat: 'Ondiep kustwater, zeegrasvelden, koraalriffen',
      conservation_status: 'Bedreigd',
      diet: 'Zeegras, algen, zeeplanten',
      behavior: 'Brengt het grootste deel van de tijd grazend door op zeegrasvelden en migreert over lange afstanden om te nestelen. Jonge schildpadden maken een gevaarlijke tocht van strand naar zee.',
      best_time: 'Hele jaar, vooral in ondiepe baaien',
      frequency: 'Veelvoorkomend in geschikte leefgebieden',
      detailed_description: 'De groene zeeschildpad is een van de meest voorkomende zeeschildpadden rond Koh Tao en speelt een belangrijke rol in de gezondheid van zeegrasvelden en koraalriffen. Deze rustige planteneters brengen hun dagen door met grazen op zeegras en algen, waardoor deze habitats in balans blijven. Volwassen dieren worden vaak gezien in ondiepe baaien en rifgebieden, terwijl jonge schildpadjes soms te zien zijn tijdens hun risicovolle tocht van het neststrand naar open zee. Beschermingsmaatregelen in Thailand hebben geholpen deze oeroude zeereizigers te beschermen, en een ontmoeting in het wild blijft altijd bijzonder.',
      interesting_facts: 'Groene zeeschildpadden kunnen tot 80 jaar oud worden\nZe zijn genoemd naar hun groene lichaamsvet, niet naar hun schild\nVrouwtjes keren terug naar het strand waar ze zelf uitkwamen om eieren te leggen\nTijdens rust kunnen ze tot 7 uur hun adem inhouden\nJonge schildpadjes moeten binnen 72 uur de zee bereiken om te overleven\nZe migreren duizenden kilometers tussen foerageer- en nestgebieden',
      photography_tips: 'Benader langzaam en vermijd plotselinge bewegingen\nFotografeer op waterniveau voor een sterke perspectiefwerking\nNeem ook de leefomgeving van de schildpad mee in je compositie\nGebruik natuurlijk licht en vermijd flits\nWees geduldig en laat de schildpad naar jou toe komen\nRespecteer hun ruimte en jaag ze niet op',
    },
  },
  'blacktip-reef-shark': {
    en: {
      description: 'A common reef shark with distinctive black fin tips, important for maintaining a healthy coral reef ecosystem.',
      size: 'Up to 2m (6.5ft), 13kg',
      habitat: 'Coral reefs, shallow coastal waters',
      conservation_status: 'Near threatened',
      diet: 'Fish, crustaceans, cephalopods',
      behavior: 'An active daytime hunter that rests in caves at night. Plays an important role in regulating reef fish populations.',
      best_time: 'Year-round, especially during breeding season',
      frequency: 'Very common on shallow reefs',
      detailed_description: 'The blacktip reef shark is one of the most commonly seen shark species on Koh Tao reefs and is crucial for ecological balance. The species is named for the black tips on its fins. During the day they actively patrol the reef and sometimes rest in small caves. They are generally not aggressive toward humans and offer an exciting yet safe diving experience. During breeding season, juveniles are seen more frequently, creating great opportunities for divers and snorkelers.',
      interesting_facts: 'Blacktip reef sharks can live up to 12 years\nThey give birth to live young (viviparous)\nFemales can have up to 4 pups per litter\nThey are mainly active during the day\nDespite their name, they are usually harmless to humans\nThey help keep reef fish populations in balance',
      photography_tips: 'Approach slowly and calmly\nShoot from below for powerful fin silhouettes\nMake sure the black fin tips are clearly visible\nUse ambient light for natural colors\nBe patient and let the shark come to you\nCapture both swimming and resting behavior',
    },
    nl: {
      description: 'Veelvoorkomende rifhaai met herkenbare zwarte puntjes op de vinnen, belangrijk voor een gezond koraalrifecosysteem.',
      size: 'Tot 2m (6,5ft), 13kg',
      habitat: 'Koraalriffen, ondiep kustwater',
      conservation_status: 'Bijna bedreigd',
      diet: 'Vis, schaaldieren, koppotigen',
      behavior: "Actieve jager overdag, rust 's nachts in grotten. Speelt een belangrijke rol in het reguleren van vispopulaties op riffen.",
      best_time: 'Hele jaar, vooral tijdens het voortplantingsseizoen',
      frequency: 'Zeer veelvoorkomend op ondiepe riffen',
      detailed_description: 'De zwartpuntrifhaai is een van de meest geziene haaisoorten op de riffen van Koh Tao en is cruciaal voor de ecologische balans. De soort is genoemd naar de zwarte uiteinden van de vinnen. Overdag patrouilleren ze actief over het rif en rusten ze soms in kleine grotten. Ze zijn doorgaans niet agressief richting mensen en zorgen voor een spannende maar veilige duikervaring. Tijdens het voortplantingsseizoen zijn jonge haaien extra vaak te zien, wat mooie fotokansen geeft voor duikers en snorkelaars.',
      interesting_facts: 'Zwartpuntrifhaaien kunnen tot 12 jaar oud worden\nZe krijgen levende jongen (levendbarend)\nVrouwtjes kunnen tot 4 jongen per worp krijgen\nZe zijn vooral overdag actief\nOndanks hun naam zijn ze meestal ongevaarlijk voor mensen\nZe helpen vispopulaties op koraalriffen in balans te houden',
      photography_tips: 'Benader langzaam en rustig\nFotografeer van onderen voor krachtige vinbeelden\nZorg dat de zwarte vinpunten duidelijk in beeld zijn\nGebruik beschikbaar licht voor natuurlijke kleuren\nWees geduldig en laat de haai naar jou toe komen\nLeg zowel zwemmend als rustend gedrag vast',
    },
  },
  'hawksbill-sea-turtle': {
    en: {
      description: 'A beautiful sea turtle with a distinctive beak-shaped mouth, known for feeding on sponges and its colorful shell.',
      size: 'Up to 1m (3.3ft), 50-80kg',
      habitat: 'Coral reefs, rocky zones, coastal waters',
      conservation_status: 'Critically endangered',
      diet: 'Sponges, tunicates, jellyfish',
      behavior: 'A specialized sponge feeder that helps regulate sponge populations on reefs. Much shyer and harder to approach than other turtles.',
      best_time: 'Year-round',
      frequency: 'Seen less often than green sea turtles',
      detailed_description: 'The hawksbill sea turtle is a critically endangered species with a distinctive beak perfectly adapted to extracting sponges and small organisms from crevices. Their beautiful shell has overlapping scutes that create a mosaic pattern. They play an important role in reef ecosystems by controlling sponge growth. Hawksbills are much shyer than green turtles and require calm, patient observation. Their presence is a sign of a healthy reef, making every sighting especially memorable for divers and snorkelers.',
      interesting_facts: 'Hawksbills have a beak-like mouth adapted for eating sponges\nTheir shell was historically used for tortoiseshell products (now illegal)\nThey can stay underwater for up to 35 minutes\nFemales nest every 2-3 years and lay 3-5 clutches per season\nThey have one of the most beautiful shell patterns of all sea turtles\nHawksbills are the most tropical of all sea turtle species',
      photography_tips: 'Approach with extreme care - they are very shy\nPhotograph from a distance to avoid disturbance\nCapture the distinctive beak clearly in your shots\nHighlight the shell\u2019s beautiful pattern\nUse natural light and, if possible, a longer lens\nBe ready for quick, sudden movements',
    },
    nl: {
      description: 'Prachtige zeeschildpad met een kenmerkende snavelvormige bek, bekend om het eten van sponzen en het kleurrijke schild.',
      size: 'Tot 1m (3,3ft), 50-80kg',
      habitat: 'Koraalriffen, rotsachtige zones, kustwater',
      conservation_status: 'Ernstig bedreigd',
      diet: 'Sponzen, zakpijpen, kwallen',
      behavior: 'Gespecialiseerde sponseter die sponspopulaties op riffen helpt reguleren. Veel schuwer en moeilijker te benaderen dan andere schildpadden.',
      best_time: 'Hele jaar',
      frequency: 'Minder vaak gezien dan groene zeeschildpadden',
      detailed_description: 'De karetschildpad is een ernstig bedreigde soort met een karakteristieke snavelbek die perfect is aangepast om sponzen en andere kleine organismen uit spleten te halen. Hun prachtige schild heeft overlappende schubben die een moza\u00efekpatroon vormen. Ze spelen een belangrijke rol in het rifecosysteem door sponsgroei te beperken. Karetschildpadden zijn veel schuwer dan groene zeeschildpadden en vereisen rustige, geduldige observatie. Hun aanwezigheid is een teken van een gezond rif, waardoor elke waarneming extra bijzonder is voor duikers en snorkelaars.',
      interesting_facts: 'Karetschildpadden hebben een snavelachtige bek voor het eten van sponzen\nHun schild werd vroeger gebruikt voor schildpadproducten (nu illegaal)\nZe kunnen tot 35 minuten onder water blijven\nVrouwtjes nestelen elke 2-3 jaar en leggen 3-5 legsels per seizoen\nZe hebben een van de mooiste schildpatronen van alle zeeschildpadden\nKaretschildpadden zijn de meest tropische van alle zeeschildpaddensoorten',
      photography_tips: "Ga uiterst voorzichtig te werk - ze zijn erg schuw\nFotografeer op afstand om verstoring te voorkomen\nNeem de karakteristieke snavel duidelijk op in je foto's\nLeg het mooie patroon van het schild vast\nGebruik natuurlijk licht en indien mogelijk een langere lens\nWees voorbereid op snelle, plotselinge bewegingen",
    },
  },
  'marine-life-page': {
    en: {
      label_size: 'Size',
      label_habitat: 'Habitat',
      label_season: 'Best season',
      label_more: 'More info',
      hero_title: 'Marine life of Koh Tao',
      hero_text: 'Discover the impressive biodiversity of Koh Tao\u2019s underwater world, with over 350 fish species and remarkable marine animals.',
      intro_title: 'Marine life around Koh Tao',
      intro_text: 'The tropical waters around Koh Tao are rich in marine life and biodiversity. With stable water temperatures between 26-29\u00b0C year-round, the sea is an ideal habitat for diverse fauna and flora. From gentle giants like whale sharks to tiny macro species, Koh Tao offers encounters with some of the most fascinating sea creatures in the world.',
      pelagic_title: 'Pelagic species',
      sharks_title: 'Reef sharks',
      turtles_title: 'Sea turtles',
      macro_title: 'Macro marine life',
      cta_title: 'Ready to experience Koh Tao marine life?',
      cta_text: 'Join our PADI-certified courses and fun dive trips to see these incredible animals up close in their natural habitat.',
      cta_courses: 'View courses',
      cta_fun_dives: 'Fun dive trips',
      pelagic_species: "Whale shark|The largest fish in the world. These gentle giants are regularly spotted in deeper waters around Koh Tao, especially during plankton blooms.|Up to 12m|Deep offshore water|Year-round, peak Nov-Mar|/marine-life/whaleshark\nGreat barracuda|Impressive predators that hunt in schools around offshore pinnacles at speeds up to 40 km/h.|Up to 2m|Deep pinnacles|Year-round|/marine-life/great-barracuda\nManta rays|Elegant plankton feeders that perform spectacular looping movements while feeding.|Wingspan up to 7m|Deep water|Nov-Mar|\nMalabar grouper|Large predatory grouper living in deeper water, known for ambush hunting.|Up to 2.3m, 100kg|Deep reefs and pinnacles|Year-round|/marine-life/malabar-grouper",
      reef_sharks: 'Blacktip reef shark|Common reef sharks with distinctive black fin tips, often hunting in shallow water.|Up to 2m|Coral reefs|Year-round|/marine-life/black-tip-reef-shark\nGrey reef shark|Shyer reef sharks that prefer deeper water and are seen less often.|Up to 2.5m|Deep reefs|Year-round|',
      sea_turtles: 'Green sea turtle|Herbivorous sea turtles that graze on seagrass and algae, often seen in shallow bays.|Up to 1.5m|Shallow bays and reefs|Year-round|/marine-life/green-sea-turtle\nHawksbill sea turtle|Beautiful turtles with a distinctive beak-like mouth, known for feeding on sponges.|Up to 1m|Coral reefs|Year-round|/marine-life/hawksbill-sea-turtle',
      macro_life: 'Nudibranchs|Colorful sea slugs with unique patterns and shapes, perfect for macro photography.|1-15cm|Coral reefs|Year-round|/marine-life/nudibranchs\nBanded sea krait|Venomous sea snakes that hunt fish and eels in shallow water.|Up to 1.5m|Shallow reefs|Year-round|/marine-life/banded-sea-krait\nBearded scorpionfish|Master of camouflage with venomous spines, perfectly disguised as coral.|Up to 30cm|Coral reefs|Year-round|/marine-life/bearded-scorpion-fish\nCephalopods|Intelligent octopuses and cuttlefish, masters of camouflage and problem solving.|5cm-3m|Coral reefs and deep water|Year-round|/marine-life/cephalopods',
    },
    nl: {
      label_size: 'Grootte',
      label_habitat: 'Habitat',
      label_season: 'Beste periode',
      label_more: 'Meer info',
      hero_title: 'Marien leven van Koh Tao',
      hero_text: 'Ontdek de indrukwekkende biodiversiteit van Koh Tao\u2019s onderwaterwereld, met meer dan 350 vissoorten en bijzondere zeedieren.',
      intro_title: 'Marien leven op Koh Tao',
      intro_text: 'De tropische wateren rond Koh Tao kennen een enorme rijkdom aan zeeleven en biodiversiteit. Met stabiele watertemperaturen tussen 26-29\u00b0C het hele jaar door vormt de zee een ideaal leefgebied voor diverse soorten fauna en flora. Van vriendelijke reuzen zoals walvishaaien tot kleine macrosoorten: Koh Tao biedt ontmoetingen met enkele van de meest fascinerende zeedieren ter wereld.',
      pelagic_title: 'Pelagische soorten',
      sharks_title: 'Rifhaaien',
      turtles_title: 'Zeeschildpadden',
      macro_title: 'Macro marien leven',
      cta_title: 'Klaar om het mari\u00ebne leven van Koh Tao te beleven?',
      cta_text: 'Doe mee met onze PADI-gecertificeerde cursussen en fun dive trips om deze geweldige dieren van dichtbij in hun natuurlijke habitat te zien.',
      cta_courses: 'Bekijk cursussen',
      cta_fun_dives: 'Fun dive trips',
      pelagic_species: 'Walvishaai|De grootste vis ter wereld. Deze vriendelijke reuzen worden regelmatig gezien in diepere wateren rond Koh Tao, vooral tijdens planktonbloei.|Tot 12m|Diep water uit de kust|Hele jaar, piek nov-mrt|/marine-life/whaleshark\nGrote barracuda|Indrukwekkende roofvissen die in groepen jagen rond rotspieken uit de kust, met snelheden tot 40 km/u.|Tot 2m|Diepe rotspieken|Hele jaar|/marine-life/great-barracuda\nMantaroggen|Elegante planktoneters die tijdens het voeden spectaculaire draaibewegingen maken.|Spanwijdte tot 7m|Diepe wateren|Nov-Mar|\nMalabar tandbaars|Grote roofzuchtige tandbaars die in dieper water leeft en bekendstaat om hinderlaagjacht.|Tot 2,3m, 100kg|Diepe riffen en rotspieken|Hele jaar|/marine-life/malabar-grouper',
      reef_sharks: 'Zwartpuntrifhaai|Veelvoorkomende rifhaaien met kenmerkende zwarte vinpunten, vaak jagend in ondiep water.|Tot 2m|Koraalriffen|Hele jaar|/marine-life/black-tip-reef-shark\nGrijze rifhaai|Schuwere rifhaaien die dieper water verkiezen en minder vaak worden gezien.|Tot 2,5m|Diepe riffen|Hele jaar|',
      sea_turtles: 'Groene zeeschildpad|Plantenetende zeeschildpadden die grazen op zeegras en algen, vaak gezien in ondiepe baaien.|Tot 1,5m|Ondiepe baaien en riffen|Hele jaar|/marine-life/green-sea-turtle\nKaretschildpad|Mooie schildpadden met een kenmerkende snavelvormige bek, bekend om het eten van sponsen.|Tot 1m|Koraalriffen|Hele jaar|/marine-life/hawksbill-sea-turtle',
      macro_life: 'Naaktslakken|Kleurrijke zeenaaktslakken met bijzondere patronen en vormen, perfect voor macrofotografie.|1-15cm|Koraalriffen|Hele jaar|/marine-life/nudibranchs\nGebandeerde zeekrait|Giftige zeeslangen die in ondiep water op vis en paling jagen.|Tot 1,5m|Ondiepe riffen|Hele jaar|/marine-life/banded-sea-krait\nBaardschorpioenvis|Meester in camouflage met giftige stekels, perfect vermomd als koraal.|Tot 30cm|Koraalriffen|Hele jaar|/marine-life/bearded-scorpion-fish\nKoppotigen|Intelligente octopussen en inktvissen, meesters in camouflage en probleemoplossing.|5cm-3m|Koraalriffen en diep water|Hele jaar|/marine-life/cephalopods',
    },
  },
};

const rows = [];
for (const [pageSlug, locales] of Object.entries(pages)) {
  for (const [locale, keys] of Object.entries(locales)) {
    for (const [sectionKey, contentValue] of Object.entries(keys)) {
      rows.push({ page_slug: pageSlug, locale, section_key: sectionKey, content_type: 'text', content_value: contentValue, updated_by: 'seed-script' });
    }
  }
}

const upsert = (batch) => new Promise((resolve, reject) => {
  const body = JSON.stringify(batch);
  const url = new URL(`${supabaseUrl}/rest/v1/page_content`);
  url.searchParams.set('on_conflict', 'page_slug,section_key,locale');
  const req = https.request(url, {
    method: 'POST',
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates' },
  }, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => res.statusCode >= 200 && res.statusCode < 300 ? resolve() : reject(new Error(`HTTP ${res.statusCode}: ${data}`)));
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
