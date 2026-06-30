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
  'medical-services': {
    en: {
      title: 'Medical services on Koh Tao',
      subtitle: 'Healthcare and emergency services, available 24/7.',
      care_title: 'Care & emergencies',
      care_list:
        'Multiple clinics and pharmacies in Mae Haad and Sairee\nBasic care and first aid available\nEmergency services: call 1669\nNearest hospital is on Koh Samui (boat transfer required for serious cases)\nRecompression chamber for diving emergencies',
      insurance:
        'Comprehensive travel insurance is strongly recommended. Bring essential prescription medication yourself, as availability may be limited.',
      cta_travel_info: 'Travel information',
      cta_wellness: 'Wellness activities',
      important_title: 'Important information',
      important_list:
        'Arrange travel and health insurance before arrival\nMalaria prevention may be useful - consult a doctor\nThe sun is strong - use high-SPF sunscreen\nDehydration is common - drink enough water',
    },
    nl: {
      title: 'Medische zorg op Koh Tao',
      subtitle: 'Gezondheidszorg en nooddiensten, 24/7 beschikbaar.',
      care_title: 'Zorg & noodgevallen',
      care_list:
        'Meerdere klinieken en apotheken in Mae Haad en Sairee\nBasiszorg en eerste hulp beschikbaar\nNooddiensten: bel 1669\nDichtstbijzijnde ziekenhuis ligt op Koh Samui (boottransfer nodig bij ernstige gevallen)\nRecompressiekamer voor duiknoodgevallen',
      insurance:
        'Een goede reisverzekering wordt sterk aangeraden. Neem noodzakelijke medicijnen op recept zelf mee, beschikbaarheid kan beperkt zijn.',
      cta_travel_info: 'Reisinformatie',
      cta_wellness: 'Wellnessactiviteiten',
      important_title: 'Belangrijke informatie',
      important_list:
        'Regel een reis- en zorgverzekering voordat je aankomt\nMalariapreventie kan zinvol zijn - overleg met een arts\nDe zon is sterk - gebruik zonnebrand met hoge SPF\nUitdroging komt vaak voor - drink voldoende water',
    },
  },
  'weather-koh-tao': {
    en: {
      title: 'Weather on Koh Tao',
      subtitle: "Plan your trip with insight into Koh Tao's tropical climate.",
      climate_title: 'Climate & seasons',
      climate_list:
        'Dry season: February to October, warm and sunny\nRainy season: November to January, short but heavy showers\nAverage temperature: 28-32C\nSea temperature: 27-30C',
      paragraph:
        'Most activities are possible year-round, but check the forecast before planning a boat trip. The dry season usually offers the best diving conditions with calm seas and good visibility.',
      cta_plan_activities: 'Plan activities',
      cta_go_diving: 'Go diving',
      packing_title: 'What to pack',
      packing_list:
        'High-SPF reef-safe sunscreen\nLightweight, breathable clothing\nRain jacket or poncho (for rainy season)\nWaterproof bag for electronics\nCap/hat and sunglasses\nQuick-dry clothing for water activities',
    },
    nl: {
      title: 'Weer op Koh Tao',
      subtitle: 'Plan je reis met inzicht in het tropische klimaat van Koh Tao.',
      climate_title: 'Klimaat & seizoenen',
      climate_list:
        'Droog seizoen: februari t/m oktober, warm en zonnig\nRegenseizoen: november t/m januari, korte maar hevige buien\nGemiddelde temperatuur: 28-32C\nZeetemperatuur: 27-30C',
      paragraph:
        'De meeste activiteiten zijn het hele jaar mogelijk, maar controleer de voorspelling voordat je een boottrip plant. Het droge seizoen biedt meestal de beste duikomstandigheden met kalme zee en goed zicht.',
      cta_plan_activities: 'Plan activiteiten',
      cta_go_diving: 'Ga duiken',
      packing_title: 'Wat neem je mee',
      packing_list:
        'Zonnebrand met hoge SPF (reef-safe)\nLichte, ademende kleding\nRegenjas of poncho (voor het regenseizoen)\nWaterdichte tas voor elektronica\nPet/hoed en zonnebril\nSneldrogende kleding voor wateractiviteiten',
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
