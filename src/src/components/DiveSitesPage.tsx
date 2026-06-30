import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Waves, Fish, Anchor, Eye, Clock, DollarSign } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DiveSitesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const content = {
    nl: {
      heroTitle: 'Duiklocaties op Koh Tao',
      heroText: 'Ontdek meer dan 25 geweldige duiklocaties rond Koh Tao, van ondiepe koraalriffen tot diepe oceaanpinnacles. Elke plek biedt unieke onderwaterervaringen en rijk zeeleven.',
      bookDive: 'Boek je duik',
      overviewTitle: 'Beste duiklocaties op Koh Tao',
      overviewText: 'Koh Tao heeft meer dan 25 uitstekende duiklocaties met gevarieerde topografie en een overvloed aan zeeleven. Elke plek is uniek en biedt duikers van elk niveau iets anders, met genoeg variatie om ook ervaren duikers wekenlang te boeien.',
      stat1Title: '25+ locaties',
      stat1Text: 'Van ondiepe baaien tot diepe pinnacles',
      stat2Title: 'Divers zeeleven',
      stat2Text: 'Walvishaaien, roggen en koraalriffen',
      stat3Title: 'Kunstmatige riffen',
      stat3Text: 'Wrakken en structuren voor unieke duiken',
      stat4Title: 'Alle niveaus',
      stat4Text: 'Locaties voor beginners tot gevorderde duikers',
      deepTitle: 'Diepe duiklocaties voor gevorderde duikers',
      coralTitle: 'Prachtige koraalrif-locaties',
      artificialTitle: 'Kunstmatige duiklocaties',
      shallowTitle: 'Ondiepe duiklocaties voor beginners',
      depth: 'Diepte',
      bookingTitle: 'Ontdek de onderwaterwereld van Koh Tao',
      bookingText: 'Klaar om de geweldige duiklocaties van Koh Tao te ontdekken? Onze ervaren gidsen nemen je mee naar de beste plekken voor jouw niveau en interesses.',
 ive: 'Book your dive',
      overviewTitle: 'Best dive   },
    en: {
      heroTitle: 'Dive sites around Koh Tao',
      heroText: 'Discover more than 25 incredible dive sites around Koh Tao, from shallow coral reefs to deep ocean pinnacles. Every site offers unique underwater experiences and rich marine life.',
      bookD sites around Koh Tao',
      overviewText: 'Koh Tao has over 25 excellent dive sites with varied topography and abundant marine life. Each site is unique and offers something different for every diver level, with enough variety to keep experienced divers engaged for weeks.',
      stat1Title: '25+ sites',
      stat1Text: 'From shallow bays to deep pinnacles',
      stat2Title: 'Diverse marine life',
      stat2Text: 'Whale sharks, rays, and coral reefs',
      stat3Title: 'Artificial reefs',
      stat3Text: 'Wrecks and structures for unique dives',
      stat4Title: 'All levels',
      stat4Text: 'Sites for beginners through advanced divers',
      deepTitle: 'Deep dive sites for advanced divers',
      coralTitle: 'Beautiful coral reef sites',
      artificialTitle: 'Artificial dive sites',
      shallowTitle: 'Shallow dive sites for beginners',
      depth: 'Depth',
      bookingTitle: 'Discover Koh Tao’s underwater world',
      bookingText: 'Ready to explore Koh Tao’s amazing dive sites? Our experienced guides take you to the best spots for your level and interests.',
    },
  };
  const pageContent = isDutch ? content.nl : content.en;

  useEffect(() => {
    const hash = location.hash?.replace('#', '') || '';
    const normalizedHash = hash === 'schedue' ? 'schedule' : hash;
    if (!normalizedHash) return;

    if (hash === 'schedue') {
      window.history.replaceState(null, '', `${location.pathname}#schedule`);
    }

    requestAnimationFrame(() => {
      const el = document.getElementById(normalizedHash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }, [location.hash, location.pathname]);

  const deepDiveSites = isDutch
    ? [
        {
          name: "Sail Rock",
          path: "/dive-sites/sail-rock",
          description: "De belangrijkste diepe duiklocatie van Koh Tao met grote visscholen, walvishaaien en reuzenbarracuda.",
          depth: "18-40m",
          highlights: ["Walvishaaien", "Reuzenbarracuda", "Malabar grouper", "Zeilvis"],
          difficulty: "Gevorderd",
          location: "40 minuten offshore"
        },
        {
          name: "Chumphon Pinnacle",
          description: "Granieten pinnacle met uitstekende kansen op walvishaaien en grote scholen trevally.",
          depth: "15-30m",
          highlights: ["Walvishaaien", "Trevally-scholen", "Adelaarsroggen", "Chevron-barracuda"],
          difficulty: "Gevorderd",
          location: "30 minuten offshore"
        },
        {
          name: "South West Pinnacle",
          description: "Diepe pinnacle, bekend om walvishaaien, brydevinvissen en grote pelagische vis.",
          depth: "15-35m",
          highlights: ["Walvishaaien", "Brydevinvissen", "Reuzenbarracuda", "Koningsmakreel"],
          difficulty: "Gevorderd",
          location: "30-40 minuten offshore"
        }
      ]
    : [
        {
          name: "Sail Rock",
          path: "/dive-sites/sail-rock",
          description: "Koh Tao’s flagship deep dive site with huge fish schools, whale sharks, and giant barracuda.",
          depth: "18-40m",
          highlights: ["Whale sharks", "Giant barracuda", "Malabar grouper", "Sailfish"],
          difficulty: "Gevorderd",
          location: "40 minutes offshore"
        },
        {
          name: "Chumphon Pinnacle",
          description: "Granite pinnacle with excellent whale shark sightings and large schools of trevally.",
          depth: "15-30m",
          highlights: ["Whale sharks", "Trevally schools", "Eagle rays", "Chevron barracuda"],
          difficulty: "Gevorderd",
          location: "30 minutes offshore"
        },
        {
          name: "South West Pinnacle",
          description: "Deep pinnacle known for whale sharks, Bryde’s whales, and large pelagic fish.",
          depth: "15-35m",
          highlights: ["Whale sharks", "Bryde’s whales", "Giant barracuda", "Spanish mackerel"],
          difficulty: "Gevorderd",
          location: "30-40 minutes offshore"
        }
      ];

  const coralReefSites = isDutch
    ? [
        {
          name: "Japanese Gardens",
          description: "Gevarieerde koraalriffen met kleurrijk zeeleven en swim-throughs.",
          depth: "12-25m",
          highlights: ["Pink-tailed triggerfish", "Ocellated adelaarsrog", "Kleurrijk koraal", "Gemarmerde octopus"],
          difficulty: "Gemiddeld",
          location: "Bij Koh Nang Yuan"
        },
        {
          name: "Shark Island",
          description: "Prachtige paarse boomkoralen en gorgonen met veel zeeleven.",
          depth: "8-20m",
          highlights: ["Zeewaaiers", "Zweepkoralen", "Zwartpuntrifhaaien", "Tropische vissen"],
          difficulty: "Beginner-Gemiddeld",
          location: "Zuidkust"
        },
        {
          name: "Mango Bay",
          description: "Ondiepe koraalriffen, ideaal voor ontspannen duiken met een gezond ecosysteem.",
          depth: "5-18m",
          highlights: ["Kleurrijk koraal", "Rifvissen", "Zeeanemonen"],
          difficulty: "Beginner",
          location: "Baai aan westkust"
        }
      ]
    : [
        {
          name: "Japanese Gardens",
          description: "Varied coral reefs with colorful marine life and swim-throughs.",
          depth: "12-25m",
          highlights: ["Pink-tailed triggerfish", "Ocellated eagle ray", "Colorful coral", "Marbled octopus"],
          difficulty: "Gemiddeld",
          location: "Near Koh Nang Yuan"
        },
        {
          name: "Shark Island",
          description: "Beautiful purple soft corals and gorgonians with abundant marine life.",
          depth: "8-20m",
          highlights: ["Sea fans", "Whip corals", "Blacktip reef sharks", "Tropical fish"],
          difficulty: "Beginner-Gemiddeld",
          location: "South coast"
        },
        {
          name: "Mango Bay",
          description: "Shallow coral reefs ideal for relaxed diving with a healthy ecosystem.",
          depth: "5-18m",
          highlights: ["Colorful coral", "Reef fish", "Sea anemones"],
          difficulty: "Beginner",
          location: "Bay on west coast"
        }
      ];

  const artificialSites = isDutch
    ? [
        {
          name: "HTMS Sattakut",
          description: "Voormalig Amerikaans marineschip uit WOII, geschonken door de Thaise marine en nu een bloeiend kunstmatig rif.",
          depth: "18-30m",
          highlights: ["Wrakverkenning", "Marien leven", "Swim-throughs", "Historische waarde"],
          difficulty: "Gevorderd",
          location: "Tussen de eilanden"
        },
        {
          name: "Junkyard Reef",
          description: "Kunstmatige stalen structuren met gezond koraal en divers zeeleven.",
          depth: "8-15m",
          highlights: ["Kunstmatige structuren", "Gezond koraal", "Diverse vissoorten", "Natuurproject"],
          difficulty: "Beginner-Gemiddeld",
          location: "Westkust"
        },
        {
          name: "Buoyancy World",
          description: "Betonblokken en buizen die nieuwe ecosystemen voor zeeleven vormen.",
          depth: "5-12m",
          highlights: ["Betonstructuren", "Nieuwe koraalgroei", "Klein zeeleven", "Educatief"],
          difficulty: "Beginner",
          location: "Aow Leuk"
        }
      ]
    : [
        {
          name: "HTMS Sattakut",
          description: "Former WWII US Navy ship donated by the Thai Navy, now a thriving artificial reef.",
          depth: "18-30m",
          highlights: ["Wreck exploration", "Marine life", "Swim-throughs", "Historic value"],
          difficulty: "Gevorderd",
          location: "Between the islands"
        },
        {
          name: "Junkyard Reef",
          description: "Artificial steel structures with healthy coral growth and diverse marine life.",
          depth: "8-15m",
          highlights: ["Artificial structures", "Healthy coral", "Diverse fish species", "Conservation project"],
          difficulty: "Beginner-Gemiddeld",
          location: "West coast"
        },
        {
          name: "Buoyancy World",
          description: "Concrete blocks and pipes that create new ecosystems for marine life.",
          depth: "5-12m",
          highlights: ["Concrete structures", "New coral growth", "Small marine life", "Educational"],
          difficulty: "Beginner",
          location: "Aow Leuk"
        }
      ];

  const shallowSites = isDutch
    ? [
        {
          name: "Aow Leuk",
          description: "Ondiepe baai met koraaltuinen en makkelijke duikomstandigheden.",
          depth: "3-10m",
          highlights: ["Koraaltuinen", "Tropische vissen", "Makkelijke toegang", "Trainingslocatie"],
          difficulty: "Beginner",
          location: "Westkust"
        },
        {
          name: "Hin Ngam",
          description: "Ondiep rif met kunstmatige structuren en veel zeeleven.",
          depth: "5-12m",
          highlights: ["Kunstmatige riffen", "Kleurrijke vissen", "Veilig duiken", "Fotografie"],
          difficulty: "Beginner",
          location: "Westkust"
        },
        {
          name: "Tanote Bay",
          description: "Duiklocatie aan de oostkant met macrokansen en kleurrijk rifleven.",
          depth: "8-15m",
          highlights: ["Hengelaarsvis", "Pijpvis", "Macrofotografie", "Kleurrijk rif"],
          difficulty: "Gemiddeld",
          location: "Oostkust"
        }
      ]
    : [
        {
          name: "Aow Leuk",
          description: "Shallow bay with coral gardens and easy diving conditions.",
          depth: "3-10m",
          highlights: ["Coral gardens", "Tropical fish", "Easy entry", "Training site"],
          difficulty: "Beginner",
          location: "West coast"
        },
        {
          name: "Hin Ngam",
          description: "Shallow reef with artificial structures and abundant marine life.",
          depth: "5-12m",
          highlights: ["Artificial reefs", "Colorful fish", "Safe diving", "Photography"],
          difficulty: "Beginner",
          location: "West coast"
        },
        {
          name: "Tanote Bay",
          description: "East-coast dive site with macro opportunities and colorful reef life.",
          depth: "8-15m",
          highlights: ["Frogfish", "Pipefish", "Macro photography", "Colorful reef"],
          difficulty: "Gemiddeld",
          location: "East coast"
        }
      ];

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

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/whale.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{pageContent.heroTitle}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            {pageContent.heroText}
          </p>
          <a href="https://www.divinginasia.com/#contact" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
              {pageContent.bookDive}
            </Button>
          </a>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">{pageContent.overviewTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              {pageContent.overviewText}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Waves className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>{pageContent.stat1Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{pageContent.stat1Text}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Fish className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>{pageContent.stat2Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{pageContent.stat2Text}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Anchor className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>{pageContent.stat3Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{pageContent.stat3Text}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Eye className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>{pageContent.stat4Title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{pageContent.stat4Text}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Deep Dive Sites */}
      <section id="schedule" className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">{pageContent.deepTitle}</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {deepDiveSites.map((site, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <CardTitle className="text-xl">
                        {site.path ? (
                          <Link to={site.path} className="hover:text-blue-600 underline-offset-4 hover:underline">
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
                    <span>{pageContent.depth}: {site.depth}</span>
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
            ))}
          </div>
        </div>
      </section>

      {/* Coral Reef Sites */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">{pageContent.coralTitle}</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {coralReefSites.map((site, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <CardTitle className="text-xl">{site.name}</CardTitle>
                    </div>
                    <Badge className={getDifficultyColor(site.difficulty)}>{difficultyLabel(site.difficulty)}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span>{pageContent.depth}: {site.depth}</span>
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
            ))}
          </div>
        </div>
      </section>

      {/* Artificial Sites */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">{pageContent.artificialTitle}</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {artificialSites.map((site, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <CardTitle className="text-xl">{site.name}</CardTitle>
                    </div>
                    <Badge className={getDifficultyColor(site.difficulty)}>{difficultyLabel(site.difficulty)}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span>{pageContent.depth}: {site.depth}</span>
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
            ))}
          </div>
        </div>
      </section>

      {/* Shallow Sites */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">{pageContent.shallowTitle}</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {shallowSites.map((site, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <CardTitle className="text-xl">{site.name}</CardTitle>
                    </div>
                    <Badge className={getDifficultyColor(site.difficulty)}>{difficultyLabel(site.difficulty)}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span>{pageContent.depth}: {site.depth}</span>
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
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{pageContent.bookingTitle}</h2>
            <p className="text-lg text-muted-foreground">
              {pageContent.bookingText}
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
                  onClick={() => navigate(`/booking?item=${encodeURIComponent('Fun Dive')}&type=dive&price=1800&currency=THB&dives=2`)}
                >
                  {pageContent.bookDive}
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
                  onClick={() => navigate(`/booking?item=${encodeURIComponent('Sail Rock Special')}&type=dive&price=2900&currency=THB`)}
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