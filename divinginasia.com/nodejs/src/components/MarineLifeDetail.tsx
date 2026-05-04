import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { MapPin, Waves, Fish, Clock, Eye, ArrowLeft, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MarineLifeDetailProps {
  name: string;
  scientificName: string;
  description: string;
  size: string;
  habitat: string;
  conservationStatus: string;
  diet: string;
  behavior: string;
  bestTime: string;
  frequency: string;
  detailedDescription: string;
  interestingFacts: string[];
  photographyTips: string[];
  images: string[];
  fullHeightHero?: boolean;
  heroImageFit?: 'cover' | 'contain';
  noOverlay?: boolean;
  secondaryImage?: string;
}

const MarineLifeDetail: React.FC<MarineLifeDetailProps> = ({
  name,
  scientificName,
  description,
  size,
  habitat,
  conservationStatus,
  diet,
  behavior,
  bestTime,
  frequency,
  detailedDescription,
  interestingFacts,
  photographyTips,
  images,
  fullHeightHero = false,
  heroImageFit = 'cover',
  noOverlay = false,
  secondaryImage
}) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'endangered': return 'bg-red-100 text-red-800';
      case 'vulnerable': return 'bg-orange-100 text-orange-800';
      case 'near threatened': return 'bg-yellow-100 text-yellow-800';
      case 'least concern': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className={`relative overflow-hidden ${fullHeightHero ? 'min-h-[calc(100vh-4rem)]' : 'h-96'}`}>
        {!noOverlay && <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-teal-600/80 z-10" />}
        <img
          src={images[0] || "/images/photo-1613853250147-2f73e55c1561.avif"}
          alt={name}
          className={`absolute inset-0 w-full h-full ${heroImageFit === 'contain' ? 'object-contain bg-black' : 'object-cover'}`}
        />
        <div className={`absolute inset-0 ${noOverlay ? '' : 'z-20'} flex items-center justify-center`}>
          <div className={`text-center ${noOverlay ? 'bg-black/30 px-8 py-6 rounded-xl' : 'text-white'}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">{name}</h1>
            <p className="text-xl italic mb-2 text-white drop-shadow-lg">{scientificName}</p>
            <p className="text-lg max-w-2xl mx-auto text-white drop-shadow-lg">{description}</p>
          </div>
        </div>
      </div>

      {secondaryImage && (
        <div className="w-full pt-4">
          <img
            src={secondaryImage}
            alt={`${name} reef`}
            className="w-full object-cover"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate('/marine-life')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Marine Life
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fish className="h-5 w-5 text-blue-600" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">{detailedDescription}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Waves className="h-4 w-4 text-blue-500" />
                    <span className="text-sm"><strong>Size:</strong> {size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span className="text-sm"><strong>Habitat:</strong> {habitat}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm"><strong>Diet:</strong> {diet}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="text-sm"><strong>Best Time:</strong> {bestTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Behavior */}
            <Card>
              <CardHeader>
                <CardTitle>Behavior & Ecology</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{behavior}</p>
              </CardContent>
            </Card>

            {/* Interesting Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Interesting Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {interestingFacts.map((fact, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{fact}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Photography Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  Photography Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {photographyTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Conservation Status</span>
                  <Badge className={`ml-2 ${getStatusColor(conservationStatus)}`}>
                    {conservationStatus}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Frequency</span>
                  <p className="text-sm text-gray-700">{frequency}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Best Time to See</span>
                  <p className="text-sm text-gray-700">{bestTime}</p>
                </div>
              </CardContent>
            </Card>

            {/* Related Links */}
            <Card>
              <CardHeader>
                <CardTitle>Explore More</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/marine-life">
                  <Button variant="outline" className="w-full justify-start">
                    All Marine Life
                  </Button>
                </Link>
                <Link to="/dive-sites">
                  <Button variant="outline" className="w-full justify-start">
                    Dive Sites
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button variant="outline" className="w-full justify-start">
                    PADI Courses
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Image Gallery */}
            <Card>
              <CardHeader>
                <CardTitle>Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {images.slice(1, 5).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${name} ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarineLifeDetail;