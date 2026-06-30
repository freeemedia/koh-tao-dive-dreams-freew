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
  'sail-rock': {
    en: {
      overview:
        "Koh Tao's premier deep dive site featuring large schools of fish, whalesharks, and giant barracuda. Sail Rock is widely regarded as the Gulf of Thailand's premier scuba diving site. Located 40 minutes offshore, this impressive granite pinnacle rises from the deep blue ocean to within 18 meters of the surface. The site is famous for its 'Chimney' - a distinctive vertical swim-through that creates a natural vortex attracting large pelagic fish. Whalesharks are frequently sighted cruising the depths, and the site hosts massive schools of snapper, fusiliers, and chevron barracuda. Eagle rays and sailfish are also common visitors, making this a truly spectacular deep diving experience.",
      quick_facts_depth: '18-40m',
      quick_facts_difficulty: 'Advanced',
      quick_facts_location: '40 minutes offshore',
      quick_facts_best_time: 'Year-round, best in dry season (December-May)',
      what_you_can_see: 'Whalesharks\nGiant Barracuda\nMalabar Grouper\nSailfish',
      marine_life_highlights:
        'Whalesharks (frequent sightings)\nGiant Barracuda schools\nMalabar Grouper\nSailfish and Eagle Rays\nChevron Barracuda\nLarge Snapper and Fusilier schools\nKing Mackerel\nBrown Marbled Grouper',
      diving_tips:
        'Advanced certification required - this is a deep dive site\nStrong current awareness essential - stay with your guide\nUse a dive computer for accurate depth and time monitoring\nWhalesharks are most active in the morning - early boat departure recommended\nBring a wide-angle lens for photographing large pelagics\nConserve air due to depth and potential current\nPerfect for deep specialty course dives',
      images:
        '/images/sailrock.webp\n/images/photo-1613853250147-2f73e55c1561.avif\n/images/photo-1618865181016-a80ad83a06d3.avif\n/images/photo-1647825194145-2d94e259c745.avif\n/images/photo-1682686580849-3e7f67df4015.avif\n/images/photo-1682687982423-295485af248a.avif',
    },
    nl: {
      overview:
        "Dé top-diepduiklocatie van Koh Tao met grote visscholen, walvishaaien en reuzenbarracuda's. Sail Rock wordt algemeen beschouwd als de beste duiksite in de Golf van Thailand. Deze imposante granieten rotspiek ligt op ongeveer 40 minuten varen van Koh Tao en stijgt op vanuit diepblauw water tot circa 18 meter onder het oppervlak. De site is beroemd om de 'Chimney': een verticale doorgang die een natuurlijke stroming creëert en grote pelagische vissen aantrekt. Walvishaaien worden hier regelmatig gezien, samen met enorme scholen snappers, fusiliers en chevron-barracuda's. Ook adelaarsroggen en zeilvissen verschijnen hier vaak, wat het een spectaculaire diepduikervaring maakt.",
      quick_facts_depth: '18-40m',
      quick_facts_difficulty: 'Gevorderd',
      quick_facts_location: '40 minuten uit de kust',
      quick_facts_best_time: 'Hele jaar, beste periode in droogseizoen (december-mei)',
      what_you_can_see: 'Walvishaaien\nReuzenbarracuda\nMalabar tandbaars\nZeilvis',
      marine_life_highlights:
        'Walvishaaien (regelmatige waarnemingen)\nScholen reuzenbarracuda\nMalabar tandbaars\nZeilvis en adelaarsrog\nChevron-barracuda\nGrote scholen snapper en fusilier\nKoningsmakreel\nGemarmerde tandbaars',
      diving_tips:
        'Gevorderde certificering vereist - dit is een diepduiksite\nStromingsbewustzijn is essentieel - blijf bij je gids\nGebruik een duikcomputer voor nauwkeurige diepte- en tijdsbewaking\nWalvishaaien zijn vaak actiever in de ochtend - vroeg vertrek aanbevolen\nNeem een groothoeklens mee voor grote pelagische soorten\nSpaar lucht in verband met diepte en mogelijke stroming\nPerfect voor specialisaties in diepduiken',
      images:
        '/images/sailrock.webp\n/images/photo-1613853250147-2f73e55c1561.avif\n/images/photo-1618865181016-a80ad83a06d3.avif\n/images/photo-1647825194145-2d94e259c745.avif\n/images/photo-1682686580849-3e7f67df4015.avif\n/images/photo-1682687982423-295485af248a.avif',
    },
  },
  'shark-island': {
    en: {
      overview:
        "Shark Island is located on Koh Tao's south coast and is renowned for its spectacular coral formations and marine biodiversity. The site features beautiful soft purple tree corals, vibrant gorgonians including sea fans and dynamic sea whips that sway gracefully in the current. Black-tip reef sharks are commonly sighted cruising the reef, giving the site its name. The underwater landscape includes coral-encrusted boulders and sandy patches, creating diverse habitats for marine life. This site is particularly popular with underwater photographers due to its colorful subjects and excellent visibility.",
      quick_facts_depth: '8-20m',
      quick_facts_difficulty: 'Beginner-Intermediate',
      quick_facts_location: 'South coast',
      quick_facts_best_time: 'Year-round, excellent during dry season',
      what_you_can_see: 'Sea Fans\nDynamic Sea Whips\nBlack Tip Reef Sharks\nTropical Fish',
      marine_life_highlights:
        'Black-tip Reef Sharks\nDiverse reef fish\nGorgonian sea fans\nSoft tree corals\nAnthias and anthias\nParrotfish and wrasse\nMoray eels\nNudibranchs and invertebrates',
      diving_tips:
        'Suitable for all certification levels\nExcellent for underwater photography\nLook for sharks in the blue water above the reef\nExplore the coral formations carefully\nGreat for marine life observation\nPerfect for extended dives\nGood site for practicing photography techniques\nConserve energy for the return swim',
      images: '/images/sharkisand.jpg\n/images/blacktip-reef-shark.jpg',
    },
    nl: {
      overview:
        'Shark Island ligt aan de zuidkust van Koh Tao en staat bekend om spectaculaire koraalformaties en hoge biodiversiteit. Je vindt hier prachtige paarse zachte boomkoralen en kleurrijke gorgonen, waaronder grote zeewaaiers en dynamische zweepkoralen die meebewegen met de stroming. Zwartpuntrifhaaien worden hier regelmatig gezien terwijl ze langs het rif trekken - daar dankt de site haar naam aan. Het onderwaterlandschap met met koraal bedekte rotsblokken en zandstroken creëert gevarieerde habitats. Door de kleur en het vaak goede zicht is dit een favoriete plek voor onderwaterfotografie.',
      quick_facts_depth: '8-20m',
      quick_facts_difficulty: 'Beginner-gemiddeld',
      quick_facts_location: 'Zuidkust',
      quick_facts_best_time: 'Hele jaar, uitstekend in droogseizoen',
      what_you_can_see: 'Zeewaaiers\nZwepkoralen\nZwartpuntrifhaaien\nTropische vissen',
      marine_life_highlights:
        'Zwartpuntrifhaaien\nDiverse rifvissen\nGorgoon-zeewaaiers\nZachte boomkoralen\nAnthias\nPapegaaivissen en lipvissen\nMurenen\nNaaktslakken en andere ongewervelden',
      diving_tips:
        'Geschikt voor alle brevetniveaus\nUitstekend voor onderwaterfotografie\nZoek haaien in het blauwe water boven het rif\nVerken de koraalformaties met zorg\nGeweldige locatie voor observatie van onderwaterleven\nPerfect voor langere duiken\nGoede plek om fotografietechniek te oefenen\nSpaar energie voor de terugzwem',
      images: '/images/sharkisand.jpg\n/images/blacktip-reef-shark.jpg',
    },
  },
  'htms-sattakut': {
    en: {
      overview:
        'HTMS Sattakut is a fascinating WWII-era ex-US Navy vessel deliberately sunk in 2011 to create an artificial reef. This 30-meter long wreck lies between Koh Tao and Koh Nang Yuan at depths of 18-30 meters. The wreck has become a thriving artificial reef, completely covered in corals and home to a diverse array of marine life. The ship\'s structure provides excellent swim-through opportunities, from the engine room to the bridge. Large groupers, snappers, and barracuda now call this wreck home, and it\'s become a premier wreck diving destination in Southeast Asia.',
      quick_facts_depth: '18-30m',
      quick_facts_difficulty: 'Advanced',
      quick_facts_location: 'Between islands',
      quick_facts_best_time: 'Year-round, best during dry season',
      what_you_can_see: 'Wreck Exploration\nMarine Life\nSwim-throughs\nHistorical Significance',
      marine_life_highlights:
        'Malabar Groupers (resident)\nGiant Barracuda\nSnapper and Fusilier schools\nMoray Eels\nLionfish and scorpionfish\nCoral growth on wreck structure\nVarious reef fish species\nPuffers and triggerfish',
      diving_tips:
        'Advanced certification required for wreck diving\nExcellent site for wreck diving specialty course\nRespect the historical significance of the site\nUse wreck diving techniques and penetration skills\nStay with your guide when exploring the interior\nPerfect for underwater photography\nConserve air due to depth and exploration\nLook for the ship\'s historical features',
      images: '/images/htms-sattakut.jpg\n/images/htms-sattakut-wreck.jpg\n/images/wreck.jpeg',
    },
    nl: {
      overview:
        'HTMS Sattakut is een fascinerend voormalig US Navy-schip uit de Tweede Wereldoorlog dat in 2011 bewust is afgezonken om een kunstmatig rif te vormen. Dit wrak van circa 30 meter ligt tussen Koh Tao en Koh Nang Yuan op 18-30 meter diepte. Inmiddels is het uitgegroeid tot een levendig rif, bedekt met koralen en bewoond door uiteenlopend onderwaterleven. De scheepsstructuur biedt interessante doorgangen, van machinekamer tot brug. Grote tandbaarzen, snappers en barracuda\'s gebruiken het wrak als leefgebied, waardoor dit een topbestemming is voor wrakduiken in Zuidoost-Azië.',
      quick_facts_depth: '18-30m',
      quick_facts_difficulty: 'Gevorderd',
      quick_facts_location: 'Tussen de eilanden',
      quick_facts_best_time: 'Hele jaar, beste in droogseizoen',
      what_you_can_see: 'Wrakduiken\nOnderwaterleven\nDoorgangen\nHistorische waarde',
      marine_life_highlights:
        'Malabar tandbaarzen (resident)\nReuzenbarracuda\nScholen snapper en fusilier\nMurenen\nKoraalduivels en schorpioenvissen\nKoraalgroei op wrakstructuur\nDiverse rifvissen\nKogelvissen en trekkervissen',
      diving_tips:
        'Gevorderde certificering vereist voor wrakduiken\nUitstekende site voor wrakspecialisaties\nRespecteer de historische betekenis van deze locatie\nGebruik passende wrakduiktechnieken en penetratievaardigheden\nBlijf bij je gids bij verkenning van het interieur\nZeer geschikt voor onderwaterfotografie\nSpaar lucht door diepte en verkenning\nLet op de historische kenmerken van het schip',
      images: '/images/htms-sattakut.jpg\n/images/htms-sattakut-wreck.jpg\n/images/wreck.jpeg',
    },
  },
  'japanese-gardens': {
    en: {
      overview: 'Japanese Gardens is a beautiful dive site near Koh Nang Yuan, known for its diverse coral reef and abundant marine life. Suitable for all levels.',
      quick_facts_depth: '5-18m',
      quick_facts_difficulty: 'Beginner to Intermediate',
      quick_facts_location: 'Near Koh Nang Yuan',
      quick_facts_best_time: 'Year-round, best visibility November-May',
      what_you_can_see: 'Pink Tailed Triggerfish\nOcellated Eagle Rays\nColorful Corals\nMarbled Octopus',
      marine_life_highlights:
        'Pink-tailed Triggerfish (unique to this site)\nOcellated Eagle Rays\nMarbled Octopus\nBlue-ringed Octopus\nNudibranchs and flatworms\nParrotfish and wrasse\nAnthias and damselfish\nMoray eels and lionfish',
      diving_tips: 'Best time is November-May for visibility.\nLook for unique triggerfish and octopus.\nGreat for underwater photography.',
      images: '/images/japanandwins.jpg',
    },
    nl: {
      overview: 'Japanese Gardens is een prachtige duiklocatie bij Koh Nang Yuan, bekend om diverse koraalriffen en rijk onderwaterleven. Geschikt voor alle niveaus.',
      quick_facts_depth: '5-18m',
      quick_facts_difficulty: 'Beginner tot Gemiddeld',
      quick_facts_location: 'Bij Koh Nang Yuan',
      quick_facts_best_time: 'Hele jaar, beste zicht november-mei',
      what_you_can_see: 'Pink-tailed triggerfish\nOcellated adelaarsrog\nKleurrijk koraal\nGemarmerde octopus',
      marine_life_highlights:
        'Pink-tailed triggerfish\nOcellated adelaarsrog\nGemarmerde octopus\nBlue-ringed octopus\nNaaktslakken en platwormen\nPapegaaivissen en lipvissen\nAnthias en juffervissen\nMurenen en koraalduivels',
      diving_tips: 'Beste periode november-mei voor zicht\nZoek naar unieke triggerfish en octopus\nGeweldig voor onderwaterfotografie',
      images: '/images/japanandwins.jpg',
    },
  },
  'mango-bay': {
    en: {
      overview: 'Shallow coral reefs perfect for relaxed diving with thriving marine ecosystems.',
      quick_facts_depth: '5-18m',
      quick_facts_difficulty: 'Beginner',
      quick_facts_location: 'West coast bay',
      quick_facts_best_time: 'Year-round, best during calm weather',
      what_you_can_see: 'Colorful reef fish\nClownfish and anemones\nParrotfish and wrasse\nButterflyfish\nAngelfish species\nSmall reef sharks',
      marine_life_highlights: 'Healthy reef ecosystem\nColorful hard and soft corals\nSea anemones\nAbundant marine life',
      diving_tips:
        'Perfect for beginners and training dives\nAlso excellent for snorkeling\nLook for grazers in seagrass and reef life\nGreat spot for underwater photography\nCalm water ideal for learning buoyancy\nMultiple coral bommies to explore\nSuitable for longer dives\nPerfect for Open Water certification dives',
      images: '/images/mango-bay.webp',
    },
    nl: {
      overview: 'Ondiepe koraalriffen perfect voor ontspannen duiken met een bloeiend marien ecosysteem.',
      quick_facts_depth: '5-18m',
      quick_facts_difficulty: 'Beginner',
      quick_facts_location: 'Baai aan westkust',
      quick_facts_best_time: 'Hele jaar, beste bij kalm weer',
      what_you_can_see: 'Kleurrijke rifvissen\nAnemoonvissen\nPapegaaivissen en lipvissen\nVlindervissen\nKeizersvissen\nKleine rifhaaien',
      marine_life_highlights: 'Gezond rifecosysteem\nKleurrijke harde en zachte koralen\nZeeanemonen\nRijk onderwaterleven',
      diving_tips:
        'Perfect voor beginners en trainingsduiken\nOok uitstekend om te snorkelen\nZoek grazers in zeegras en rifleven\nToplocatie voor onderwaterfotografie\nKalm water ideaal voor trim- en drijfvermogen\nMeerdere koraalbommies om te verkennen\nGeschikt voor langere duiken\nPerfect voor Open Water trainingsduiken',
      images: '/images/mango-bay.webp',
    },
  },
  'twins-pinnacle': {
    en: {
      overview: 'Twins Pinnacle is the most popular dive site on Koh Tao, featuring three granite pinnacles, abundant marine life, and suitable for all certification levels.',
      quick_facts_depth: '6-18m',
      quick_facts_difficulty: 'Beginner to Intermediate',
      quick_facts_location: 'West coast of Koh Nang Yuan',
      quick_facts_best_time: 'Year-round, best November-May',
      what_you_can_see:
        'Saddleback clownfish and Sebae anemones\nNudibranchs\nPipefish\nYellow boxfish\nLongface emperor\nWhite’s butterflyfish\nAngelfish\nReef fish\nMoray eels\nTrevally\nBluespotted ribbon tail ray\nSnapper\nGroupers\nParrotfish\nBannerfish\nSea turtles\nScribbled filefish\nAnemonefish\nBoxfish and wart slugs',
      marine_life_highlights: 'Three granite pinnacles\nArch and rock formations\nRich marine life\nPerfect for training\nCalm conditions\nAnemones with clownfish',
      diving_tips:
        'Perfect for Open Water divers and training dives\nExplore the deeper west pinnacle first\nNavigate to the middle pinnacle and check the arch on the north side\nLook under overhangs at the shallow pinnacle\nDon’t miss the famous clownfish with Sebae anemone\nNote: there is a stone circle around the clownfish - do not enter\nGreat for macro photography\nPractice buoyancy on the arch and rock formations\nNearby Buoyancy World is dedicated to buoyancy skills\nExcellent for marine awareness\nEasy navigation thanks to the three peaks',
      images: '/images/twins-header.png',
    },
    nl: {
      overview: 'Twins Pinnacle is de populairste duiksite van Koh Tao, met drie granieten pinnacles, rijk onderwaterleven en geschikt voor alle brevetniveaus.',
      quick_facts_depth: '6-18m',
      quick_facts_difficulty: 'Beginner tot Gemiddeld',
      quick_facts_location: 'Westkust van Koh Nang Yuan',
      quick_facts_best_time: 'Hele jaar, beste november-mei',
      what_you_can_see:
        'Zadel-anemoonvis\nNaaktslakken\nPijpvissen\nGele koffervis\nLongface emperor\nVlindervissen\nKeizersvissen\nRifvissen\nMurenen\nTrevally\nBlauwgestippelde pijlstaartrog\nSnappers\nTandbaarzen\nPapegaaivissen\nBannerfish\nZeeschildpadden\nScribbled filefish\nAnemoonvissen\nKoffervissen en wratslakken',
      marine_life_highlights: 'Drie granieten pinnacles\nBogen en rotsformaties\nRijk onderwaterleven\nPerfect voor training\nRustige omstandigheden\nAnemonen met clownfish',
      diving_tips:
        'Perfect voor Open Water en trainingsduiken\nVerken eerst de diepere westelijke pinnacle\nNavigeer naar de middelste pinnacle en bekijk de boog aan de noordkant\nKijk onder overhangen bij de ondiepe pinnacle\nMis de beroemde clownfish met Sebae-anemoon niet\nLet op: er is een steencirkel rond de clownfish - niet binnengaan\nGeweldig voor macrofotografie\nOefen drijfvermogen bij de bogen en rotsformaties\nBuoyancy World in de buurt is gewijd aan drijfvermogen\nUitstekend voor mariene bewustwording\nEenvoudige navigatie dankzij drie pieken',
      images: '/images/twins-header.png',
    },
  },
  'chumphon-pinnacle': {
    en: {
      overview:
        "Chumphon Pinnacle is one of Koh Tao's most spectacular deep dive sites, located 30 minutes offshore. This granite pinnacle rises dramatically from the deep ocean floor, creating a natural cleaning station for large marine life. The site is particularly famous for its reliable whaleshark sightings, with these gentle giants often cruising the depths. Massive schools of trevally and chevron barracuda create mesmerizing displays, while eagle rays and other pelagics add to the excitement. The pinnacle's structure provides excellent swim-through opportunities and superb photographic subjects.",
      quick_facts_depth: '15-30m',
      quick_facts_difficulty: 'Advanced',
      quick_facts_location: '30 minutes offshore',
      quick_facts_best_time: 'Year-round, peak season December-April',
      what_you_can_see: 'Whalesharks\nTrevally Schools\nEagle Rays\nChevron Barracuda',
      marine_life_highlights:
        'Whalesharks (regular sightings)\nGiant Trevally schools\nChevron Barracuda\nEagle Rays\nScad and Fusilier schools\nGiant Barracuda\nKingfish\nVarious reef fish species',
      diving_tips:
        'Advanced certification recommended due to depth and current\nEarly morning departures maximize wildlife sightings\nWide-angle photography lens recommended for large subjects\nStay with your dive guide in moderate currents\nPerfect for deep diving specialty courses\nWhalesharks are most active during incoming tides\nBring a good quality underwater camera',
      images:
        '/images/chumphon-pinnacle-top.webp\n/images/photo-1682686580849-3e7f67df4015.avif\n/images/photo-1613853250147-2f73e55c1561.avif\n/images/photo-1618865181016-a80ad83a06d3.avif\n/images/photo-1647825194145-2d94e259c745.avif\n/images/photo-1659518893171-b15e20a8e201.avif\n/images/photo-1682687982423-295485af248a.avif',
    },
    nl: {
      overview:
        'Chumphon Pinnacle is een van de meest spectaculaire diepduiklocaties van Koh Tao, op ongeveer 30 minuten varen uit de kust. Deze granieten rotstop rijst steil op vanaf de oceaanbodem en vormt een natuurlijke schoonmaakplek voor grote zeedieren. De locatie staat vooral bekend om de betrouwbare walvishaaiwaarnemingen — deze zachte reuzen cruisen hier regelmatig door de diepte. Indrukwekkende scholen giant trevally en chevron-barracuda zorgen voor spectaculaire taferelen, terwijl adelaarsroggen en andere pelagische soorten extra dynamiek toevoegen. De structuur van de pinnacle biedt fraaie doorgangen en geweldige mogelijkheden voor onderwaterfotografie.',
      quick_facts_depth: '15-30m',
      quick_facts_difficulty: 'Gevorderd',
      quick_facts_location: '30 minuten uit de kust',
      quick_facts_best_time: 'Hele jaar, piekseizoen december-april',
      what_you_can_see: 'Walvishaaien\nScholen trevally\nAdelaarsroggen\nChevron-barracuda',
      marine_life_highlights:
        'Walvishaaien (regelmatige waarnemingen)\nGrote scholen giant trevally\nChevron-barracuda\nAdelaarsroggen\nScholen horsmakreel en fusilier\nReuzenbarracuda\nKingfish\nDiverse rifvissen',
      diving_tips:
        'Gevorderde certificering aanbevolen door diepte en stroming\nVroege ochtendtrips vergroten de kans op walvishaaiwaarnemingen\nGroothoeklens aanbevolen voor grote onderwerpen\nBlijf bij je gids bij matige stroming\nPerfect voor specialisatiecursus diepduiken\nWalvishaaien zijn het actiefst bij opkomend tij\nNeem een goede onderwatercamera mee',
      images:
        '/images/chumphon-pinnacle-top.webp\n/images/photo-1682686580849-3e7f67df4015.avif\n/images/photo-1613853250147-2f73e55c1561.avif\n/images/photo-1618865181016-a80ad83a06d3.avif\n/images/photo-1647825194145-2d94e259c745.avif\n/images/photo-1659518893171-b15e20a8e201.avif\n/images/photo-1682687982423-295485af248a.avif',
    },
  },
  'south-west-pinnacle': {
    en: {
      overview:
        'South West Pinnacle is a deep offshore dive site made up of multiple granite pinnacles and boulders rising from the seabed. Located 30-40 minutes from Koh Tao, it is known for exciting blue-water encounters and strong pelagic potential. The site often features schools of barracuda, trevally, and mackerel, with occasional visits from whale sharks and Bryde\'s whales. Due to depth and current exposure, it offers a rewarding challenge for experienced divers.',
      quick_facts_depth: '15-35m',
      quick_facts_difficulty: 'Advanced',
      quick_facts_location: '30-40 minutes offshore',
      quick_facts_best_time: 'Year-round, best in calm season',
      what_you_can_see: 'Whale sharks\nBryde\'s whales\nGiant barracuda\nSpanish mackerel',
      marine_life_highlights:
        'Occasional whale shark encounters\nBryde\'s whales in favorable seasonal windows\nLarge schools of barracuda and mackerel\nTrevally, reef fish, and hunting pelagics in current lines',
      diving_tips:
        'Best suited for advanced divers with deep and drift experience\nUse delayed SMB and stay with the group during ascent\nPlan gas carefully due to depth and current exposure\nListen closely to briefing because entry and pickup can vary by conditions',
      images: '/images/photo-1682686580849-3e7f67df4015.avif',
    },
    nl: {
      overview:
        'South West Pinnacle is een diepe offshore duiklocatie met meerdere granieten pinnacles en rotsblokken die vanaf de bodem omhoogkomen. De site ligt op 30-40 minuten varen van Koh Tao en staat bekend om spannende blue-water-ontmoetingen en sterke kans op pelagische soorten. Je ziet hier vaak scholen barracuda, trevally en makreel, met af en toe walvishaaien en brydevinvissen. Door de diepte en mogelijke stroming is dit een uitdagende maar zeer belonende duik voor ervaren duikers.',
      quick_facts_depth: '15-35m',
      quick_facts_difficulty: 'Gevorderd',
      quick_facts_location: '30-40 minuten offshore',
      quick_facts_best_time: 'Hele jaar, beste periode bij kalme zee',
      what_you_can_see: 'Walvishaaien\nBrydevinvissen\nReuzenbarracuda\nKoningsmakreel',
      marine_life_highlights:
        'Af en toe ontmoetingen met walvishaaien\nBrydevinvissen in gunstige seizoensperiodes\nGrote scholen barracuda en makreel\nTrevally, rifvissen en jagende pelagische soorten bij stromingslijnen',
      diving_tips:
        'Geschikt voor gevorderde duikers met ervaring in diepe en driftduiken\nGebruik een SMB en blijf tijdens de opstijging bij de groep\nPlan je gasvoorraad zorgvuldig door diepte en stroming\nLuister goed naar de briefing omdat entry en pickup per dag verschillen',
      images: '/images/photo-1682686580849-3e7f67df4015.avif',
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