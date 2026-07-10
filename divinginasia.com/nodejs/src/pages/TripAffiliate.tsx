import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star, MapPin } from 'lucide-react';

// Trip.com affiliate Alliance ID
const ALLIANCE_ID = '7864578';
const SID = 'onemediaasia'; // sub-tracking ID

const hotels = [
  {
    name: "Ban's Diving Resort",
    description: "Legendary dive resort on Sairee Beach. Includes dive shop, multiple pools, and direct beach access.",
    location: "Sairee Beach",
    priceRange: "$$$",
    rating: 4.6,
    tags: ["Dive Shop On-Site", "Beach Access", "Pool", "Restaurant", "WiFi"],
    image: "/images/photo-1613853250147-2f73e55c1561.avif",
  },
  {
    name: "Koh Tao Cabana Hotel",
    description: "Stylish hotel in the heart of Sairee with modern rooms, rooftop pool, and vibrant atmosphere.",
    location: "Sairee Beach",
    priceRange: "$$$",
    rating: 4.5,
    tags: ["Rooftop Pool", "Central Location", "Restaurant", "WiFi", "Bar"],
    image: "/images/photo-1618865181016-a80ad83a06d3.avif",
  },
  {
    name: "Haad Tien Beach Resort",
    description: "Secluded boutique resort on a private beach, accessible by boat. Perfect for couples.",
    location: "Haad Tien (East Coast)",
    priceRange: "$$$$",
    rating: 4.8,
    tags: ["Private Beach", "Secluded", "Restaurant", "Snorkeling", "Romantic"],
    image: "/images/photo-1647825194145-2d94e259c745.avif",
  },
  {
    name: "Koh Tao Resort",
    description: "Comfortable bungalows set in tropical gardens, a short walk to the beach.",
    location: "Sairee Beach",
    priceRange: "$$",
    rating: 4.3,
    tags: ["Garden", "Pool", "Restaurant", "WiFi", "Dive Packages"],
    image: "/images/photo-1659518893171-b15e20a8e201.avif",
  },
  {
    name: "Montra Resort",
    description: "Hilltop resort with panoramic sea views, infinity pool, and quiet retreat atmosphere.",
    location: "Chalok Baan Kao",
    priceRange: "$$$",
    rating: 4.7,
    tags: ["Sea Views", "Infinity Pool", "Quiet", "Restaurant", "WiFi"],
    image: "/images/photo-1682686580849-3e7f67df4015.avif",
  },
  {
    name: "Crystal Dive Koh Tao",
    description: "One of the island's largest dive operators with on-site accommodation. Great for PADI certification.",
    location: "Mae Haad",
    priceRange: "$$",
    rating: 4.4,
    tags: ["Dive School", "Pool", "Restaurant", "WiFi", "Budget-Friendly"],
    image: "/images/photo-1682687982423-295485af248a.avif",
  },
  {
    name: "Koh Tao Hillside Resort",
    description: "Peaceful hilltop bungalows with stunning sunrise sea views and a relaxed jungle atmosphere.",
    location: "Sairee",
    priceRange: "$$",
    rating: 4.2,
    tags: ["Hillside Views", "Bungalows", "Pool", "WiFi", "Peaceful"],
    image: "/images/photo-1682686580849-3e7f67df4015.avif",
  },
  {
    name: "Koh Tao Coral Grand Resort",
    description: "Beachfront resort with multiple pools and excellent snorkeling right off the beach.",
    location: "Chalok Baan Kao",
    priceRange: "$$$",
    rating: 4.5,
    tags: ["Beachfront", "Snorkeling", "Pool", "Restaurant", "WiFi"],
    image: "/images/photo-1647825194145-2d94e259c745.avif",
  },
];

const getPriceColor = (price: string) => {
  switch (price) {
    case '$': return 'bg-green-100 text-green-800';
    case '$$': return 'bg-blue-100 text-blue-800';
    case '$$$': return 'bg-orange-100 text-orange-800';
    case '$$$$': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const buildTripUrl = (hotelName?: string) => {
  const base = hotelName
    ? `https://www.trip.com/hotels/list?keyword=${encodeURIComponent(hotelName + ' Koh Tao')}`
    : `https://www.trip.com/hotels/list?keyword=Koh+Tao+Thailand`;
  return `${base}&allianceid=${ALLIANCE_ID}&sid=${SID}`;
};

const TripAffiliate = () => {
  const [clicking, setClicking] = useState<string | null>(null);

  const handleHotelClick = async (hotel: typeof hotels[0]) => {
    setClicking(hotel.name);
    const affiliateUrl = buildTripUrl(hotel.name);
    try {
      await supabase.from('affiliate_clicks').insert({
        hotel_name: hotel.name,
        hotel_url: affiliateUrl,
        affiliate_id: ALLIANCE_ID,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      });
    } catch (e) {
      // Don't block the click if tracking fails
    }
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
    setClicking(null);
  };

  const handleSearchAll = async () => {
    const searchUrl = buildTripUrl();
    try {
      await supabase.from('affiliate_clicks').insert({
        hotel_name: 'Search All Koh Tao – Trip.com',
        hotel_url: searchUrl,
        affiliate_id: ALLIANCE_ID,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      });
    } catch (e) {}
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">

      {/* Hero */}
      <div
        className="relative min-h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,30,60,0.55), rgba(80,30,0,0.55)), url('/images/staykohtai.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center text-white px-4 max-w-3xl">
          <div className="inline-block bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Trip.com
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Where to Stay on Koh Tao</h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Browse top-rated hotels, resorts and bungalows — book securely through Trip.com
          </p>
          <Button
            onClick={handleSearchAll}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Search All Koh Tao Hotels
          </Button>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Top-Rated Koh Tao Accommodations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            All bookings are made securely through Trip.com. Best price guarantee and 24/7 customer support.
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
                  {hotel.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <Button
                  onClick={() => handleHotelClick(hotel)}
                  disabled={clicking === hotel.name}
                  className="mt-auto bg-orange-500 hover:bg-orange-600 text-white w-full"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {clicking === hotel.name ? 'Opening...' : 'Check on Trip.com'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Also check Booking.com */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          <div className="text-center p-8 bg-orange-50 rounded-2xl">
            <h3 className="text-xl font-bold mb-3">Can't find what you're looking for?</h3>
            <p className="text-gray-600 mb-6">Browse all available accommodations with real-time prices and availability.</p>
            <Button onClick={handleSearchAll} className="bg-orange-500 hover:bg-orange-600 text-white">
              <ExternalLink className="w-4 h-4 mr-2" />
              View All on Trip.com
            </Button>
          </div>
          <div className="text-center p-8 bg-blue-50 rounded-2xl">
            <h3 className="text-xl font-bold mb-3">Also check Booking.com</h3>
            <p className="text-gray-600 mb-6">Compare prices across both platforms to find the best deal for your stay.</p>
            <Button
              onClick={() => window.open('/accommodation-booking', '_self')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Booking.com
            </Button>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-8">
          We may earn a commission when you book through our links — at no extra cost to you.
        </p>
      </div>
    </div>
  );
};

export default TripAffiliate;
