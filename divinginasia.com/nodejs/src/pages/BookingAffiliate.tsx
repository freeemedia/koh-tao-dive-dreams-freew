import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star, MapPin, Wifi, UtensilsCrossed, Waves, DollarSign } from 'lucide-react';

// ⚠️ Replace this with your real Booking.com affiliate ID once you sign up at booking.com/affiliate-program
const AFFILIATE_ID = '2787354';

const hotels = [
  {
    name: "Ban's Diving Resort",
    slug: "ban-s-diving-koh-tao",
    description: "Legendary dive resort on Sairee Beach, perfect for divers of all levels. Includes dive shop, multiple pools, and beach access.",
    location: "Sairee Beach",
    priceRange: "$$$",
    rating: 4.6,
    tags: ["Dive Shop On-Site", "Beach Access", "Pool", "Restaurant", "WiFi"],
    image: "/images/photo-1613853250147-2f73e55c1561.avif",
  },
  {
    name: "Koh Tao Cabana Hotel",
    slug: "koh-tao-cabana",
    description: "Stylish hotel in the heart of Sairee with modern rooms, rooftop pool, and vibrant atmosphere.",
    location: "Sairee Beach",
    priceRange: "$$$",
    rating: 4.5,
    tags: ["Rooftop Pool", "Central Location", "Restaurant", "WiFi", "Bar"],
    image: "/images/photo-1618865181016-a80ad83a06d3.avif",
  },
  {
    name: "Haad Tien Beach Resort",
    slug: "haad-tien-beach-resort-koh-tao",
    description: "Secluded boutique resort on a private beach, accessible by boat. Perfect for couples seeking tranquility.",
    location: "Haad Tien (East Coast)",
    priceRange: "$$$$",
    rating: 4.8,
    tags: ["Private Beach", "Secluded", "Restaurant", "Snorkeling", "Romantic"],
    image: "/images/photo-1647825194145-2d94e259c745.avif",
  },
  {
    name: "Koh Tao Resort",
    slug: "koh-tao-resort",
    description: "Well-established resort with comfortable bungalows set in tropical gardens, a short walk to the beach.",
    location: "Sairee Beach",
    priceRange: "$$",
    rating: 4.3,
    tags: ["Garden", "Pool", "Restaurant", "WiFi", "Dive Packages"],
    image: "/images/photo-1659518893171-b15e20a8e201.avif",
  },
  {
    name: "Montra Resort",
    slug: "montra-resort-koh-tao",
    description: "Hilltop resort with panoramic sea views, infinity pool, and quiet retreat atmosphere.",
    location: "Chalok Baan Kao",
    priceRange: "$$$",
    rating: 4.7,
    tags: ["Sea Views", "Infinity Pool", "Quiet", "Restaurant", "WiFi"],
    image: "/images/photo-1682686580849-3e7f67df4015.avif",
  },
  {
    name: "Crystal Dive Koh Tao",
    slug: "crystal-dive-koh-tao",
    description: "One of the island's largest dive operators with on-site accommodation, ideal for getting your PADI certification.",
    location: "Mae Haad",
    priceRange: "$$",
    rating: 4.4,
    tags: ["Dive School", "Pool", "Restaurant", "WiFi", "Budget-Friendly"],
    image: "/images/photo-1682687982423-295485af248a.avif",
  },
  {
    name: "Koh Tao Hillside Resort",
    slug: "koh-tao-hillside-resort",
    description: "Peaceful hilltop bungalows with stunning sunrise sea views and a relaxed jungle atmosphere.",
    location: "Sairee",
    priceRange: "$$",
    rating: 4.2,
    tags: ["Hillside Views", "Bungalows", "Pool", "WiFi", "Peaceful"],
    image: "/images/photo-1682686580849-3e7f67df4015.avif",
  },
  {
    name: "Koh Tao Coral Grand Resort",
    slug: "koh-tao-coral-grand-resort",
    description: "Beachfront resort with beautiful coral-themed decor, multiple pools, and excellent snorkeling right off the beach.",
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

const BookingAffiliate = () => {
  const [clicking, setClicking] = useState<string | null>(null);

  const handleBookingClick = async (hotel: typeof hotels[0]) => {
    setClicking(hotel.slug);

    // Track click in Supabase
    const affiliateUrl = `https://www.booking.com/hotel/th/${hotel.slug}.html?aid=${AFFILIATE_ID}&lang=en-gb`;
    try {
      await supabase.from('affiliate_clicks').insert({
        hotel_name: hotel.name,
        hotel_url: affiliateUrl,
        affiliate_id: AFFILIATE_ID,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      });
    } catch (e) {
      // Don't block the click if tracking fails
    }

    // Open Booking.com in new tab
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
    setClicking(null);
  };

  const handleSearchAll = async () => {
    const searchUrl = `https://www.booking.com/searchresults.html?aid=${AFFILIATE_ID}&ss=Koh+Tao%2C+Thailand&dest_type=city&lang=en-gb`;
    try {
      await supabase.from('affiliate_clicks').insert({
        hotel_name: 'Search All Koh Tao',
        hotel_url: searchUrl,
        affiliate_id: AFFILIATE_ID,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      });
    } catch (e) {}
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero */}
      <div
        className="relative min-h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,30,60,0.55), rgba(0,60,100,0.55)), url('/images/staykohtai.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center text-white px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Where to Stay on Koh Tao</h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Hand-picked accommodations from beach bungalows to luxury resorts — book with confidence through Booking.com
          </p>
          <Button
            onClick={handleSearchAll}
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-4"
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
            All bookings are made securely through Booking.com with free cancellation on most properties.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <Card key={hotel.slug} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
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
                  onClick={() => handleBookingClick(hotel)}
                  disabled={clicking === hotel.slug}
                  className="mt-auto bg-blue-600 hover:bg-blue-700 text-white w-full"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {clicking === hotel.slug ? 'Opening...' : 'Check Availability'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          <div className="text-center p-8 bg-blue-50 rounded-2xl">
            <h3 className="text-2xl font-bold mb-3">Can't find what you're looking for?</h3>
            <p className="text-gray-600 mb-6">Browse all available accommodations on Koh Tao with real-time prices and availability.</p>
            <Button onClick={handleSearchAll} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <ExternalLink className="w-4 h-4 mr-2" />
              View All Hotels on Booking.com
            </Button>
          </div>
          <div className="text-center p-8 bg-orange-50 rounded-2xl">
            <h3 className="text-2xl font-bold mb-3">Also check Trip.com</h3>
            <p className="text-gray-600 mb-6">Compare prices across both platforms to find the best deal for your stay.</p>
            <Button onClick={() => window.open('/trip-booking', '_self')} size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Trip.com
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-400 text-center mt-6">
          We may earn a commission when you book through our links — at no extra cost to you.
        </p>
      </div>
    </div>
  );
};

export default BookingAffiliate;
