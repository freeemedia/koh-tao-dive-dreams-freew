import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BookingForm from '../components/BookingForm';
import { MapPin, Waves, Fish, Anchor, Eye, Clock } from 'lucide-react';

const DiveSitesPage = () => {
  const deepDiveSites = [
    {
      name: "Sail Rock",
      description: "Koh Tao's premier deep dive site featuring large schools of fish, whalesharks, and giant barracuda.",
      depth: "18-40m",
      highlights: ["Whalesharks", "Giant Barracuda", "Malabar Grouper", "Sailfish"],
      difficulty: "Advanced",
      location: "40 minutes offshore"
    },
    {
      name: "Chumphon Pinnacle",
      description: "Granite pinnacle offering excellent whaleshark sightings and large schools of trevally.",
      depth: "15-30m",
      highlights: ["Whalesharks", "Trevally Schools", "Eagle Rays", "Chevron Barracuda"],
      difficulty: "Advanced",
      location: "30 minutes offshore"
    },
    {
      name: "South West Pinnacle",
      description: "Deep pinnacle known for whalesharks, bryde's whales, and large pelagic fish.",
      depth: "15-35m",
      highlights: ["Whalesharks", "Bryde's Whales", "Giant Barracuda", "King Mackerel"],
      difficulty: "Advanced",
      location: "30-40 minutes offshore"
    }
  ];

  const coralReefSites = [
    {
      name: "Japanese Gardens",
      description: "Diverse coral reefs with colorful marine life and swim-throughs.",
      depth: "12-25m",
      highlights: ["Pink Tailed Triggerfish", "Ocellated Eagle Rays", "Colorful Corals", "Marbled Octopus"],
      difficulty: "Intermediate",
      location: "Near Koh Nang Yuan"
    },
    {
      name: "Shark Island",
      description: "Beautiful soft purple tree corals and gorgonians with abundant marine life.",
      depth: "8-20m",
      highlights: ["Sea Fans", "Dynamic Sea Whips", "Black Tip Reef Sharks", "Tropical Fish"],
      difficulty: "Beginner-Intermediate",
      location: "South coast"
    },
    {
      name: "Mango Bay",
      description: "Shallow coral reefs perfect for relaxed diving with thriving marine ecosystems.",
      depth: "5-18m",
      highlights: ["Colorful Corals", "Reef Fish", "Sea Anemones"],
      difficulty: "Beginner",
      location: "West coast bay"
    }
  ];

  const artificialSites = [
    {
      name: "HTMS Sattakut",
      description: "WWII ex-US Navy vessel donated by Thai Navy, now a thriving artificial reef.",
      depth: "18-30m",
      highlights: ["Wreck Exploration", "Marine Life", "Swim-throughs", "Historical Significance"],
      difficulty: "Advanced",
      location: "Between islands"
    },
    {
      name: "Junkyard Reef",
      description: "Artificial steel structures with healthy corals and diverse marine life.",
      depth: "8-15m",
      highlights: ["Artificial Structures", "Healthy Corals", "Diverse Fish", "Conservation Project"],
      difficulty: "Beginner-Intermediate",
      location: "West coast"
    },
    {
      name: "Buoyancy World",
      description: "Concrete blocks and tubes creating new ecosystems for marine life.",
      depth: "5-12m",
      highlights: ["Concrete Structures", "New Coral Growth", "Small Marine Life", "Educational"],
      difficulty: "Beginner",
      location: "Aow Leuk"
    }
  ];

  const shallowSites = [
    {
      name: "Aow Leuk",
      description: "Shallow bay with coral gardens and easy diving conditions.",
      depth: "3-10m",
      highlights: ["Coral Gardens", "Tropical Fish", "Easy Access", "Training Site"],
      difficulty: "Beginner",
      location: "West coast"
    },
    {
      name: "Hin Ngam",
      description: "Shallow reef with artificial structures and abundant marine life.",
      depth: "5-12m",
      highlights: ["Artificial Reefs", "Colorful Fish", "Safe Diving", "Photography"],
      difficulty: "Beginner",
      location: "West coast"
    },
    {
      name: "Tanote Bay",
      description: "East side dive site with macro opportunities and colorful reef life.",
      depth: "8-15m",
      highlights: ["Frog Fish", "Pipefish", "Macro Photography", "Colorful Reef"],
      difficulty: "Intermediate",
      location: "East coast"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Beginner-Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/whale.webp')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Koh Tao Dive Sites</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Explore over 25 incredible dive sites around Koh Tao, from shallow coral reefs
            to deep ocean pinnacles. Each site offers unique underwater experiences and
            abundant marine life.
          </p>
          <a href="https://www.divinginasia.com/#contact" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
              Book Your Dive
            </Button>
          </a>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Best Dive Sites on Koh Tao</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              Koh Tao boasts over 25 excellent dive sites featuring rich, diverse topography
              and an abundance of marine life. Each site is unique, offering divers of all
              levels something different and enough variety to keep even experienced divers
              engaged for weeks.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Waves className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>25+ Sites</CardTitle>
              </CardHeader>
              <CardContent>
                <p>From shallow bays to deep pinnacles</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Fish className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>Diverse Marine Life</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Whalesharks, rays, and coral reefs</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Anchor className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>Artificial Reefs</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Wrecks and structures for unique diving</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Eye className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>All Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Sites for beginners to advanced divers</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Deep Dive Sites */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Deep Dive Sites for Advanced Divers</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {deepDiveSites.map((site, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <CardTitle className="text-xl">{site.name}</CardTitle>
                    </div>
                    <Badge className={getDifficultyColor(site.difficulty)}>{site.difficulty}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span>Depth: {site.depth}</span>
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
          <h2 className="text-4xl font-bold text-center mb-12">Amazing Coral Reef Dive Sites</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {coralReefSites.map((site, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <CardTitle className="text-xl">{site.name}</CardTitle>
                    </div>
                    <Badge className={getDifficultyColor(site.difficulty)}>{site.difficulty}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span>Depth: {site.depth}</span>
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
          <h2 className="text-4xl font-bold text-center mb-12">Artificial Dive Sites</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {artificialSites.map((site, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <CardTitle className="text-xl">{site.name}</CardTitle>
                    </div>
                    <Badge className={getDifficultyColor(site.difficulty)}>{site.difficulty}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span>Depth: {site.depth}</span>
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
          <h2 className="text-4xl font-bold text-center mb-12">Shallow Dive Sites for Beginners</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {shallowSites.map((site, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <CardTitle className="text-xl">{site.name}</CardTitle>
                    </div>
                    <Badge className={getDifficultyColor(site.difficulty)}>{site.difficulty}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span>Depth: {site.depth}</span>
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Explore Koh Tao's Underwater World</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Ready to discover Koh Tao's incredible dive sites? Our experienced guides will
            take you to the best locations for your skill level and interests.
          </p>
          <BookingForm isOpen={false} onClose={() => {}} itemType="dive" itemTitle="Dive Sites" />
        </div>
      </section>
    </div>
  );
};

export default DiveSitesPage;