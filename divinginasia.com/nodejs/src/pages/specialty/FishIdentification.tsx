import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function FishIdentification() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Fish Identification Specialty (AWARE)</h1>
          <p className="text-xl text-gray-600">
            Master fish identification and understand marine biodiversity in Southeast Asian waters.
          </p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700 mb-4">
            Learn to identify and understand the behavior of fish around Koh Tao. This conservation-focused specialty deepens your appreciation for marine life and helps protect the ecosystem through responsible diving.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Fish identification techniques</li>
            <li>Common Koh Tao fish species</li>
            <li>Fish behavior and ecology</li>
            <li>Fish families and characteristics</li>
            <li>Conservation and responsible diving</li>
            <li>Underwater photography techniques</li>
            <li>Habitat identification</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimum certification: PADI Open Water Diver</li>
            <li>Minimum age: 12 years old</li>
            <li>No minimum dive experience required</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Duration & Training Dives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Course Duration</h3>
              <p className="text-gray-700">1-2 days</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Training Dives</h3>
              <p className="text-gray-700">2 identification dives</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿2,200</div>
          <p className="text-gray-600 text-sm">Includes training, materials, and 2 training dives</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Discover Marine Life</h2>
          <p className="text-gray-700 mb-4">Learn to identify and appreciate the rich marine biodiversity around Koh Tao.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=fish-id')}>Book Now</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
