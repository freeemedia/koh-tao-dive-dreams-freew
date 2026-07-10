import re

path = '/Users/onemediaasia/Documents/GitHub/koh-tao-/src/pages/DiveSitesPage.tsx'
with open(path, 'r', encoding='utf-8') as f:
    src = f.read()

new_header = r"""import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Waves, Fish, Anchor, Eye, Clock, DollarSign } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const parseSiteList = (value: string) => {
  if (!value) return [];
  return value.split('\n').filter(Boolean).map(line => {
    const [name, path, description, depth, highlightStr, difficulty, location] = line.split('|');
    return {
      name: name || '',
      path: path || '',
      description: description || '',
      depth: depth || '',
      highlights: (highlightStr || '').split(',').filter(Boolean),
      difficulty: difficulty || '',
      location: location || '',
    };
  });
};

const DiveSitesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const locale = isDutch ? 'nl' : 'en';

  const fallbackContent = isDutch ? {
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
  } : {
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
  };

  const { content: pageContent } = usePageContent({ pageSlug: 'koh-tao-dive-sites', locale, fallbackContent });

  const deepDiveSites = parseSiteList(pageContent.deep_sites);
  const coralReefSites = parseSiteList(pageContent.coral_sites);
  const artificialSites = parseSiteList(pageContent.artificial_sites);
  const shallowSites = parseSiteList(pageContent.shallow_sites);
"""

old_start = src.find("import React, { useEffect } from 'react';")
old_end = src.find("\n  const getDifficultyColor")

if old_start == -1:
    print("ERROR: could not find start")
elif old_end == -1:
    print("ERROR: could not find end")
else:
    new_src = new_header + src[old_end:]
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_src)
    print(f"SUCCESS: replaced {src[:old_end].count(chr(10))} lines with new header ({new_header.count(chr(10))} lines)")
    print(f"New file length: {len(new_src.splitlines())} lines")
