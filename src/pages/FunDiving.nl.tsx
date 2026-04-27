import Contact from '../components/Contact';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Fish, Waves, MapPin, Clock, DollarSign, Users } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { usePageContent } from '@/hooks/usePageContent';
import { tryAutoScroll, scrollToWithOffset } from '@/lib/scroll';
import DropboxGallerySection from '@/components/DropboxGallerySection';

const FUN_DIVING_DROPBOX_FOLDER = 'fun-diving';

const FunDiving = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const locale = 'nl';
  const fallbackContent = useMemo(() => ({
    fun_diving_hero_title: 'Fun diven op Koh Tao',
    fun_diving_hero_subtitle: 'Beleef het beste van de onderwaterwereld van Koh Tao met onze professioneel begeleide fun duiktrips. Ontdek kleurrijke koraalriffen, ontmoet bijzonder onderwaterleven en maak onvergetelijke herinneringen.',
    fun_diving_hero_cta: 'Ga fun diven op Koh Tao',
    fun_diving_hero_cta2: 'Boek een cursus',
    fun_diving_overview_title: 'Van adembenemende scheepswrakken tot exotisch onderwaterleven',
    fun_diving_overview_body: "Koh Tao heeft alles voor fun duiken! We zijn trots op het bieden van een persoonlijke, ontspannen en plezierige duikervaring. We tonen je de mooiste onderwaterwereld afgestemd op jouw trainingsniveau en ervaring, zodat je duiken perfect aansluiten bij je specifieke interesses.",
    fun_diving_world_class_title: 'Wereldklasse duiklocaties',
    fun_diving_world_class_body: 'Onder het turquoise water rond Koh Tao ligt een wereld van kleurrijke koraalriffen, bruisend onderwaterleven van macro-wezens tot schildpadden en als je geluk hebt, de majestueuze walvishaai. Met meer dan 25 fascinerende duiklocaties is er eindeloze diversiteit.',
    fun_diving_expert_title: 'Expert duikprofessionals',
    fun_diving_expert_body: 'Ons duikteam bestaat uit ervaren en zeer deskundige duikprofessionals die zich volledig hebben verdiept in de lokale rifecologie en duiklocaties. Hun expertise zorgt voor een veilige en verrijkende duikervaring.',
    fun_diving_marine_life_title: 'Divers onderwaterleven',
    fun_diving_marine_life_body: 'Van enorme walvishaaien en sierlijke zeeschildpadden tot kleurrijke rifvissen en fascinerend macro-leven, de wateren van Koh Tao herbergen een ongelooflijke variëteit aan mariene soorten. Elke duik brengt nieuwe ontdekkingen en onvergetelijke ontmoetingen.',
    fun_diving_flexible_title: 'Flexibel schema',
    fun_diving_flexible_body: 'We organiseren twee duiktrips per dag - ochtend en middag - op onze ruime, aangepaste duikboten. Na een spannende dag duiken kun je ontspannen met verfrissende drankjes en je ongelooflijke onderwaterervaringen delen tijdens een prachtige zonsondergang.',
    fun_diving_ready_title: 'Klaar om te verkennen?',
    fun_diving_ready_body: 'Of je nu een pas gecertificeerde Open Water duiker bent of een ervaren technisch duiker, we hebben de perfecte duiklocaties en pakketten voor jou. Boek vandaag nog je fun duikavontuur!',
    fun_diving_ready_cta1: 'Bekijk prijzen & schema',
    fun_diving_ready_cta2: 'Ontdek duiklocaties',
    fun_diving_trips_title: "Trips & programma's",
    fun_diving_sites_title: 'Beste fun duiktrips op Koh Tao',
    fun_diving_all_sites_title: 'Alle duiklocaties',
    fun_diving_marine_tab_title: 'Ontdek de onderwaterwereld',
    // ...add more as needed for other tabs
  }), []);
  const { content } = usePageContent({ pageSlug: 'fun-diving', locale, fallbackContent });
  const diveSites = [
    {
      name: "Sail Rock",
      path: '/dive-sites/sail-rock',
      description: "Top diepduiklocatie met grote visscholen, walvishaaien en reuzenbarracuda.",
      depth: "18-40m",
      highlights: ["Walvishaaien", "Reuzenbarracuda", "Malabar tandbaars"]
    },
    {
      name: "Chumphon Pinnacles",
      path: '/dive-sites/chumphon-pinnacle',
      description: "Granieten rotspieken met uitstekende kans op walvishaaien en grote scholen trevally.",
      depth: "15-30m",
      highlights: ["Walvishaaien", "Scholen trevally", "Adelaarsroggen"]
    },
    {
      name: "Japanese Gardens",
      path: '/dive-sites/japanese-gardens',
      description: "Divers koraalrif met kleurrijk onderwaterleven en doorgangen.",
      depth: "12-25m",
      highlights: ["Roze staarttrekker", "Gevlekte adelaarsrog", "Kleurrijk koraal"]
    },
    {
      name: "Mango Bay",
      path: '/dive-sites/mango-bay',
      description: "Ondiepe koraalriffen, perfect voor ontspannen duiken met veel onderwaterleven.",
      depth: "5-18m",
      highlights: ["Kleurrijk koraal", "Tropische vissen", "Zeegrasvelden"]
    }
  ];

  const allDiveSites = [
    { name: 'Sail Rock', path: '/dive-sites/sail-rock' },
    { name: 'Chumphon Pinnacle', path: '/dive-sites/chumphon-pinnacle' },
    { name: 'Japanese Gardens', path: '/dive-sites/japanese-gardens' },
    { name: 'HTMS Sattakut', path: '/dive-sites/htms-sattakut' },
    { name: 'Twins Pinnacle', path: '/dive-sites/twins-pinnacle' },
    { name: 'Shark Island', path: '/dive-sites/shark-island' },
    { name: 'Mango Bay', path: '/dive-sites/mango-bay' },
  ];

  const marineLife = [
    { name: "Walvishaaien", description: "Zachte reuzen die vaak te zien zijn bij Sail Rock en Chumphon Pinnacle" },
    { name: "Rifinktvis", description: "Kleurrijke koppotigen die vaak in dieper water worden gezien" },
    { name: "Gemarmerde octopus", description: "Kleine maar fascinerende dieren in macro-omgevingen" },
    { name: "Diverse rifvissen", description: "Kleurrijke scholen en unieke rifsoorten" }
  ];

  // Helper for smooth scroll
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const location = useLocation();

  const getTabForAnchor = (anchor: string) => {
    switch (anchor) {
      case 'world-class-dive-sites':
      case 'sites':
        return 'sites';
      case 'schedule':
      case 'pricing':
        return 'schedule';
      case 'requirements':
        return 'requirements';
      case 'faq':
        return 'faq';
      case 'tips':
        return 'tips';
      case 'booking':
        return 'booking';
      case 'fun-dive-main':
      default:
        return 'overview';
    }
  };

  useEffect(() => {
    const fromStorage = sessionStorage.getItem('scrollTo');
    const hashAnchor = location.hash ? location.hash.replace('#', '') : null;
    const anchor = fromStorage || hashAnchor;
    if (anchor) {
      const targetTab = getTabForAnchor(anchor);
      setActiveTab(targetTab);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          tryAutoScroll(anchor);
        });
      });
      try { sessionStorage.removeItem('scrollTo'); } catch (_) {}
    } else {
      setActiveTab('overview');
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/photo-1682687982423-295485af248a.avif')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{content.fun_diving_hero_title}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{content.fun_diving_hero_subtitle}</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-4">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg"
              onClick={() => {
                const el = document.getElementById('fun-dive-tabs');
                if (el) {
                  scrollToWithOffset('fun-dive-tabs');
                } else {
                  try { sessionStorage.setItem('scrollTo', 'fun-dive-tabs'); } catch (_) {}
                  navigate('/fun-diving-koh-tao');
                }
              }}
            >
              {content.fun_diving_hero_cta}
            </Button>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg" onClick={() => { try{ sessionStorage.setItem('scrollTo','course-openWater') }catch(_){ } ; navigate('/courses'); }}>{content.fun_diving_hero_cta2}</Button>
          </div>
        </div>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div id="fun-dive-tabs" className="max-w-6xl mx-auto px-4 py-8">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9">
            <TabsTrigger value="overview">Overzicht</TabsTrigger>
            <TabsTrigger value="trips">{content.fun_diving_trips_title || 'Duiktrips'}</TabsTrigger>
            <TabsTrigger value="sites">Locaties</TabsTrigger>
            <TabsTrigger value="marine">Marien</TabsTrigger>
            <TabsTrigger value="schedule">Schema</TabsTrigger>
            <TabsTrigger value="requirements">Vereisten</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
            <TabsTrigger value="booking">Boeken</TabsTrigger>
          </TabsList>
        </div>

        {/* Introduction */}
        <TabsContent value="overview" className="transition-none">
          <section id="fun-dive-main" className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-6">{content.fun_diving_overview_title}</h2>
                <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8">
                  {content.fun_diving_overview_body}
                </p>
              </div>

              <DropboxGallerySection
                folder={FUN_DIVING_DROPBOX_FOLDER}
                title="Fun diving galerij"
                description="Foto's van recente fun duiktrips rond Koh Tao. Voeg beelden toe aan de Dropbox-map om deze sectie bij te werken zonder de pagina aan te passen."
                unavailableMessage="Fun diving foto's verschijnen hier zodra de Dropbox-map klaar is."
                emptyMessage="Fun diving foto's verschijnen hier zodra er afbeeldingen aan Dropbox zijn toegevoegd."
              />

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Waves className="w-5 h-5 text-blue-600" />
                      {content.fun_diving_world_class_title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {content.fun_diving_world_class_body}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-600" />
                      {content.fun_diving_expert_title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {content.fun_diving_expert_body}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Fish className="w-5 h-5 text-orange-600" />
                      {content.fun_diving_marine_life_title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {content.fun_diving_marine_life_body}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-purple-600" />
                      {content.fun_diving_flexible_title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {content.fun_diving_flexible_body}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 p-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-4">{content.fun_diving_ready_title}</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  {content.fun_diving_ready_body}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" onClick={() => setActiveTab('schedule')} className="bg-blue-600 hover:bg-blue-700">
                    {content.fun_diving_ready_cta1}
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setActiveTab('sites')}>
                    {content.fun_diving_ready_cta2}
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Trips & Programs */}
        <TabsContent value="trips" className="transition-none">
          <section className="py-12 px-4 bg-background">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-8">{content.fun_diving_trips_title}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Fun duik</CardTitle>
                      <Badge>Recreatief</Badge>
                    </div>
                    <CardDescription>Duur: Halve dag — 2 duiken</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">Begeleide duiken naar nabijgelegen riffen — geschikt voor gebrevetteerde duikers van elk niveau.</p>
                    <ul className="list-disc pl-5 text-sm mb-4">
                      <li>Ervaren PADI-gidsen</li>
                      <li>Premium uitrusting</li>
                      <li>Maximaal 4 duikers per gids</li>
                    </ul>
                          <Button variant="secondary" onClick={() => { window.open('https://booking.divinginasia.com/booking?item=Fun%20Dive&type=dive&price=1800&currency=THB&dives=2', '_blank', 'noopener'); }}>Info / Boeken</Button>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Discover Scuba (proefduik)</CardTitle>
                      <Badge>Beginner</Badge>
                    </div>
                    <CardDescription>Duur: Halve dag — korte introductieduik</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">Perfect voor beginners — eerst zwembadvaardigheden, gevolgd door een ondiepe begeleide duik.</p>
                    <ul className="list-disc pl-5 text-sm mb-4">
                      <li>Geen brevet vereist</li>
                      <li>Vriendelijke instructeurs</li>
                      <li>Uitrusting & foto's beschikbaar</li>
                    </ul>
                    <div className="flex gap-2">
                      <Button variant="outline" asChild>
                        <Link to="/courses/discover-scuba">Bekijk programma</Link>
                      </Button>
                      <Button variant="secondary" onClick={() => { window.open('https://booking.divinginasia.com/booking?item=Discover%20Scuba&type=dive&price=2500&currency=THB', '_blank', 'noopener'); }}>Info / Boeken</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Sail Rock-special</CardTitle>
                      <Badge>Hele dag</Badge>
                    </div>
                    <CardDescription>Duur: Hele dag — 3 duiken met lunch</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">Een volledige offshore dagtrip naar Sail Rock en omliggende pinnacles — kans op grote pelagische soorten.</p>
                    <ul className="list-disc pl-5 text-sm mb-4">
                      <li>Ontbijt & lunch inbegrepen</li>
                      <li>Ervaren gidsen en briefings</li>
                      <li>Ophalen en terugbrengen op Koh Tao</li>
                    </ul>
                    <Button variant="secondary" onClick={() => { window.open('https://booking.divinginasia.com/booking?item=Sail%20Rock%20Special&type=dive&price=2900&currency=THB', '_blank', 'noopener'); }}>Info / Boeken</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Dive Sites */}
        <TabsContent value="sites" className="transition-none">
          <section id="world-class-dive-sites" className="py-16 px-4 bg-muted/50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">{content.fun_diving_sites_title}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {diveSites.map((site, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <CardTitle className="text-xl">
                          <Link to={site.path} className="hover:text-blue-600 underline-offset-4 hover:underline">
                            {site.name}
                          </Link>
                        </CardTitle>
                        <Badge variant="secondary">{site.depth}</Badge>
                      </div>
                      <CardDescription>{site.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {site.highlights.map((highlight, i) => (
                          <Badge key={i} variant="outline">{highlight}</Badge>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Link to={site.path} className="text-sm font-medium text-blue-600 hover:underline underline-offset-4">
                          Bekijk details van de duiklocatie
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="text-2xl font-bold text-center mb-4">{content.fun_diving_all_sites_title}</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {allDiveSites.map((site) => (
                    <Link
                      key={site.path}
                      to={site.path}
                      className="inline-flex items-center rounded-full border border-blue-200 bg-background px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                    >
                      {site.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Marien leven */}
        <TabsContent value="marine" className="transition-none">
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">{content.fun_diving_marine_tab_title}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {marineLife.map((animal, index) => (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <CardTitle className="text-lg">{animal.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{animal.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link to="/marine-life" className="inline-flex items-center text-blue-600 font-medium hover:underline underline-offset-4">
                  Bekijk al het onderwaterleven
                </Link>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Boat Schedule & Prijs */}
        <TabsContent value="schedule" className="transition-none">
          <section id="schedule" className="py-16 px-4 bg-muted/50">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-4xl font-bold mb-8">Bootschema fun duiken</h2>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <CardTitle className="text-lg">Ochtendtrips</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>Dagelijkse vertrektijden om 08:00 en 10:00</p>
                        <p className="text-sm text-muted-foreground mt-2">2 duiken per trip</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <CardTitle className="text-lg">Middagtrips</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>Dagelijkse vertrektijd om 13:00</p>
                        <p className="text-sm text-muted-foreground mt-2">2 duiken per trip</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <CardTitle className="text-lg">
                            <Link to="/dive-sites/sail-rock" className="hover:text-blue-600 underline-offset-4 hover:underline">
                              Sail Rock-special
                            </Link>
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>Woensdag en zaterdag om 06:30</p>
                        <p className="text-sm text-muted-foreground mt-2">Hele dagtrip met lunch</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h2 id="pricing" className="text-4xl font-bold mb-8">Prijzen</h2>
                  <div className="space-y-4">
                    <Card className="border-2 border-blue-200 bg-blue-50">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <CardTitle className="text-lg">Fun duikpakketten</CardTitle>
                        </div>
                        <CardDescription>Volumekortingen beschikbaar</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="font-medium">1 duik</span>
                            <span className="text-xl font-bold text-blue-600">฿1.000 <span className="text-sm text-muted-foreground">/duik</span></span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="font-medium">2-9 duiken</span>
                            <span className="text-xl font-bold text-blue-600">฿900 <span className="text-sm text-muted-foreground">/duik</span></span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b bg-green-50 p-2 rounded">
                            <span className="font-medium">10+ duiken</span>
                            <span className="text-xl font-bold text-green-600">฿800 <span className="text-sm text-muted-foreground">/duik</span></span>
                          </div>
                        </div>
                        <div className="bg-background p-4 rounded-lg">
                          <p className="font-semibold mb-2">Inbegrepen:</p>
                          <ul className="space-y-1 text-sm">
                            <li>✓ Gecertificeerde duikgids</li>
                            <li>✓ Gebruik van alle duikuitrusting</li>
                            <li>✓ Maximaal 4 duikers per gids</li>
                            <li>✓ Zoetwaterdouches</li>
                          </ul>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">Vereiste: Open Water-certificering of gelijkwaardig</p>
                        <div className="mt-4">
                          <Link to="/koh-tao-dive-sites" className="text-sm font-medium text-blue-600 hover:underline underline-offset-4">
                            Bekijk overzicht van alle duiklocaties
                          </Link>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <CardTitle className="text-lg">Sail Rock-specialtrip</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-green-600">฿2.900</p>
                        <p className="text-sm text-muted-foreground">hele dagexcursie (3 duiken)</p>
                        <ul className="mt-4 space-y-2 text-sm">
                          <li>• Ontbijt & lunch inbegrepen</li>
                          <li>• Premium uitrusting</li>
                          <li>• Expert gids</li>
                          <li>• Kans op walvishaaien</li>
                        </ul>
                        <div className="mt-4">
                          <Link to="/dive-sites/sail-rock" className="text-sm font-medium text-blue-600 hover:underline underline-offset-4">
                            Bekijk Sail Rock-details
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Diver Vereisten */}
        <TabsContent value="requirements" className="transition-none">
          <section id="requirements" className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">Belangrijke informatie voor gebrevetteerde duikers</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Laatste duik-check</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Wanneer was je laatste duik? Als dat langer dan 12 maanden geleden is, adviseren we sterk dat
                      je een Scuba Review afrondt om je duikkennis en vaardigheden op te frissen.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Medische geschiktheid</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Alle duikers moeten de PADI Medical Questionnaire invullen. Als je op
                      een vraag "JA" antwoordt, kan een medische keuring nodig zijn vóór het duiken.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Vliegen na het duiken</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      DAN-richtlijnen: 12 uur na een enkele no-deco duik, 18 uur na meerdere
                      duiken. Wij bieden duikcomputers met optimale berekeningen voor oppervlakte-interval.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Weersomstandigheden</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Jouw veiligheid heeft prioriteit. Door weersomstandigheden kunnen trips
                      op korte termijn worden uitgesteld of verplaatst.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* FAQ Section */}
        <TabsContent value="faq" className="transition-none">
          <section id="faq" className="py-16 px-4 bg-muted/50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-4">Veelgestelde vragen</h2>
              <p className="text-center text-muted-foreground mb-12">
                Alles wat je moet weten voordat je met ons gaat duiken op Koh Tao
              </p>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Moet ik een gecertificeerde duiker zijn om fun duiken op Koh Tao te doen?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Ja, je moet een gecertificeerde duiker zijn om deel te nemen aan fun duiken. Koh Tao biedt
                      duiken voor alle certificeringsniveaus, dus of je nu Open Water-gecertificeerd bent of
                      geavanceerde training hebt, er zijn geschikte duiklocaties voor jou. Als je nog niet
                      gecertificeerd bent, bekijk dan onze{' '}
                      <Link to="/courses" className="text-blue-600 hover:underline">PADI-certificeringscursussen</Link>.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Wat kan ik verwachten tijdens een fun duik op Koh Tao?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Een typische fun duik op Koh Tao omvat een begeleide duik met een gecertificeerde
                      duikprofessional, die je meeneemt om het diverse onderwaterleven, koraalriffen en
                      onderwaterlandschappen te verkennen die het eiland beroemd maken. We organiseren twee
                      duiktrips per dag - ochtend en middag - op onze ruime, aangepaste duikboten.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Hoe diep duiken we tijdens fun duiken op Koh Tao?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Duiklocaties op Koh Tao zijn geschikt voor verschillende vaardigheidsniveaus. Dieptes
                      variëren, maar veel duiklocaties zijn geschikt voor Open Water-duikers en variëren van
                      12 meter (40 voet) tot 18 meter (60 voet). Voor meer ervaren duikers zijn er diepere
                      locaties beschikbaar van 30 tot 40 meter.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Is het nodig om fun duiken van tevoren te boeken?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Hoewel het niet altijd noodzakelijk is om van tevoren te boeken, vooral tijdens niet-piekperiodes,
                      is het raadzaam om ons te laten weten wanneer je van plan bent om met ons te komen duiken om
                      je plek te verzekeren en de beste ervaring te hebben. Tijdens het hoogseizoen (december-februari)
                      raden we aan om minstens een dag van tevoren te boeken.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Welk onderwaterleven kan ik zien tijdens fun duiken?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Onder het turquoise water rond Koh Tao ligt een wereld van kleurrijke koraalriffen,
                      bruisend onderwaterleven van macro-wezens tot zeeschildpadden en als je geluk hebt,
                      de majestueuze walvishaai. Met meer dan 25 fascinerende duiklocaties is er veel te zien,
                      waaronder barracuda's, grondels, trekervissen, inktvissen, octopussen en een verbluffende
                      variëteit aan tropische rifvissen.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Wat is inbegrepen in de prijs voor fun duiken?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Onze fun duikpakketten omvatten: gecertificeerde duikgids, gebruik van alle duikuitrusting
                      (BCD, ademautomaat, wetsuit, masker, vinnen), duikcomputer, gewichten, tank en maximaal
                      4 duikers per gids voor een persoonlijke ervaring. Zoetwaterdouches zijn beschikbaar na je duik.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Choosing a Dive Center */}
        <TabsContent value="tips" className="transition-none">
          <section id="tips" className="py-16 px-4 bg-muted/50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">Belangrijkste tips om een betrouwbare duikschool te kiezen</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Kwaliteitsuitrusting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Premium Aqualung-uitrusting met gebalanceerde ademautomaten en geïntegreerde loodsystemen.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Duikcomputer verplicht</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Essentieel voor diepe en repetitieve duiken. Geen duikcomputer, geen duik.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ervaren gidsen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      PADI-professionals met diepgaande kennis van lokaal onderwaterleven en duiksites.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Praktische locatie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Let op de afstand tot je accommodatie voor gemakkelijke toegang en ophaalservice.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Waarde vs prijs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Kwaliteitsuitrusting en ervaren gidsen kunnen 100-200 THB extra per duik kosten.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">PADI-certificering</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Kies centra die certificeringscursussen aanbieden als je nog geen gebrevetteerde duiker bent.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Booking Section */}
        <TabsContent value="booking" className="transition-none">
          <section id="booking" className="py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8">Boek jouw fun diving-avontuur</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Klaar om de geweldige onderwaterwereld van Koh Tao te ontdekken? Neem contact op voor een boekingsaanvraag of gebruik het formulier hieronder om direct te boeken.
              </p>
                <div className="mb-4 flex flex-col items-center gap-2">
                  <Link to="/fun-diving-koh-tao#world-class-dive-sites" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold">Fun Dive-informatie</Link>
                  <a href="/courses#course-openWater" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-semibold">Boek cursus (PADI)</a>
                  <a href="https://www.divinginasia.com/#contact" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold mb-2">Neem contact op om te boeken/informatie aan te vragen</a>
                  <div className="text-muted-foreground text-sm mb-4">Of gebruik het formulier hieronder om direct een boekingsaanvraag te sturen.</div>
                </div>
                <Button
                  size="lg"
                  onClick={() => navigate('/booking?item=Fun%20Dive&type=dive&price=2000&currency=THB&dives=2')}
                >
                  Verstuur boekingsaanvraag
                </Button>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FunDiving;