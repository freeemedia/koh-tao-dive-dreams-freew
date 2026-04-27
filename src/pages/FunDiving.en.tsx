import Contact from '../components/Contact';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Fish, Waves, MapPin, Clock, DollarSign, Users } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import FunDiveBooking from '../components/FunDiveBooking';
import DropboxGallerySection from '@/components/DropboxGallerySection';
import { tryAutoScroll, scrollToWithOffset } from '@/lib/scroll';
import { usePageContent } from '@/hooks/usePageContent';

const FUN_DIVING_DROPBOX_FOLDER = 'fun-diving';

const FunDiving = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showFunDiveBooking, setShowFunDiveBooking] = useState(false);
  const locale = 'en';
  const fallbackContent = useMemo(() => ({
    fun_diving_hero_title: 'Fun Diving Koh Tao',
    fun_diving_hero_subtitle: "Experience the best of Koh Tao's underwater world with our professionally guided fun dive trips. Discover colorful coral reefs, meet amazing marine life, and make unforgettable memories.",
    fun_diving_hero_cta: 'Go Fun Diving Koh Tao',
    fun_diving_hero_cta2: 'Book a Course',
    fun_diving_overview_title: 'From Breathtaking Shipwrecks to Exotic Marine Life',
    fun_diving_overview_body: "Koh Tao's fun dives have it all! We take pride in offering you a personalized, relaxed, and enjoyable fun diving experience. We're dedicated to showcasing the finest underwater marvels tailored to your level of training and experience, ensuring your dives align with your specific interests.",
    fun_diving_world_class_title: 'World-Class Dive Sites',
    fun_diving_world_class_body: "Beneath the turquoise water surrounding Koh Tao lies a world of colorful coral reefs, teeming marine life from macro creatures to turtles and if you're lucky, the majestic whale shark. With over 25 captivating dive sites, there's boundless diversity to explore.",
    fun_diving_expert_title: 'Expert Dive Professionals',
    fun_diving_expert_body: 'Our dive team comprises seasoned and highly knowledgeable dive professionals who have immersed themselves in the local reef ecology and dive sites. Their expertise ensures a safe and enriching diving experience for you.',
    fun_diving_marine_life_title: 'Diverse Marine Life',
    fun_diving_marine_life_body: "From massive whale sharks and graceful sea turtles to colorful reef fish and fascinating macro life, Koh Tao's waters host an incredible variety of marine species. Every dive brings new discoveries and unforgettable encounters.",
    fun_diving_flexible_title: 'Flexible Schedule',
    fun_diving_flexible_body: 'We run two dive trips a day - morning and afternoon - on our spacious customized dive boats. After an exhilarating day of diving, unwind with refreshing drinks and share your incredible underwater experiences over a stunning sunset.',
    fun_diving_ready_title: 'Ready to Explore?',
    fun_diving_ready_body: "Whether you're a newly certified Open Water diver or an experienced technical diver, we have the perfect dive sites and packages for you. Book your fun diving adventure today!",
    fun_diving_ready_cta1: 'View Pricing & Schedule',
    fun_diving_ready_cta2: 'Explore Dive Sites',
    fun_diving_trips_title: 'Trips & Programs',
    fun_diving_sites_title: 'Best Koh Tao Fun Diving Trips',
    fun_diving_all_sites_title: 'All Dive Sites',
    fun_diving_marine_tab_title: 'Discover the Underwater World',
    // ...add more as needed for other tabs
  }), []);
  const { content } = usePageContent({ pageSlug: 'fun-diving', locale, fallbackContent });
  const diveSites = [
    {
      name: "Sail Rock",
      path: '/dive-sites/sail-rock',
      description: "Top deep-dive site with huge fish schools, whale sharks, and giant barracuda.",
      depth: "18-40m",
      highlights: ["Whale Sharks", "Giant Barracuda", "Malabar Grouper"]
    },
    {
      name: "Chumphon Pinnacles",
      path: '/dive-sites/chumphon-pinnacle',
      description: "Granite pinnacles with excellent chances of whale sharks and large trevally schools.",
      depth: "15-30m",
      highlights: ["Whale Sharks", "Trevally Schools", "Eagle Rays"]
    },
    {
      name: "Japanese Gardens",
      path: '/dive-sites/japanese-gardens',
      description: "Diverse coral reef with colorful marine life and swim-throughs.",
      depth: "12-25m",
      highlights: ["Pinktail Triggerfish", "Spotted Eagle Ray", "Colorful Coral"]
    },
    {
      name: "Mango Bay",
      path: '/dive-sites/mango-bay',
      description: "Shallow coral reefs, perfect for relaxed dives packed with marine life.",
      depth: "5-18m",
      highlights: ["Colorful Coral", "Tropical Fish", "Seagrass Meadows"]
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
    { name: "Whale Sharks", description: "Gentle giants often spotted around Sail Rock and Chumphon Pinnacle" },
    { name: "Reef Cuttlefish", description: "Colorful cephalopods commonly seen in deeper water" },
    { name: "Marbled Octopus", description: "Small but fascinating animals in macro habitats" },
    { name: "Reef Fish Variety", description: "Colorful schools and unique reef species" }
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
                setShowFunDiveBooking(true);
              }}
            >
              Book a Fun Dive NOW
            </Button>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg" onClick={() => { try{ sessionStorage.setItem('scrollTo','course-openWater') }catch(_){ } ; navigate('/courses'); }}>{content.fun_diving_hero_cta2}</Button>
          </div>
          {showFunDiveBooking && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-60 p-4"
              onClick={() => setShowFunDiveBooking(false)}
            >
              <div className="relative z-50 w-full max-w-md" onClick={(event) => event.stopPropagation()}>
                <FunDiveBooking />
                <button
                  className="absolute top-2 right-2 bg-white rounded-full shadow p-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowFunDiveBooking(false)}
                  aria-label="Close Fun Dive Booking"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div id="fun-dive-tabs" className="max-w-6xl mx-auto px-4 py-8">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trips">{content.fun_diving_trips_title || 'Trips'}</TabsTrigger>
            <TabsTrigger value="sites">Sites</TabsTrigger>
            <TabsTrigger value="marine">Marine Life</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
            <TabsTrigger value="booking">Booking</TabsTrigger>
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
                title="Fun Diving Gallery"
                description="Photos from recent fun dive trips around Koh Tao. Add images to the Dropbox folder to keep this section updated without editing the page."
                unavailableMessage="Fun diving photos will appear here once the Dropbox folder is ready."
                emptyMessage="Fun diving photos will appear here once images are added to Dropbox."
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
                      <CardTitle>Fun Dive</CardTitle>
                      <Badge>Recreational</Badge>
                    </div>
                    <CardDescription>Duration: Half day — 2 dives</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">Guided dives to nearby reefs — suitable for certified divers of all levels.</p>
                    <ul className="list-disc pl-5 text-sm mb-4">
                      <li>Experienced PADI guides</li>
                      <li>Premium equipment</li>
                      <li>Max 4 divers per guide</li>
                    </ul>
                          <Button variant="secondary" onClick={() => { window.open('https://booking.divinginasia.com/booking?item=Fun%20Dive&type=dive&price=1800&currency=THB&dives=2', '_blank', 'noopener'); }}>Inquire / Book</Button>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Discover Scuba (Try Dive)</CardTitle>
                      <Badge>Beginner</Badge>
                    </div>
                    <CardDescription>Duration: Half day — short introduction dive</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">Perfect for first-timers — pool skills followed by a shallow guided dive.</p>
                    <ul className="list-disc pl-5 text-sm mb-4">
                      <li>No certification required</li>
                      <li>Friendly instructors</li>
                      <li>Equipment & photos available</li>
                    </ul>
                    <div className="flex gap-2">
                      <Button variant="outline" asChild>
                        <Link to="/courses/discover-scuba">View Program</Link>
                      </Button>
                      <Button variant="secondary" onClick={() => { window.open('https://booking.divinginasia.com/booking?item=Discover%20Scuba&type=dive&price=2500&currency=THB', '_blank', 'noopener'); }}>Inquire / Book</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Sail Rock Special</CardTitle>
                      <Badge>Full Day</Badge>
                    </div>
                    <CardDescription>Duration: Full day — 3 dives with lunch</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">A full day offshore trip to Sail Rock and surrounding pinnacles — chances for large pelagics.</p>
                    <ul className="list-disc pl-5 text-sm mb-4">
                      <li>Breakfast & lunch provided</li>
                      <li>Experienced guides and briefings</li>
                      <li>Pickup & return to Koh Tao</li>
                    </ul>
                    <Button variant="secondary" onClick={() => { window.open('https://booking.divinginasia.com/booking?item=Sail%20Rock%20Special&type=dive&price=2900&currency=THB', '_blank', 'noopener'); }}>Inquire / Book</Button>
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
                          View dive site details
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

        {/* Marine Life */}
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
                  View All Marine Life
                </Link>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Boat Schedule & Pricing */}
        <TabsContent value="schedule" className="transition-none">
          <section id="schedule" className="py-16 px-4 bg-muted/50">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-4xl font-bold mb-8">Fun Diving Boat Schedule</h2>
                  <p className="text-muted-foreground mb-6">
                    We run two dive trips a day on our spacious customised dive boats where we adventure
                    out to explore the coral reefs. Each trip includes 2 dives at carefully selected sites
                    based on conditions and certification levels.
                  </p>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <CardTitle className="text-lg">Morning Trip</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="font-semibold mb-2">Departure: 8:00 AM</p>
                        <p className="text-sm text-muted-foreground">2 dives - Return by 1:00 PM</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Perfect for early birds who want to see the reef at its most active
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <CardTitle className="text-lg">Afternoon Trip</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="font-semibold mb-2">Departure: 1:00 PM</p>
                        <p className="text-sm text-muted-foreground">2 dives - Return by 6:00 PM</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Ideal for those who prefer a relaxed morning or want to dive twice in one day
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-purple-200">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-purple-600" />
                          <CardTitle className="text-lg">
                            <Link to="/dive-sites/sail-rock" className="hover:text-blue-600 underline-offset-4 hover:underline">
                              Sail Rock Special
                            </Link>
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="font-semibold mb-2">Wednesday & Saturday: 6:30 AM</p>
                        <p className="text-sm text-muted-foreground">3 dives - Full day with meals</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Our premium trip to Koh Tao's most famous dive site
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h2 id="pricing" className="text-4xl font-bold mb-8">Pricing</h2>
                  <div className="space-y-4">
                    <Card className="border-2 border-blue-200 bg-blue-50">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <CardTitle className="text-lg">Fun Diving Packages</CardTitle>
                        </div>
                        <CardDescription>Volume discounts available</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="font-medium">1 Dive</span>
                            <span className="text-xl font-bold text-blue-600">฿1,000 <span className="text-sm text-muted-foreground">/dive</span></span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="font-medium">2-9 Dives</span>
                            <span className="text-xl font-bold text-blue-600">฿900 <span className="text-sm text-muted-foreground">/dive</span></span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b bg-green-50 p-2 rounded">
                            <span className="font-medium">10+ Dives</span>
                            <span className="text-xl font-bold text-green-600">฿800 <span className="text-sm text-muted-foreground">/dive</span></span>
                          </div>
                        </div>
                        <div className="bg-background p-4 rounded-lg">
                          <p className="font-semibold mb-2">Includes:</p>
                          <ul className="space-y-1 text-sm">
                            <li>✓ Certified scuba dive guide</li>
                            <li>✓ Use of all scuba equipment</li>
                            <li>✓ Maximum 4 divers per guide</li>
                            <li>✓ Freshwater showers</li>
                          </ul>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">Prerequisite: Open Water certification or equivalent</p>
                        <div className="mt-4">
                          <Link to="/koh-tao-dive-sites" className="text-sm font-medium text-blue-600 hover:underline underline-offset-4">
                            View all dive sites overview
                          </Link>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <CardTitle className="text-lg">Sail Rock Special Trip</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-green-600">฿2,900</p>
                        <p className="text-sm text-muted-foreground">full day excursion (3 dives)</p>
                        <ul className="mt-4 space-y-2 text-sm">
                          <li>• Breakfast & lunch included</li>
                          <li>• Premium equipment</li>
                          <li>• Expert guide</li>
                          <li>• Whale shark opportunities</li>
                        </ul>
                        <div className="mt-4">
                          <Link to="/dive-sites/sail-rock" className="text-sm font-medium text-blue-600 hover:underline underline-offset-4">
                            View Sail Rock details
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

        {/* Diver Requirements */}
        <TabsContent value="requirements" className="transition-none">
          <section id="requirements" className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">Important Notice for Certified Divers</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Last Dive Check</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      When was your last dive? If it has been longer than 12 months, we strongly advise
                      you complete a Scuba Review to refresh your diving knowledge and skills.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Medical Fitness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      All divers must complete the PADI Medical Questionnaire. If you answer "YES" to
                      any questions, a medical check-up may be required before diving.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Flying After Diving</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      DAN guidelines: 12 hours for single no-decompression dive, 18 hours for multiple
                      dives. We provide dive computers with optimal surface interval calculations.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Weather Conditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Your safety is our priority. Weather conditions may cause trip postponements
                      or rescheduling on short notice.
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
              <h2 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
              <p className="text-center text-muted-foreground mb-12">
                Everything you need to know before diving with us on Koh Tao
              </p>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Do I need to be a certified diver to go fun diving on Koh Tao?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes, you need to be a certified diver to participate in fun diving. Koh Tao offers diving
                      for all certification levels, so whether you're Open Water certified or have advanced training,
                      there are dive sites suitable for you. If you're not certified yet, check out our{' '}
                      <Link to="/courses" className="text-blue-600 hover:underline">PADI certification courses</Link>.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What can I expect during a fun dive on Koh Tao?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      A typical fun dive on Koh Tao includes a guided dive with a certified dive professional,
                      who will lead you to explore the diverse marine life, coral reefs, and underwater landscapes
                      that make the island famous. We run two dive trips a day - morning and afternoon - on our
                      spacious customized dive boats where we adventure out to explore the coral reefs.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How deep will we dive during fun diving on Koh Tao?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Dive sites on Koh Tao cater to various skill levels. Depths can vary, but many dive sites
                      are suitable for Open Water Divers and range from 12 meters (40 feet) to 18 meters (60 feet).
                      For more experienced divers, there are deeper sites available from 30 to 40 meters.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Is it necessary to book fun diving in advance?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      While it's not always necessary to book in advance, especially during non-peak times,
                      it's advisable to let us know when you are planning to come dive with us to secure your
                      spot and have the best experience. During high season (December-February), we recommend
                      booking at least a day in advance.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What marine life can I see while fun diving?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Beneath the turquoise water surrounding Koh Tao lies a world of colorful coral reefs,
                      teeming marine life from macro creatures to sea turtles, and if you're lucky, the majestic
                      whale shark. With over 25 captivating dive sites, there's plenty to see including barracuda,
                      groupers, triggerfish, cuttlefish, octopus, and a stunning variety of tropical reef fish.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What's included in the fun diving price?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our fun diving packages include: certified scuba dive guide, use of all scuba equipment
                      (BCD, regulator, wetsuit, mask, fins), dive computer, weights, tank, and maximum 4 divers
                      per guide for a personalized experience. Freshwater showers are available after your dive.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* bsContent>

        {/* Choosing a Dive Center */}
        <TabsContent value="tips" className="transition-none">
          <section id="tips" className="py-16 px-4 bg-muted/50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">Top Tips to Choose a Reputable Dive Center</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quality Equipment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Premium Aqualung equipment with balanced regulators and integrated weight systems.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Dive Computer Required</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Essential for deep and repetitive dives. No dive computer, no diving.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Experienced Guides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      PADI professionals with deep local knowledge of marine life and dive sites.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Convenient Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Consider proximity to your accommodation for easy access and pickup services.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Value vs Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Quality diving equipment and experienced guides may cost 100-200 THB extra per dive.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">PADI Certification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Choose centers offering certification courses if you're not yet a certified diver.
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
              <h2 className="text-4xl font-bold mb-8">Book Your Fun Diving Adventure</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Ready to discover Koh Tao’s incredible underwater world? Get in touch to enquire, or use the form below to send your booking request directly.
              </p>
                <div className="mb-4 flex flex-col items-center gap-2">
                  <Link to="/fun-diving-koh-tao#world-class-dive-sites" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold">Fun Dive Info</Link>
                  <a href="/courses#course-openWater" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-semibold">Book Course (PADI)</a>
                  <a href="https://www.divinginasia.com/#contact" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold mb-2">Get in touch to book/enquire</a>
                  <div className="text-muted-foreground text-sm mb-4">Or use the form below to send a booking request directly.</div>
                </div>
                <Button
                  size="lg"
                  onClick={() => navigate('/booking?item=Fun%20Dive&type=dive&price=1800&currency=THB&dives=2')}
                >
                  Send Booking Request
                </Button>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FunDiving;