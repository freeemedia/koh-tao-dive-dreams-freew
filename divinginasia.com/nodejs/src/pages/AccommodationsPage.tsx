import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Wifi, Utensils, Waves, DollarSign, Star } from 'lucide-react';

const AccommodationsPage = () => {
  const accommodations = [
    {
      name: "Luxury Beachfront Resort",
      description: "Upscale resort with stunning ocean views, spa facilities, and fine dining restaurants.",
      location: "Sairee Beach",
      priceRange: "$$$$",
      rating: 4.8,
      amenities: ["Beach Access", "Restaurant & Bar", "Spa", "Pool", "WiFi", "Air Conditioning"],
      highlights: ["Sunset dining", "Water sports center", "Dive shop on-site"],
      image: "/images/photo-1613853250147-2f73e55c1561.avif"
    },
    {
      name: "Mid-Range Beach Bungalows",
      description: "Comfortable bungalows just steps from the beach, family-run atmosphere, excellent value.",
      location: "Sairee Beach",
      priceRange: "$$$",
      rating: 4.5,
      amenities: ["Beach Access", "Restaurant", "WiFi", "Garden", "Simple Rooms"],
      highlights: ["Personable service", "Local food", "Beach bar"],
      image: "/images/photo-1618865181016-a80ad83a06d3.avif"
    },
    {
      name: "Budget-Friendly Hostel",
      description: "Popular backpacker hostel with shared and private rooms, social atmosphere, great for divers.",
      location: "Sairee Beach",
      priceRange: "$$",
      rating: 4.2,
      amenities: ["Shared Kitchen", "Dorm Beds", "Private Rooms", "WiFi", "Common Areas"],
      highlights: ["Social scene", "Dive packages", "Budget meals"],
      image: "/images/photo-1647825194145-2d94e259c745.avif"
    },
    {
      name: "Hillside Villa with Views",
      description: "Peaceful hilltop location with panoramic island views, quiet retreat for couples.",
      location: "Chalok Baan Kao",
      priceRange: "$$$",
      rating: 4.7,
      amenities: ["Mountain Views", "Pool", "Restaurant", "WiFi", "Garden"],
      highlights: ["Sunrise views", "Peaceful setting", "Excellent food"],
      image: "/images/photo-1659518893171-b15e20a8e201.avif"
    },
    {
      name: "Dive-Focused Bungalows",
      description: "Purpose-built accommodation for divers with equipment storage, on-site dive shop, night diving trips.",
      location: "Sairee Beach",
      priceRange: "$$$",
      rating: 4.6,
      amenities: ["Dive Shop", "Equipment Storage", "Restaurant", "WiFi", "Briefing Area"],
      highlights: ["Convenient for diving", "Dive packages", "Experienced staff"],
      image: "/images/photo-1682686580849-3e7f67df4015.avif"
    },
    {
      name: "Eco-Friendly Jungle Resort",
      description: "Sustainable accommodation nestled in tropical gardens, eco-conscious practices, tranquil environment.",
      location: "Koh Tao Interior",
      priceRange: "$$",
      rating: 4.4,
      amenities: ["Garden Setting", "WiFi", "Restaurant", "Hammocks", "Nature Trails"],
      highlights: ["Eco-friendly", "Nature experience", "Good value"],
      image: "/images/photo-1682687982423-295485af248a.avif"
    }
  ];

  const getPriceStyle = (range: string) => {
    switch (range) {
      case "$$$$": return "bg-purple-100 text-purple-800";
      case "$$$": return "bg-blue-100 text-blue-800";
      case "$$": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Accommodation on Koh Tao
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Find the perfect place to stay during your diving adventure in Thailand's island paradise.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Places to Stay on Koh Tao</h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Koh Tao offers a wide range of accommodation options to suit every budget and preference. Whether you're looking for luxury beachfront resorts, 
            comfortable mid-range bungalows, or budget-friendly hostels, you'll find excellent options. Most accommodations are conveniently located near 
            dive shops, restaurants, and beaches.
          </p>
        </div>

        {/* Info Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Main Beach Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Sairee Beach</strong> - Most developed, best amenities</li>
                <li>• <strong>Chalok Baan Kao</strong> - Quieter, scenic views</li>
                <li>• <strong>Ao Leuk</strong> - Small, peaceful bay</li>
                <li>• <strong>Mae Haad</strong> - Close to ferry dock</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Budget Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Budget:</strong> $10-30/night</li>
                <li>• <strong>Mid-Range:</strong> $30-80/night</li>
                <li>• <strong>Luxury:</strong> $80-300+/night</li>
                <li>• <strong>Peak Season:</strong> Dec-Feb</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Waves className="h-5 w-5 text-teal-600" />
                Diving Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Stay near Sairee for best dive access</li>
                <li>• Many resorts have dive shops on-site</li>
                <li>• Early morning dives best for visibility</li>
                <li>• Book accommodation + diving packages</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Accommodations Grid */}
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Accommodations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {accommodations.map((accommodation) => (
            <Card key={accommodation.name} className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={accommodation.image} 
                  alt={accommodation.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{accommodation.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{accommodation.rating}</span>
                  </div>
                </div>
                <CardDescription className="flex items-center gap-2 text-sm">
                  <MapPin className="h-3 w-3" />
                  {accommodation.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm mb-4">{accommodation.description}</p>
                
                <div className="mb-4">
                  <Badge className={`${getPriceStyle(accommodation.priceRange)}`}>
                    {accommodation.priceRange}
                  </Badge>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-600 mb-2">AMENITIES</p>
                  <div className="flex flex-wrap gap-1">
                    {accommodation.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-600 mb-2">HIGHLIGHTS</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    {accommodation.highlights.map((highlight) => (
                      <li key={highlight}>• {highlight}</li>
                    ))}
                  </ul>
                </div>

                <Button variant="outline" className="w-full text-sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Booking Tips */}
        <Card className="bg-blue-50">
          <CardHeader>
            <CardTitle>Booking Tips & Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Best Time to Visit</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>High Season:</strong> December - February (peak rates)</li>
                  <li><strong>Shoulder:</strong> March-May, Sept-November (good deals)</li>
                  <li><strong>Low Season:</strong> June-August (lowest rates, occasional rain)</li>
                  <li><strong>Southwest Monsoon:</strong> May-September (rough seas)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Booking Advice</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Book 2-3 weeks in advance for better rates</li>
                  <li>✓ Ask about dive course discounts</li>
                  <li>✓ Check WiFi availability before booking</li>
                  <li>✓ Read recent guest reviews online</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Dive Koh Tao?</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Book your accommodation and PADI certification course together for the ultimate diving experience.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            View Our Courses
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccommodationsPage;