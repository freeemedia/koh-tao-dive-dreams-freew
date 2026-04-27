import React, { useEffect } from 'react';
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

const SITE_PATHS: Record<string, string> = {
  'Sail Rock': '/dive-sites/sail-rock',
  'Chumphon Pinnacle': '/dive-sites/chumphon-pinnacle',
  'South West Pinnacle': '/dive-sites/south-west-pinnacle',
  'Japanese Gardens': '/dive-sites/japanese-gardens',
  'Shark Island': '/dive-sites/shark-island',
  'Mango Bay': '/dive-sites/mango-bay',
  'HTMS Sattakut': '/dive-sites/htms-sattakut',
  'Junkyard Reef': '/dive-sites/junkyard-reef',
  'Buoyancy World': '/dive-sites/buoyancy-world',
  'Aow Leuk': '/dive-sites/aow-leuk',
  'Hin Ngam': '/dive-sites/hin-ngam',
  'Tanote Bay': '/dive-sites/tanote-bay',
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

  const resolveSitePath = (site: { name: string; path: string }) => site.path || SITE_PATHS[site.name] || '';

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Beginner-Gemiddeld': return 'bg-blue-100 text-blue-800';
      case 'Gemiddeld': return 'bg-yellow-100 text-yellow-800';
      case 'Gevorderd': return 'bg-red-100 text-red-800';
      default: return 'bg-muted text-gray-800';
    }
  };

  const difficultyLabel = (difficulty: string) => {
    if (isDutch) return difficulty;

    switch (difficulty) {
      case 'Beginner-Gemiddeld':
        return 'Beginner-Intermediate';
      case 'Gemiddeld':
        return 'Intermediate';
      case 'Gevorderd':
        return 'Advanced';
      default:
        return difficulty;
    }
  };

  const renderSiteCard = (site: {
    name: string;
    path: string;
    description: string;
    depth: string;
    highlights: string[];
    difficulty: string;
    location: string;
  }, index: number) => {
    const linkPath = resolveSitePath(site);

    return (
      <Card key={index} className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-xl">
                {linkPath ? (
                  <Link to={linkPath} className="hover:text-blue-600 underline-offset-4 hover:underline">
                    {site.name}
                  </Link>
                ) : (
                  site.name
                )}
              </CardTitle>
            </div>
            <Badge className={getDifficultyColor(site.difficulty)}>{difficultyLabel(site.difficulty)}</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
            <span>{pageContent.depth_label}: {site.depth}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {site.location}
            </span>
          </div>
          <CardDescription>{site.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {site.highlights.map((highlight, i) => (
              <Badge key={i} variant="outline">{highlight}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/whale.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{pageContent.hero_title}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            {pageContent.hero_text}
          </p>
          <a href="https://www.divinginasia.com/#contact" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
              {pageContent.book_dive}
            </Button>
          </a>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">{pageContent.overview_title}</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              {pageContent.overview_text}
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Waves className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>{pageContent.stat1_title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{pageContent.stat1_text}</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Fish className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>{pageContent.stat2_title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{pageContent.stat2_text}</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Anchor className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>{pageContent.stat3_title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{pageContent.stat3_text}</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Eye className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>{pageContent.stat4_title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{pageContent.stat4_text}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Deep Dive Sites */}
      <section id="schedule" className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">{pageContent.deep_title}</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {deepDiveSites.map(renderSiteCard)}
          </div>
        </div>
      </section>

      {/* Coral Reef Sites */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">{pageContent.coral_title}</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {coralReefSites.map(renderSiteCard)}
          </div>
        </div>
      </section>

      {/* Artificial Sites */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">{pageContent.artificial_title}</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {artificialSites.map(renderSiteCard)}
          </div>
        </div>
      </section>

      {/* Shallow Sites */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">{pageContent.shallow_title}</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {shallowSites.map(renderSiteCard)}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{pageContent.booking_title}</h2>
            <p className="text-lg text-muted-foreground">
              {pageContent.booking_text}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <CardTitle className="text-lg">{isDutch ? 'Fun Diving Pakketten' : 'Fun Diving Packages'}</CardTitle>
                </div>
                <CardDescription>{isDutch ? 'Volumekortingen beschikbaar' : 'Volume discounts available'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">{isDutch ? '1 Duik' : '1 Dive'}</span>
                    <span className="text-xl font-bold text-blue-600">
                      ฿1,000 <span className="text-sm text-muted-foreground">/{isDutch ? 'duik' : 'dive'}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">{isDutch ? '2-9 Duiken' : '2-9 Dives'}</span>
                    <span className="text-xl font-bold text-blue-600">
                      ฿900 <span className="text-sm text-muted-foreground">/{isDutch ? 'duik' : 'dive'}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b bg-green-50 p-2 rounded">
                    <span className="font-medium">{isDutch ? '10+ Duiken' : '10+ Dives'}</span>
                    <span className="text-xl font-bold text-green-600">
                      ฿800 <span className="text-sm text-muted-foreground">/{isDutch ? 'duik' : 'dive'}</span>
                    </span>
                  </div>
                </div>
                <div className="bg-background p-4 rounded-lg mb-4">
                  <p className="font-semibold mb-2">{isDutch ? 'Inclusief:' : 'Includes:'}</p>
                  <ul className="space-y-1 text-sm">
                    <li>✓ {isDutch ? 'Gecertificeerde duikgids' : 'Certified scuba dive guide'}</li>
                    <li>✓ {isDutch ? 'Gebruik van alle duikuitrusting' : 'Use of all scuba equipment'}</li>
                    <li>✓ {isDutch ? 'Maximaal 4 duikers per gids' : 'Maximum 4 divers per guide'}</li>
                    <li>✓ {isDutch ? 'Zoetwaterdouches' : 'Freshwater showers'}</li>
                  </ul>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => {
                    window.open('https://booking.divinginasia.com/booking?item=Fun%20Dive&type=dive&price=1800&currency=THB&dives=2', '_blank', 'noopener');
                  }}
                >
                  {pageContent.book_dive}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">
                    <Link to="/dive-sites/sail-rock" className="hover:text-blue-600">
                      Sail Rock Special Trip
                    </Link>
                  </CardTitle>
                </div>
                <CardDescription>{isDutch ? 'Volledige dagtrip premium pakket' : 'Full-day premium trip package'}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600 mb-2">฿2,900</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {isDutch ? 'Volledige dag excursie (3 duiken)' : 'Full day excursion (3 dives)'}
                </p>
                <ul className="space-y-2 text-sm mb-4">
                  <li>• {isDutch ? 'Ontbijt & lunch inbegrepen' : 'Breakfast & lunch included'}</li>
                  <li>• {isDutch ? 'Premium uitrusting' : 'Premium equipment'}</li>
                  <li>• {isDutch ? 'Expert gids' : 'Expert guide'}</li>
                  <li>• {isDutch ? 'Walvishaai kansen' : 'Whale shark opportunities'}</li>
                </ul>
                <Button 
                  className="w-full"
                  onClick={() => {
                    window.open('https://booking.divinginasia.com/booking?item=Sail%20Rock%20Special&type=dive&price=2900&currency=THB', '_blank', 'noopener');
                  }}
                >
                  {isDutch ? 'Boek Sail Rock' : 'Book Sail Rock'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiveSitesPage;