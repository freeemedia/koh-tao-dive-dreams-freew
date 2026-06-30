import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { MapPin, Waves, Fish, Anchor, Eye, Clock } from 'lucide-react';

interface MarineSpecies {
  name: string;
  description: string;
  size: string;
  habitat: string;
  season: string;
  link?: string;
}

const MarineLifePage = () => {
  const pelagicSpecies = [
    {
      name: "Whaleshark",
      description: "The world's largest fish, these gentle giants are regular visitors to Koh Tao's deeper waters, especially during plankton blooms.",
      size: "Up to 12m",
      habitat: "Deep offshore waters",
      season: "Year-round, peak Nov-Mar",
      link: "/marine-life/whaleshark"
    },
    {
      name: "Great Barracuda",
      description: "Impressive predatory fish that hunt in packs around the offshore pinnacles, reaching speeds of up to 40km/h.",
      size: "Up to 2m",
      habitat: "Deep pinnacles",
      season: "Year-round",
      link: "/marine-life/great-barracuda"
    },
    {
      name: "Manta Rays",
      description: "Graceful filter feeders that perform spectacular somersaults while feeding on plankton.",
      size: "Wingspan up to 7m",
      habitat: "Deep waters",
      season: "Nov-Mar",
      link: null
    },
    {
      name: "Malabar Grouper",
      description: "Large predatory grouper fish found in deeper waters, known for their impressive size and ambush hunting.",
      size: "Up to 2.3m, 100kg",
      habitat: "Deep reefs, pinnacles",
      season: "Year-round",
      link: "/marine-life/malabar-grouper"
    }
  ];

  const reefSharks = [
    {
      name: "Black Tip Reef Shark",
      description: "Common reef sharks with distinctive black tips on their fins, often seen hunting in shallow waters.",
      size: "Up to 2m",
      habitat: "Coral reefs",
      season: "Year-round",
      link: "/marine-life/black-tip-reef-shark"
    },
    {
      name: "Grey Reef Shark",
      description: "More elusive reef sharks that prefer deeper waters and are less commonly sighted.",
      size: "Up to 2.5m",
      habitat: "Deep reefs",
      season: "Year-round",
      link: null
    }
  ];

  const seaTurtles = [
    {
      name: "Green Sea Turtle",
      description: "Herbivorous sea turtles that graze on seagrass and algae, frequently seen in shallow bays.",
      size: "Up to 1.5m",
      habitat: "Shallow bays and reefs",
      season: "Year-round",
      link: "/marine-life/green-sea-turtle"
    },
    {
      name: "Hawksbill Sea Turtle",
      description: "Beautiful turtles with distinctive beak-like mouths, known for eating sponges.",
      size: "Up to 1m",
      habitat: "Coral reefs",
      season: "Year-round",
      link: "/marine-life/hawksbill-sea-turtle"
    }
  ];

  const macroLife = [
    {
      name: "Nudibranchs",
      description: "Colorful sea slugs with incredible patterns and shapes, perfect for macro photography.",
      size: "1-15cm",
      habitat: "Coral reefs",
      season: "Year-round",
      link: "/marine-life/nudibranchs"
    },
    {
      name: "Banded Sea Krait",
      description: "Venomous sea snakes that hunt fish and eels in shallow waters.",
      size: "Up to 1.5m",
      habitat: "Shallow reefs",
      season: "Year-round",
      link: "/marine-life/banded-sea-krait"
    },
    {
      name: "Bearded Scorpion Fish",
      description: "Master of camouflage with venomous spines, perfectly disguised as coral.",
      size: "Up to 30cm",
      habitat: "Coral reefs",
      season: "Year-round",
      link: "/marine-life/bearded-scorpion-fish"
    },
    {
      name: "Cephalopods",
      description: "Intelligent octopuses and squid, masters of camouflage and problem-solving.",
      size: "5cm-3m",
      habitat: "Coral reefs and deep water",
      season: "Year-round",
      link: "/marine-life/cephalopods"
    }
  ];

  const renderSpeciesCard = (species: MarineSpecies) => (
    <Card key={species.name} className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Fish className="h-5 w-5 text-blue-600" />
          {species.name}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {species.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Waves className="h-4 w-4 text-blue-500" />
            <span>Size: {species.size}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-green-500" />
            <span>Habitat: {species.habitat}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-orange-500" />
            <span>Best: {species.season}</span>
          </div>
          {species.link && (
            <Link to={species.link}>
              <Button variant="outline" size="sm" className="mt-2">
                Learn More
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div 
        className="relative min-h-[calc(100vh-4rem)] bg-cover bg-center text-white flex items-center justify-center"
        style={{
          backgroundImage: 'url(/images/marine.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            Koh Tao Marine Life
          </h1>
          <p className="text-lg md:text-2xl text-white max-w-3xl mx-auto drop-shadow-lg">
            Discover the incredible biodiversity of Koh Tao's underwater world, home to over 350 fish species and majestic marine creatures.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Marine Life on Koh Tao</h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            The tropical waters surrounding Koh Tao boast an incredible abundance of marine life with remarkable biodiversity.
            With constant water temperatures between 26-29°C year-round, the sea provides a perfect habitat for diverse marine fauna and flora.
            From gentle giants like whalesharks to tiny macro creatures, Koh Tao offers encounters with some of the most fascinating marine species in the world.
          </p>
        </div>

        {/* Pelagic Species */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Anchor className="h-6 w-6 text-blue-600" />
            Pelagic Species
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pelagicSpecies.map(renderSpeciesCard)}
          </div>
        </section>

        {/* Reef Sharks */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Fish className="h-6 w-6 text-blue-600" />
            Reef Sharks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reefSharks.map(renderSpeciesCard)}
          </div>
        </section>

        {/* Sea Turtles */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Eye className="h-6 w-6 text-blue-600" />
            Sea Turtles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seaTurtles.map(renderSpeciesCard)}
          </div>
        </section>

        {/* Macro Life */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Waves className="h-6 w-6 text-blue-600" />
            Macro Marine Life
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {macroLife.map(renderSpeciesCard)}
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center bg-blue-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Experience Koh Tao's Marine Life?</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Join our PADI certified courses and fun diving trips to witness these amazing creatures up close in their natural habitat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View Courses
              </Button>
            </Link>
            <Link to="/fun-diving-koh-tao">
              <Button size="lg" variant="outline">
                Fun Diving Trips
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarineLifePage;