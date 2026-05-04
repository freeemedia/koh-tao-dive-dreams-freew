import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { trackAffiliateClick } from '@/lib/affiliateTracking';
import { ExternalLink, Star, MapPin } from 'lucide-react';

const AGODA_PARTNER_ID = import.meta.env.VITE_AGODA_PARTNER_ID as string | undefined;

const hotels = [
  {
    name: 'Sandy Bay Beach Club',
    description: 'Relaxed beachfront resort with a stunning pool, sunset views and easy access to dive boats.',
    location: 'Sandy Bay, Lembongan',
    priceRange: '$$$',
    rating: 4.7,
    tags: ['Beach Access', 'Pool', 'Restaurant', 'WiFi', 'Dive Packages'],
    image: '/images/photo-1613853250147-2f73e55c1561.avif',
  },
  {
    name: 'Hai Tide Beach Resort',
    description: 'Charming boutique resort on a quiet beach with bungalows surrounded by tropical gardens.',
    location: 'Mushroom Bay, Lembongan',
    priceRange: '$$$',
    rating: 4.5,
    tags: ['Boutique', 'Beach Access', 'Restaurant', 'WiFi', 'Snorkeling'],
    image: '/images/photo-1618865181016-a80ad83a06d3.avif',
  },
  {
    name: 'Indiana Kenanga',
    description: 'Stylish boutique hotel with infinity pool and sweeping ocean views over Nusa Penida.',
    location: 'Lembongan Village',
    priceRange: '$$$$',
    rating: 4.8,
    tags: ['Infinity Pool', 'Ocean Views', 'Restaurant', 'Romantic', 'WiFi'],
    image: '/images/photo-1647825194145-2d94e259c745.avif',
  },
  {
    name: 'Lembongan Beach Club & Resort',
    description: 'Full-service beachfront resort with multiple pools, dive centre, and water sports.',
    location: 'Jungutbatu Beach',
    priceRange: '$$$',
    rating: 4.4,
    tags: ['Pool', 'Dive Centre', 'Beach', 'Restaurant', 'Water Sports'],
    image: '/images/photo-1659518893171-b15e20a8e201.avif',
  },
  {
    name: 'Mushroom Beach Bungalows',
    description: 'Budget-friendly bungalows steps from the beach, perfect for divers on a multi-day trip.',
    location: 'Mushroom Beach',
    priceRange: '$$',
    rating: 4.2,
    tags: ['Budget-Friendly', 'Beach Access', 'WiFi', 'Chill Vibe'],
    image: '/images/photo-1682686580849-3e7f67df4015.avif',
  },
  {
    name: 'Batu Karang Lembongan Resort',
    description: 'Luxury clifftop resort with panoramic ocean views and an award-winning spa.',
    location: 'Jungutbatu Cliff',
    priceRange: '$$$$',
    rating: 4.9,
    tags: ['Luxury', 'Spa', 'Ocean Views', 'Pool', 'Restaurant'],
    image: '/images/photo-1682687982423-295485af248a.avif',
  },
];

const getPriceColor = (price: string) => {
  switch (price) {
    case '$':
      return 'bg-green-100 text-green-800';
    case '$$':
      return 'bg-blue-100 text-blue-800';
    case '$$$':
      return 'bg-orange-100 text-orange-800';
    case '$$$$':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-muted text-gray-800';
  }
};

const buildAgodaUrl = () => {
  const baseUrl = 'https://www.agoda.com/';

  if (!AGODA_PARTNER_ID) {
    return baseUrl;
  }

  return `${baseUrl}?cid=${encodeURIComponent(AGODA_PARTNER_ID)}`;
};

const AgodaHotels = () => {
  const [clicking, setClicking] = useState<string | null>(null);

  const handleHotelClick = async (hotel: typeof hotels[0]) => {
    setClicking(hotel.name);
      const agodaUrl = buildAgodaUrl();
      trackAffiliateClick({
        provider: 'agoda',
        destinationUrl: agodaUrl,
        placement: 'hotel-card',
        hotelName: hotel.name,
        affiliateId: AGODA_PARTNER_ID || null,
      });
      window.open(agodaUrl, '_blank', 'noopener,noreferrer');
    setClicking(null);
  };

  const handleSearchAll = async () => {
      const agodaUrl = buildAgodaUrl();
      trackAffiliateClick({
        provider: 'agoda',
        destinationUrl: agodaUrl,
        placement: 'search-all',
        affiliateId: AGODA_PARTNER_ID || null,
      });
      window.open(agodaUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-background">
      <div
        className="relative min-h-[50vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,30,60,0.55), rgba(0,70,45,0.55)), url('/images/staykohtai.png')`,
        }}
      >
        <div className="text-center text-white px-4 max-w-3xl">
          <div className="inline-block bg-emerald-500 text-white text-sm font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Agoda
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Where to Stay on Nusa Lembongan</h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Compare hotels and resorts on Agoda for your Lembongan stay.
          </p>
          <Button
            onClick={handleSearchAll}
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-4"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Search All Lembongan Hotels
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Top-Rated Lembongan Accommodations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse popular places to stay and compare prices on Agoda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <Card key={hotel.name} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={getPriceColor(hotel.priceRange)}>{hotel.priceRange}</Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{hotel.name}</CardTitle>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold">{hotel.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="w-3 h-3" />
                  {hotel.location}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <p className="text-gray-600 text-sm">{hotel.description}</p>
                <div className="flex flex-wrap gap-1">
                  {hotel.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  onClick={() => handleHotelClick(hotel)}
                  disabled={clicking === hotel.name}
                  className="mt-auto bg-emerald-600 hover:bg-emerald-700 text-white w-full"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {clicking === hotel.name ? 'Opening...' : 'Check on Agoda'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center mt-8">
          To enable Agoda affiliate attribution, set VITE_AGODA_PARTNER_ID in your environment.
        </p>
      </div>
    </div>
  );
};

export default AgodaHotels;
